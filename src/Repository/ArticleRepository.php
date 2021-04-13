<?php


namespace App\Repository;

use App\Entity\Article;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Exception;
use Doctrine\DBAL\Query\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;
use function Doctrine\DBAL\Query\QueryBuilder;

class ArticleRepository extends ServiceEntityRepository
{
    // TODO variable statique cree, il faut changer les $conn dans les fonctions suivantes
    public static $conn;

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Article::class);
        $this::$conn = $this->getEntityManager()->getConnection();
    }

    public function addArticle($request)
    {
        $conn = $this->getEntityManager()->getConnection();

        $name = $request['name-article'];
        $description = $request['description-article'];
        // Obtenir le status en binaire
        $availableArticle = $request['available-article'];
        $available = ($availableArticle == "on") ? 1 : 0;
        $discount = $request['discount-article'];
        $discount_period = $request['period-discount-article'];
        $price = $request['price-article'];
        $quantity = $request['stock-article'];
        $photo = $request['photo-article'];

        //$idArticle = 3;
        $idShop = 4;
        $idReview = 5;
        $qb = $conn->createQueryBuilder();
        try {
            /**
             * Inserer les articles
             */
            $qb->insert('article')
                ->setValue('a_name', '"' . $name . '"')
                ->setValue('a_description', '"' . $description . '"')
                ->setValue('a_price', '"' . $price . '"')
                ->setValue('a_id_shop', '"' . $idShop . '"')
                ->setValue('a_discount', '"' . $discount . '"')
                ->setValue('a_discount_period', '"' . $discount_period . '"')
                ->setValue('a_available', '"' . $available . '"')
                ->setValue('a_quantity_stock', '"' . $quantity . '"')
                ->execute();
            $lastId = $conn->lastInsertId();
            /**
             * Inserer les photos dans 'photos'
             */
            foreach ($photo as $line) {
                $qb = $conn->createQueryBuilder();
                $qb->insert('picture')
                    ->setValue('p_bin', '"' . $line['pictureURL'] . '"')
                    ->setValue('p_id_article', '"' . $lastId . '"')
                    ->setValue('p_id_shop', '"' . $idShop . '"')
                    ->execute();
            }
        } catch (Exception $e) {
        }
        return 'success';
    }


    public function getArticle($id)
    {
        $conn = $this->getEntityManager()->getConnection();
        // Info de cet article
        $qb = $conn->createQueryBuilder();
        $stmt =
            $qb->select('*')
                ->from('article', 'a')
                ->where($qb->expr()->eq('a_id', '"' . $id . '"'))
                ->execute();
        $article = $stmt->fetchAssociative();
        // Info base64 des photos
        $qb = $conn->createQueryBuilder();
        $stmt =
            $qb->select('*')
                ->from('picture', 'p')
                ->where($qb->expr()->eq('p_id_article', '"' . $id . '"'))
                ->execute();
        $pictures = $stmt->fetchAllAssociative();
        return array([
            'article' => $article,
            'pictures' => $pictures
        ]);
    }

    /**
     * @param $request
     * @param $idArticle
     * @throws Exception
     */
    public function updateArticle($request, $idArticle)
    {
        $name = $request['name-article'];
        $description = $request['description-article'];
        // Obtenir le status en binaire
        $availableArticle = $request['available-article'];
        $available = ($availableArticle == "on") ? 1 : 0;
        $discount = $request['discount-article'];
        $discount_period = $request['period-discount-article'];
        $price = $request['price-article'];
        $quantity = $request['stock-article'];
        $photo = $request['photo-article'];
        $idShop = '10';

        $conn = $this->getEntityManager()->getConnection();
        $qb = $conn->createQueryBuilder();
        $qb->update('article', 'a')
            ->set('a_name', '"' . $name . '"')
            ->set('a_description', '"' . $description . '"')
            ->set('a_price', '"' . $price . '"')
            ->set('a_id_shop', '"' . $idShop . '"')
            ->set('a_discount', '"' . $discount . '"')
            ->set('a_discount_period', '"' . $discount_period . '"')
            ->set('a_available', '"' . $available . '"')
            ->set('a_quantity_stock', '"' . $quantity . '"')
            ->where($qb->expr()->eq('a_id', '"' . $idArticle . '"'))
            ->execute();

        $qb = $conn->createQueryBuilder();
        /**
         * Inserer les photos dans 'photos'
         */
        foreach ($photo as $line) {
            $qb = $conn->createQueryBuilder();
            $qb->insert('picture')
                ->setValue('p_bin', '"' . $line['pictureURL'] . '"')
                ->setValue('p_id_article', '"' . $idArticle . '"')
                ->setValue('p_id_shop', '"' . $idShop . '"')
                ->execute();
        }
    }

    /**
     * @param $id : id de la photo
     * @throws Exception
     */
    public function deletePhoto($id)
    {
        $qb = $this::$conn->createQueryBuilder();
        $stmt =
            $qb->delete('picture')
                ->where($qb->expr()->eq('p_id', '"' . $id . '"'))
                ->execute();
    }

    public function getFilteredArticles($request)
    {
        $city = $request['city'];
        $pick = $request['pick'];
        $price = $request['price'];
        $promotion = $request['promotion'];
        $type = $request['type'];
        $qb = $this::$conn->createQueryBuilder();
        $qb->select('*')
            ->from('article', 'a')
            ->leftJoin('a', 'shop', 's', 's.sh_id = a.a_id_shop')
            ->leftJoin('a', 'city', 'c', 'c.c_id = s.sh_city')
            ->leftJoin('a', 'picture', 'p', ' a.a_id =p.p_id_article')
            // Option retrait
            ->where($qb->expr()->eq('sh_pick', '"' . $pick . '"'));
        // Villes
        if (!is_null($city)) {
            $qb->andwhere($qb->expr()->eq('c_name', '"' . $city . '"'));
        }
        // Prix et promotion
        $this->priceComparisonSQL($qb, $price);
        $this->discountComparisonSQL($qb, $promotion);
        // Ajout de filtres pour le type des commerces (obsolète)
        if (!empty($type)) {
            $orx = $qb->expr()->orX();
            foreach ($type as $typeCommerce) {
                $orx->add($qb->expr()->eq('sh_type', '"' . $typeCommerce . '"'));
            }
            $qb->andWhere($orx);
        }

        $stmt = $qb->execute();
        return $stmt->fetchAllAssociative();
    }

    public function priceComparisonSQL(QueryBuilder $qb, $price)
    {
        switch ($price) {
            case 0:
                $qb->andWhere(
                    $qb->expr()->and(
                        $qb->expr()->comparison('a_price', '>=', $price),
                        $qb->expr()->comparison('a_price', '<=', 25)
                    )
                );
                break;
            case 25:
                $qb->andWhere(
                    $qb->expr()->and(
                        $qb->expr()->comparison('a_price', '>', $price),
                        $qb->expr()->comparison('a_price', '<=', 50)
                    )
                );
                break;
            case 50:
                $qb->andWhere(
                    $qb->expr()->and(
                        $qb->expr()->comparison('a_price', '>', $price),
                        $qb->expr()->comparison('a_price', '<=', 100)
                    )
                );
                break;
            case 100:
                $qb->andWhere(
                    $qb->expr()->and(
                        $qb->expr()->comparison('a_price', '>', $price)
                    ));
                break;
        }
    }

    public function discountComparisonSQL(QueryBuilder $qb, $discount)
    {
        switch ($discount) {
            case 0:
                $qb->andWhere(
                    $qb->expr()->and(
                        $qb->expr()->comparison('a_discount', '>=', $discount),
                        $qb->expr()->comparison('a_discount', '<=', 20)
                    )
                );
                break;
            case 20:
                $qb->andWhere(
                    $qb->expr()->and(
                        $qb->expr()->comparison('a_discount', '>', $discount),
                        $qb->expr()->comparison('a_discount', '<=', 40)
                    )
                );
                break;
            case 40:
                $qb->andWhere(
                    $qb->expr()->and(
                        $qb->expr()->comparison('a_discount', '>', $discount),
                        $qb->expr()->comparison('a_discount', '<=', 60)
                    )
                );
                break;
            case 60:
                $qb->andWhere(
                    $qb->expr()->and(
                        $qb->expr()->comparison('a_discount', '>', $discount)
                    ));
                break;
        }
    }
}
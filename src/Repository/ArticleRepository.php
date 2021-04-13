<?php


namespace App\Repository;

use App\Entity\Article;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\DBAL\Exception;
use Doctrine\Persistence\ManagerRegistry;
use function Doctrine\DBAL\Query\QueryBuilder;

class ArticleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Article::class);
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
        $conn = $this->getEntityManager()->getConnection();
        $qb = $conn->createQueryBuilder();
        $stmt =
            $qb->delete('picture')
                ->where($qb->expr()->eq('p_id', '"' . $id . '"'))
                ->execute();
    }


}
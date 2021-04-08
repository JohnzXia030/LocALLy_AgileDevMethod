<?php


namespace App\Repository;

use App\Entity\Article;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\DBAL\Exception;
use Doctrine\Persistence\ManagerRegistry;

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
                    ->setValue('p_base64', '"' . $line['pictureURL'] . '"')
                    ->setValue('p_id_article', '"' . $lastId . '"')
                    ->setValue('p_id_shop', '"' . $idShop . '"')
                    ->execute();
            }
        } catch (Exception $e) {
        }
        return 'success';
    }
}
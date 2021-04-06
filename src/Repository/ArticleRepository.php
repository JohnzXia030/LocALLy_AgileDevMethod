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

        //TODO surement inutile, à simplifier
        $name = $request['name-article'];
        $description = $request['description-article'];
        $available = $request['available-article'];
        $discount = $request['discount-article'];
        $discount_period = $request['period-discount-article'];
        $price = $request['price-article'];
        $quantity = $request['stock-article'];
        $photo = $request['photo-article'];

        //requete d'insertion d'un article
        //La premiere insertion marche, mais à partir de "SET" ca ne fonctionne pas car le LAST_INSERT_ID() ne marche pas encore)
        $sqlArticle =
            'INSERT INTO  article(a_name, a_description, a_price, a_discount, a_discount_period, a_available, a_quantity_stock)
                VALUES(:name, :description, :price, :discount, :discount_period, :available, :quantity_stock);';
            //SET @LAST_ARTICLE_ID = LAST_INSERT_ID();
            //INSERT INTO picture (p_id_article, p_bin)
            //VALUES (@LAST_ARTICLE_ID,:photo);

        //requete d'insertion d'une photo
        $sqlPhoto = 'INSERT INTO picture (p_base64, p_id_article, p_id_shop, p_id_review)
            VALUES (:photo, :lastId, :idShop, :idReview);';
        //$sqlSelectPhoto = 'SELECT * FROM picture;';



        try {
            $stmt = $conn->prepare($sqlArticle);
            $stmt->execute(['name'=>$name, 'description'=>$description, 'price'=>$price,'discount'=>$discount, 'discount_period'=>$discount_period, 'available'=>$available, 'quantity_stock'=>$quantity]);
            $lastId = $conn->lastInsertId();
            //$idArticle = 3;
            $idShop = 4;
            $idReview = 5;

            $stmt = $conn->prepare($sqlPhoto);
            $stmt->execute(['photo'=>$photo, 'lastId'=>$lastId, 'idShop'=>$idShop, 'idReview'=>$idReview]);

            return $conn->lastInsertId();
        } catch (Exception $e) {
        } catch (\Doctrine\DBAL\Driver\Exception $e) {
        }


        // returns an array of arrays (i.e. a raw data set)

    }
}
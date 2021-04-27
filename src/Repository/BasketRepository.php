<?php


namespace App\Repository;

use App\Entity\Article;
use App\Entity\Basket;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Exception;
use Doctrine\DBAL\Query\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;
use function Doctrine\DBAL\Query\QueryBuilder;

class BasketRepository extends ServiceEntityRepository
{
    public static $conn;

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Basket::class);
        $this::$conn = $this->getEntityManager()->getConnection();
    }

    public function addBasket($idArticle, $idOrder, $quantityArticle, $subTotal)
    {
        $conn = $this->getEntityManager()->getConnection();
        /**
         * Inserer les donnees dans 'basket'
         */

        $qb = $conn->createQueryBuilder();
        $qb->insert('basket')
            ->setValue('b_id_article', '"' . $idArticle . '"')
            ->setValue('b_id_order', '"' . $idOrder . '"')
            ->setValue('b_quantity_article', '"' . $quantityArticle . '"')
            ->setValue('b_sub_total', '"' . $subTotal . '"')
            ->execute();

    }
}
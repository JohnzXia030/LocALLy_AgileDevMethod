<?php


namespace App\Repository;

use App\Entity\Article;
use App\Entity\Order;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Exception;
use Doctrine\DBAL\Query\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;
use function Doctrine\DBAL\Query\QueryBuilder;

class OrderRepository extends ServiceEntityRepository
{
    public static $conn;

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Order::class);
        $this::$conn = $this->getEntityManager()->getConnection();
    }

    public function addOrder($idShop, $total, $sIdUserSession)
    {
        $conn = $this->getEntityManager()->getConnection();
        /**
         * Inserer les donnees dans 'order'
         */
        $date = new \DateTime();
        $dateFormat = $date->format('Y-m-d H:i:s');
        $statecode = 1;

        $qb = $conn->createQueryBuilder();
        $qb->insert("`order`")
            ->setValue('o_date', '"' . $dateFormat . '"')
            ->setValue('o_id_client', '"' . $sIdUserSession . '"')
            ->setValue('o_statecode', '"' . $statecode . '"')
            ->setValue('o_total', '"' . $total . '"')
            ->setValue('o_id_shop', '"' . $idShop . '"')
            ->execute();
        $lastId = $conn->lastInsertId();
        return $lastId;
    }
}
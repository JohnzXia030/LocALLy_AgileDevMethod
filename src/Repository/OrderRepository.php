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

/**
 * @method Order|null find($id, $lockMode = null, $lockVersion = null)
 * @method Order|null findOneBy(array $criteria, array $orderBy = null)
 * @method Order[]    findAll()
 * @method Order[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */

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


    public function getOrderByIdTrader($idTrader)
    {
        $qb = $this::$conn->createQueryBuilder();
        $qb->select('*')
            ->from('`'.'order'.'`', 'o')
            ->leftJoin('o', 'shop', 'sh', 'o.o_id_shop = sh.sh_id')
            ->leftJoin('o', 'user', 'u', 'o.o_id_client = u.u_id')
            ->where($qb->expr()->eq('sh.sh_id_trader', '"' . $idTrader . '"'));

        $stmt = $qb->execute();
        return $stmt->fetchAllAssociative();

    }

    public function getBasketByIdOrder($idOrder)
    {
        $qb = $this::$conn->createQueryBuilder();
        $qb->select('*')
            ->from('basket', 'b')
            ->where($qb->expr()->eq('b_id_order', '"' . $idOrder . '"'));
        try {
            $stmt = $qb->execute();
            return $stmt->fetchAllAssociative();
        } catch (Exception $e) {
        }
    }
}
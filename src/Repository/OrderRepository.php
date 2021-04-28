<?php

namespace App\Repository;

use App\Entity\Order;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\DBAL\Exception;
use Doctrine\Persistence\ManagerRegistry;

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

    public function getOrdersByIdClient($idClient)
    {
        $qb = $this::$conn->createQueryBuilder();
        $qb->select('*')
            ->from('`'.'order'.'`', 'o')
            ->leftJoin('o', 'shop', 'sh', 'o.o_id_shop = sh.sh_id')
            ->leftJoin('o', 'state', 'st', 'o.o_statecode = st.s_code')
            ->where($qb->expr()->eq('o.o_id_client', '"' . $idClient . '"'))
            ->where($qb->expr()->eq('o_statecode', '"' . '1' . '"'))
            ->where($qb->expr()->eq('o_statecode', '"' . '2' . '"'));
        $stmt = $qb->execute();

        $orders = $stmt->fetchAllAssociative();

        foreach($orders as $key => $order) {
            $idOrder = $order['o_id'];

            $qbBasket = $this::$conn->createQueryBuilder();
            $qbBasket->select('*')
                ->from('basket', 'b')
                ->leftJoin('b', 'article', 'a', 'b.b_id_article = a.a_id')
                ->where($qb->expr()->eq('b_id_order', '"' . $idOrder . '"'));
            $stmtBasket = $qbBasket->execute();

            $basket = $stmtBasket->fetchAllAssociative();

            $orders[$key]['basket'] = $basket;
        }
        

        return $orders;
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

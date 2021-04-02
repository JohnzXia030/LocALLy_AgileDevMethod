<?php

namespace App\Repository;

use App\Entity\Shop;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\DBAL\Exception;
use Doctrine\Persistence\ManagerRegistry;

class ShopRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Shop::class);
    }

    public function addArticle($request)
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql =
            'SELECT u_id
            FROM user';

        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAllAssociative();
        } catch (Exception $e) {
        } catch (\Doctrine\DBAL\Driver\Exception $e) {
        }


        // returns an array of arrays (i.e. a raw data set)

    }
}
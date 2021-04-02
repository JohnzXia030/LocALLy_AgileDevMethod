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
        $this->getEntityManager()->
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
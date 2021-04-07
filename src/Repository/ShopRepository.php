<?php

namespace App\Repository;

use App\Entity\Shop;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\DBAL\Exception;
use Doctrine\Persistence\ManagerRegistry;
use function Doctrine\DBAL\Query\QueryBuilder;

class ShopRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Shop::class);
    }

    public function addShop($request)
    {
        $conn = $this->getEntityManager()->getConnection();
        /**
         * Inserer les donnees dans 'shop'
         */
        $qb = $conn->createQueryBuilder();
        $qb ->insert('shop')
            ->setValue('sh_name', '"' . $request->nenseigne . '"')
            ->setValue('sh_num_street', '"' . $request->numvoie . '"')
            ->setValue('sh_name_street', '"' . $request->nomvoie . '"')
            ->setValue('sh_address_add', '"' . $request->ca . '"')
            ->setValue('sh_city', '33000')
            ->setValue('sh_description', '"' . $request->commentaires . '"')
            ->setValue('sh_id_trader', '1')
            ->setValue('sh_num_phone', $request->numtel)
            ->execute();
        /**
         * Inserer les donnees dans 'faq'
         */
        foreach ($request->faq as $line){
            $qb = $conn->createQueryBuilder();
            $qb->insert('faq')
                ->setValue('faq_question', '"' . $line->question. '"')
                ->setValue('faq_reply', '"' . $line->reponse . '"')
                ->setValue('faq_id_shop', '1')
                ->execute();
        }
        /**
         * Inserer les photos dans 'photos'
         */
        foreach ($request->picture as $line){
            $qb = $conn->createQueryBuilder();
            return $request;
            $qb->insert('picture')
                ->setValue('p_bin', '"' . $line->base64. '"')
                ->setValue('p_shop', '1')
                ->execute();
        }
    }
}
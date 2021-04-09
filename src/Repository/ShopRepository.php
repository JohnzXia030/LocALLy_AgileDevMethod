<?php

namespace App\Repository;

use App\Entity\Shop;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
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
            $qb->insert('picture')
                ->setValue('p_base64', '"' . $line->pictureURL. '"')
                ->setValue('p_id_shop', '1')
                ->execute();
        }
    }

    public function getShop($id)
    {
        $conn = $this->getEntityManager()->getConnection();
        // Info de cet article
        $qb = $conn->createQueryBuilder();
        $stmt =
            $qb->select('*')
                ->from('shop', 's')
                ->where($qb->expr()->eq('sh_id', '"' . $id . '"'))
                ->execute();
        $shop = $stmt->fetchAssociative();
        // Info base64 des photos
        $qb = $conn->createQueryBuilder();
        $stmt =
            $qb->select('*')
                ->from('picture', 'p')
                ->where($qb->expr()->eq('p_id_shop', '"' . $id . '"'))
                ->execute();
        $pictures = $stmt->fetchAllAssociative();
        //Infos FAQ
        $qb = $conn->createQueryBuilder();
        $stmt =
            $qb->select('*')
                ->from('faq', 'p')
                ->where($qb->expr()->eq('faq_id_shop', '"' . $id . '"'))
                ->execute();
        $faq = $stmt->fetchAllAssociative();

        return array([
            'shop' => $shop,
            'pictures' => $pictures,
            'faq'=>$faq
        ]);
    }
}


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

    /**
     * Ajouter un shop
     */
    public function addShop($request)
    {
        $conn = $this->getEntityManager()->getConnection();
        $horairesString = json_encode($request->horaires);
        /**
         * Inserer les donnees dans 'shop'
         */
        $qb = $conn->createQueryBuilder();
        $qb->insert('shop')
            ->setValue('sh_name', '"' . $request->nenseigne . '"')
            ->setValue('sh_num_street', '"' . $request->numvoie . '"')
            ->setValue('sh_name_street', '"' . $request->nomvoie . '"')
            ->setValue('sh_address_add', '"' . $request->ca . '"')
            ->setValue('sh_city', '"' . $request->nville . '"')
            ->setValue('sh_description', '"' . $request->commentaires . '"')
            ->setValue('sh_id_trader', '"' . '1' . '"')
            ->setValue('sh_num_phone', '"' . $request->numtel . '"')
            ->setValue("sh_open_hours", "'" . $horairesString . "'")
            ->setValue("sh_pick", "'" . $request->oretrait . "'")
            ->setValue("sh_type", "'" . $request->tmagasin . "'")
            ->execute();
        $lastId = $conn->lastInsertId();
        /**
         * Inserer les donnees dans 'faq'
         */
        foreach ($request->faq as $line) {
            $qb = $conn->createQueryBuilder();
            $qb->insert('faq')
                ->setValue('faq_question', '"' . $line->question . '"')
                ->setValue('faq_reply', '"' . $line->reponse . '"')
                ->setValue('faq_id_shop', '"' . $lastId . '"')
                ->execute();
        }
        /**
         * Inserer les photos dans 'photos'
         */
        if ($request->picture != null) {
            foreach ($request->picture as $line) {
                $qb = $conn->createQueryBuilder();
                $qb->insert('picture')
                    ->setValue('p_base64', '"' . $line->pictureURL . '"')
                    ->setValue('p_id_shop', '"' . $lastId . '"')
                    ->execute();
            }
        }
    }

    /**
     * Récupérer un shop en fonction de son id
     */
    public function getShop($id)
    {
        $conn = $this->getEntityManager()->getConnection();
        // Info de ce shop
        $qb = $conn->createQueryBuilder();
        $stmt =
            $qb->select('sh.*', 'c.c_name')
                ->from('shop', "sh")
                ->join('sh', 'city', 'c', 'sh.sh_city = c.c_id')
                ->where($qb->expr()->eq('sh.sh_id', '"' . $id . '"'))
                /*->join('sh', 'state', 'st', 'sh.sh_state = st.s_code')
                ->where($qb->expr()->eq('sh.sh_id', '"' . $id . '"')) A effacer lors de la décision de transformation du champ state du shop en boolean */
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
            'faq' => $faq
        ]);
    }

    /**
     * Récupérer toutes les villes dans la BDD
     */
    public function getCities(){
        $conn = $this->getEntityManager()->getConnection();
        $qb = $conn->createQueryBuilder();
        //get all shops
        $stmt =
            $qb->select('*')
                ->from('city')
                ->execute();
        $cities = $stmt->fetchAllAssociative();
    return $cities;
    }

    public function getCity($id)
    {
        $conn = $this->getEntityManager()->getConnection();
        // Info de la ville
        $qb = $conn->createQueryBuilder();
        $stmt =
            $qb->select('c.*')
                ->from('city', 'c')
                ->where($qb->expr()->eq('c.c_id', '"' . $id . '"'))
                ->execute();
        $city = $stmt->fetchAssociative();

        return $city;
    }

    public function getArticles($id)
    {
        $conn = $this->getEntityManager()->getConnection();
        // Info de la ville
        $qb = $conn->createQueryBuilder();
        $stmt =
        $qb->select('a.*', 'p.p_base64')
            ->from('article', 'a')
            ->join('a', 'picture', 'p', 'a.a_id = p.p_id_article')
            ->where($qb->expr()->eq('a.a_id_shop', '"' . $id . '"'))
            ->execute();
        $articles = $stmt->fetchAllAssociative();

        return $articles;
    }
}

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
     * @param $request
     * @throws Exception
     */
    public function addShop($request, $idTrader)
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
            ->setValue('sh_id_trader', '"' . $idTrader . '"')
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
     * Si un commercant a deja un magasin
     * Magasin existe: Info de son magasin
     * Magasin n'existe pas encore: false
     * @param $idTrader
     * @return \Doctrine\DBAL\Driver\ResultStatement|int
     */
    public function ifHasShop($idTrader)
    {
        $conn = $this->getEntityManager()->getConnection();
        $qb = $conn->createQueryBuilder();
        $qb ->select('*')
            ->from('shop')
            ->where($qb->expr()->eq('sh_id_trader', '"' . $idTrader . '"'));
        return $qb->execute()->fetchAssociative();;

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
                ->andWhere($qb->expr()->isNull('p.p_id_article'))
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
        //get all cities
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
        // Info des articles
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

    /**
     * @param $request
     * @param $idShop
     * @throws Exception
     */
    public function updateShop($request, $idShop /*, $mIdUser*/)
    {
        $horairesString = json_encode($request['horaires']);
        $photos = $request['photos-magasin'];
        $faq = $request['faq'];

        $nomEnseigne = $request['nenseigne'];
        $numVoie = $request['numvoie'];
        $nomVoie = $request['nomvoie'];
        $complementAdresse = $request['ca'];
        $city = $request['nville'];
        $description = $request['description'];
        $numTel = $request['numtel'];
        $pick = $request['oretrait'];
        $typeMagasin = $request['type-magasin'];

        /**
         * Update les donnees dans 'shop'
         */
        $conn = $this->getEntityManager()->getConnection();
        $qb = $conn->createQueryBuilder();
        $qb->update('shop')
            ->set('sh_name', '"' . $nomEnseigne . '"')
            ->set('sh_num_street', '"' . $numVoie . '"')
            ->set('sh_name_street', '"' . $nomVoie . '"')
            ->set('sh_address_add', '"' . $complementAdresse . '"')
            ->set('sh_city', '"' . $city . '"')
            ->set('sh_description', '"' . $description . '"')
            //->set('sh_id_trader', '"' . $mIdUser . '"')
            ->set('sh_num_phone', '"' . $numTel . '"')
            ->set("sh_open_hours", "'" . $horairesString . "'")
            ->set("sh_pick", "'" . $pick . "'")
            ->set("sh_type", "'" . $typeMagasin . "'")
            ->where($qb->expr()->eq('sh_id', '"' . $idShop . '"'))
            ->execute();

        /**
         * Inserer/update les donnees dans 'faq'
         */
        foreach ($faq as $line) {
            /**
             * Update les donnees dans 'faq'
             */
            echo "id = " .  $line['id'] . "\n";

            if (!empty($line['id'])) {
                $qb = $conn->createQueryBuilder();
                $qb->update('faq')
                    ->set('faq_question', '"' . $line['question'] . '"')
                    ->set('faq_reply', '"' . $line['reponse'] . '"')
                    ->where($qb->expr()->eq('faq_id', '"' . $line['id'] . '"'))
                    ->execute();
                echo "non null";
            }
            /**
             * Inserer les donnees dans 'faq'
             */
            elseif (empty($line['id'])) {
                $qb = $conn->createQueryBuilder();
                $qb->insert('faq')
                ->setValue('faq_question', '"' . $line['question'] . '"')
                ->setValue('faq_reply', '"' . $line['reponse'] . '"')
                ->setValue('faq_id_shop', '"' . $idShop . '"')
                ->execute();
                echo "null";
            }
        }

        /**
         * Inserer les photos dans 'photos'
         */
        foreach ($photos as $line) {
            $qb = $conn->createQueryBuilder();
            $qb->insert('picture')
                ->setValue('p_base64', '"' . $line['pictureURL'] . '"')
                ->setValue('p_id_shop', '"' . $idShop . '"')
                ->execute();
        }
    }

    public function getFilteredShop($request)
    {

        $city = $request['city'];
        $pick = $request['pick'];
        $type = $request['type'];
        $conn = $this->getEntityManager()->getConnection();
        $qb = $conn->createQueryBuilder();
        $qb->select('*')
            ->from('shop', 'sh')
            ->leftJoin('sh', 'city', 'c', 'c.c_id = sh.sh_city')
            ->leftJoin('sh', 'picture', 'p', ' sh.sh_id =p.p_id_shop')
            // Option retrait
            ->where($qb->expr()->eq('sh_pick', '"' . $pick . '"'));
        // Villes
        if ($city !== "") {
            $qb->andwhere($qb->expr()->eq('c_name', '"' . $city . '"'));
        }

        // Ajout de filtres pour le type des commerces (obsolète)
        if (!empty($type)) {
            $orx = $qb->expr()->orX();
            foreach ($type as $typeCommerce) {
                $orx->add($qb->expr()->eq('sh_type', '"' . $typeCommerce . '"'));
            }
            $qb->andWhere($orx);
        }

        $stmt = $qb->execute();
        return $stmt->fetchAllAssociative();
    }

    public function deleteFaq($id){
        echo $id;
        /*$id  = 331;
        echo $id;*/
        $conn = $this->getEntityManager()->getConnection();
        $qb = $conn->createQueryBuilder();
        $qb->delete('faq')
                ->where($qb->expr()->eq('faq_id', '"' . $id . '"'));
        $stmt = $qb->execute();
    }

    /**
     * @param $idShop
     */
    public function deleteShop($idShop)
    {
        $conn = $this->getEntityManager()->getConnection();
        $qb = $conn->createQueryBuilder();
        $qb->delete('shop')
            ->where($qb->expr()->eq('sh_id', '"' . $idShop . '"'))
            ->execute();
    }

    /** Récuperer tous les magasins
     *
     */
    public function getAllShop(){
        $conn = $this->getEntityManager()->getConnection();
        // Info de ce shop
        $qb = $conn->createQueryBuilder();
        $stmt =
            $qb->select('*')
                ->from('shop', "sh")
                ->join('sh', 'city', 'c', 'sh.sh_city = c.c_id')
                ->join('sh', 'picture', 'p', 'sh.sh_id = p.p_id_shop')
                ->where($qb->expr()->isNull('p.p_id_article'))
                ->execute();
        $shop = $stmt->fetchAllAssociative();
        return $shop;
    }

}

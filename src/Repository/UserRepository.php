<?php

namespace App\Repository;

use App\Entity\Shop;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\DBAL\Exception;
use Doctrine\Persistence\ManagerRegistry;
use function Doctrine\DBAL\Query\QueryBuilder;

class UserRepository extends ServiceEntityRepository
{
    public static $shopRepository ;
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
        $this::$shopRepository = $this->getEntityManager()->getRepository(Shop::class);
    }

    public function addUser($request)
    {
        $conn = $this->getEntityManager()->getConnection();
        /**
         * Inserer les donnees dans 'user'
         */

        switch ($request['role']) {
            case 'Particulier' :
                $role = 2;
                break;
            case 'Professionel' : 
                $role = 3;
                break;
            default: 
                $role = 1;
        }
        
        $qb = $conn->createQueryBuilder();
        $qb ->insert('user')
            ->setValue('u_lastname', '"' . $request['lastname'] . '"')
            ->setValue('u_firstname', '"' . $request['firstname'] . '"')
            ->setValue('u_birth', '"' . $request['birth'] . '"')
            ->setValue('u_num_phone', '"' . $request['phoneNumber'] . '"')
            ->setValue('u_email', '"' . $request['email'] . '"')
            ->setValue('u_password', '"' . $request['password'] . '"')
            ->setValue('u_num_street', '"' . $request['streetNum'] . '"')
            ->setValue('u_name_street', '"' . $request['streetName'] . '"')
            ->setValue('u_address_add', '""')
            ->setValue('u_city', '"' . $request['city'] . '"')
            ->setValue('u_role', $role)
            ->execute();
    }

    public function updateUser($request, $sIdUser)
    {
        $conn = $this->getEntityManager()->getConnection();
        /**
         * Modifie les donnees dans 'user'
         */

        $conn = $this->getEntityManager()->getConnection();
        $user = $conn->executeStatement('UPDATE user SET u_lastname = ?, u_firstname = ?, u_birth = ?, u_num_phone = ?, u_email = ?, u_num_street = ?, u_name_street = ?, u_city = ? WHERE u_id = ?', 
                array($request['lastname'], $request['firstname'], $request['birth'], $request['phoneNumber'], $request['email'], $request['streetNum'], $request['streetName'], $request['city'], $sIdUser));
        
    }

    public function getInfoUser($id) {
        $conn = $this->getEntityManager()->getConnection();
        $user = $conn->fetchAll("SELECT * FROM user WHERE u_id = " . $id);
        
        return $user;
    }

    public function checkLogin($request) {
        $conn = $this->getEntityManager()->getConnection();
        $user = $conn->fetchAll("SELECT u_id, u_email, u_password, u_role FROM user WHERE u_email = '" . $request['email'] . "' AND u_password = '" . $request['password'] . "'");
        
        return $user;
    }

    public function checkUserExists($request) {
        $conn = $this->getEntityManager()->getConnection();
        $user = $conn->fetchAll("SELECT * FROM user WHERE u_email = '" . $request['email'] . "'");
        
        return $user;
    }

    public function changePassword($request) {
        $conn = $this->getEntityManager()->getConnection();
        $user = $conn->executeStatement('UPDATE user SET u_password = ? WHERE u_email = ?', array($request['password'], $request['email']));
        
        return $user;
    }

    public function getAllTrader(){
        $conn = $this->getEntityManager()->getConnection();
        $qb = $conn->createQueryBuilder();
        $stmt =
            $qb->select('*')
                ->from('user', 'u')
                ->where($qb->expr()->eq('u.u_role', '"' . 3 . '"'))
                ->execute();
        return $stmt->fetchAllAssociative();
    }

    public function getAllClient(){
        $conn = $this->getEntityManager()->getConnection();
        $qb = $conn->createQueryBuilder();
        $stmt =
            $qb->select('*')
                ->from('user', 'u')
                ->where($qb->expr()->eq('u.u_role', '"' . 2 . '"'))
                ->execute();
        return $stmt->fetchAllAssociative();
    }

    public function deleteUser($idUser){
        $conn = $this->getEntityManager()->getConnection();
        // role
        $qb = $conn->createQueryBuilder();
        $stmt =
            $qb->select('*')
                ->from('user', 'u')
                ->where($qb->expr()->eq('u_id', '"' . $idUser . '"'))
                ->execute();
        $idRole = $stmt->fetchAssociative()['u_role'];
        if($idRole == "3"){
            $qb = $conn->createQueryBuilder();
            $stmt =
                $qb->select('*')
                    ->from('shop')
                    ->where($qb->expr()->eq('sh_id_trader', '"' . $idUser . '"'))
                    ->execute();
            $idShop = $stmt->fetchAssociative()['sh_id'];
            // Supprimer magasins et articles liees
            $qb = $conn->createQueryBuilder();
            $qb->delete('shop')
                ->where($qb->expr()->eq('sh_id', '"' . $idShop . '"'))
                ->execute();
            $qb = $conn->createQueryBuilder();
            $qb->delete('article')
                ->where($qb->expr()->eq('a_id_shop', '"' . $idShop . '"'))
                ->execute();
        }
        $qb = $conn->createQueryBuilder();
        $stmt =
            $qb->delete('user')
                ->where($qb->expr()->eq('u_id', '"' . $idUser . '"'))
                ->execute();
    }
}
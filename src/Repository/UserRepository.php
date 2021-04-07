<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\DBAL\Exception;
use Doctrine\Persistence\ManagerRegistry;
use function Doctrine\DBAL\Query\QueryBuilder;

class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function addUser($request)
    {
        $conn = $this->getEntityManager()->getConnection();
        /**
         * Inserer les donnees dans 'user'
         */

        $role = 1;
        if ($request['role'] == 'Particulier') {
            $role = 2;
        }
        else {
            $role = 3;
        }
        error_log(json_encode(array_keys($request)));
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
}
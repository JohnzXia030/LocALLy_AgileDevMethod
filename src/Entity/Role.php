<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Role
 *
 * @ORM\Table(name="role")
 * @ORM\Entity
 */
class Role
{
    /**
     * @var int
     *
     * @ORM\Column(name="role_code", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $roleCode;

    /**
     * @var string
     *
     * @ORM\Column(name="role_name", type="string", length=10, nullable=false)
     */
    private $roleName;


}

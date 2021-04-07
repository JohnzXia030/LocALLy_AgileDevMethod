<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * User
 *
 * @ORM\Table(name="user")
 * @ORM\Entity
 */
class User
{
    /**
     * @var int
     *
     * @ORM\Column(name="u_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $uId;

    /**
     * @var string
     *
     * @ORM\Column(name="u_lastname", type="string", length=30, nullable=false)
     */
    private $uLastname;

    /**
     * @var string
     *
     * @ORM\Column(name="u_firstname", type="string", length=30, nullable=false)
     */
    private $uFirstname;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="u_birth", type="datetime", nullable=true)
     */
    private $uBirth;

    /**
     * @var string|null
     *
     * @ORM\Column(name="u_num_phone", type="string", length=10, nullable=true)
     */
    private $uNumPhone;

    /**
     * @var string
     *
     * @ORM\Column(name="u_email", type="string", length=30, nullable=false)
     */
    private $uEmail;

    /**
     * @var string
     *
     * @ORM\Column(name="u_password", type="string", length=50, nullable=false)
     */
    private $uPassword;

    /**
     * @var int|null
     *
     * @ORM\Column(name="u_num_street", type="integer", nullable=true)
     */
    private $uNumStreet;

    /**
     * @var string|null
     *
     * @ORM\Column(name="u_name_street", type="string", length=20, nullable=true)
     */
    private $uNameStreet;

    /**
     * @var string|null
     *
     * @ORM\Column(name="u_address_add", type="string", length=50, nullable=true)
     */
    private $uAddressAdd;

    /**
     * @var string|null
     *
     * @ORM\Column(name="u_city", type="string", length=10, nullable=true)
     */
    private $uCity;

    /**
     * @var string
     *
     * @ORM\Column(name="u_role", type="string", length=10, nullable=false)
     */
    private $uRole;


}

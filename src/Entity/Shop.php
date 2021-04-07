<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Shop
 *
 * @ORM\Table(name="shop")
 * @ORM\Entity
 */
class Shop
{
    /**
     * @var int
     *
     * @ORM\Column(name="sh_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $shId;

    /**
     * @var string
     *
     * @ORM\Column(name="sh_name", type="string", length=30, nullable=false)
     */
    private $shName;

    /**
     * @var string
     *
     * @ORM\Column(name="sh_num_street", type="string", length=10, nullable=false)
     */
    private $shNumStreet;

    /**
     * @var string
     *
     * @ORM\Column(name="sh_name_street", type="string", length=30, nullable=false)
     */
    private $shNameStreet;

    /**
     * @var string
     *
     * @ORM\Column(name="sh_address_add", type="string", length=30, nullable=false)
     */
    private $shAddressAdd;

    /**
     * @var int
     *
     * @ORM\Column(name="sh_city", type="integer", nullable=false)
     */
    private $shCity;

    /**
     * @var string
     *
     * @ORM\Column(name="sh_description", type="text", length=65535, nullable=false)
     */
    private $shDescription;

    /**
     * @var bool
     *
     * @ORM\Column(name="sh_state", type="boolean", nullable=false)
     */
    private $shState = '0';

    /**
     * @var int
     *
     * @ORM\Column(name="sh_id_trader", type="integer", nullable=false)
     */
    private $shIdTrader;

    /**
     * @var int
     *
     * @ORM\Column(name="sh_num_phone", type="integer", nullable=false)
     */
    private $shNumPhone;


}

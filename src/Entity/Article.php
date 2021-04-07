<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Article
 *
 * @ORM\Table(name="article")
 * @ORM\Entity
 */
class Article
{
    /**
     * @var int
     *
     * @ORM\Column(name="a_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $aId;

    /**
     * @var string
     *
     * @ORM\Column(name="a_name", type="string", length=30, nullable=false)
     */
    private $aName;

    /**
     * @var string
     *
     * @ORM\Column(name="a_description", type="text", length=65535, nullable=false)
     */
    private $aDescription;

    /**
     * @var float
     *
     * @ORM\Column(name="a_price", type="float", precision=10, scale=0, nullable=false)
     */
    private $aPrice;

    /**
     * @var int
     *
     * @ORM\Column(name="a_id_shop", type="integer", nullable=false)
     */
    private $aIdShop;

    /**
     * @var int
     *
     * @ORM\Column(name="a_discount", type="integer", nullable=false)
     */
    private $aDiscount;

    /**
     * @var int
     *
     * @ORM\Column(name="a_discount_period", type="integer", nullable=false)
     */
    private $aDiscountPeriod;

    /**
     * @var bool
     *
     * @ORM\Column(name="a_available", type="boolean", nullable=false)
     */
    private $aAvailable;

    /**
     * @var int
     *
     * @ORM\Column(name="a_quantity_stock", type="integer", nullable=false)
     */
    private $aQuantityStock;


}

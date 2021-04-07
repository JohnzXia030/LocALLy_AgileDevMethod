<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Basket
 *
 * @ORM\Table(name="basket")
 * @ORM\Entity
 */
class Basket
{
    /**
     * @var int
     *
     * @ORM\Column(name="b_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $bId;

    /**
     * @var int
     *
     * @ORM\Column(name="b_id_order", type="integer", nullable=false)
     */
    private $bIdOrder;

    /**
     * @var int
     *
     * @ORM\Column(name="b_id_article", type="integer", nullable=false)
     */
    private $bIdArticle;

    /**
     * @var int
     *
     * @ORM\Column(name="b_quantity_article", type="integer", nullable=false)
     */
    private $bQuantityArticle;

    /**
     * @var int
     *
     * @ORM\Column(name="b_sub_total", type="integer", nullable=false)
     */
    private $bSubTotal;


}

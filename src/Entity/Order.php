<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Order
 *
 * @ORM\Table(name="order")
 * @ORM\Entity
 */
class Order
{
    /**
     * @var int
     *
     * @ORM\Column(name="o_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $oId;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="o_date", type="datetime", nullable=false)
     */
    private $oDate;

    /**
     * @var int
     *
     * @ORM\Column(name="o_id_client", type="integer", nullable=false)
     */
    private $oIdClient;

    /**
     * @var int
     *
     * @ORM\Column(name="o_statecode", type="integer", nullable=false)
     */
    private $oStatecode;

    /**
     * @var int
     *
     * @ORM\Column(name="o_total", type="integer", nullable=false)
     */
    private $oTotal;


}

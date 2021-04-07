<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Follow
 *
 * @ORM\Table(name="follow")
 * @ORM\Entity
 */
class Follow
{
    /**
     * @var int
     *
     * @ORM\Column(name="fo_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $foId;

    /**
     * @var int
     *
     * @ORM\Column(name="fo_id_client", type="integer", nullable=false)
     */
    private $foIdClient;

    /**
     * @var int
     *
     * @ORM\Column(name="fo_id_shop", type="integer", nullable=false)
     */
    private $foIdShop;


}

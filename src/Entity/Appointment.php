<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Appointment
 *
 * @ORM\Table(name="appointment")
 * @ORM\Entity
 */
class Appointment
{
    /**
     * @var int
     *
     * @ORM\Column(name="ap_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $apId;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="ap_start_time", type="datetime", nullable=false)
     */
    private $apStartTime;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="ap_end_time", type="datetime", nullable=false)
     */
    private $apEndTime;

    /**
     * @var int
     *
     * @ORM\Column(name="ap_state_code", type="integer", nullable=false)
     */
    private $apStateCode;

    /**
     * @var int
     *
     * @ORM\Column(name="ap_id_shop", type="integer", nullable=false)
     */
    private $apIdShop;

    /**
     * @var int
     *
     * @ORM\Column(name="ap_id_client", type="integer", nullable=false)
     */
    private $apIdClient;


}

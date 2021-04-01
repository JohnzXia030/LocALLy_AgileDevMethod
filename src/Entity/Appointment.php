<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Appointment
 * @ORM\Entity(repositoryClass="App\Repository\AppointmentRepository")
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

    public function getApId(): ?int
    {
        return $this->apId;
    }

    public function getApStartTime(): ?\DateTimeInterface
    {
        return $this->apStartTime;
    }

    public function setApStartTime(\DateTimeInterface $apStartTime): self
    {
        $this->apStartTime = $apStartTime;

        return $this;
    }

    public function getApEndTime(): ?\DateTimeInterface
    {
        return $this->apEndTime;
    }

    public function setApEndTime(\DateTimeInterface $apEndTime): self
    {
        $this->apEndTime = $apEndTime;

        return $this;
    }

    public function getApStateCode(): ?int
    {
        return $this->apStateCode;
    }

    public function setApStateCode(int $apStateCode): self
    {
        $this->apStateCode = $apStateCode;

        return $this;
    }

    public function getApIdShop(): ?int
    {
        return $this->apIdShop;
    }

    public function setApIdShop(int $apIdShop): self
    {
        $this->apIdShop = $apIdShop;

        return $this;
    }

    public function getApIdClient(): ?int
    {
        return $this->apIdClient;
    }

    public function setApIdClient(int $apIdClient): self
    {
        $this->apIdClient = $apIdClient;

        return $this;
    }


}

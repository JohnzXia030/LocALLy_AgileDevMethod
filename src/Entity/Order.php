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

    public function getOId(): ?int
    {
        return $this->oId;
    }

    public function getODate(): ?\DateTimeInterface
    {
        return $this->oDate;
    }

    public function setODate(\DateTimeInterface $oDate): self
    {
        $this->oDate = $oDate;

        return $this;
    }

    public function getOIdClient(): ?int
    {
        return $this->oIdClient;
    }

    public function setOIdClient(int $oIdClient): self
    {
        $this->oIdClient = $oIdClient;

        return $this;
    }

    public function getOStatecode(): ?int
    {
        return $this->oStatecode;
    }

    public function setOStatecode(int $oStatecode): self
    {
        $this->oStatecode = $oStatecode;

        return $this;
    }

    public function getOTotal(): ?int
    {
        return $this->oTotal;
    }

    public function setOTotal(int $oTotal): self
    {
        $this->oTotal = $oTotal;

        return $this;
    }


}

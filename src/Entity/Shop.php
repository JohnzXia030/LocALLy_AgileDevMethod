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
     * @var int
     *
     * @ORM\Column(name="sh_num_street", type="integer", nullable=false)
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
    private $shState;

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

    public function getShId(): ?int
    {
        return $this->shId;
    }

    public function getShName(): ?string
    {
        return $this->shName;
    }

    public function setShName(string $shName): self
    {
        $this->shName = $shName;

        return $this;
    }

    public function getShNumStreet(): ?int
    {
        return $this->shNumStreet;
    }

    public function setShNumStreet(int $shNumStreet): self
    {
        $this->shNumStreet = $shNumStreet;

        return $this;
    }

    public function getShNameStreet(): ?string
    {
        return $this->shNameStreet;
    }

    public function setShNameStreet(string $shNameStreet): self
    {
        $this->shNameStreet = $shNameStreet;

        return $this;
    }

    public function getShAddressAdd(): ?string
    {
        return $this->shAddressAdd;
    }

    public function setShAddressAdd(string $shAddressAdd): self
    {
        $this->shAddressAdd = $shAddressAdd;

        return $this;
    }

    public function getShCity(): ?int
    {
        return $this->shCity;
    }

    public function setShCity(int $shCity): self
    {
        $this->shCity = $shCity;

        return $this;
    }

    public function getShDescription(): ?string
    {
        return $this->shDescription;
    }

    public function setShDescription(string $shDescription): self
    {
        $this->shDescription = $shDescription;

        return $this;
    }

    public function getShState(): ?bool
    {
        return $this->shState;
    }

    public function setShState(bool $shState): self
    {
        $this->shState = $shState;

        return $this;
    }

    public function getShIdTrader(): ?int
    {
        return $this->shIdTrader;
    }

    public function setShIdTrader(int $shIdTrader): self
    {
        $this->shIdTrader = $shIdTrader;

        return $this;
    }

    public function getShNumPhone(): ?int
    {
        return $this->shNumPhone;
    }

    public function setShNumPhone(int $shNumPhone): self
    {
        $this->shNumPhone = $shNumPhone;

        return $this;
    }


}

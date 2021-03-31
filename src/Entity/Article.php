<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Article
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
     * @var int
     *
     * @ORM\Column(name="a_price", type="integer", nullable=false)
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

    public function getAId(): ?int
    {
        return $this->aId;
    }

    public function getAName(): ?string
    {
        return $this->aName;
    }

    public function setAName(string $aName): self
    {
        $this->aName = $aName;

        return $this;
    }

    public function getADescription(): ?string
    {
        return $this->aDescription;
    }

    public function setADescription(string $aDescription): self
    {
        $this->aDescription = $aDescription;

        return $this;
    }

    public function getAPrice(): ?int
    {
        return $this->aPrice;
    }

    public function setAPrice(int $aPrice): self
    {
        $this->aPrice = $aPrice;

        return $this;
    }

    public function getAIdShop(): ?int
    {
        return $this->aIdShop;
    }

    public function setAIdShop(int $aIdShop): self
    {
        $this->aIdShop = $aIdShop;

        return $this;
    }

    public function getADiscount(): ?int
    {
        return $this->aDiscount;
    }

    public function setADiscount(int $aDiscount): self
    {
        $this->aDiscount = $aDiscount;

        return $this;
    }

    public function getADiscountPeriod(): ?int
    {
        return $this->aDiscountPeriod;
    }

    public function setADiscountPeriod(int $aDiscountPeriod): self
    {
        $this->aDiscountPeriod = $aDiscountPeriod;

        return $this;
    }

    public function getAAvailable(): ?bool
    {
        return $this->aAvailable;
    }

    public function setAAvailable(bool $aAvailable): self
    {
        $this->aAvailable = $aAvailable;

        return $this;
    }

    public function getAQuantityStock(): ?int
    {
        return $this->aQuantityStock;
    }

    public function setAQuantityStock(int $aQuantityStock): self
    {
        $this->aQuantityStock = $aQuantityStock;

        return $this;
    }


}

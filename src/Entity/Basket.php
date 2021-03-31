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

    public function getBId(): ?int
    {
        return $this->bId;
    }

    public function getBIdOrder(): ?int
    {
        return $this->bIdOrder;
    }

    public function setBIdOrder(int $bIdOrder): self
    {
        $this->bIdOrder = $bIdOrder;

        return $this;
    }

    public function getBIdArticle(): ?int
    {
        return $this->bIdArticle;
    }

    public function setBIdArticle(int $bIdArticle): self
    {
        $this->bIdArticle = $bIdArticle;

        return $this;
    }

    public function getBQuantityArticle(): ?int
    {
        return $this->bQuantityArticle;
    }

    public function setBQuantityArticle(int $bQuantityArticle): self
    {
        $this->bQuantityArticle = $bQuantityArticle;

        return $this;
    }

    public function getBSubTotal(): ?int
    {
        return $this->bSubTotal;
    }

    public function setBSubTotal(int $bSubTotal): self
    {
        $this->bSubTotal = $bSubTotal;

        return $this;
    }


}

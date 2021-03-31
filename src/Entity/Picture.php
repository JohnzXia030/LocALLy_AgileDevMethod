<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Picture
 *
 * @ORM\Table(name="picture")
 * @ORM\Entity
 */
class Picture
{
    /**
     * @var int
     *
     * @ORM\Column(name="p_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $pId;

    /**
     * @var int
     *
     * @ORM\Column(name="p_id_article", type="integer", nullable=false)
     */
    private $pIdArticle;

    /**
     * @var int
     *
     * @ORM\Column(name="p_id_shop", type="integer", nullable=false)
     */
    private $pIdShop;

    /**
     * @var int
     *
     * @ORM\Column(name="p_id_review", type="integer", nullable=false)
     */
    private $pIdReview;

    /**
     * @var string
     *
     * @ORM\Column(name="p_bin", type="blob", length=16777215, nullable=false)
     */
    private $pBin;

    /**
     * @var string
     *
     * @ORM\Column(name="p_type", type="string", length=10, nullable=false)
     */
    private $pType;

    public function getPId(): ?int
    {
        return $this->pId;
    }

    public function getPIdArticle(): ?int
    {
        return $this->pIdArticle;
    }

    public function setPIdArticle(int $pIdArticle): self
    {
        $this->pIdArticle = $pIdArticle;

        return $this;
    }

    public function getPIdShop(): ?int
    {
        return $this->pIdShop;
    }

    public function setPIdShop(int $pIdShop): self
    {
        $this->pIdShop = $pIdShop;

        return $this;
    }

    public function getPIdReview(): ?int
    {
        return $this->pIdReview;
    }

    public function setPIdReview(int $pIdReview): self
    {
        $this->pIdReview = $pIdReview;

        return $this;
    }

    public function getPBin()
    {
        return $this->pBin;
    }

    public function setPBin($pBin): self
    {
        $this->pBin = $pBin;

        return $this;
    }

    public function getPType(): ?string
    {
        return $this->pType;
    }

    public function setPType(string $pType): self
    {
        $this->pType = $pType;

        return $this;
    }


}

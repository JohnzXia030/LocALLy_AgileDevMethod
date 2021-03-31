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

    public function getFoId(): ?int
    {
        return $this->foId;
    }

    public function getFoIdClient(): ?int
    {
        return $this->foIdClient;
    }

    public function setFoIdClient(int $foIdClient): self
    {
        $this->foIdClient = $foIdClient;

        return $this;
    }

    public function getFoIdShop(): ?int
    {
        return $this->foIdShop;
    }

    public function setFoIdShop(int $foIdShop): self
    {
        $this->foIdShop = $foIdShop;

        return $this;
    }


}

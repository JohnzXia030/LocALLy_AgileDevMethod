<?php

namespace App\Entity;

use App\Repository\TestRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TestRepository::class)
 */
class Test
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=10, nullable=true)
     */
    private $test1;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTest1(): ?string
    {
        return $this->test1;
    }

    public function setTest1(?string $test1): self
    {
        $this->test1 = $test1;

        return $this;
    }
}

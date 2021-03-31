<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * City
 *
 * @ORM\Table(name="city")
 * @ORM\Entity
 */
class City
{
    /**
     * @var int
     *
     * @ORM\Column(name="c_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $cId;

    /**
     * @var int
     *
     * @ORM\Column(name="c_zip_code", type="integer", nullable=false)
     */
    private $cZipCode;

    /**
     * @var string
     *
     * @ORM\Column(name="c_name", type="string", length=20, nullable=false)
     */
    private $cName;

    /**
     * @var int
     *
     * @ORM\Column(name="c_dept_code", type="integer", nullable=false)
     */
    private $cDeptCode;

    public function getCId(): ?int
    {
        return $this->cId;
    }

    public function getCZipCode(): ?int
    {
        return $this->cZipCode;
    }

    public function setCZipCode(int $cZipCode): self
    {
        $this->cZipCode = $cZipCode;

        return $this;
    }

    public function getCName(): ?string
    {
        return $this->cName;
    }

    public function setCName(string $cName): self
    {
        $this->cName = $cName;

        return $this;
    }

    public function getCDeptCode(): ?int
    {
        return $this->cDeptCode;
    }

    public function setCDeptCode(int $cDeptCode): self
    {
        $this->cDeptCode = $cDeptCode;

        return $this;
    }


}

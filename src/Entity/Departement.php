<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Departement
 *
 * @ORM\Table(name="departement")
 * @ORM\Entity
 */
class Departement
{
    /**
     * @var int
     *
     * @ORM\Column(name="dept_code", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $deptCode;

    /**
     * @var string
     *
     * @ORM\Column(name="dept_name", type="string", length=20, nullable=false)
     */
    private $deptName;

    /**
     * @var string
     *
     * @ORM\Column(name="dept_country", type="string", length=20, nullable=false)
     */
    private $deptCountry;


}

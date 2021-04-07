<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * State
 *
 * @ORM\Table(name="state")
 * @ORM\Entity
 */
class State
{
    /**
     * @var int
     *
     * @ORM\Column(name="s_code", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $sCode;

    /**
     * @var string
     *
     * @ORM\Column(name="s_name", type="string", length=10, nullable=false)
     */
    private $sName;


}

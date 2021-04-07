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
     * @var int|null
     *
     * @ORM\Column(name="p_id_article", type="integer", nullable=true)
     */
    private $pIdArticle;

    /**
     * @var int
     *
     * @ORM\Column(name="p_id_shop", type="integer", nullable=false)
     */
    private $pIdShop;

    /**
     * @var int|null
     *
     * @ORM\Column(name="p_id_review", type="integer", nullable=true)
     */
    private $pIdReview;

    /**
     * @var string
     *
     * @ORM\Column(name="p_base64", type="text", length=16777215, nullable=false)
     */
    private $pBase64;

    /**
     * @var string|null
     *
     * @ORM\Column(name="p_type", type="string", length=10, nullable=true)
     */
    private $pType;


}

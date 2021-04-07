<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Review
 *
 * @ORM\Table(name="review")
 * @ORM\Entity
 */
class Review
{
    /**
     * @var int
     *
     * @ORM\Column(name="re_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $reId;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="re_date", type="datetime", nullable=false)
     */
    private $reDate;

    /**
     * @var string
     *
     * @ORM\Column(name="re_comment", type="string", length=50, nullable=false)
     */
    private $reComment;

    /**
     * @var int
     *
     * @ORM\Column(name="re_note", type="integer", nullable=false)
     */
    private $reNote;

    /**
     * @var int
     *
     * @ORM\Column(name="re_id_article", type="integer", nullable=false)
     */
    private $reIdArticle;

    /**
     * @var int
     *
     * @ORM\Column(name="re_id_client", type="integer", nullable=false)
     */
    private $reIdClient;


}

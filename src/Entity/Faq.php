<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Faq
 *
 * @ORM\Table(name="faq")
 * @ORM\Entity
 */
class Faq
{
    /**
     * @var int
     *
     * @ORM\Column(name="faq_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $faqId;

    /**
     * @var string
     *
     * @ORM\Column(name="faq_question", type="text", length=65535, nullable=false)
     */
    private $faqQuestion;

    /**
     * @var string
     *
     * @ORM\Column(name="faq_reply", type="text", length=65535, nullable=false)
     */
    private $faqReply;

    /**
     * @var int
     *
     * @ORM\Column(name="faq_id_shop", type="integer", nullable=false)
     */
    private $faqIdShop;


}

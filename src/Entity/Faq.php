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

    public function getFaqId(): ?int
    {
        return $this->faqId;
    }

    public function getFaqQuestion(): ?string
    {
        return $this->faqQuestion;
    }

    public function setFaqQuestion(string $faqQuestion): self
    {
        $this->faqQuestion = $faqQuestion;

        return $this;
    }

    public function getFaqReply(): ?string
    {
        return $this->faqReply;
    }

    public function setFaqReply(string $faqReply): self
    {
        $this->faqReply = $faqReply;

        return $this;
    }

    public function getFaqIdShop(): ?int
    {
        return $this->faqIdShop;
    }

    public function setFaqIdShop(int $faqIdShop): self
    {
        $this->faqIdShop = $faqIdShop;

        return $this;
    }


}

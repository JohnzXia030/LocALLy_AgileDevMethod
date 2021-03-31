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

    public function getReId(): ?int
    {
        return $this->reId;
    }

    public function getReDate(): ?\DateTimeInterface
    {
        return $this->reDate;
    }

    public function setReDate(\DateTimeInterface $reDate): self
    {
        $this->reDate = $reDate;

        return $this;
    }

    public function getReComment(): ?string
    {
        return $this->reComment;
    }

    public function setReComment(string $reComment): self
    {
        $this->reComment = $reComment;

        return $this;
    }

    public function getReNote(): ?int
    {
        return $this->reNote;
    }

    public function setReNote(int $reNote): self
    {
        $this->reNote = $reNote;

        return $this;
    }

    public function getReIdArticle(): ?int
    {
        return $this->reIdArticle;
    }

    public function setReIdArticle(int $reIdArticle): self
    {
        $this->reIdArticle = $reIdArticle;

        return $this;
    }

    public function getReIdClient(): ?int
    {
        return $this->reIdClient;
    }

    public function setReIdClient(int $reIdClient): self
    {
        $this->reIdClient = $reIdClient;

        return $this;
    }


}

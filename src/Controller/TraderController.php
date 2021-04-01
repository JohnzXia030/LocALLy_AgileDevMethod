<?php


namespace App\Controller;

use App\Entity\Article;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class TraderController extends AbstractController
{
    /**
     * @Route("/trader/add-article")
     */
    public function addArticle(): Response
    {
        return $this->render('trader/add-article.html.twig');
    }

    /**
     * @Route("/trader/create")
     */
    public function create(): Response
    {
        return $this->render('trader/trader.html.twig');
    }
}
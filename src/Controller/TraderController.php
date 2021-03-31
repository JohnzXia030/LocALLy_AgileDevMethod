<?php


namespace App\Controller;

use App\Entity\Article;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Form\CatalogFormType;

class TraderController extends AbstractController
{
    /**
     * @Route("/trader/add-article")
     */
    public function addArticle(): Response
    {
        $article = new Article();
        $articleForm = $this->createForm(CatalogFormType::class, $article);
        return $this->render('trader/add-article.html.twig', [
            'articleForm' => $articleForm->createView()
        ]);
    }


}
<?php


namespace App\Controller;

use App\Entity\Article;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\CreateShopForm;
use App\Entity\ShopClass;
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

    /**
     * @Route("/trader/create")
     */
    public function create(): Response
    {
        $oShop = new ShopClass();
        // Si des attributs de classe ont des valeurs, elles apparaissent automatiquement dans le formulaire

        $oForm = $this->createForm(CreateShopForm::class, $oShop);

        return $this->render('trader/trader.html.twig', array(
            'form' => $oForm->createView()
        ));
    }
}
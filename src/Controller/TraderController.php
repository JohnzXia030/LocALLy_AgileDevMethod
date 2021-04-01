<?php


namespace App\Controller;

use App\Entity\Article;
use App\Repository\ArticleRepository;
use Doctrine\DBAL\Driver\Connection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\CreateShopForm;
use App\Entity\ShopClass;
use App\Form\CatalogFormType;

class TraderController extends AbstractController
{
    public static $request;

    public function __construct()
    {
        $request = new Request();
        $this::$request = $request;
    }

    /**
     * @Route("/trader/add-article")
     * @param Connection $connection
     * @return Response
     */
    public function addArticle(Connection $connection): Response
    {
        /*dump($connection->fetchAll('SELECT * FROM user'));
        $article = new Article();
        $articleForm = $this->createForm(CatalogFormType::class, $article);
        return $this->render('trader/add-article.html.twig', array(
            'articleForm' => $articleForm->createView(),
            'test' => $connection->fetchAll('SELECT * FROM user')

        ));*/
        return $this->render('trader/add-article.html.twig', array());
    }

    /**
     * @Route("/trader/api/create-article")
     * @param ArticleRepository $articleRepository
     * @return Response
     */
    public function apiAddArticle(ArticleRepository $articleRepository): Response
    {
        $mNewArticle = json_decode($this::$request->getContent());
        $result = $articleRepository->addArticle($mNewArticle);
        return new JsonResponse(['result' => $result]);
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
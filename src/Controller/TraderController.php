<?php


namespace App\Controller;

use App\Entity\Article;
use App\Repository\ArticleRepository;
use App\Repository\ShopRepository;
use Doctrine\DBAL\Driver\Connection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


/**
 * @Route("/trader")
 */
class TraderController extends AbstractController
{
    //TODO instancier ArticleRepository pour éviter la duplication de code
    public static $request;

    public function __construct()
    {
        $request = new Request();
        $this::$request = $request;
    }

    /**
     * @Route("/add-article")
     * @param Connection $connection
     * @return Response
     */
    public function addArticle(Connection $connection): Response
    {
        return $this->render('trader/add-article.html.twig', array());
    }

    /**
     * @Route("/api/create-article")
     * @param ArticleRepository $articleRepository
     * @return Response
     */
    public function apiAddArticle(ArticleRepository $articleRepository): Response
    {
        $mNewArticle = json_decode($this::$request->getContent(), true);
        $result = $articleRepository->addArticle($mNewArticle);
        return new JsonResponse(['result' => $result]);
    }

    /**
     * @Route("/create-shop")
     */
    public function create(): Response
    {
        return $this->render('trader/add-shop.html.twig');
    }

    /**
     * @Route("/api/create-shop")
     * @param ShopRepository $shopRepository
     * @return Response
     */
    public function apiAddShop(ShopRepository $shopRepository): Response
    {
        $mNewShop = json_decode($this::$request->getContent());
        $result = $shopRepository->addShop($mNewShop);
        return new JsonResponse(['result' => $result]);
    }
}
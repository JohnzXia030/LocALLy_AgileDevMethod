<?php


namespace App\Controller;

use App\Repository\ArticleRepository;
use App\Repository\ShopRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\ToolService;
/**
 * @Route("/client")
 */
class ClientController extends AbstractController
{
    public static $request;
    public static $tool;
    public function __construct()
    {
        $this::$request = new Request();
        $this::$tool = new ToolService();
    }

    /**
     * @Route("/search")
     */
    public function searchFunction(): Response
    {
        return $this->render('client/search.html.twig');
    }
    
    /**
     * @Route("/search-shop")
     */
    public function searchShopFunction(): Response
    {
        return $this->render('client/searchShop.html.twig');
    }

    /**
     * @Route("/api/get-filtered-articles")
     * @param ArticleRepository $articleRepository
     * @return JsonResponse
     */
    public function getFilteredArticle(ArticleRepository $articleRepository): JsonResponse
    {

        $mFilters = json_decode($this::$request->getContent(), true);
        $result = $articleRepository->getFilteredArticles($mFilters);
        $result = array_values($this::$tool->unique_multi_array($result,'a_id'));
        return new JsonResponse(['data' => $result]);
    }

    /**
     * @Route("/api/get-filtered-shop")
     * @param ShopRepository $shopRepository
     * @return JsonResponse
     */
    public function getFilteredShop(ShopRepository $shopRepository): JsonResponse
    {

        $mFilters = json_decode($this::$request->getContent(), true);
        $result = $shopRepository->getFilteredShop($mFilters);
        $result = array_values($this::$tool->unique_multi_array($result,'sh_id'));
        return new JsonResponse(['data' => $result]);
    }
}
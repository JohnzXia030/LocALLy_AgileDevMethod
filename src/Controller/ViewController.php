<?php

namespace App\Controller;
use App\Repository\ArticleRepository;
use App\Repository\ShopRepository;
use Doctrine\DBAL\Driver\Connection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
/**
* @Route("/view")
*/
class ViewController extends AbstractController{

    public static $request;

    public function __construct()
    {
        $request = new Request();
        $this::$request = $request;
    }

    /**
     * @Route("/view-article")
     */
    // Permet de rediriger vers la page view-product ou view-service en fonction du type d'article
    public function viewArticle(): Response
    {
        return $this->render('view/viewArticle.html.twig');
    }

    /**
     * @Route("/view-product")
     */
    public function viewProduct(): Response
    {
        return $this->render('view/viewProduct.html.twig');
    }

    /**
    * @Route("/view-service")
    */
    public function viewService(): Response
    {
        return $this->render('view/viewService.html.twig');
    }

    /**
    * @Route("/view-shop")
    */
    public function viewShop(): Response
    {
        return $this->render('view/viewShop.html.twig');
    }

    /**
     * @Route("/api/get-info-article/{id}")
     * @param $id
     * @param ArticleRepository $articleRepository
     * @param ShopRepository $shopRepository
     * @return Response
     * 
     */
    public function getInfoArticle($id, ArticleRepository $articleRepository, ShopRepository $shopRepository): Response
    {   
        $result = $articleRepository->getArticle($id);
        $idShop= $result[0]['article']['a_id_shop'];
        $shop = $shopRepository->getshop($idShop);
        
        return new JsonResponse(['data' => $result,"shop" => $shop]);
    }

    /**
     * @Route("/api/get-info-shop/{id}")
     * @param ShopRepository $shopRepository
     * @param $id
     * @param ShopRepository $shopRepository
     * @return Response
     * 
     */
    public function getInfoShop($id, ShopRepository $shopRepository): Response
    {   
        $shop = $shopRepository->getShop($id);
        
        return new JsonResponse(['shop' => $shop]);
    }

}
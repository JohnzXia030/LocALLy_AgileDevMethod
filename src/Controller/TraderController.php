<?php


namespace App\Controller;

use App\Repository\ArticleRepository;
use App\Repository\ShopRepository;
use App\Service\ToolService;
use Doctrine\DBAL\Driver\Connection;
use Doctrine\DBAL\Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route; //Ne pas supprimer, malgré ce qu'il conseille. Il est bien utilisé.


/**
 * @Route("/trader")
 */
class TraderController extends AbstractController
{
    //TODO instancier ArticleRepository pour éviter la duplication de code
    public static $request;
    /**
     * @var ToolService
     */
    private static $tool;

    public function __construct()
    {
        $request = new Request();
        $this::$request = $request;
        $this::$tool = new ToolService();
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
     * @Route("/traderAccountNav")
     */
    public function traderAccountNav(): Response
    {
        return $this->render('trader/traderAccountNav.html.twig'); 
    }

     /**
     * @Route("/traderAccountShop")
     */
    public function traderAccountShop(): Response
    {
        return $this->render('trader/traderAccountShop.html.twig');
    }

    /**
     * @Route("/updateDeleteArticle")
     */
    public function traderUpdateDeleteArticle(): Response
    {
        return $this->render('trader/viewArticle-update-delete.html.twig');
    }

    /**
     * @Route("/viewArticles")
     */
    public function viewArticle(): Response
    {
        return $this->render('trader/viewArticles.html.twig');
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
     * @param Request $request
     * @param ShopRepository $shopRepository
     * @return Response
     * @throws Exception
     */
    public function apiAddShop(Request $request,ShopRepository $shopRepository): Response
    {
        $mNewShop = json_decode($request->getContent());
        // Si le commercant possede deja un magasin
        $session = $request ->getSession();
        $mIdUser = $session->get("idUser");
        /**
         * Magasin existe: Info de son magasin
         * Magasin n'existe pas encore: false
         */
        $ifHasShop = $shopRepository->ifHasShop($mIdUser);
        if ($ifHasShop!= false){
            return new Response('Votre compte possède déja un magasin', Response::HTTP_BAD_REQUEST);
        }else {
            $shopRepository->addShop($mNewShop, $mIdUser);
            return new Response('Magasin créé', Response::HTTP_OK);
        }
    }

    /**
     * @Route("/update-shop")
     */
    public function updateShop(): Response
    {
        return $this->render('trader/update-shop.html.twig');
    }

    /**
     * @Route("/update-article")
     * @return Response
     */
    public function updateArticle(): Response
    {
        return $this->render('trader/update-article.html.twig');
    }

    /**
     * @Route("/api/delete-photo/{id}")
     * @param $id
     * @param ArticleRepository $articleRepository
     * @return Response
     * @throws Exception
     */
    public function deletePhoto($id, ArticleRepository $articleRepository): Response
    {
        $articleRepository->deletePhoto($id);
        return new JsonResponse(['data' => "test"]);
    }

    /**
     * @Route("/api/update-article/{id}")
     * @param $id
     * @param ArticleRepository $articleRepository
     * @return Response
     * @throws Exception
     */
    public function apiUpdateArticle($id, ArticleRepository $articleRepository): Response
    {
        $mNewArticle = json_decode($this::$request->getContent(), true);
        $articleRepository->updateArticle($mNewArticle, $id);
        return new Response('Success', Response::HTTP_OK);
    }

    /**
     * Rechercher l'article par son id
     * @Route("/api/get-article/{id}")
     * @param $id : id d'un article
     * @param ArticleRepository $articleRepository
     * @return JsonResponse
     */
    public function apiGetArticle($id, ArticleRepository $articleRepository): JsonResponse
    {
        return new JsonResponse(['data' => $articleRepository->getArticle($id)]);
    }

    /**
     * Rechercher tous les articles d'un magasin
     * @Route("/api/get-article-from-shop")
     * @param Request $request
     * @param ArticleRepository $articleRepository
     * @return JsonResponse
     * @throws Exception
     */
    public function apiGetArticleFromShop(Request $request,ArticleRepository $articleRepository): JsonResponse
    {
        $session = $request->getSession();
        $mIdUser= $session->get('idUser');
        $mArticlesConcerned = self::$tool->unique_multi_array($articleRepository->getArticleFromShop($mIdUser),'a_id');
        return new JsonResponse(['data' => $articleRepository->getArticleFromShop($mIdUser)]);
    }

    /**
     * @Route("/api/get-shop/{id}")
     * @param $id
     * @param ShopRepository $shopRepository
     * @return JsonResponse
     */
    public function apiGetShop($id, ShopRepository $shopRepository): JsonResponse
    {
        return new JsonResponse(['data' => $shopRepository->getShop($id)]);
    }

    /**
     * @Route("/api/get-cities")
     * @param ShopRepository $shopRepository
     * @return JsonResponse
     */
    public function apiGetCities(ShopRepository $shopRepository): JsonResponse
    {
        return new JsonResponse(['data' => $shopRepository->getCities()]);
    }

    /**
     * @Route("/api/delete-article/{idArticle}")
     * @param $idArticle
     * @param ArticleRepository $articleRepository
     * @return Response
     */
    public function apiDeleteArticle($idArticle, ArticleRepository $articleRepository): Response{
        $articleRepository->deleteArticle($idArticle);
        return new Response('Success', Response::HTTP_OK);
    }
}
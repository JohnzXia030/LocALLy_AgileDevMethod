<?php


namespace App\Controller;

use App\Entity\User;
use App\Repository\ShopRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\ToolService;
use Doctrine\DBAL\Driver\Connection;
use Doctrine\DBAL\Exception;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;


/**
 * @Route("/admin")
 */
class AdminController extends AbstractController
{
    /**
     * @Route("/administrator")
     */

    public function adminPage(): Response
    {
        return $this->render('admin/administrator.html.twig');
    }

    /**
     * @Route("/traderManagement")
     */

    public function traderManagement(): Response
    {
        return $this->render('admin/traderManagement.html.twig');
    }

    /**
     * @Route("/clientManagement")
     */

    public function clientManagement(): Response
    {
        return $this->render('admin/clientManagement.html.twig');
    }

    /**
     * @Route("/shopManagement")
     */

    public function shopManagement(): Response
    {
        return $this->render('admin/shopManagement.html.twig');
    }

    /**
     * Rechercher tous les magasins
     * @Route("/api/get-shop-by-admin")
     * @param ShopRepository $shopRepository
     * @return JsonResponse
     * @throws Exception
     */
    public function apiGetShopByAdmin(ShopRepository $shopRepository): JsonResponse
    {
        return new JsonResponse(['data' => $shopRepository->getAllShop()]);

    }


    /**
     * @Route("/api/get-all-traders")
     * @param UserRepository $userRepository
     * @return JsonResponse
     */
    public function getTraders(UserRepository $userRepository): JsonResponse
    {
        return new JsonResponse(['data' => $userRepository->getAllTrader()]);
    }

    /**
     * @Route("/api/get-all-clients")
     * @param UserRepository $userRepository
     * @return JsonResponse
     */
    public function getClients(UserRepository $userRepository): JsonResponse
    {
        return new JsonResponse(['data' => $userRepository->getAllClient()]);
    }

    /**
     * @Route("/api/delete-shop/{idShop}")
     * @param $idShop
     * @param ShopRepository $shopRepository
     * @return Response
     */
    public function apiDeleteShop($idShop, ShopRepository $shopRepository): Response
    {
        $shopRepository->deleteShop($idShop);
        return new Response('Success', Response::HTTP_OK);
    }

    /**
     * @Route("/api/suspend-shop/{idShop}")
     * @param $idShop
     * @param ShopRepository $shopRepository
     * @return Response
     */
    public function suspendShop($idShop, ShopRepository $shopRepository): Response
    {
        $shopRepository->suspendShop($idShop);
        return new Response('Success', Response::HTTP_OK);
    }

    /**
     * @Route("/api/activate-shop/{idShop}")
     * @param $idShop
     * @param ShopRepository $shopRepository
     * @return Response
     */
    public function activateShop($idShop, ShopRepository $shopRepository): Response
    {
        $shopRepository->activateShop($idShop);
        return new Response('Success', Response::HTTP_OK);
    }

    /**
     * @Route("/api/delete-user/{idUser}")
     * @param $idUser
     * @param UserRepository $userRepository
     * @return JsonResponse
     */
    public function deleteUser($idUser, UserRepository $userRepository): JsonResponse
    {
        return new JsonResponse(['data' => $userRepository->deleteUser($idUser)]);
    }
}
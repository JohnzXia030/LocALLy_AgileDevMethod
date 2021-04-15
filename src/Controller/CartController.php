<?php

namespace App\Controller;

use App\Service\CartService;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use Symfony\Component\HttpFoundation\Session\SessionInterface;

/**
* @Route("/cart")
*/
class CartController extends AbstractController{

    /**
     * @Route("/view-cart")
     */
    public function viewCart(SessionInterface $session)
    {
        //dd($session->get('cart'));
        return $this->render('view/viewCart.html.twig');
    }

    /**
     * @Route("/api/add/{id}/{quantity}")
     */
    public function add($id, $quantity, CartService $cartService, SessionInterface $session) : Response
    {
        $cartService->add($id, $quantity);

        //dd($session->get('cart'));
        return new JsonResponse(['return' => true]);
    }

    /**
     * @Route("/api/remove/{id}/{quantity}")
     */
    public function remove($id, $quantity, CartService $cartService, SessionInterface $session) : Response
    {
        $cartService->remove($id, $quantity);
        //dd($session->get('cart'));
        return new JsonResponse(['return' => true]);
    }

    /**
     * @Route("/api/get-cart")
     */
    public function getCart(CartService $cartService, SessionInterface $session)
    {
        dd(array(
            "articles" => $cartService->getFullCart(),
            "total" => $cartService->getTotal()
        ));
        return array(
            "articles" => $cartService->getFullCart(),
            "total" => $cartService->getTotal()
        );
    }
}
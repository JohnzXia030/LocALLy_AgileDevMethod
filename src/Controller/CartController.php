<?php

namespace App\Controller;

use App\Service\CartService;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
* @Route("/cart")
*/
class CartController extends AbstractController{

    /**
     * @Route("/view-cart")
     */
    public function viewCart()
    {
        
        return $this->render('view/viewCart.html.twig');
    }

    /**
     * @Route("/cart-payment")
     */
    public function cartPayment()
    {
        
        return $this->render('view/viewCartpayment.html.twig');
    }

    /**
     * @Route("/api/add/{id}/{quantity}")
     */
    public function add($id, $quantity, CartService $cartService) : Response
    {
        $cartService->add($id, $quantity);

        return new JsonResponse(['return' => true]);
    }

    /**
     * @Route("/api/remove/{id}/{quantity}")
     */
    public function remove($id, $quantity, CartService $cartService) : Response
    {
        $cartService->remove($id, $quantity);
        
        return new JsonResponse(['return' => true]);
    }

    /**
     * @Route("/api/clear")
     */
    public function clear(CartService $cartService) : Response
    {
        $cartService->clear();
        
        return new JsonResponse(['return' => true]);
    }

    /**
     * @Route("/api/get-cart")
     */
    public function getCart(CartService $cartService)
    {
        
        return new JsonResponse([
            'articles' => $cartService->getFullCart(),
            'total' => $cartService->getTotal()
        ]);
    }
}
<?php

namespace App\Controller;

use App\Repository\BasketRepository;
use App\Repository\OrderRepository;
use App\Service\CartService;
use Symfony\Component\HttpFoundation\Request;
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

    /**
     * @Route("/api/create-order")
     */
    public function createOrder(CartService $cartService, Request $request, OrderRepository $orderRepository,BasketRepository $basketRepository)
    {
        $cart = $cartService->getFullCart();
        $session = $request->getSession();
        $sIdUserSession = $session->get('idUser');
        $orders = array();
        $totals = array();

        foreach ($cart as $product){
            $idShop = $product['product'][0]['article']['a_id_shop'];
            if (!array_key_exists($idShop,$orders)){
                $orders[$idShop] = array();
                $totals[$idShop] = 0;
            }
            array_push($orders[$idShop], $product);
            $discount = (1-($product['product'][0]['article']['a_discount']/100));
            $totals[$idShop] += $product['product'][0]['article']['a_price'] * $product['quantity'] * $discount;
        }
        foreach ($orders as $idShop=>$products) {


            $idOrder = $orderRepository->addOrder($idShop, $totals[$idShop], $sIdUserSession);
            foreach($products as $product) {
                $discount = (1-($product['product'][0]['article']['a_discount']/100));
                $totalProduct = $product['product'][0]['article']['a_price'] * $product['quantity'] * $discount;
                $idArticle = $product['product'][0]['article']['a_id'];
                $basketRepository->addBasket($idArticle, $idOrder, $product['quantity'], $totalProduct);
            }
        }
        return new JsonResponse(['return' => true]);
    }
}
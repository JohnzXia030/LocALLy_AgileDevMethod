<?php

namespace App\Service;

use App\Repository\ArticleRepository;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class CartService {

    protected $session;
    protected $articleRepository;

    public function __construct(SessionInterface $session, ArticleRepository $articleRepository) {
        $this->session = $session;
        $this->articleRepository = $articleRepository;
    }

    public function add($id, $quantity) {
        $cart = $this->session->get('cart', []);
        if (!empty($cart[$id])) {
            $cart[$id] += $quantity;
        }
        else {
            $cart[$id] = $quantity;
        }
        $this->session->set('cart', $cart);
    }

    public function remove($id, $quantity) {
        $cart = $this->session->get('cart', []);
        if (!empty($cart[$id])) {
            if ($cart[$id] <= $quantity) {
                unset($cart[$id]);
            }
            else {
                $cart[$id] -= $quantity;
            }
        }
        $this->session->set('cart', $cart);
    }

    public function getFullCart() {
        $cart = $this->session->get('cart', []);
        $fullCart = [];

        foreach($cart as $id => $quantity) {
            $fullCart[] = [
                'product' => $this->articleRepository->getArticle($id),
                'quantity' => $quantity
            ];
        }

        return $fullCart;
    }

    public function getTotal() {
        $total = 0;
        $fullCart = $this->getFullCart();

        foreach($fullCart as $product) {
            $totalProduct = $product['product'][0]['article']['a_price'] * $product['quantity'];
            $total += $totalProduct;
        }

        return $total;
    }
}
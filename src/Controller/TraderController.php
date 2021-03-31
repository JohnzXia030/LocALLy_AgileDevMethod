<?php


namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TraderController extends AbstractController
{
    /**
     * @Route("/trader/test")
     */
    public function test(): Response
    {
        $number = 'Petit domi';
        return $this->render('trader/trader.html.twig', [
            'number' => $number,
        ]);
    }
}
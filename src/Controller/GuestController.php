<?php


namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class GuestController extends AbstractController
{
    /**
     * @Route("/guest/signIn")
     */
    public function signIn(): Response
    {
        return $this->render('guest/signIn.html.twig');
    }
    /**
     * @Route("/guest/login")
     */
    public function login(): Response
    {
        return $this->render('guest/login.html.twig');
    }
    /**
     * @Route("/guest/passwordForget")
     */
    public function passwordForget(): Response
    {
        return $this->render('guest/passwordForget.html.twig');
    }
}
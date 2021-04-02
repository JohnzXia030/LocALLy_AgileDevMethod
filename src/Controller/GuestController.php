<?php


namespace App\Controller;

use App\Forms\Type\LoginClass;
use App\Forms\Type\loginForm;
use App\Forms\Type\PasswordClass;
use App\Forms\Type\passwordForm;
use App\Forms\Type\SigninClass;
use App\Forms\Type\signinForm;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class GuestController extends AbstractController
{
    /**
     * @Route("/guest/signUp")
     */
    public function signUp(): Response
    {
        return $this->render('guest/signUp.html.twig');
        
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
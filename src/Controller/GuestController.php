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
     * @Route("/guest/signIn")
     */
    public function signIn(): Response
    {
        $oSignin = new SigninClass();
        $oform = $this->createForm(signinForm::class, $oSignin);
        return $this->render('guest/signIn.html.twig', array(
            'form'=> $oform->createView()

        ));
    }
    /**
     * @Route("/guest/login")
     */
    public function login(): Response
    {
        $oLogin = new LoginClass();
        $oform = $this->createForm(loginForm::class, $oLogin);
        return $this->render('guest/login.html.twig', array(
            'form' => $oform->createView()
        ));
    }
    /**
     * @Route("/guest/passwordForget")
     */
    public function passwordForget(): Response
    {
        $oPassword = new PasswordClass();
        $oform = $this->createForm(passwordForm::class, $oPassword);
        return $this->render('guest/passwordForget.html.twig', array(
            'form' => $oform->createView()
        ));
    }
}
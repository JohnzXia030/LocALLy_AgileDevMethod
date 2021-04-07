<?php


namespace App\Controller;


use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\DBAL\Driver\Connection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/guest")
 */
class GuestController extends AbstractController
{
    public static $request;

    public function __construct()
    {
        $request = new Request();
        $this::$request = $request;
    }
    
    /**
     * @Route("/signUp")
     */
    public function signUp(): Response
    {
        return $this->render('guest/signUp.html.twig');
    }
    /**
     * @Route("/login")
     */
    public function login(): Response
    {
        
        return $this->render('guest/login.html.twig');
    }
    /**
     * @Route("/passwordForget")
     */
    public function passwordForget(): Response
    {
        return $this->render('guest/passwordForget.html.twig');
        
    }
    /**
     * @Route("/api/add-user")
     * @param UserRepository $userRepository
     * @return Response
     */
    public function addUser(UserRepository $userRepository): Response
    {
        $mNewUser = json_decode($this::$request->getContent(),true);

        $result = $userRepository->addUser($mNewUser);
        return new JsonResponse(['result' => $result]);
    }
}
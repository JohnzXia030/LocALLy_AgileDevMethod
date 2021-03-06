<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Order;
use App\Repository\UserRepository;
use App\Repository\OrderRepository;
use Doctrine\DBAL\Driver\Connection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

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
     * @Route("/resetPassword")
     */
    public function resetPassword(): Response
    {
        return $this->render('guest/resetPassword.html.twig');
        
    }

    /**
     * @Route("/accountNav")
     */
    public function accountNav(): Response
    {
        return $this->render('guest/accountNav.html.twig');
        
    }

    /**
     * @Route("/account")
     */
    public function account(): Response
    {
        return $this->render('guest/account.html.twig');
    }

    /**
     * @Route("/current-orders")
     */
    public function currentOrders(): Response
    {
        return $this->render('guest/current-orders.html.twig');
    }

    /**
     * @Route("/past-orders")
     */
    public function pastOrders(): Response
    {
        return $this->render('guest/past-orders.html.twig');
    }

    /**
     * @Route("/api/get-current-orders")
     * @param OrderRepository $orderRepository
     * @param Request $request
     * @return Response
     */
    public function getCurrentOrders(Request $request, OrderRepository $orderRepository): Response
    {
        $session = $request->getSession();
        $sIdUserSession = $session->get('idUser');

        $currentOrders = $orderRepository->getCurrentOrdersByIdClient($sIdUserSession);
        
        return new JsonResponse(['orders' => $currentOrders]);
    }

    /**
     * @Route("/api/get-past-orders")
     * @param OrderRepository $orderRepository
     * @param Request $request
     * @return Response
     */
    public function getPastOrders(Request $request, OrderRepository $orderRepository): Response
    {
        $session = $request->getSession();
        $sIdUserSession = $session->get('idUser');

        $pastOrders = $orderRepository->getPastOrdersByIdClient($sIdUserSession);
        
        return new JsonResponse(['orders' => $pastOrders]);
    }

    /**
     * @Route("/api/cancel-order/{id}")
     * @param OrderRepository $orderRepository
     * @param Request $request
     * @return Response
     */
    public function cancelOrder($id, OrderRepository $orderRepository): Response
    {
        $orderRepository->cancelOrder($id);
        
        return new Response(true);
    }

    /**
     * @Route("/api/logout")
     * @param Request $request
     * @return Response
     */
    public function logOut(Request $request): Response
    {
        $session = $request->getSession();
        $session->clear();

        return new Response(true);
    }

    /**
     * @Route("/api/add-user")
     * @param UserRepository $userRepository
     * @return Response
     */
    public function addUser(UserRepository $userRepository): Response
    {
        $mNewUser = json_decode($this::$request->getContent(),true);
        $aUser = $userRepository->checkUserExists($mNewUser);
        
        if (sizeof($aUser) > 0) {
            $result = false;
        }
        else {
            $result = $userRepository->addUser($mNewUser);
        }

        return new JsonResponse(['result' => $result]);
    }

    /**
     * @Route("/api/update-user")
     * @param UserRepository $userRepository
     * @return Response
     */
    public function updateUser(UserRepository $userRepository, Request $request): Response
    {
        $mUser = json_decode($this::$request->getContent(),true);

        $session = $request->getSession();
        $sIdUserSession = $session->get('idUser');

        $result = $userRepository->updateUser($mUser, $sIdUserSession);

        return new JsonResponse(['result' => $result]);
    }

    /**
     * @Route("/api/check-login")
     * @param UserRepository $userRepository
     * @param Request $request
     * @return Response
     */
    public function checkLogin(UserRepository $userRepository, Request $request): Response
    {
        $oUser = json_decode($this::$request->getContent(),true);
        $result = $userRepository->checkLogin($oUser);
        
        if (!empty($result)) {
            $sIdUser = $result[0]['u_id'];
            $sIdRole = $result[0]['u_role'];
            $session = $request->getSession();
            $session->set('idUser', $sIdUser);
            $session->set('idRole', $sIdRole);

        }
        return new JsonResponse(['result' => $result]);
    }

    /**

     * @Route("/api/password-forget")
     * @param UserRepository $userRepository
     * @return Response
     */
    public function sendEmailPasswordForget(UserRepository $userRepository): Response
    {
        $oUser = json_decode($this::$request->getContent(),true);
        $result = $userRepository->checkUserExists($oUser);

        $response = false;

        if (sizeof($result) > 0) { // envoyer l'e-mail de r??initialisation de mot de passe
            $sEmailUser = $result[0]['u_email'];
            $sLastNameUser = $result[0]['u_lastname'];
            $sFirstNameUser = $result[0]['u_firstname'];
            $sIdUser = $result[0]['u_id'];
            
            $mail = new PHPMailer(true);
            $mail->setFrom('locally.gestionmessage@gmail.com');
            $mail->addAddress('soury.magdaleine@outlook.fr');
            
            // Param??tres du serveur 
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;                  // Activer la sortie de d??bogage d??taill??e 
            $mail->isSMTP();                                       // Envoi en utilisant SMTP 
            $mail->Host = 'smtp.gmail.com';                         // D??finit le serveur SMTP pour qu'il envoie via 
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->SMTPAuth = true;                                 // Activer l'authentification SMTP 
            $mail->Username = 'locally.gestionmessage@gmail.com';    // Nom d'utilisateur SMTP 
            $mail->Password = '4S7}sY5F%J*#gGa6bv;5';                        // Mot de passe SMTP $ mail -> SMTPSecure = PHPMailer :: ENCRYPTION_STARTTLS ;         // Activer le cryptage TLS; `PHPMailer :: ENCRYPTION_SMTPS` encourag?? 
            $mail->Port = 587;                                       // Port TCP auquel se connecter, utilisez 465 pour `PHPMailer :: ENCRYPTION_SMTPS` ci-dessus

            // Contenu
            $mail->isHTML(true); // D??finit le format de l'e-mail sur HTML
            $mail->CharSet = 'UTF-8';
            $mail->Encoding = 'base64';
            $mail->Subject ='Locally - R??initialisation de votre mot de passe' ;
            $mail->Body = "
                Bonjour " . $sLastNameUser . " " . $sFirstNameUser . ", </br>
                Vous avez demand?? la r??initialisation de votre mot de passe.</br>
                Pour terminer votre demande, cliquez sur le site si dessous :</br>
                <a href=\"localhost/locally/public/guest/resetPassword\">R??initialiser</a></br>";
            $mail->send();

            $response = true;
        }

        return new Response($response);
    }
    
    /**
     * @Route("/api/reset-password")
     * @param UserRepository $userRepository
     * @return Response
     */
    public function changePassword(UserRepository $userRepository): Response
    {
        $oUser = json_decode($this::$request->getContent(),true);
        $check = $userRepository->checkUserExists($oUser);
        if (sizeof($check) > 0) {
            $result = $userRepository->changePassword($oUser);
        }
        else {
            // TODO: retourner un message d'erreur
            $result = false;
        }

        return new JsonResponse(['result' => $result]);
    }

    /**
     * @Route("/api/is-logged")
     * @param Request $request
     * @return Response
     */
    public function apiIsLogged(Request $request): Response
    {
        $session = $request->getSession();
        $sIdUserSession = $session->get('idUser');
        $sIdRole = $session->get('idRole');
        return new JsonResponse(['idUser' => $sIdUserSession, 'idRole' => $sIdRole]);
    }

    /**
     * @Route("/api/get-info-user")
     * @param UserRepository $userRepository
     * @param Request $request
     * @return Response
     */
    public function getInfoUser(UserRepository $userRepository, Request $request): Response
    {
        $session = $request->getSession();
        $sIdUserSession = $session->get('idUser');

        $result = $userRepository->getInfoUser($sIdUserSession);
        
        return new JsonResponse(['result' => $result]);
    }
}
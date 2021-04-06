<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\ContactUsClass;
use App\Entity\ContactUsForm;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
// Charger l'autochargeur de Compositeur 
require '../vendor/autoload.php';
/**
 * @Route("/home")
 */
class HomeController extends AbstractController{
   
   
    public static $request;

    public function __construct()
    {
        $request = new Request();
        $this::$request = $request;
    }
    /**
     * @Route("/")
     */
    public function homeFunction(): Response
    {
        $oContact = new ContactUsClass();
        // Si des attributs de classe ont des valeurs, elles apparaissent automatiquement dans le formulaire
        $oForm = $this->createForm(ContactUsForm::class, $oContact);
        return $this->render('home/home.html.twig', array('form' => $oForm->createView()));

    }

    /**
     * @Route("/api/send-message")
     * @return Response
     */
    public function apiAddMessage(): Response
    {
        
        $mNewMessage = json_decode($this::$request->getContent(),true);
        $lastname = $mNewMessage['lastname'];
        $firstname = $mNewMessage['firstname'];
        $email =$mNewMessage['email'];
        $phone = $mNewMessage['phone'];
        $message = $mNewMessage['message'];
        $mail = new PHPMailer(true);
        $mail->setFrom($email);
        $mail->addAddress('locally.gestionmessage@gmail.com');

        // Paramètres du serveur 
        $mail-> SMTPDebug= SMTP::DEBUG_SERVER;                      // Activer la sortie de débogage détaillée 
        $mail-> isSMTP();                                            // Envoi en utilisant SMTP 
        $mail-> Host= 'smtp.gmail.com';                     // Définit le serveur SMTP pour qu'il envoie via 
        $mail->SMTPSecure=PHPMailer::ENCRYPTION_STARTTLS;
        $mail-> SMTPAuth= true;                                   // Activer l'authentification SMTP 
        $mail-> Username='locally.gestionmessage@gmail.com';                     // Nom d'utilisateur SMTP 
        $mail-> Password='locally2021#';                               // Mot de passe SMTP $ mail -> SMTPSecure = PHPMailer :: ENCRYPTION_STARTTLS ;         // Activer le cryptage TLS; `PHPMailer :: ENCRYPTION_SMTPS` encouragé 
        $mail-> Port=587;                                    // Port TCP auquel se connecter, utilisez 465 pour `PHPMailer :: ENCRYPTION_SMTPS` ci-dessus



        // Contenu 
        $mail->isHTML(true); // Définit le format de l'e-mail sur HTML 
        $mail->Subject ='Formulaire Contactez-nous' ;
        $mail->Body = "Prénom : " .$firstname." <br> Nom : ". $lastname  ."<br> Email : ". $email ."<br> Numéro de téléphone : ". $phone . "<br> <br> Message : ". $message   ;
        $mail->send();


        return new Response(true);
        
    }

}
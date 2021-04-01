<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\ContactUsClass;
use App\Entity\ContactUsForm;
use Symfony\Component\Routing\Annotation\Route;


class HomeController extends AbstractController{

    /**
     * @Route("/home/home")
     */
    public function homeFunction(): Response
    {
        $oContact = new ContactUsClass();
        // Si des attributs de classe ont des valeurs, elles apparaissent automatiquement dans le formulaire

        $oForm = $this->createForm(ContactUsForm::class, $oContact);

        return $this->render('home/home.html.twig', array('form' => $oForm->createView()));

    }

}
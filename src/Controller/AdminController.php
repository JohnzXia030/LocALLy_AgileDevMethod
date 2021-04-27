<?php


namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


/**
 * @Route("/admin")
 */

class AdminController extends AbstractController
{
    /**
     * @Route("/administrator")
     */

    public function adminPage(): Response
    {
        return $this->render('admin/administrator.html.twig');
    }
}
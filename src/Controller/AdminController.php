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

    /**
     * @Route("/traderManagement")
     */

    public function traderManagement(): Response
    {
        return $this->render('admin/traderManagement.html.twig');
    }

    /**
     * @Route("/clientManagement")
     */

    public function clientManagement(): Response
    {
        return $this->render('admin/clientManagement.html.twig');
    }

    /**
     * @Route("/shopManagement")
     */

    public function shopManagement(): Response
    {
        return $this->render('admin/shopManagement.html.twig');
    }
}
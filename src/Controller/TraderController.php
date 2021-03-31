<?php


namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\CreateShopForm;
use App\Entity\ShopClass;

class TraderController extends AbstractController
{
    /**
     * @Route("/trader/create")
     */
    public function create(): Response
    {
        $oShop = new ShopClass();
        // Si des attributs de classe ont des valeurs, elles apparaissent automatiquement dans le formulaire
        
        $oForm = $this->createForm(CreateShopForm::class, $oShop);

        return $this->render('trader/trader.html.twig', array(
            'form' => $oForm->createView()
        ));
    }
}

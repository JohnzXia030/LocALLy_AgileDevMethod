<?php


namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LuckyController extends AbstractController
{
    public static $request;
    public function __construct()
    {
        $request = new Request();
        $this::$request = $request;
    }

    /**
     * @Route("/lucky/number")
     */
    public function number(): Response
    {
        print_r(json_decode($this::$request->getContent()));
        try {
            $number = random_int(0, 100);
        } catch (\Exception $e) {
        }
        return new Response(
            '<html lang="fr"><body>Lucky number: ' . $number . '</body></html>'
        );
    }

    /**
     * @Route("/lucky/show")
     */
    public function numbers(): Response
    {

        try {
            $number = random_int(0, 100);
        } catch (\Exception $e) {
        }

        return $this->render('test/number.html.twig', [
            'number' => $number,
        ]);
    }

    /**
     * @Route("/lucky/treat")
     */
    public function treat(): JsonResponse
    {
        print_r(json_decode($this::$request->getContent()));
        try {
            $number = random_int(0, 100);
        } catch (\Exception $e) {
        }
        $test = json_decode($this::$request->getContent());
        $test1 = 123;
        return new JsonResponse(['votes' => $test]);
    }

}
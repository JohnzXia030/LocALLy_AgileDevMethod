<?php

namespace App\Controller;

/*use App\Entity\User;
use App\Repository\UserRepository;*/
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class BlogController extends AbstractController
{
    /**
     * @Route("/blog", name="blog_list")
     */
    public function list()
    {
        return new Response(
            '<html lang="fr"><body>Lucky1 number: </body></html>'
        );
    }


    /*public function show($id, UserRepository $userRepository): Response
    {

        $user = $userRepository->findUser('111');
        print_r($user);
        return new Response(
            '<html lang="fr"><body>Lucky1 number: ' . $id. '</body></html>'
        );
    }*/

    /**
     * @Route("/api/posts/{id}", methods={"PUT"})
     * @param int $id
     * @return Response
     */
    public function edit(int $id): Response
    {
        // ... edit a post
    }
}
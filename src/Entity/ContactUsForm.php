<?php


namespace App\Entity;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ContactUsForm extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {

        // liste déroulante des villes (avec la possibilité de taper le début de la ville (voir combobox))
        // le code postal est automatiquement renseigner une fois la ville sélectionnée
        // c'est pour ça que l'input code postal est en readonly
        $builder
            ->add('sLastName', TextType::class)
            ->add('sFirstName', TextType::class)
            ->add('sMail', EmailType::class)
            ->add('sMessage', TextType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => ContactUsClass::class,
        ]);
    }

}

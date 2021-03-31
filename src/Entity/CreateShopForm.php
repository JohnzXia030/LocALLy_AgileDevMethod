<?php

namespace App\Entity;

use App\Entity\ShopClass;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\FileType;

class CreateShopForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {

        // liste déroulante des villes (avec la possibilité de taper le début de la ville (voir combobox))
        // le code postal est automatiquement renseigner une fois la ville sélectionnée
        // c'est pour ça que l'input code postal est en readonly
        $builder
            ->add('sName', TextType::class, [
                'label' => ' ',
                'attr' => array(
                    'placeholder' => 'Nom de votre enseigne',
                    'class' => 'my-2'
                )
            ])
            ->add('sNumStreet', TextType::class, [
                'label' => ' ',
                'attr' => array(
                    'placeholder' => 'Numéro de voie',
                    'class' => 'my-2'
                )
            ])
            ->add('sNameStreet', TextType::class, [
                'label' => ' ',
                'attr' => array(
                    'placeholder' => 'Nom de voie',
                    'class' => 'my-2'
                )
            ])
            ->add('sAddressAdd', TextType::class, [
                'label' => ' ',
                'attr' => array(
                    'placeholder' => 'Complément d\'adresse',
                    'class' => 'my-2'
                )
            ])
            ->add('sZipCode', TextType::class, [
                'disabled' => true,
                'label' => ' ',
                'attr' => array(
                    'placeholder' => 'Code postal',
                    'class' => 'my-2'
                )
            ])
            ->add('sCity', ChoiceType::class, [
                'label' => ' ',
                'attr' => array(
                    'placeholder' => 'Ville',
                    'class' => 'my-2'
                )
            ])
            ->add('sDescription', TextareaType::class, [
                'label' => ' ',
                'attr' => array(
                    'placeholder' => 'A propos (description de votre enseigne)',
                    'class' => 'my-2'
                )
            ])
            ->add('sPhoneNumber', TelType::class, [
                'label' => ' ',
                'attr' => array(
                    'placeholder' => 'Numéro de téléphone',
                    'class' => 'my-2'
                )
            ])
            ->add('aPhotos', CollectionType::class, [
                'entry_type' => TypeType::class,
                'entry_options' => [
                    'attr' => ['class' => 'email-box'],
                ],
                'label' => 'Photos de votre enseigne'
                ])
            ->add('sType', ChoiceType::class, [
                'label' => 'Type de commerce',
                'attr' => array(
                    'placeholder' => ''
                )
            ])
            ->add('aThemes', CollectionType::class, [
                'entry_type' => TextType::class,
                'entry_options' => [
                    'attr' => ['class' => 'email-box'],
                ],
                'label' => 'Thématiques'
                ])
            ->add('aFaq', CollectionType::class, [
                'entry_type' => TextType::class,
                'entry_options' => [
                    'attr' => ['class' => 'email-box'],
                ],
                'label' => 'FAQ'
                ])
        ;
    }
    
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => ShopClass::class,
        ]);
    }
}
<?php

namespace App\Form;

use App\Entity\Article;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CatalogFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('aName')
            ->add('aDescription')
            ->add('aPrice')
            ->add('aIdShop')
            ->add('aDiscount')
            ->add('aDiscountPeriod')
            ->add('aAvailable')
            ->add('aQuantityStock')
            ->add('aPicture')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Article::class,
        ]);
    }
}

<?php


namespace App\Forms\Type;

use App\Forms\Type\SigninClass;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\BirthdayType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class signinForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder

            ->add('sName', TextType::class, ['label'=>'Nom'])
            ->add('sFirstName', TextType::class, ['label'=>'Prenom'])
            ->add('dBirthDate', BirthdayType::class, ['label'=>'Date de naissance', 'format'=> 'dd-MM-yyyy', 'widget'=>'choice'])
            ->add('sEmail', EmailType::class, ['label'=>'E-mail'])
            ->add('sPassword', PasswordType::class, ['label'=>'Mot de passe'])
            ->add('sPhoneNumber',TextType::class, ['label'=>'Telephone'])
            ->add('iAdressNumber', TextType::class, ['label'=>'Numero de voie'])
            ->add('sAdressName', TextType::class, ['label'=>'Nom de voie'])
            ->add('iPostalCode', TextType::class, ['label'=>'Code Postale'])
            ->add('sCity', TextType::class, ['label'=>'Ville'])
            ->add('sDepartement', TextType::class, ['label'=>'Departement'])
            ->add('sCountry', TextType::class, ['label'=>'Pays'])

        ;
    }
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => SigninClass::class
        ]);
    }
}
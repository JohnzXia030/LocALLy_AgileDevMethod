<?php


namespace App\Forms\Type;


class LoginClass
{
    private $_sEmail;
    private $_sPassword;

    /**
     * @return mixed
     */
    public function getSEmail()
    {
        return $this->_sEmail;
    }

    /**
     * @return mixed
     */
    public function getSPassword()
    {
        return $this->_sPassword;
    }


}
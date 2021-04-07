<?php


namespace App\Entity;


class ContactUsClass
{

    private $_sLastName;
    private $_sFirstName;
    private $_sMail;
    private $_sMessage;

    /**
     * @return mixed
     */
    public function getSLastName()
    {
        return $this->_sLastName;
    }

    /**
     * @return mixed
     */
    public function getSFirstName()
    {
        return $this->_sFirstName;
    }

    /**
     * @return mixed
     */
    public function getSMail()
    {
        return $this->_sMail;
    }

    /**
     * @return mixed
     */
    public function getSMessage()
    {
        return $this->_sMessage;
    }

}
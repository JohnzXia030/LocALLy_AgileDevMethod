<?php


namespace App\Forms\Type;


class SigninClass
{
    private $_sName;
    private $_sFirstName;
    private $_dBirthDate;
    private $_sEmail;
    private $_sPassword;
    private $_sPhoneNumber;
    private $_iAdressNumber;
    private $_sAdressName;
    private $_iPostalCode;
    private $_sCity;
    private $_sDepartement;
    private $_sCountry;

    /**
     * @return mixed
     */
    public function getSName()
    {
        return $this->_sName;
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
    public function getDBirthDate()
    {
        return $this->_dBirthDate;
    }

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

    /**
     * @return mixed
     */
    public function getSPhoneNumber()
    {
        return $this->_sPhoneNumber;
    }

    /**
     * @return mixed
     */
    public function getIAdressNumber()
    {
        return $this->_iAdressNumber;
    }

    /**
     * @return mixed
     */
    public function getSAdressName()
    {
        return $this->_sAdressName;
    }

    /**
     * @return mixed
     */
    public function getIPostalCode()
    {
        return $this->_iPostalCode;
    }

    /**
     * @return mixed
     */
    public function getSCity()
    {
        return $this->_sCity;
    }

    /**
     * @return mixed
     */
    public function getSDepartement()
    {
        return $this->_sDepartement;
    }

    /**
     * @return mixed
     */
    public function getSCountry()
    {
        return $this->_sCountry;
    }

}
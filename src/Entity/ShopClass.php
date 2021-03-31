<?php

namespace App\Entity;

class ShopClass {
    
    private $_sName;
    private $_sNumStreet;
    private $_sNameStreet;
    private $_sAddressAdd;
    private $_sZipCode;
    private $_sCity;
    private $_sDescription;
    private $_sPhoneNumber;
    private $_sState;
    private $_iIdTrader;
    private $_aPhotos = array();
    private $_sType;
    private $_aThemes = array();
    private $_aFaq = array();
    
    
    public function getsNameStreet() {
        return $this->_sNameStreet;
    }

    public function getsAddressAdd() {
        return $this->_sAddressAdd;
    }

    public function getsZipCode() {
        return $this->_sZipCode;
    }

    public function getsCity() {
        return $this->_sCity;
    }

    public function getsDescription() {
        return $this->_sDescription;
    }

    public function getsPhoneNumber() {
        return $this->_sPhoneNumber;
    }

    public function getsState() {
        return $this->_sState;
    }

    public function getiIdTrader() {
        return $this->_iIdTrader;
    }

    public function getaPhotos() {
        return $this->_aPhotos;
    }

    public function getsType() {
        return $this->_sType;
    }

    public function getaThemes() {
        return $this->_aThemes;
    }

    public function getaFaq() {
        return $this->_aFaq;
    }

        public function getsName()
    {
        return $this->_sName;
    }
    
    public function getsNumStreet()
    {
        return $this->_sNumStreet;
    }
}

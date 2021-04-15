<?php


namespace App\Service;


class ToolService
{
    /**
     * Supprimer les doublons d'une liste d'apres une colonne
     * @param $array
     * @param $key
     * @return array
     */
    function unique_multi_array($array, $key) {
        $temp_array = array();
        $i = 0;
        $key_array = array();

        foreach($array as $val) {
            if (!in_array($val[$key], $key_array)) {
                $key_array[$i] = $val[$key];
                $temp_array[$i] = $val;
            }
            $i++;
        }
        return $temp_array;
    }
}
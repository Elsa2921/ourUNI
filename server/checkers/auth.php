<?php
require_once __DIR__.'/../base/base.php';
function checkEmailExists($email,$type){
    global $class;
    $query = "SELECT id FROM `$type` WHERE email=:email";
    $execute = [':email'=>$email];
    $flag = $class->query($query,$execute,'column');
    return $flag;
}


function pinCodeChecker($id,$code,$type){
    global $class;
    $query = "SELECT email FROM `$type` WHERE id = :id AND pin_code = :code";
    $execute = [':id' => $id, ':code' => $code];
    $flag = $class->query($query,$execute,'column');
    return $flag;
}


function checkloginInfo($email,$table){
    global $class;
    $query = "SELECT * FROM $table WHERE email=:email";
    $execute = [':email'=>$email];
    $flag = $class->query($query,$execute,'one');
    return $flag;
}
?>
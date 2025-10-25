<?php
require_once __DIR__.'/../base/base.php';
// $class = new Base('root','','exam');
function checkEmailExists($email){
    global $class;
    $query = "SELECT type FROM professors WHERE email=:email";
    $execute = [':email'=>$email];
    $flag = $class->query($query,$execute);
    return $flag;
}
function getUserId($email){
    global $class;
    $query = "SELECT id FROM professors WHERE email=:email";
    $execute = [':email'=>$email];
    $flag = $class->query($query,$execute);
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
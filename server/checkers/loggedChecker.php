<?php
require_once __DIR__.'/../base/base.php';
// $class = new Base('root','','exam');

function logedChecker($id,$email,$role){
    $table = '';
    if($role == 1 or $role == 2){
        $table = $role==1 ?'students' : 'professors';
    }
    global $class;
    $query = "SELECT email FROM $table WHERE id=:id AND email = :email";
    $execute = [':id'=>$id, ':email'=>$email];
    $stmt = $class->query($query,$execute);
    $flag  =false;
    if(!empty($stmt)){
        $flag = true;
    }

    return $flag;
}
?>
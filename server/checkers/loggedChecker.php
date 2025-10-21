<?php
require_once __DIR__.'/../base/base.php';
// $class = new Base('root','','exam');

function logedChecker($id,$email,$role){
    $table = '';
    if($role == 1 or $role == 2){
        $table = $role==1 ?'students' : 'professors';
    }
    global $class;
    $pdo = $class->connect();
    $stmt = $pdo->prepare("SELECT email FROM $table WHERE id=:id AND email = :email");
    $stmt->execute([':id'=>$id, ':email'=>$email]);
    $flag  =false;
    if($stmt->rowCount()>0){
        $flag = true;
    }

    return $flag;
}
?>
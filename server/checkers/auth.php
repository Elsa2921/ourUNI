<?php
require_once __DIR__.'/../base/base.php';
// $class = new Base('root','','exam');
function checkEmailExists($email){
    global $class;
    $pdo = $class->connect();
    $stmt = $pdo->prepare("SELECT type FROM professors WHERE email=:email");
    $stmt->execute([':email'=>$email]);
    $flag = false;
    if($stmt->rowCount()>0){
        $flag = $stmt->fetchColumn();
    }
    return $flag;
}
function getUserId($email){
    global $class;
    $pdo = $class->connect();
    $stmt = $pdo->prepare("SELECT id FROM professors WHERE email=:email");
    $stmt->execute([':email'=>$email]);
    $flag = false;
    if($stmt->rowCount()>0){
        $flag = $stmt->fetchColumn();
    }
    return $flag;
}


function checkloginInfo($email,$table){
    global $class;
    $pdo = $class->connect();
    $stmt = $pdo->prepare("SELECT * FROM $table WHERE email=:email");
    $stmt->execute([':email'=>$email]);
    $flag = false;
    if($stmt->rowCount()>0){
        $flag = $stmt->fetch(PDO::FETCH_ASSOC);
        
    }
    return $flag;
}
?>
<?php
require_once __DIR__.'/../base/base.php';
// $class = new Base('root','','exam');
function checkEmailExists($email){
    global $class;
    $pdo = $class->connect();
    $stmt = $pdo->prepare("SELECT type FROM users WHERE email=:email");
    $stmt->execute([':email'=>$email]);
    $flag = false;
    if($stmt->rowCount()>0){
        $flag = $stmt->fetchColumn();
    }
    return $flag;
}

function codeChecker($code,$id){
    global $class;
    $pdo = $class->connect();
    $stmt = $pdo->prepare("SELECT code FROM users WHERE id=:id AND code=:code");
    $stmt->execute([':id'=>$id, ":code"=> $code]);
    $flag = false;
    if($stmt->rowCount()>0){
        $flag = true;
    }

    return $flag;
}

function getUserId($email){
    global $class;
    $pdo = $class->connect();
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email=:email");
    $stmt->execute([':email'=>$email]);
    $flag = false;
    if($stmt->rowCount()>0){
        $flag = $stmt->fetchColumn();
    }
    return $flag;
}


function checkloginInfo($email){
    global $class;
    $pdo = $class->connect();
    $stmt = $pdo->prepare("SELECT id,full_name,type,password FROM users WHERE email=:email");
    $stmt->execute([':email'=>$email]);
    $flag = false;
    if($stmt->rowCount()>0){
        $flag = $stmt->fetch(PDO::FETCH_ASSOC);
        
    }
    return $flag;
}
?>
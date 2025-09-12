<?php
require_once __DIR__.'/../checkers/loggedChecker.php';

function logchecker(){
    $id = $_SESSION['ourUNI_id_'] ?? '';
    $info = $_SESSION['ourUNI_info'] ?? '';
    if(!empty($id) and !empty($info)){
        $checker = logedChecker($id,$info['email']);
        if($checker){
            echo json_encode(['profile'=>['email'=>$info['email'], 'name'=>$info['name']]]);
        }
        else{
            echo json_encode(['profile'=>false]);
        }
       
    }
    else{
        echo json_encode(['profile'=>false]);
    }
}
?>
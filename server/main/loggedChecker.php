<?php
require_once __DIR__.'/../checkers/loggedChecker.php';

function logchecker($location){
    $id = $_SESSION['ourUNI_id_'] ?? '';
    $info = $_SESSION['ourUNI_info'] ?? '';
    if(!empty($id) and !empty($info)){
        $checker = logedChecker($id,$info['email'],$info['role']);
        if($checker){
            $data = ['role'=>$info['role']];
            if($location){
                $phone = "+".$info['phone_code']." ".$info['phone'];
                $data['email'] = $info['email'];
                $data['phone'] = $phone;
                $data['name'] = $info['name'];
            }
            echo json_encode(['profile'=>$data]);
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
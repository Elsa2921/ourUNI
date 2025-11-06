<?php
require_once __DIR__.'/../checkers/loggedChecker.php';

function logchecker($location,$status=1){
    $id = $_SESSION['ourUNI_id_'] ?? '';
    $info = $_SESSION['ourUNI_info'] ?? '';
    $data = false;
    if(!empty($id) and !empty($info)){
        $checker = logedChecker($id,$info['email'],$info['role']);
        if($checker){
            $data = [];
            $data = ['role'=>$info['role']];
            if($location){
                $phone = "+".$info['phone_code']." ".$info['phone'];
                $data['email'] = $info['email'];
                $data['phone'] = $phone;
                $data['name'] = $info['name'];
            }
            
        }
       
    }
    if($status){
        echo json_encode(['profile'=>$data]);

    }
    else{
        return $data;
    }
}
?>
<?php
require_once __DIR__. '/../checkers/auth.php';
require_once __DIR__. '/../require/vendor.php';


function forgotPassEmail($email,$type){
    $type = $type == '1' ? 'students' : 'professors';  
    $checker = checkEmailExists($email,$type);
    if($checker){
        $_SESSION['ourUNI_acc_id'] = $checker;
        $_SESSION['after_email'] = 1;
        $_SESSION['ourUNI_acc_type'] = $type;
        http_response_code(200);
        exit();

    }
    else{
        http_response_code(404);
        exit();

    }
}


function newPass($password){
    $id = $_SESSION['ourUNI_acc_id'] ?? null;
    $after = $_SESSION['after_email'] ?? null;
    $type = $_SESSION['ourUNI_acc_type'] ?? null;
    if($id and $after and $type and $after==2){
        global $class;
        $hash_pass = password_hash($password,PASSWORD_BCRYPT);
        $query = "UPDATE `$type` SET password=:pass WHERE id=:id";
        $execute = [':pass'=>$hash_pass, ':id' =>$id];
        $class->query($query,$execute);
        session_destroy();
        http_response_code(200);
        exit();
    }
    else{
        http_response_code(204);
    }
}


function pinCode($code){
    $id = $_SESSION['ourUNI_acc_id'] ?? null;
    $after = $_SESSION['after_email'] ?? null;
    $type = $_SESSION['ourUNI_acc_type'] ?? null;
    if($id and $after and $type){
        $checker = pinCodeChecker($id,$code,$type);
        if($checker){
            $_SESSION['after_email'] = 2;
            http_response_code(200);
        }
        else{
            http_response_code(204);
        }
    }
    else{
        http_response_code(403);
    }
}

function login($email,$password,$table,$role){
    $data = checkloginInfo($email,$table);
    if($data){
        if(password_verify($password,$data['password'])){
            $_SESSION['ourUNI_info'] = [
                    'id'=>$data['id'],
                    'email'=>$email,
                    'name'=>$data['full_name'],
                    'phone'=>$data['phone'],
                    'phone_code'=>$data['phone_code'],
                    'role'=>(int)$role
                ];
                $_SESSION['ourUNI_id_'] = $data['id'];
                http_response_code(200);
                exit();
            }
            else{
                http_response_code(401);
                exit();
            }
    }
    else{
        http_response_code(401);
    }
}


?>
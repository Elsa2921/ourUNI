<?php
require_once __DIR__. '/../checkers/auth.php';
require_once __DIR__. '/../require/vendor.php';


function forgotPassEmail($email){
    $checker = checkEmailExists($email);
    if($checker){
        if($checker==3){
            global $class;
            $_SESSION['ourUNI_id'] = getUserId($email);
            $_SESSION['after_email'] = 1;
        //     $class->query("UPDATE users SET  code=:code WHERE email=:email",
        // [':email'=>$email,':code'=>$code]);
            echo json_encode(['status'=>200]);
            exit();
            
        }
        else{
            echo json_encode(["error" => "Your account is not created with email!"]);
            exit();
        }

    }
    else{
        echo json_encode(["error" => "Sign up first please!!"]);
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
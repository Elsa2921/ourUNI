<?php
function code_mailer($code,$email){
    $subject = "Verification code";
    $message = "Hey there, this is your auth. code from ourUNI.
    code:$code";
    $from = 'example@gmail.com';
    $to = $email;
    // mail($to, $subject,$message,$from);
}
?>
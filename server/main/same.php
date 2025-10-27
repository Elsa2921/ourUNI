<?php
function currentDate(){
    $dt = new DateTime();
    return $dt->format('Y-m-d H:i:s');
}
?>
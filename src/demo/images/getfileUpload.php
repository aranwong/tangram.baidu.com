<?php
ob_start();

if ( $_FILES["upfiles"]["size"] < 200000){

move_uploaded_file($_FILES["upfiles"]["tmp_name"], "upload/file.png" );

}
//move_uploaded_file($_FILES["middleFileName"]["tmp_name"], "upload/middle.png" );
//move_uploaded_file($_FILES["bigFileName"]["tmp_name"], "upload/big.png" );

//var_dump($_FILES);
//$str=ob_get_clean();
//file_put_contents('1.txt',$str, LOCK_EX);
?>

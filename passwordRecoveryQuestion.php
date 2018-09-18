<?php

session_start();
$_SESSION['message']= "No Errors!!";
require 'connectDB.php';


if(isset($_POST['submit'])){
    //check whether email is empty
    if(!empty($_POST['email'])){
        //check whether user exists in the database

        $email = $_POST['email'];
        $question = $_POST['securityQuestion'];
        $answer = $_POST['answer'];

        $result = mysqli_query($conn, "SELECT * FROM users WHERE email='$email'");
        $numRows = mysqli_num_rows($result);

        if($numRows > 0){

            $userDetails = mysqli_fetch_assoc($result);
            
            if($userDetails['securityques']==$question && $userDetails['answer']==$answer){
            
                header("Location: resetPassword.php?em=".$email."&fp_code=0");
                exit();                

            }else{
                $_SESSION['message'] = 'error!<br>'.'Security Question or Answer is not Matched!!';
                header("Location: message.php");
                exit();
            }
        }else{
            $_SESSION['message'] = 'error!<br>'.'Given email is not associated with any account.';
            header("Location: message.php");
            exit();
        }
        
    }else{
        $_SESSION['message'] = 'error!<br>'.'Enter email to create a new password for your account.';
        header("Location: message.php");
        exit();
    }
}


?>


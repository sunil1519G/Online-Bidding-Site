
<?php

// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

session_start();
$_SESSION['message']= "No Errors!!";
require 'connectDB.php';


if(isset($_POST['submit'])){
    //check whether email is empty
    if(!empty($_POST['email'])){
        //check whether user exists in the database

        $email = $_POST['email'];
        $result = mysqli_query($conn, "SELECT * FROM users WHERE email='$email'");
        $numRows = mysqli_num_rows($result);
        if($numRows > 0){
            //generat unique string
            $uniqidStr = md5(uniqid(mt_rand()));;
            
            // update data with forgot pass code
            $sql = "UPDATE users SET reset_key='$uniqidStr' WHERE email='$email'";
            
            if(mysqli_query($conn, $sql)){
                $resetPassLink = 'localhost/biddingWebsite/resetPassword.php?em=0&fp_code='.$uniqidStr;
                
                //get user details
                $userDetails = mysqli_fetch_assoc($result);
                $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
                try {
                    //Server settings
                    
                    // $mail->SMTPDebug = 2;                                 // Enable verbose debug output
                    
                    $mail->isSMTP();                                      // Set mailer to use SMTP
                    
                    $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
                    
                    $mail->SMTPAuth = true;                               // Enable SMTP authentication
                    //if your using gmail then turn on the "Access for less secure apps" using https://www.google.com/settings/u/0/security/lesssecureapps
                    // to get authenticated....

                    $mail->Username = 'admin@gmail.com';                 // SMTP username
                    
                    $mail->Password = '******';                           // SMTP password
                    
                    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
                    
                    $mail->Port = 587;                                    // TCP port to connect to

                    //Recipients
                    $mail->setFrom('admin@gmail.com', 'admin');

                    $mail->addAddress($userDetails['email'], 'User');     // Add a recipient

                    // $mail->addReplyTo('info@example.com', 'Information');
                    // $mail->addCC('cc@example.com');
                    // $mail->addBCC('bcc@example.com');

                    //Attachments
                    // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
                    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

                    //Content
                    $mail->isHTML(true);                                  // Set email format to HTML
                    
                    $mail->Subject = 'Password Update Request';
                    
                    $mail->Body    = 'Dear '.$userDetails['firstname'].', 
                    <br/>Recently a request was submitted to reset a password for your account. If this was a mistake, just ignore this email and nothing will happen.
                    <br/>To reset your password, visit the following link: <a href="'.$resetPassLink.'">'.$resetPassLink.'</a>
                    <br/><br/>Regards,
                    <br/>Admin';

                    // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

                    $mail->send();
                    
                    $_SESSION['message'] = 'success!<br>'.'Please check your e-mail, we have sent a password reset link to your registered email.';
                    
                    header("Location: message.php");
                    exit();

                } catch (Exception $e) {
                    $_SESSION['message'] = 'Message could not be sent. Mailer Error: '+$mail->ErrorInfo;
                    header("Location: message.php");
                    exit();
                }
                
            }else{
                $_SESSION['message'] = 'error!<br>'.'Some problem occurred, please try again.';
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


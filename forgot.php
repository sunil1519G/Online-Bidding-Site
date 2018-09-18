<?php
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
                $resetPassLink = 'localhost/biddingWebsite/resetPassword.php?fp_code='.$uniqidStr;
                
                //get user details
                $userDetails = mysqli_fetch_assoc($result);
                
                //send reset password email
                $to = $userDetails['email'];
                $subject = "Password Update Request";
                $mailContent = 'Dear '.$userDetails['firstname'].', 
                <br/>Recently a request was submitted to reset a password for your account. If this was a mistake, just ignore this email and nothing will happen.
                <br/>To reset your password, visit the following link: <a href="'.$resetPassLink.'">'.$resetPassLink.'</a>
                <br/><br/>Regards,
                <br/>Admin';
                //set content-type header for sending HTML email
                $headers = "MIME-Version: 1.0" . "\r\n";
                $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
                //additional headers
                $headers .= 'From: Admin<sender@example.com>' . "\r\n";
                //send email
                mail($to,$subject,$mailContent,$headers);
                
                $_SESSION['message'] = 'success!<br>'.'Please check your e-mail, we have sent a password reset link to your registered email.';
                header("Location: message.php");
                exit();
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
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="css/fontawesome-all.min.css">

    <!-- Favicon -->
    <link rel="icon" type="image/ico" sizes="32x32" href="favicon.ico">
    
	<style type="text/css">
    	.invert a:hover {
    		background-color: gray;
    	}

    	.invert a{
    		height: 45px;
    	}
    </style>

    <title>Forget your password| recover form here</title>
  </head>
  <body>
    
  	<!-- navbar -->
  	<?php require 'navbar.php'; ?>

	<!-- Forgot password -->
	<div class="container h-100 px-0">

        <!-- details using accordion -->
        <div class="col-md-9 col-xm-12 my-5 mx-auto" style="box-shadow: 0 .5rem 1rem rgba(0,0,0,.4)!important;">
            <div id="accordion">
            <h4 class="text-center my-3 text-success">Password recovery options</h4>
                <!--card1-->
              <div class="card">
                <div class="card-header" id="headingOne">
                  <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      <i class="fa fa-plus-circle" aria-hidden="true"></i> Through E-mail - using PHP mail() Method
                    </button>
                  </h5>
                </div>

                <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body">
                    <!-- By php mail() method -->                    
                    <div class="row my-1 mx-1 pt-1">
                        <div class="col-lg-2 col-sm-1 hidden-xs"></div>
                        <div class="col-lg-8 col-sm-10 col-12 bg-white" style="box-shadow: 0 .5rem 1rem rgba(0,0,0,.4)!important;">
                            <div class="card fat m-3 border-success">
                                <div class="card-body">
                                    <form method="POST" action="forgot.php">
                                        
                                        <div class="form-group">
                                            <label class="control-label" for="email">Enter Your E-Mail Address</label>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                                                </div>
                                                <input id="email" type="email" placeholder="email" class="form-control" name="email">
                                            </div>
                                        </div>
                                        *** the unique id (reset_key) is required so that when password reset link is send then it can identify which user is resquesting for password change. ***
                                        <div class="form-group no-margin">
                                            <button type="submit" name="submit" class="btn btn-primary">
                                                submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-2 col-sm-1 hidden-xs"></div>
                    </div>

                    </div>
                </div>
              </div>
              <!--card2-->
              <div class="card">
                <div class="card-header" id="headingTwo">
                  <h5 class="mb-0">
                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      <i class="fa fa-plus-circle" aria-hidden="true"></i> Through E-mail - using PHPMailer
                    </button>
                  </h5>
                </div>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                    <div class="card-body">

                    <!-- By using PHPMailer -->                    
                    <div class="row my-1 mx-1 pt-1">
                        <div class="col-lg-2 col-sm-1 hidden-xs"></div>
                        <div class="col-lg-8 col-sm-10 col-12 bg-white" style="box-shadow: 0 .5rem 1rem rgba(0,0,0,.4)!important;">
                            <div class="card fat m-3 border-success">
                                <div class="card-body">
                                    <form method="POST" action="passwordRecoveryPHPMailer.php">
                                        
                                        <div class="form-group">
                                            <label class="control-label" for="email">Enter Your E-Mail Address</label>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                                                </div>
                                                <input id="email" type="email" placeholder="email" class="form-control" name="email">
                                            </div>
                                        </div>
                                        *** the unique id (reset_key) is required so that when password reset link is send then it can identify which user is resquesting for password change. ***
                                        <div class="form-group no-margin">
                                            <button type="submit" name="submit" class="btn btn-primary">
                                                submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-2 col-sm-1 hidden-xs"></div>
                    </div>

                    </div>
                </div>
              </div>
              <!--card3-->
              <div class="card">
                <div class="card-header" id="headingThree">
                  <h5 class="mb-0">
                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      <i class="fa fa-plus-circle" aria-hidden="true"></i> Through Security Question
                    </button>
                  </h5>
                </div>
                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                    <div class="card-body">
                        
                    <!-- By using Security Question -->                    
                    <div class="row my-1 mx-1 pt-1">
                        <div class="col-lg-2 col-sm-1 hidden-xs"></div>
                        <div class="col-lg-8 col-sm-10 col-12 bg-white" style="box-shadow: 0 .5rem 1rem rgba(0,0,0,.4)!important;">
                            <div class="card fat m-3 border-success">
                                <div class="card-body">
                                    <form method="POST" action="passwordRecoveryQuestion.php">
                                        
                                        <div class="form-group">
                                            <label class="control-label" for="email">Enter Your E-Mail Address</label>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                                                </div>
                                                <input id="email" type="email" placeholder="email" class="form-control" name="email">
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label for="select">Security Question</label>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">select</span>
                                                </div>
                                                <select id="select" name="securityQuestion" class="form-control">
                                                    <option value="" selected disabled>Select a security question.</option>
                                                <option value="What is your pet name?">What is your pet name?</option>
                                                <option value="Where were you born?">Where were you born?</option>
                                                <option value="What is your father's middle name?">What is your father's middle name?</option>									
                                                </select>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label for="ans">Answer</label>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">Answer</span>
                                                </div>
                                                <input id="ans" type="text" class="form-control" name="answer" placeholder="answer" required>
                                            </div>	
                                        </div>

                                        <div class="form-group no-margin">
                                            <button type="submit" name="submit" class="btn btn-primary">
                                                submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-2 col-sm-1 hidden-xs"></div>
                    </div>

                    </div>
                </div>
              </div>
            </div>
        </div>
    </div>
            
            

	<!-- footer -->
    <footer class="bg-dark text-center">
    	<div style="color: white; height: 40px; padding-top: 10px;">Copyright &copy; 2018 &mdash; Bidding Website </div>
    </footer>  
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="js/jquery-3.3.1.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/myJs.js"></script>
    <script type="text/javascript">
      $(document).ready(function(){
        $("#dropdownMenuButton").mouseenter(function(){
            $("#dropdownMenuButton").css("background-color","gray");
        });
        $("#dropdownMenuButton").mouseleave(function(){
            $("#dropdownMenuButton").css("background-color","#343a40");
        });
      });
    </script>
  </body>
</html>
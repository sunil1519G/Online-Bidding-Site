<?php
session_start();
$_SESSION['message']= "No Errors!!";
require 'connectDB.php';


if (isset($_POST['change'])) {
    
    $pass = mysqli_real_escape_string($conn,password_hash($_POST['pass'],PASSWORD_BCRYPT));
    $confirmPass = $_POST['passConfirm'];

    if(password_verify($confirmPass, $pass)) {

        if (isset($_SESSION['temp_email'])) {
            
            $sql = "UPDATE users SET password='$pass' WHERE email='".$_SESSION['temp_email']."'";
            unset($_SESSION['temp_email']);

            if(mysqli_query($conn,$sql)) {
                $_SESSION['message']= "Password Changed Successfully!!";
                header("Location: message.php");
                exit();
            }
            else {
                $_SESSION['message']= mysqli_error($conn)."<br>Query Error!!";
                header("Location: message.php");
                exit();
            }
            
        }

        if (isset($_SESSION['temp_code'])) {
            
            $sql = "UPDATE users SET password='$pass' WHERE reset_key='".$_SESSION['temp_code']."'";
            unset($_SESSION['temp_code']);

            if (mysqli_query($conn,$sql)) {
                $_SESSION['message']= "Password Changed Successfully!!";
                header("Location: message.php");
                exit();
            }
            else {
                $_SESSION['message']= mysqli_error($conn)."<br>Query Error!!";
                header("Location: message.php");
                exit();
            }

        }
    }
    else {
        $_SESSION['message']="Password does not matched!!";
        header("Location: message.php");
        exit();
    }

}
else {
    
    $email = $_GET['em'];
    $code = $_GET['fp_code'];

    if ($email!=null && $code==0) {
        $_SESSION['temp_email'] = $email;
    }

    if ($code!=null && $email==0) {
        $_SESSION['temp_code'] = $code;
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
	<div class="container h-100">
		<div class="row my-5 mx-1 pt-5">
            <div class="col-lg-2 col-sm-1 hidden-xs"></div>
            
            <div class="col-lg-8 col-sm-10 col-12 bg-white" style="box-shadow: 0 .5rem 1rem rgba(0,0,0,.4)!important;">
                <div class="card fat m-3 border-success">
                    <div class="card-body">
                        <h4 class="card-title text-center">Change your password</h4>
                        <form method="POST" action="resetPassword.php">
                            
                            <div class="form-group">
                                <label class="control-label" for="pass">Enter New Password</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-key"></i></span>
                                    </div>
                                    <input id="pass" type="password" class="form-control" name="pass" placeholder="password" required>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label" for="passConfirm">Re-Enter New Password</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-key"></i></span>
                                    </div>
                                    <input id="passConfirm" type="password" class="form-control" name="passConfirm" placeholder="password" required>
                                </div>
                            </div>

                            <div class="form-group no-margin text-center">
                                <button type="submit" style="width: 20%;" name="change" class="btn btn-primary">
                                    Change
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="col-lg-2 col-sm-1 hidden-xs"></div>
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
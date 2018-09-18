<?php
session_start();
$_SESSION['message']= "No Errors!!";
if (isset($_POST['submit'])) {
	
	require 'connectDB.php';

	$email= mysqli_real_escape_string($conn, $_POST['email']);
	$pass= mysqli_real_escape_string($conn,$_POST['password']);

	//echo $pass."<br>";
	$sql= "SELECT * FROM users WHERE email='$email';";

	$result= mysqli_query($conn,$sql);
	//echo mysqli_num_rows($result)."<br>";
	if (mysqli_num_rows($result) == 0) {
		$_SESSION['message']="Invalid Username/password.";
		header("Location: message.php");
		exit();
	} else {
		$row= mysqli_fetch_assoc($result);
		//echo $row['password'];
			if (password_verify($pass,$row['password'])) {
				
				$_SESSION['password']=$row['password'];
				$_SESSION['userid']=$row['userid'];
				$_SESSION['firstname']=$row['firstname'];
				$_SESSION['lastname']=$row['lastname'];
				$_SESSION['email']=$row['email'];	
				$_SESSION['securityques']=$row['securityques'];
				$_SESSION['answer']=$row['answer'];
				//echo "logged in";
				
				header("Location: home.php");
				exit();
			} else {
				$_SESSION['message']="Invalid password.";
				header("Location: message.php");
				exit();
			}
		
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
    <link rel="stylesheet" href="css/style.css">    
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

    <title>Bidding Website | Login with your credentials. </title>
  </head>
  <body class="my-login-page">
    
  	<!-- navbar -->
  	<?php require 'navbar.php'; ?>
	
	<!-- login -->
	<section class="h-100">
		<div class="container h-100">
			<div class="row justify-content-md-center h-100">
				<div class="card-wrapper">
					<div class="brand" style="background-color: white;">
						<img style="padding-top: 12px;" src="Images/logo1.jpg">
					</div>
					<div class="card fat">
						<div class="card-body">
							<h4 class="card-title text-center">Login</h4>
							<form method="POST" action="login.php">
								
								<div class="form-group">
									<label class="control-label" for="email">E-Mail Address</label>
								  	<div class="input-group">
								   		<div class="input-group-prepend">
											<span class="input-group-text"><i class="fas fa-user"></i></span>
								   		</div>
								   		<input id="email" type="email" class="form-control" name="email" required autofocus>
								  	</div>
								</div>

								<div class="form-group">
									<label class="control-label" for="password">Password
										<a href="forgot.php" class="float-right">
											Forgot Password?
										</a>
									</label>
									<div class="input-group">
								   		<div class="input-group-prepend">
											<span class="input-group-text"><i class="fas fa-key"></i></span>
								   		</div>
										<input id="password" type="password" class="form-control" name="password" required>
									</div>
								</div>

								<div class="form-group">
									<label>
										<input type="checkbox" name="remember"> Remember Me
									</label>
								</div>

								<div class="form-group no-margin">
									<button type="submit" name="submit" class="btn btn-primary btn-block">
										Login
									</button>
								</div>
								<div class="margin-top20 text-center">
									Don't have an account? <a href="signup.php">Create One</a>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

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


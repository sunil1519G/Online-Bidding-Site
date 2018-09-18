<?php
session_start();
$_SESSION['message']= "No Errors!!";
if ($_SERVER['REQUEST_METHOD']=='POST'){
	if (isset($_POST['submit'])) {
		
		require 'connectDB.php';

		$fname= mysqli_real_escape_string($conn,$_POST['fname']);
		$lname= mysqli_real_escape_string($conn,$_POST['lname']);
		$email= mysqli_real_escape_string($conn,$_POST['email']);
		$pass= mysqli_real_escape_string($conn,password_hash($_POST['pass'], PASSWORD_BCRYPT));
		$securityQuestion= mysqli_real_escape_string($conn,$_POST['securityQuestion']);
		$answer= mysqli_real_escape_string($conn,$_POST['answer']);


		// Check for email address
		$sqlEmail= "SELECT * FROM users WHERE email='$email' ";
		$result= mysqli_query($conn, $sqlEmail);
		$rows= mysqli_num_rows($result);

		if ($rows > 0) {
			$_SESSION['message']="E-Mail addres already registered!!";
			header("Location: message.php");
		} else {

			//Insert the user into the database
			$sql= "INSERT INTO `users`(`firstname`, `lastname`, `email`, `password`, `securityques`, `answer`, `reset_key`) VALUES ('$fname', '$lname', '$email', '$pass', '$securityQuestion', '$answer','');";

			if(mysqli_query($conn, $sql)) {
				$_SESSION['message']="You are successfully registered!!";
				header("Location: message.php");
			}
			else {
				$_SESSION['message']="There was some problem. Please try again!!";
				header("Location: message.php");
			}
			
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

	<!-- signup -->
	<section style="margin-bottom: 20px;">
		<div class="container h-100">
			<div class="row justify-content-md-center h-100">
				<div class="card-wrapper px-3" style="width: 500px;">
					<div class="brand" style="background-color: white;">
						<img style="padding-top: 12px;" src="Images/logo1.jpg">
					</div>
					<div class="card fat">
						<div class="card-body">
							<h4 class="card-title text-center">Sign Up</h4><hr>
							<form method="POST" action="signup.php">
							
								<div class="form-group">
									<label for="first">First Name</label>
									<div class="input-group">
								   		<div class="input-group-prepend">
											<span class="input-group-text">First</span>
								   		</div>
										<input id="first" type="text" class="form-control" name="fname" placeholder="first name" required autofocus>
									</div>
								</div>

								<div class="form-group">
									<label for="last">Last Name</label>
									<div class="input-group">
								   		<div class="input-group-prepend">
											<span class="input-group-text">Last</span>
								   		</div>
										<input id="last" type="text" class="form-control" name="lname" placeholder="last name" required>
									</div>	
								</div>

								<div class="form-group">
									<label for="email">E-Mail Address</label>
									<div class="input-group">
								   		<div class="input-group-prepend">
											<span class="input-group-text"><li class="fa fa-envelope"></li></span>
								   		</div>
									<input id="email" type="email" class="form-control" name="email" value="" placeholder="email" required>
								</div>

								<div class="form-group">
									<label for="pass">Password</label>
									<div class="input-group">
								   		<div class="input-group-prepend">
											<span class="input-group-text"><li class="fa fa-lock"></li></span>
								   		</div>
										<input id="pass" type="password" class="form-control" name="pass" placeholder="password" required>
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
									<button type="submit" name="submit" class="btn btn-primary btn-block">
										SignUp
									</button>
								</div>
								<div class="margin-top20 text-center">
									Don't have an account? <a href="login.php">Sign In</a>
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


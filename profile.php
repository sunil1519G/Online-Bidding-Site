<?php
session_start();
require 'connectDB.php';
if(!(isset($_SESSION['email'])))
{
    header("Location: index.php");
    exit();
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

    <title>Bidding Website | Your profile.</title>
  </head>
  <body>
  	
  <!-- navbar -->
  <?php require 'navbar.php'; ?>


	<!-- Profile Details -->
	<div class="container my-4">
			<?php
			
			// Code to change the code password.
			if (isset($_POST['ModalOne'])) {
	
				$oldPass= mysqli_real_escape_string($conn,$_POST['oldPass']);
				$newPass= mysqli_real_escape_string($conn,$_POST['newPass']);
				$confirmPass= mysqli_real_escape_string($conn,$_POST['confirmPass']);

				if (password_verify($oldPass,$_SESSION['password'])) {
					
					if ($newPass==$confirmPass) {
						
						$finalpass = password_hash($newPass, PASSWORD_BCRYPT);
						$sql= "UPDATE users SET password='$finalpass' WHERE email='".$_SESSION['email']."';";
						if(mysqli_query($conn,$sql))
						{
							echo "<div class='alert alert-success alert-dismissible' style='margin-top: 25px; text-align: center;'>
								  <button type='button' class='close' data-dismiss='alert'>&times;</button>
								  <strong>Password Changed Successfully!!</strong>
								</div>";
						}
						else {
							echo "<div class='alert alert-danger alert-dismissible' style='margin-top: 25px; text-align: center;'>
								  <button type='button' class='close' data-dismiss='alert'>&times;</button>
								  <strong>".mysqli_error($conn)."!!</strong>
								</div>";
						}

							
					}
					else {
						echo "<div class='alert alert-danger alert-dismissible' style='margin-top: 25px; text-align: center;'>
							  <button type='button' class='close' data-dismiss='alert'>&times;</button>
							  <strong>Alert!</strong> The password does not matched.
							</div>";
					}
				}
				else {
					echo "<div class='alert alert-danger alert-dismissible' style='margin-top: 25px; text-align: center;'>
						  <button type='button' class='close' data-dismiss='alert'>&times;</button>
						  <strong>Alert!</strong> Invalid current password.
						</div>";
				}
			}

			//Code to change Security Question
			if (isset($_POST['ModalTwo'])) {
	
				$securityQuestion= mysqli_real_escape_string($conn,$_POST['securityQuestion']);
				$answer = mysqli_real_escape_string($conn,$_POST['answer']);

					$sql= "UPDATE users SET securityques='$securityQuestion' , answer='$answer' WHERE email='".$_SESSION['email']."';";
					if(mysqli_query($conn,$sql))
					{
						echo "<div class='alert alert-success alert-dismissible' style='margin-top: 25px; text-align: center;'>
							  <button type='button' class='close' data-dismiss='alert'>&times;</button>
							  <strong>Security Question Changed Successfully!!</strong>
							</div>";
					}
					else {
						echo "<div class='alert alert-danger alert-dismissible' style='margin-top: 25px; text-align: center;'>
							  <button type='button' class='close' data-dismiss='alert'>&times;</button>
							  <strong>".mysqli_error($conn)."!!</strong>
							</div>";
					}
			}
			?>

		<div class="row">
			<!-- profile image -->
			<div class="col-md-3 col-xm-12">
				<div class="card" style="width:100%">
				    <img class="card-img-top" src="Images/img_avatar1.png" alt="Card image" style="width:100%">
				    <div class="card-body text-center">
				      <h4 class="card-title"><b><?php echo ucfirst($_SESSION['firstname'])." ".ucfirst($_SESSION['lastname']); ?></b></h4>
				      <p class="card-text">Some example text some example text. John Doe is an architect and engineer</p>
				    </div>
				</div>
			</div>

			<!-- details using accordion -->
			<div class="col-md-9 col-xm-12">
				<div id="accordion">
					<!--card1-->
				  <div class="card">
				    <div class="card-header" id="headingOne">
				      <h5 class="mb-0">
				        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
				          User Details
				        </button>
				      </h5>
				    </div>

				    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
				      	<div class="card-body">
				        	<div class="card">
				        		<div class="card-body">
				        			<?php
				        				echo "<i class='fas fa-arrow-alt-circle-right'></i> "."<b>User ID :  </b>".$_SESSION['userid']."<br>";
										echo "<i class='fas fa-arrow-alt-circle-right'></i> "."<b>First Name :  </b>".$_SESSION['firstname']."<br>";
										echo "<i class='fas fa-arrow-alt-circle-right'></i> "."<b>Last Name :  </b>".$_SESSION['lastname']."<br>";
										echo "<i class='fas fa-arrow-alt-circle-right'></i> "."<b>E-mail :  </b>".$_SESSION['email']."<br>";	
										echo "<i class='fas fa-arrow-alt-circle-right'></i> "."<b>Question :  </b>".$_SESSION['securityques']."<br>";
										echo "<i class='fas fa-arrow-alt-circle-right'></i> "."<b>Answer :  </b>".$_SESSION['answer']."<br>";
				        			?>
								</div>
							</div>
				      	</div>
				    </div>
				  </div>
				  <!--card2-->
				  <div class="card">
				    <div class="card-header" id="headingTwo">
				      <h5 class="mb-0">
				        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
				          Change User Details
				        </button>
				      </h5>
				    </div>
				    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
				      	<div class="card-body">
				        	<div class="card">
								<h5 class="card-header">Select your choice</h5>
								<div class="card-body">
								    <ul>
								    	<i class="fas fa-edit">
								    		Change your password. 
								    		<!-- Button trigger modal -->
											<button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#Modal1">
											  Change
											</button>
								    	</i><br><br>
								    	<i class="fas fa-edit">
								    		Change your security question. 
								    		<!-- Button trigger modal -->
											<button type="button" class="btn btn-sm btn-info" data-toggle="modal" data-target="#Modal2">
											  Change
											</button>
								    	</i>
								    </ul>
								</div>
							</div>										
					  	</div>
				    </div>
				  </div>
				  <!--card3-->
				  <div class="card">
				    <div class="card-header" id="headingThree">
				      <h5 class="mb-0">
				        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
				          Change Password
				        </button>
				      </h5>
				    </div>
				    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
				      <div class="card-body">
				        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
				      </div>
				    </div>
				  </div>
				</div>
			</div>	
		</div>
	</div>

<!-- Modal 1-->
<div class="modal fade" id="Modal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="top:15%;">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
	    <div class="modal-header">
	        <h5 class="modal-title text-center" id="exampleModalLabel">Change Password</h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	        	<span aria-hidden="true">&times;</span>
	        </button>
	    </div>
		<form method="POST" action="profile.php">
	    <div class="modal-body">
		    <div class="card">
			  	<div class="card-body">
					<div class="form-group">
						<label for="pass">Old Password</label>
						<input id="pass" type="password" class="form-control" name="oldPass" placeholder="password" required>
					</div>
					<div class="form-group">
						<label for="pass">New Password</label>
						<input id="pass" type="password" class="form-control" name="newPass" placeholder="password" required>
					</div>
					<div class="form-group">
						<label for="pass">Confirm Password</label>
						<input id="pass" type="password" class="form-control" name="confirmPass" placeholder="password" required>
					</div>
			  	</div>
			</div>
	    </div>
	    <div class="modal-footer">
	        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
	        <button type="submit" name="ModalOne" class="btn btn-primary">Save changes</button>
	    </div>
		</form>
    </div>
  </div>
</div>

<!-- Modal 2-->
<div class="modal fade" id="Modal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="top:15%;">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      	<div class="modal-header">
        	<h5 class="modal-title text-center" id="exampleModalLabel">Change Security Question</h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          	<span aria-hidden="true">&times;</span>
	        </button>
      	</div>
		<form method="POST" action="profile.php">
      	<div class="modal-body">
		    <div class="card">
		    	<div class="card-body">
					<div class="form-group">
						<label for="select">Security Question</label>
						<select id="select" name="securityQuestion" class="form-control">
							<option value="" selected disabled>Select a security question.</option>
				          <option value="What is your pet name?">What is your pet name?</option>
				          <option value="Where were you born?">Where were you born?</option>
				          <option value="What is your father's middle name?">What is your father's middle name?</option>									
						</select>
					</div>

					<div class="form-group">
						<label for="ans">Answer</label>
						<input id="ans" type="text" class="form-control" name="answer" placeholder="answer" required>
					</div>
				</div>
			</div>
      	</div>
      	<div class="modal-footer">
        	<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        	<button type="submit" name="ModalTwo" class="btn btn-primary">Save changes</button>
      	</div>
      	</form>
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

      	//$(".alert").fadeOut(10000);

        $("#dropdownMenuButton").mouseenter(function(){
            $("#dropdownMenuButton").css("background-color","gray");
        });
        $("#dropdownMenuButton").mouseleave(function(){
            $("#dropdownMenuButton").css("background-color","#343a40");
        });
        var flag= true;
        $("#dropdownMenuButton").click(function(){
        	if (flag) {
        		$("#slide").slideDown();
        		flag= false;
        	} else {
        		$("#slide").slideUp();
        		flag= true;
        	}
        });
        $("#slide").mouseleave(function(){
        	$("#slide").slideUp();
        	flag= true;
        });

        
    	$("#headingOne").mouseenter(function() {
    		$("#headingOne").css({"background-color":"#d4d4c9",});
        	
        });
        $("#headingTwo").mouseenter(function() { 
    		$("#headingTwo").css({"background-color":"#d4d4c9",});
        	
        });
        $("#headingThree").mouseenter(function() { 
    		$("#headingThree").css({"background-color":"#d4d4c9",});

        	
        });
        $("#headingOne").mouseleave(function() {
    		$("#headingOne").css({"background-color":"#f7f7f7"});
        });
        
        $("#headingTwo").mouseleave(function() { 
    		$("#headingTwo").css({"background-color":"#f7f7f7"});
        });
        
        $("#headingThree").mouseleave(function() { 
    		$("#headingThree").css({"background-color":"#f7f7f7"});
        });

      });
    </script>
  </body>
</html>
<?php
session_start();
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

    <title>Bidding Website | messages. </title>
  </head>
  <body>

	<?php

		if (!isset($_SESSION['email'])) {
			
	?>
  	
    
  	<!-- navbar -->
  	<?php require 'navbar.php'; ?>


	<!-- messages -->
	<div class="container h-100">
		<div class="row">
			<div class="col-md-3"></div>
			<div class="col-md-6 text-center" style="box-shadow: 1px 2px 19px 2px #ff1212; margin-top: 75px; background-color: white; color: #673ab7;">
				<h4 style="margin-top: 50px;">
					<?php echo $_SESSION['message']; ?>
				</h4><br>
				<hr>
				<a href="index.php" class="btn btn-primary" style="width: 90px;">Home</a>
				<a href="login.php" class="btn btn-success" style="width: 90px;">Login</a>
				<a href="signup.php" class="btn btn-danger" style="width: 90px;">SignUp</a> <br><br>
			</div>
			<div class="col-md-3"></div>
		</div>
	</div>

	<?php

	} else {	

	?>

	
  <!-- navbar -->
  <?php require 'navbar.php'; ?>
  
	<!-- Messages -->
	<div class="container h-100">
		<div class="row">
			<div class="col-md-3"></div>
			<div class="col-md-6 text-center" style="box-shadow: 1px 2px 19px 2px #ff1212; margin-top: 75px; background-color: white; color: #673ab7;">
				<h4 style="margin-top: 50px;">
					<?php echo $_SESSION['message']; ?>
				</h4><br>
				<hr>
				<a href="home.php" class="btn btn-primary" style="width: 95px;">Home</a>
				<a href="upload.php" class="btn btn-secondary" style="width: 95px;">Add Item</a> 
				<a href="bidstatus.php" class="btn btn-danger" style="width: 95px;">Bid Status</a>
				<a href="myProductLists.php" class="btn btn-info" style="width: 95px;">My Products</a> <br><br>
			</div>
			<div class="col-md-3"></div>
		</div>
	</div>

	<?php
		}
	?>

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
      });
    </script>
  </body>
</html>
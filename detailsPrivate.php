<?php
session_start();
require 'connectDB.php';

if(!(isset($_SESSION['email'])))
{
    header("Location: index.php");
    exit();
}
else {

	$productID = $_GET['productid'];
	$productCat = $_GET['pc'];

	if ($productID==null || $productCat==null) {
		header("Location: home.php");
		exit();
	}
	else {

			
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
    <link rel="stylesheet" type="text/css" href="css/countdown.css">
    <link rel="stylesheet" type="text/css" href="css/fontawesome-all.min.css">

    <!-- Favicon -->
    <link rel="icon" type="image/ico" sizes="32x32" href="favicon.ico">
    
    <!-- for zooming image -->
    <link type="text/css" rel="stylesheet" href="css/magiczoom.css"/>
    <script type="text/javascript" src="js/magiczoom.js"></script>
    <style type="text/css">
    	.invert a:hover {
    		background-color: gray;
    	}

    	.invert a{
    		height: 45px;
    	}
    </style>

    <title>Bidding Website | Product details.</title>
  </head>
  <body>

  <!-- navbar -->
  <?php require 'navbar.php'; ?>

	<!-- card pannel -->
	<div class="container">
		<div class="row mt-3">
			<div class="col-md-8">
				<div class="card text-center">
				  	<div class="card-header">
					<?php

						$sql1= "SELECT * FROM products WHERE productid=$productID;";
						$result1= mysqli_query($conn, $sql1);

						if(!mysqli_query($conn,$sql1))
						{
							$_SESSION['message']= mysqli_error($conn)."<br>Query Execution failed!!";
							header("Location: message.php");
							exit();
						}

						if (mysqli_num_rows($result1)>0) {
						
							$ans1=mysqli_fetch_assoc($result1);

							echo "<b>".$ans1['product_name']."</b>";

					?>
				  	</div> <!--card header close -->
				  	<div class="card-body"> <!-- display product Image -->
						<div class='row'>
							<div class='col-md-2'></div>
							<div class='col-md-8'>
							<?php
								echo "<a class='MagicZoom' id='zoom' data-options='zoomDistance: 150' href='Images/".$productCat."/".$ans1['image']."'>
				                  		<img class='d-block w-100' src='Images/".$productCat."/".$ans1['image']."' alt='".$ans1['product_name']."' title='".$ans1['product_name']."'>
				                	</a>";
				            ?>
		              		</div>
		                <div class='col-md-2'></div>
		              </div>
			      	</div>
					<div class="card-footer text-muted">
					    1
				  	</div>
				</div>

				<div class="card my-3">
				  	<div class="card-header text-center">
					  	<b>Item Details</b>
				  	</div> <!--card header close -->
				  	<div class="card-body">
						<?php

							list($date,$time) = explode(' ', $ans1['finishtime']);
							list($y,$m,$d) = explode('-', $date);
							list($hour,$min,$sec) = explode(':', $time);
							$dbSessionDurationTime = mktime($hour,$min,$sec,$m,$d,$y);
							//$_SESSION['time']= $dbSessionDurationTime;
							
                            echo "<i class='fas fa-arrow-alt-circle-right'></i> "."<b>Product ID :  </b>".$ans1['productid']."<br>";
                            echo "<i class='fas fa-arrow-alt-circle-right'></i> "."<b>Product Name :  </b>".$ans1['product_name']."<br>";
                            echo "<i class='fas fa-arrow-alt-circle-right'></i> "."<b>Product Price :  </b>".$ans1['price']."<br>";
                            echo "<i class='fas fa-arrow-alt-circle-right'></i> "."<b>Product Category :  </b>".$ans1['product_cat']."<br>";  
                            echo "<i class='fas fa-arrow-alt-circle-right'></i> "."<b>Product Description :  </b>".$ans1['description']."<br>";
                            
                            echo "<br><h5>Owner Details: </h5>";

							// SQL Query to get owner name and email address.
							$sql2= "SELECT firstname, lastname, email FROM users WHERE userid=".$ans1['userid'].";";

							if(!$result2=mysqli_query($conn,$sql2))
							{
								$_SESSION['message']= mysqli_error($conn)."<br>Query Execution failed!!";
								header("Location: message.php");
								exit();
							}
							else {

								if (mysqli_num_rows($result2)>0) {
								
									$ans2=mysqli_fetch_assoc($result2);

		                            echo "<i class='fas fa-arrow-alt-circle-right'></i> "."<b>Owner Name :  </b>".ucfirst($ans2['firstname'])." ".ucfirst($ans2['lastname'])."<br>";
		                            echo "<i class='fas fa-arrow-alt-circle-right'></i> "."<b>Email :  </b>".$ans2['email']."<br>";
								}
							}
						}
						else {

							echo "<h3> The Item has been removed by the Owner. </h3>";
						}
					}
				}

                        ?>
				  	</div>
				</div>
			</div>

			<div class="col-md-4">
				<div class="card text-center">
					<div class="card-header">
						<b>Bid Details</b>
					</div>
					<div class="card-body">
						<table style="position:relative; width: 80%; margin: 5px auto; text-align:left;" >
							<tr>
								<td width="60%">Original price :</td>
								<td>1000000000000</td>
							</tr>
							<tr>
								<td>Current Bid Value :</td>
								<td>5</td>
							</tr>
							<tr>
								<td>Next Bid Value :</td>
								<td>6</td>
							</tr>
						</table>
						<a href="#" id="bid" type="button" class="btn btn-danger btn-block">Bid</a><br>
						<hr>
						<a href="#" type="button" class="btn btn-block">Add to Wish List</a><br>
					</div>
				</div>
				<div class="card mt-3">
				  	<div class="card-header text-center">
					  	<b>Bidding Duration</b>
				  	</div> <!--card header close -->
				  	<div class="card-body">
						<div id="countdown">
						  	<div id='tiles'></div>
						  	<div class="labels">
						    	<li>Days</li>
						    	<li>Hours</li>
						    	<li>Mins</li>
						    	<li>Secs</li>
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

		// Set the date we're counting down to
		var countDownDate = <?php echo $dbSessionDurationTime; ?>*1000;
		console.log("final time: "+countDownDate);
		// Update the count down every 1 second
		var x = setInterval(function() {

		  // Get todays date and time
		  var now = new Date().getTime();
		  console.log("current time: "+now);
		  // Find the distance between now an the count down date
		  var distance = countDownDate - now;

		  // Time calculations for days, hours, minutes and seconds
		  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		  // Display the result in the element with id="timer"
		  $('#tiles').html("<span>" + days + "</span><span>" + hours + "</span><span>" + minutes + "</span><span>" + seconds + "</span>");

		  // If the count down is finished, write some text 
		  if (distance < 0) {
		    clearInterval(x);
		    $('#countdown').html("<h3 style='color:red; padding-top: 10px;'>Bidding Over</h3>");
		  }
		}, 1000);

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
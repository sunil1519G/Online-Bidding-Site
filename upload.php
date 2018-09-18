<?php
session_start();
require 'connectDB.php';
if(!(isset($_SESSION['email'])))
{
    header("Location: index.php");
    exit();
}else {

	if (isset($_POST['submit'])) {

		// Get all the submitted data
		$userid= $_SESSION['userid'];
		$productName= $_POST['pname'];
		$price= $_POST['price'];
		$bidinc= $_POST['bidinc'];
		$image= $_FILES['image']['name'];
		$productCategory= $_POST['productCategory'];
		$description= $_POST['description'];
		$visibility= $_POST['visibility'];	//to make product public or private 
		$finishTime = $_POST['finishTime'];

		// Create the folders for the categories if not created.
		if (!file_exists('Images/'.$productCategory)) {
		    mkdir('Images/'.$productCategory, 0777, true);
		}

		// the path to store uploaded image
		$target= "Images/".$productCategory."/".basename($_FILES['image']['name']);

		if ($visibility=='private') {	// Putting the items in 'privateproducts' table i.e, not visible for bidding
			
			//SQL Query 
			$sql= "INSERT INTO privateproducts(userid, product_name, price, bid_inc, image, product_cat, description) VALUES ('$userid','$productName','$price','$bidinc','$image','$productCategory','$description')";

			if(mysqli_query($conn,$sql)) {

				if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
					$_SESSION['message']="Item added successfully!!";
					header("Location: message.php");
					exit();	
				} else {
					$_SESSION['message']="There was a problem in uploading image!!";
					header("Location: message.php");
					exit();
				}
				
			} else {
				$_SESSION['message']= mysqli_error($conn)."<br>Values inserting error in table!!";
				header("Location: message.php");
				exit();
			}
		} 
		else if ($visibility=='public') {	// Putting the items in 'products' table for bidding
			//SQL Query 
			$sql= "INSERT INTO products(userid, product_name, price, bid_inc, image, finishtime, product_cat, description) VALUES ('$userid','$productName','$price','$bidinc','$image','$finishTime','$productCategory','$description')";

			if(mysqli_query($conn,$sql)) {

				if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
					$_SESSION['message']="Item added successfully!!";
					header("Location: message.php");
					exit();	
				} else {
					$_SESSION['message']="There was a problem in uploading image!!";
					header("Location: message.php");
					exit();
				}
				
			} else {
				$_SESSION['message']= mysqli_error($conn)."<br>Values inserting error in table!!";
				header("Location: message.php");
				exit();
			}
		
		} else {
			$_SESSION['message']="visibility selection erro!!";
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

    <title>Bidding Website | Upload products.</title>
  </head>
  <body>
  	
  <!-- navbar -->
  <?php require 'navbar.php'; ?>

	<!-- Upload data -->
	<section style="margin-bottom: 40px; margin-top: 40px;">
		<div class="container h-50">
			<div class="row justify-content-md-center">
				<div class="col-md-3"></div>
				<div class="col-md-6 card-wrapper">
					<div class="card fat">
						<div class="card-body">
							<h4 class="card-title text-center">Upload Details</h4>
							<hr>
							<form method="POST" action="upload.php" enctype="multipart/form-data">
							
								<div class="form-group">
									<label for="first">Product Name</label>
									<div class="input-group ">
										<div class="input-group-prepend">
									    	<span class="input-group-text">Name</span>
									  	</div>
										<input id="first" type="text" class="form-control" name="pname" placeholder="product name" required autofocus>
									</div>
								</div>
								<hr>
								<div class="form-group">
									<div class="row">
										<div class="col-md-6">
											<label for="last">Price</label>
											<div class="input-group ">
												<div class="input-group-prepend">
											    	<span class="input-group-text">$</span>
											  	</div>

												<input id="last" type="text" class="form-control" name="price" placeholder="price" required>
											</div>
										</div>
										<div class="col-md-6">
											<label for="bidinc">Bid Increment</label>
											<input id="bidinc" type="number" class="form-control" name="bidinc" placeholder="bid increment" required>
										</div>
									</div>
								</div>
								<hr>
								<div class="input-group">
									<label>Set Product Visibility</label> &nbsp;&nbsp;
								  	<div class="input-group-prepend"data-toggle='tooltip' data-placement='right' title='Your product will not be visible to other people.'>
									    <div class="input-group-text">
									    <input type="radio" id="visibilityPri" name="visibility" value="private">
									    </div>
								  	</div> &nbsp;Private &nbsp;

								  	<div class="input-group-prepend" data-toggle='tooltip' data-placement='right' title='Your product will be visible to other people and they can bid on it.'>
									    <div class="input-group-text">
									    <input type="radio" id="visibilityPub" name="visibility" value="public">
									    </div>
								  	</div> &nbsp;Public
								</div>
								<div id="visible">
							  		<div class="form-group">
										<div class="row mx-auto">
											<div class="col-md-12">
												<label for="fs">Bidding Finish Time</label>
												<input id="fs" type="datetime-local" class="form-control" name="finishTime">
											</div>
										</div>
									</div>
							  	</div>
								<hr>
								<div class="input-group mb-3">
								  	<div class="input-group-prepend">
								    	<span class="input-group-text">Upload</span>
								  	</div>
								  	<div class="custom-file">
								    	<input type="file" class="custom-file-input" name="image" id="spi" required>
								    	<label class="custom-file-label" for="spi">Choose file</label>
								  	</div>
								</div>
								<hr>
								<label for="select">Product Category</label><br>
								<div class="input-group mb-3">
								  	<div class="input-group-prepend">
								    	<label class="input-group-text" for="select">Options</label>
								  	</div>
								  	<select id="select" name="productCategory" class="custom-select" required>
								    	<option value="" selected disabled>Select a Product Category</option>
							            <option value="Cars">Cars</option>
							            <option value="Earphones and Headphones">Earphones and Headphones</option>
							            <option value="Laptops">Laptops</option>
							            <option value="Mobile">Mobile</option>
							            <option value="Nature">Nature</option>
							            <option value="Shoes">Shoes</option>
							            <option value="Watch">Watch</option>
							            <option value="Others">Others</option>
								  	</select>
								</div>
								<hr>
								<div class="form-group">
								    <label for="textarea1">Description</label>
								    <textarea class="form-control" id="textarea1" rows="2" name="description"></textarea>
								</div>
								<hr>
								<div class="form-group text-center">
									<button class="btn btn-primary" type="submit" name="submit">Add Item</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div class="col-md-3"></div>
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


        $('#visible').hide();
    	$('#visibilityPub').click(function() {
    		$('#visible').show();
    	});
    	$('#visibilityPri').click(function() {
    		$('#visible').hide();
    	});
      });
      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      });
    </script>
  </body>
</html>
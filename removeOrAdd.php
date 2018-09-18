<?php

session_start();
require 'connectDB.php';

if(!(isset($_SESSION['email']))) {
	header("Location: login.php");
	exit();
}
else {

	$pid = $_GET['pid'];
	$action = $_GET['action'];
	$table = $_GET['t'];
	$finishTime = $_POST['finishTime'];

	if ($table=='public') {

		//SQL Query 
		$sql= "DELETE FROM `products` WHERE `products`.`productid` = $pid";

		if(mysqli_query($conn,$sql)) {

			$_SESSION['message']= "Product deleted Sucessfully!!";
			header("Location: message.php");
			exit();
			
		} else {
			$_SESSION['message']= mysqli_error($conn)."<br>Deletion error in table!!";
			header("Location: message.php");
			exit();
		}

	} else if ($table=='private') {
		
		if ($action=='delete') {
			
			//SQL Query 
			$sql= "DELETE FROM `privateproducts` WHERE `privateproducts`.`productid` = $pid";

			if(mysqli_query($conn,$sql)) {

				$_SESSION['message']= "Product deleted Sucessfully!!";
				header("Location: message.php");
				exit();
			
			} else {
				$_SESSION['message']= mysqli_error($conn)."<br>Deletion error in table!!";
				header("Location: message.php");
				exit();
			}
		}
		else if ($action=='add') {

			//SQL Query
			$sql1 = "SELECT * FROM privateproducts WHERE productid=$pid";
			$sql2= "DELETE FROM `privateproducts` WHERE `privateproducts`.`productid` = $pid";

			$result = mysqli_query($conn,$sql1);

			if(mysqli_num_rows($result)>0) {

				$ans1 = mysqli_fetch_assoc($result);
				$sql3= "INSERT INTO products(userid, product_name, price, bid_inc, image, finishtime, product_cat, description) VALUES ('".$ans1['userid']."','".$ans1['product_name']."','".$ans1['price']."','".$ans1['bid_inc']."','".$ans1['image']."','$finishTime','".$ans1['product_cat']."','".$ans1['description']."')";

				if (mysqli_query($conn,$sql2) && mysqli_query($conn,$sql3)) {
					
					$_SESSION['message']= "Product Added for Bidding Sucessfully!!";
					header("Location: message.php");
					exit();
				}
				else {
					$_SESSION['message']= mysqli_error($conn)."<br>Table modification error!!";
					header("Location: message.php");
					exit();		
				}
			} else {
				$_SESSION['message']= "Something went wrong!";
				header("Location: message.php");
				exit();
			}

		}
		else {
			$_SESSION['message']= "Something went wrong!";
			header("Location: message.php");
			exit();
		}
	}
	else {
		$_SESSION['message']= "Something went wrong!";
		header("Location: message.php");
		exit();
	}
	
}

?>
<?php
session_start();
require 'connectDB.php';
if(!(isset($_SESSION['email'])))
{
    header("Location: index.php");
    exit();
}

  $product_cat= $_GET['pc'];

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

    <title>Bidding Website | Product lists. </title>
  </head>
  <body>

  <!-- navbar -->
  <?php require 'navbar.php'; ?>

	<!-- Cart details -->
	<div class="container">
		<div class="row bg-white my-3">
			<div class="col-12">
        <h3 class="text-center"><span class="align-middle">All <?php echo $product_cat; ?> List</span></h3>
        <hr>
        <?php 
              // sql query to fetch the products
              $sql= "SELECT * FROM products WHERE product_cat='$product_cat';";
              $result2= mysqli_query($conn, $sql);

              if(!mysqli_query($conn,$sql))
              {
                $_SESSION['message']= mysqli_error($conn)."<br>Query Execution failed!!";
                header("Location: message.php");
                exit();
              }
              else {

                if (mysqli_num_rows($result2)>0) {
                
                  while ($ans2=mysqli_fetch_assoc($result2)) {  //This will display all the items of a product category.  
        ?>
                  <div class="card p-3 px-5 m-3" style='box-shadow: 0 .5rem 1rem rgba(0,0,0,.6)!important;'>
                    <div class="card-body">  
                      <div class='row'>
                        <div class="col-xl-2 hidden-xs"></div>
                        <div class='col-xl-4 col-md-6'>
                          <div class='border border-dark text-center' style='box-shadow: 0 .5rem 1rem rgba(0,0,0,.3)!important;'>
                              <?php echo "<a href='detailsPublic.php?productid=".$ans2['productid']."&pc=".$product_cat."'>
                                    <img src='Images/".$product_cat."/".$ans2['image']."' alt='".$ans2['product_name']."' title='".$ans2['product_name']."' height='260' width='298'>
                                  </a>"
                              ?>
                          </div>
                        </div>
                        
                        <div class='col-xl-4 col-md-6'>
                          <?php
                            echo "<i class='fas fa-arrow-alt-circle-right'></i> "."<b>Product ID :  </b>".$ans2['productid']."<br>";
                            echo "<i class='fas fa-arrow-alt-circle-right'></i> "."<b>Product Name :  </b>".$ans2['product_name']."<br>";
                            echo "<i class='fas fa-arrow-alt-circle-right'></i> "."<b>Product Price :  </b>".$ans2['price']."<br>";
                            echo "<i class='fas fa-arrow-alt-circle-right'></i> "."<b>Product Category :  </b>".$ans2['product_cat']."<br>";  
                            echo "<i class='fas fa-arrow-alt-circle-right'></i> "."<b>Product Description :  </b>".$ans2['description'];

                            echo "<br><br>";
                            echo "<a class='btn btn-success' href='detailsPrivate.php?productid=".$ans2['productid']."&pc=".$product_cat."'>
                                  Full Description  </a> ";
                          ?>
                        </div>
                      </div>
                    </div>
                  </div>
            <?php
                  } 
                }
              }
              
            ?>
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
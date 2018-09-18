<?php
session_start();
require 'connectDB.php';
$_SESSION['message']= "No Errors!!";


// sql query to fetch no. of product categories
$sql= "SELECT DISTINCT(product_cat) FROM products;";
$result1= mysqli_query($conn, $sql);
$numOfCategoris= mysqli_num_rows($result1);

if(!mysqli_query($conn,$sql))
{
	$_SESSION['message']= mysqli_connect_error($conn)."<br>Query Execution failed!!";
	header("Location: message.php");
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

    <link type="text/css" rel="stylesheet" href="css/scroll.css"/>
    <script type="text/javascript" src="js/scroll.js"></script>
    <style type="text/css">
    	.invert a:hover {
    		background-color: gray;
    	}

    	.invert a{
    		height: 45px; 
    	}
    </style>

    <title>Online Bidding Website!!!</title>

  </head>
  <body>
  	
  	<!-- navbar -->
  	<?php require 'navbar.php'; ?>

	<!-- carousels -->
  <div class="container">
  <!-- carousel 1 -->
  <?php
	
  	while ($ans1= mysqli_fetch_assoc($result1)) {
  		
  		$val= $ans1['product_cat'];
	?>

  <div class="container bg-white my-4" style="box-shadow: 0 .5rem 1rem rgba(0,0,0,.2)!important;">
      <div class="row">
          <div class="col"></div>
          <div class="col-8"><h3 class="text-center"><span class="align-middle"><?php echo $val; ?></span></h3></div>
          <div class="col pt-3">
            <div class="clearfix">
                <span class="float-right"><?php echo "<a href='itemlistPublic.php?pc=".$val."'> >see all</a>"; ?></span>
            </div>
          </div>
      </div>
      <hr>

      <div class="MagicScroll mb-2" data-options="mode: scroll; speed: 500;loop: off; height: 250;">
                    	
			<?php	
				// sql query to fetch the products
				$sql= "SELECT * FROM products WHERE product_cat='$val';";
				$result2= mysqli_query($conn, $sql);

				if(!mysqli_query($conn,$sql))
				{
					$_SESSION['message']= "Query Execution failed!!";
					header("Location: message.php");
					exit();
				}

				if (mysqli_num_rows($result2)>0) {
					
					while ($ans2=mysqli_fetch_assoc($result2)) {

						echo "<div class='p-2 mx-2 border border-primary' style='height: 230px; width: 180px; box-shadow: 0 .5rem 1rem rgba(0,0,0,.4)!important;'>
                    <a href='detailsPublic.php?productid=".$ans2['productid']."&pc=".$val."' data-toggle='tooltip' data-placement='right' title='".$ans2['product_name']."'>    
                    <div class='p-0 my-0 mx-auto' style='height: 180px; width: 170px;'>
                        <img src='Images/".$val."/".$ans2['image']."'/>
                    </div>
                  <div style='height: 40px; background-color: yellow;'>Name: ".$ans2['product_name']."<br>price: ".$ans2['price']."<br>category: ".$ans2['product_cat']."</div>
                  </a>
                  </div>";
				    }
				}
				
			?>
      </div>
    </div>
<?php
}
?>
    
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
      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      });
    </script>
  </body>
</html>
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

    <title>Bidding Website | Product lists. </title>
  </head>
  <body>

  <!-- navbar -->
  <?php require 'navbar.php'; ?>

	<!-- Cart details -->
	<div class="container">
		<div class="row bg-white my-3">
			<div class="col-12">
        <h3 class="text-center"><span class="align-middle">My Product Lists</span></h3>
        <hr>
          <div class="row mx-5 text-white">
            <div class="col-6 text-center px-0">
              <button id="btn1" class="btn btn-dark btn-block rounded-0 p-3"><b>Public Products</b></button>
            </div>
            <div class="col-6 text-center px-0">
              <button id="btn2" class="btn btn-dark btn-block rounded-0 p-3"><b>Private Products</b></button>
            </div>
          </div>
          <br>

          <!-- Public Product list -->
          <div class="row" id="publiclist">
            <div class="col-1"></div>
            <div class="col-10 text-center">
              <table class="table table-sm table-primary table-bordered table-hover text-left">
                <thead class="thead-dark">
                  <tr class="text-center">
                    <th scope="col">PID</th>
                    <th scope="col">Product name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category</th>
                    <th scope="col">Abort Bid</th>
                  </tr>
                </thead>
                <tbody>
        <?php 
              // sql query to fetch the products on which bidding is going on.
              $sql1= "SELECT * FROM products WHERE userid=".$_SESSION['userid'].";";
              $result1= mysqli_query($conn, $sql1);

              if(!mysqli_query($conn,$sql1))
              {
                $_SESSION['message']= mysqli_error($conn)."<br>Query Execution failed!!";
                header("Location: message.php");
                exit();
              }
              else {

                if (mysqli_num_rows($result1)>0) {
                
                  while ($ans1=mysqli_fetch_assoc($result1)) {  //This will display all the items of a product category.  
        ?>
                     <tr class="text-center">
                        <td><?php echo $ans1['productid']; ?></td>
                        <td><?php echo $ans1['product_name']; ?></td>
                        <td><?php echo $ans1['price']; ?></td>
                        <td><?php echo $ans1['product_cat']; ?></td>
                        <td class="text-center"><?php echo '<a href="removeOrAdd.php?pid='.$ans1['productid'].'&action=delete&t=public"><li class="fa fa-trash-alt"></li></a>'; ?></td>
                      </tr>
            <?php
                  }  
            ?>
              </tbody>
            </table>
            <?php
                }       
                else { 
                    echo "<h4> No Items Present. </h4>";
                }
              }              
            ?>
          </div>
          <div class="col-1"></div>
        </div>
        <br>

        <!-- Private Products Lists -->
        <div class="row" id="privatelist">
            <div class="col-1"></div>
            <div class="col-10 text-center">
              <table class="table table-sm table-danger table-bordered table-hover text-left">
                <thead class="thead-dark">
                  <tr class="text-center">
                    <th scope="col">PID</th>
                    <th scope="col">Product name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category</th>
                    <th scope="col">Action </th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
        <?php 

              // sql query to fetch the products which are private.
              $sql2= "SELECT * FROM privateproducts WHERE userid=".$_SESSION['userid'].";";
              $result2= mysqli_query($conn, $sql2);

              if(!mysqli_query($conn,$sql2))
              {
                $_SESSION['message']= mysqli_error($conn)."<br>Query Execution failed!!";
                header("Location: message.php");
                exit();
              }
              else {

                if (mysqli_num_rows($result2)>0) {
                
                  while ($ans2=mysqli_fetch_assoc($result2)) {  //This will display all the items of a product category.  
        ?>
                     <tr class="text-center">
                        <td><?php echo $ans2['productid']; ?></td>
                        <td><?php echo $ans2['product_name']; ?></td>
                        <td><?php echo $ans2['price']; ?></td>
                        <td><?php echo $ans2['product_cat']; ?></td>
                        <!-- we have to change the model id everytime otherwise it will always pick the firts row of the table -->
                        <td>
                          <button class="btn btn-success btn-sm" data-toggle="modal" <?php echo "data-target='#Modal".$ans2['productid']."'"; ?>>Select</button>
                        </td>
                        <td><?php echo '<a href="removeOrAdd.php?pid='.$ans2['productid'].'&action=delete&t=private"><li class="fa fa-trash-alt"></li></a>'; ?></td>
                      </tr>

                      <!-- Modal -->
                      <div class="modal fade" <?php echo "id='Modal".$ans2['productid']."'"; ?> tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="top:15%;">
                        <div class="modal-dialog" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title text-center" id="exampleModalLabel">Set Timestamp</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                          <form method="POST" <?php echo 'action="removeOrAdd.php?pid='.$ans2['productid'].'&action=add&t=private"'; ?>>
                            <div class="modal-body">
                              <div class="card" style="box-shadow: 0 .5rem 1rem rgba(0,0,0,.5)!important;">
                                <div class="card-body">
                                  <div class="form-group">
                                    <label for="fs">Bidding Finish Time</label>
                                    <input id="fs" type="datetime-local" class="form-control" name="finishTime" required>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" name="ModalOne" class="btn btn-primary">Add for Bidding</button>
                            </div>
                          </form>
                          </div>
                        </div>
                      </div>

            <?php
                  }
            ?>
              </tbody>
            </table>
            <?php 
                }
                else {
                    echo "<h4> No Items Present. </h4>";
                }
              }              
            ?>
          </div>
          <div class="col-1"></div>
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


        $('#privatelist').hide();
        $('#btn1').css({"color":"black","background-color":"white"});

        $('#btn1').click(function() {
          $('#publiclist').show();
          $('#privatelist').hide();
          $('#btn1').css({"color":"black","background-color":"white"});
          $('#btn2').css({"color":"white","background-color":"#343a40"});
        });
        $('#btn2').click(function() {
          $('#privatelist').show();
          $('#publiclist').hide();
          $('#btn2').css({"color":"black","background-color":"white"});
          $('#btn1').css({"color":"white","background-color":"#343a40"});
        });
      });
    </script>
  </body>
</html>
<!-- navbar -->

<?php 

  if (isset($_SESSION['email'])) {
?>    
  	<nav class="navbar navbar-expand-sm navbar-dark bg-dark sticky-top p-0">
    <a style="padding: 0px;" href="home.php"><img src="Images/logo1.jpg" height="45px" width="100px"></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active invert">
          <a class="nav-link text-center" href="home.php"><h6 style="margin-top: 7px;"><i class="fa fa-home"></i>&nbsp; Home</h6> <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item invert">
          <a class="nav-link text-center" href="#"><h6 style="margin-top: 7px;">Link</h6></a>
        </li>
      </ul>
      <div class="invert">
        <a class="btn btn-dark btn-block" href="bidstatus.php" type="button">
          <h6 style="margin-top: 7px;"><i class="fas fa-list"></i> Bid Stats</h6></a>
      </div>
      <div class="invert dropdown">
      <button class="btn btn-dark btn-block dropdown-toggle rounded-0" style="height: 45px;" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <b><?php echo ucfirst($_SESSION['firstname'])." ".ucfirst($_SESSION['lastname']); ?></b>
      </button>
        <div class="dropdown-menu" id="slide" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="profile.php">Profile</a>
          <a class="dropdown-item" href="upload.php">Upload Items</a>
          <a class="dropdown-item" href="myProductLists.php">My Product List</a>     
          <a class="dropdown-item" href="#">Setting</a>
          <a class="dropdown-item" href="#">help?</a>
        </div>
      </div>
      <div class="invert">
        <a class="btn btn-dark btn-block" href="logout.php" type="button"><h6 style="margin-top: 7px;">Logout &nbsp;<i class="fa fa-sign-out-alt fa-lg"></i></h6></a>
      </div>
    </div>
  </nav>

<?php 

  }
  else {
?>
  
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark sticky-top p-0">
    <a style="padding: 0px;" href="."><img src="Images/logo1.jpg" height="45px" width="100px"></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto" style="text-align: center">
        <li class="nav-item active invert">
          <a class="nav-link text-center" href="."><h6 style="margin-top:7px;"><i class="fa fa-home"></i>&nbsp; Home</h6> <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item invert">
          <a class="nav-link text-center" href="#"><h6 style="margin-top:7px;">About</h6></a>
        </li>
      </ul>
      <div class="invert">
        <a class="btn btn-dark btn-block" href="login.php" type="button">
          <h6 style="margin-top:7px;">SignIn &nbsp;<i class="fas fa-sign-in-alt fa-lg"></i></h6>
        </a>
    </div>
    <div class="invert">
      <a class="btn btn-dark btn-block" href="signup.php" type="button">
        <h6 style="margin-top:7px;"><i class="fas fa-plus"></i> &nbsp;SignUp</h6>
      </a> 
      </div>
    </div>
  </nav>

<?php
}
?>
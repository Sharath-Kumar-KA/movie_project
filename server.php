<?php
session_start();
// initializing variables
$username = "";
$email = "";
$errors = array();

//connect to db
$db = mysqli_connect('localhost','root','','practise2') or die("could not connect to db");

// Register user
if(isset($_POST['reg_user']))
{
$username = mysqli_real_escape_string($db, $_POST['username']);
$email = mysqli_real_escape_string($db, $_POST['email']);
$password_1 = mysqli_real_escape_string($db,$_POST['password_1']);
$password_2 = mysqli_real_escape_string($db,$_POST['password_2']);

// form validation
if(empty($username)){array_push($errors,"Usernmae is required");}
if(empty($email)){array_push($errors,"email i required");}
if(empty($password_1)){ array_push($errors,"password i required");}
if($password_1 != $password_2){array_push($errors,"Passwords do not match");}

// check db for existing username eith user

$user_check_query = "SELECT * FROM user2 WHERE username='$username' or  email='$email' LIMIT 1";

$result = mysqli_query($db, $user_check_query);
$user = mysqli_fetch_assoc($result);

if($user)
{
    if($user['username'] === $username)
    {
     array_push($errors,"Username already exists");
    }
    if($user['email'] === $email)
    {
     array_push($errors,"This email id already has a registered username");
    }
}

// Register the user if no error
if(count($errors)==0)
{
    $password = md5($password_1); // this will encrypt password
    $query = "INSERT INTO user2 (username,email,password) VALUES ('$username' ,'$email','$password')";

    mysqli_query($db,$query);
    $_SESSION['username'] = $username;
    $_SESSION['success'] = " You are now logged in";

    header('location:index2.php');
}
}

// login user
if(isset($_POST['login_user']))
{
   $username = mysqli_real_escape_string($db,$_POST['username']);
   $password_1 = mysqli_real_escape_string($db,$_POST['password_1']);
   if(empty($username))
   {
       array_push($errors,"username is required");
   }
   if(empty($password_1))
   {
       array_push($errors,"Password is required");
   }
   if(count($errors)==0)
   {
       $password = md5($password_1);
       $query = "SELECT * FROM user2 WHERE username='$username' AND password='$password'";
       $results = mysqli_query($db,$query);
       if(mysqli_num_rows($results))
       {
           $_SESSION['username'] = $username;
           $_SESSION['success'] = "logged in successfully";  
          header('location:searchHtml.html');
    }
else
{
    array_push($errors,"wrong username or password, please try again");
}
}
}
?>
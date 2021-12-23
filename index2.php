<?php

session_start();

if(isset($_SESSION['username']))
{
    $_SESSION['msg'] = "you must log in first";
    header("location:index.php");
}

if(isset($_GET['logout']))
{
    session.destroy();
    unset($_SESSION['username']);
    header("location:index.php");
}

?>
<!Doctype html>
<html>
    <head>
        <title>Home page</title>
    </head>
    <body>
       <h1>This is a home page</h1> 
       <?php
       if(isset($_SESSION['success'])):
       ?>
       <div>
           <h3>
               <?php
               echo $_SESSION['success'];
               unset($_SESSION['success']);
               ?>
           </h3>
       </div>
        <?php endif ?>

        // if user logs in print info
        <?php if(isset($_SESSION['username'])):?>
            <h3>Welcome<?php echo $_SESSION['username']; ?></h3>
            <button> <a href="index2.php?logout='1'"></a> </a></button>

      <?php endif ?>
    </body>
</html>
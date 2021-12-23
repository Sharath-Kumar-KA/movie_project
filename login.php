<? php include('server.php')?>
<!DOCTYPE html>
<html>
  <head>
    <!--<link rel="stylesheet" href="stylesheet.css" />-->
  </head>
  <body>
    <title>Registration</title>
 
    <div class="container">
      <div class="header">
        <h2>Log in</h2>
      </div>
      <form action="login.php" method="post">
        <div>
          <label for="username">Username</label>
          <input type="text" name="username" required>
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" name="password_1" required>
        </div>
        <button type="submit" name="login_user">Login</button>

        <p> Not a user<a href="index.php"><b>Register Here</b></p>
      </form>
    </div>
    </body>
    </html>


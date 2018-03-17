<?php
  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (empty($_POST['message'])) {
      $message = "You didn't enter a message!";
    } else {
      $message = trim($_POST['message']);
    }

    http_response_code(200);
    echo "Your Message:<br><br>" . $message . "<br><br>(I'm from the PHP file)";
  } else {
    http_response_code(403);
    echo 'There was a problem with your submission, please try again.';
  }
?>
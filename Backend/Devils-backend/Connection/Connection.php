<?php

# ---- Setup Database Connection ---- // 

$ServerName = "localhost";

$username = "root";

$password = "";

$Database = "devils" ; 

// ---- Connect to Database ---- // 

$conn = new mysqli($ServerName, $username, $password , $Database);

// Check Database Connection .... 

if ($conn->connect_error) {

  die("Connection failed: " . $conn->connect_error);

}

?>
<?php

// **** Setup Database connection **** // 
require "./Connection/Connection.php" ; 

// ---- Get option value ---- // 

$Admin_option = $_POST['Option'] ; 

if ($Admin_option == "Insert_watchlist"){

    $User_table = $_POST['User_table'] ; 

    $Product_id = $_POST['Product_id'] ; 
    
    $Category_id = $_POST['Category_id'] ; 

    mysqli_autocommit($conn, false) ; 

    try{

        // Query 1. Insert data query 

        $Insert_watchlist_query = "INSERT INTO `$User_table` (`User_key`, `Option`, `Data1`, `Data2`, `Data3`, `Data4`, `Data5`, `Data6`, `Data7`, `Data8`, `Data9`, `Data10`, `Data11`, `Data12`, `Data13`, `Data14`, `Data15`)
         VALUES (NULL, 'watchlist', '$Product_id', '$Category_id', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL) " ; 

        $Insert_watchlist_query = mysqli_query($conn, $Insert_watchlist_query) ; 

        mysqli_commit($conn) ; 

        // Message 

        echo "Insert watchlist" ;  

    }catch(Exception $e){

        // Message 

        mysqli_rollback($conn) ; 

        echo "Network request failed" ; 
    }
}   else if ($Admin_option == "Delete-watchlist-product"){
    // **** Request for Delete watchlist product **** // 

    $Category_id = $_POST['Category_id'] ; 

    $Product_id = $_POST['Product_id'] ; 

    $User_id = $_POST['User_id'] ; 

    mysqli_autocommit($conn, false) ; 

    try{

        $Delete_watchlist_product_query = "DELETE FROM `$User_id` WHERE `Data1` = '$Product_id' AND `Data2` = '$Category_id' " ; 
        $Delete_watchlist_product_query = mysqli_query($conn, $Delete_watchlist_product_query) ; 

        mysqli_commit($conn) ; 

        echo "Remove watchlist" ; 

    }catch(Exception $e){

        echo "Network request failed" ; 
    }
}   else if ($Admin_option == "Insert-cart-item"){

    // **** Request for add product to cart option **** // 

    // Option   =   cart-item
    // Data1    =   Product-id
    // Data2    =   Category-id
    // Data3    =   Product-weight
    // Data4    =   Product-name-on-cake

    $Product_id = $_POST['Product_id'];  

    $Category_id = $_POST['Category_id'] ; 

    $Product_weight = $_POST['Product_weight'] ; 

    $Product_name  = $_POST['Product_name'] ; 

    $User_id = $_POST['User_id'] ; 
    
    mysqli_autocommit($conn, false) ; 
    
    try{

        $Insert_cart_item_query = "INSERT INTO `$User_id` (`User_key`, `Option`, `Data1`, `Data2`, `Data3`, `Data4`, `Data5`, `Data6`, `Data7`, `Data8`, `Data9`, `Data10`, `Data11`, `Data12`, `Data13`, `Data14`, `Data15`) 
        VALUES (NULL, 'cart-item', '$Product_id', '$Category_id', '$Product_weight', '$Product_name', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL) " ; 

        $Insert_cart_item_query = mysqli_query($conn, $Insert_cart_item_query) ; 

        mysqli_commit($conn) ; 

        echo "Insert-cart-item" ; 

    }catch(Exception $e){

        mysqli_rollback($conn) ; 

        // Message 

        echo "Network request failed" ; 
    }
}   else if ($Admin_option == "Delete-cart-item"){

    // **** Request for remove product from cart ***** // 

    $User_id = $_POST['User_id'] ; 

    $Category_id = $_POST['Category_id'] ; 

    $Product_id = $_POST['Product_id'] ; 

    mysqli_autocommit($conn, false) ; 

    try{

        // Query 1 Delete product from cart query 

        $Delete_product_from_cart_query = "DELETE FROM `$User_id` WHERE `Option` = 'cart-item' AND `Data1` = '$Product_id' AND `Data2` = '$Category_id' " ; 
        $Delete_product_from_cart_query = mysqli_query($conn, $Delete_product_from_cart_query) ; 

        mysqli_commit($conn) ; 

        echo "Remove product" ; 

    }catch(Exception $e){

        mysqli_rollback($conn) ; 

        echo "Network request failed" ; 
    }
}   

?>
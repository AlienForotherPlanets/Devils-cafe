<?php

// ---- Include files related JWT Token ---- // 

require "./php-jwt-main/src/BeforeValidException.php" ; 
require "./php-jwt-main/src/ExpiredException.php" ; 
require "./php-jwt-main/src/CachedKeySet.php" ; 
require "./php-jwt-main/src/JWK.php" ; 
require "./php-jwt-main/src/JWT.php" ; 
require "./php-jwt-main/src/SignatureInvalidException.php" ; 
require "./php-jwt-main/src/Key.php" ; 

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// ----- Setup Database connection ----- // 

require './Connection/Connection.php' ; 

// ---- Include global variable file ---- // 

include './Global-variable/Global-variable.php' ; 
include "./OTPMessage.php" ; 

// 1. Order status update information 

$Status = $_GET['Status'] ; 

// 2. User id information 

$Userid_value = $_GET['User_id'] ; 

// **** Decode user table name **** // 

$Decoded_data= JWT::decode($Userid_value, new Key($JWT_key, 'HS256'));

$Decoded_data = json_decode(json_encode($Decoded_data),true);

$Userid_value = $Decoded_data['userdata'] ;

// 3. Order id information 

$Order_id_value = $_GET['Order_id'] ; 

// 4. Mobile number information   

$Mobile_number_value = $_GET['Mobile_number'] ; 


// ====== Function which Send message to user ======= // 

function Send_message($Information, $MobileNumber){

    $Information_message = $Information ; 

    $fields = array(
    "sender_id" => "TXTIND",
    "message" => $Information_message,
    "route" => "v3",
    "numbers" => $MobileNumber,
    );

    $curl = curl_init();
    
    curl_setopt_array($curl, array(
    CURLOPT_URL => "https://www.fast2sms.com/dev/bulkV2",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_SSL_VERIFYHOST => 0,
    CURLOPT_SSL_VERIFYPEER => 0,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => json_encode($fields),
    CURLOPT_HTTPHEADER => array(
        "authorization: WFVyc8vmqoHP1g7K9wOM2istjNbQ3hXaDeJIlZR4n0zGdA5Lrpr1wJlFfgXj0Y6tvZTGqUzCs4kemxD2",
        "accept: */*",
        "cache-control: no-cache",
        "content-type: application/json"
    ),
    ));
    
    $response = curl_exec($curl);
    $err = curl_error($curl);
    
    curl_close($curl);
}

if ($Status == "Payment_fail"){

    // Order id value 

    $Order_id = $Order_id_value  ; 
    
    // User id value 

    $User_id = $Userid_value ; 
    
    // Mobile number

    $Mobile_number = $Mobile_number_value ; 

    mysqli_autocommit($conn, false) ; 

    // ===== Response array ===== // 
    
    $Response = array()  ; 
    
    function UpdateData($data){

        global $Response; 
        
        array_push($Response, $data) ; 
    }

    try{

        // ***** Query1 Update Payment fail information in User table ***** // 

        $Payment_fail_information_useTable = "UPDATE `$User_id` SET `Data2` = 'Payment failed', 'Data4' = 'Online payment failed' WHERE `Data1` = '$Order_id' AND `Option` = 'Order' " ;
        $Payment_fail_information_useTable = mysqli_query($conn, $Payment_fail_information_useTable) ; 
        
        // ***** Query2 Update Payment fail information in Admin side order table ***** // 

        $Delete_order_data_from_OrderTable = "DELETE FROM `Order_data` WHERE `Order_id` = '$Order_id' "; 
        $Delete_order_data_from_OrderTable = mysqli_query($conn, $Delete_order_data_from_OrderTable) ; 
        
        mysqli_commit($conn) ;

        // ***** Send information message to user ****** // 

        Send_message($Payment_failed_message, $Mobile_number) ; 

        // Message 

        $Response = array("Status" => "Payment_fail" ); 
        
        UpdateData($Response) ; 
        

    }catch(Exception $e){

        mysqli_rollback($conn) ; 

        $Response = array("Status" => "Network request failed"); 
        UpdateData($Response) ; 
    }
} else{

    // ****** Payment success handler ****** // 

    // 1. Payment id information 

    $Payment_id = $_GET['Payment_id']; 

    // Response array 

    $Response = array()  ; 
    
    function UpdateData($data){
    
        global $Response; 
        array_push($Response, $data) ; 
    }
    
    mysqli_autocommit($conn, false) ; 

    try{

        // ***** Query1 Update payment status in user table ***** // 

        $Update_payment_id_userTable = "UPDATE `$Userid_value` SET `Data4` = 'Online payment success', `Data5` = '$Payment_id' WHERE `Data1` = '$Order_id_value' " ; 
        $Update_payment_id_userTable = mysqli_query($conn, $Update_payment_id_userTable) ; 

        // ***** Query2 Update payment status in order data table **** // 

        $Update_payment_id_orderTable = "UPDATE `Order_data` SET `Order_payment_status` = 'Online payment success', 
        `Order_payment_id` = '$Payment_id' WHERE `Order_id` = '$Order_id_value' "; 
        $Update_payment_id_orderTable = mysqli_query($conn, $Update_payment_id_orderTable); 
        
        mysqli_commit($conn) ; 

        // ***** User message **** // 

        Send_message($Order_placed_message, $Mobile_number_value) ; 

        // **** Send message to admin ***** // 

        Send_message($Order_placed_admin_message, $Admin_mobile_number) ; 

        // Message 

        $Response = array("Status" => "Payment success"); 
        UpdateData($Response) ; 

    }catch(Exception $e){
        
        // Message 

        mysqli_rollback($conn) ; 

        $Response = array("Status" => "Network request failed") ; 
        UpdateData($Response) ; 
    }
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="Payment_response.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans&family=Mukta:wght@500&family=Ubuntu:wght@400;500&display=swap" rel="stylesheet">
    <style>
        *{
            padding: 0%;
            margin: 0%;
        }

        #Loading_layout{
            height: 100vh;
            width: 100vw;
            background-color: rgba(71, 71, 71, 0.772);
            display: flex;
            text-align: center;
            justify-content: center;
        }

        #Loading_information{
            margin: auto;
            background-color: white;
            font-family: 'Ubuntu', sans-serif;
            font-size: 18px;
            padding: 10px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div id="Loading_layout">
        <div id="Loading_information">
            Processing
        </div>
        
    </div>
    <script>
      
        var response  ;
  
        response = '<?= json_encode($Response[0]) ?>' ; 
        window.ReactNativeWebView.postMessage(response) ;  
        
    </script>
</body>
</html>
<?php

// ---- Setup access variables ---- // 

header("Access-Control-Allow-Origin:*") ; 
header("Content-Type:application/json") ;
header("Access-Control-Allow-Methods:POST")  ;
header("Access-Control-Allow-Headers:Content-Type,Access-Control-Allow-Headers,Authorization,X-Request-With") ; 

$InputData =  json_decode(file_get_contents("php://input"), true) ; 

// ---- Setup Database Connection ---- // 

require "./Connection/Connection.php" ; 

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

// ---- Include global variable file ---- // 

include './Global-variable/Global-variable.php' ; 

// ---- Post request making API ----- // 

function callAPI($method, $url, $data){
    
    $curl = curl_init();
  
    switch ($method){
  
      case "POST":
        
          curl_setopt($curl, CURLOPT_POST, 1);
          if ($data)
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
          break;
      
      case "PUT":
          curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
          if ($data)
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);			 					
          break;
      
      default:
          if ($data)
            $url = sprintf("%s?%s", $url, http_build_query($data));
    }
  
    // OPTIONS:
  
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
      'Content-Type: application/json',
    ));
  
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
  
    // EXECUTE:
    $result = curl_exec($curl);
  
    if(!$result){die("Connection Failure");}
      curl_close($curl);
  
    return $result;
}

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

$Admin_email_value = "information.cafe123@gmail.com" ; 

// ==== Total API Request ==== // 

// 1. Create-category           --> Create new category in database 
// 2. Update-category           --> Update category information in database 
// 3. Admin-update-password     --> Update admin update password 
// 4. Admin-password-check      --> Check admin password 

if ($InputData['Check_status'] == "Create-category"){
    
    // **** Request create new category **** // 

    $CategoryName = $InputData['Category_name']; 
    
    $CategoryImage = $InputData['Category_image'] ; 
    
    $Category_primary = $InputData['Category_primary'] ; 

    $Category_information = $InputData['Category_information'] ; 
    
    mysqli_autocommit($conn, false); 
    
    try{

        // 1. Query Check category already create or not 
            
        $Check_category_query = "SELECT `Category_name` FROM `category` WHERE `Category_name` = '$CategoryName' "; 
        $Check_category_query = mysqli_query($conn, $Check_category_query); 
        $Check_category_query_row_count = mysqli_num_rows($Check_category_query); 
        
        if ($Check_category_query_row_count == 0){
            
            // **** Create category id **** // 

            $Data = "abcdefghijklmnopqrstuvwxyz"; 
            $Data = str_shuffle($Data); 
            $Category_table_name = substr($Data, 0, 10); 
            $Category_table_name = "category-".$Category_table_name ; 
            
            // 2. Query Create category table 

            $Create_category_table_query = "CREATE TABLE `$Category_table_name` (
                `Product_key` int NOT NULL AUTO_INCREMENT  , 
                `Product_id` varchar(40),
                `Product_information` varchar(500),
                `Product_image1` varchar(1000),
                `Product_image2` varchar(1000),
                `Product_image3` varchar(1000), 
                `Product_retail_price` varchar(100),
                `Product_discount_price` varchar(30),
                `Product_flavour` varchar(100),
                `Product_bread` varchar(100),
                `Product_cream` varchar(100),
                `Product_time` varchar(100),
                PRIMARY KEY(Product_key)
            )"; 

            $Create_category_table_query = mysqli_query($conn, $Create_category_table_query); 
            
            // 3. Query Insert category information in category table 

            $Insert_category_information_query = "INSERT INTO `category` (`Category_key`, `Category_name`,  `Category_image`, `Category_data`, `Category_primary`, `Category_description`) 
            VALUES (NULL, '$CategoryName', '$CategoryImage', '$Category_table_name', '0', '$Category_information') "; 

            $Insert_category_information_query = mysqli_query($conn, $Insert_category_information_query) ; 


            mysqli_commit($conn) ; 

            // **** Send email information ***** // 

            $data_array =  array(
                "value1" => $Admin_email_value, 
                "value2" => "Create category", 
                "value3" => "<h3>New category create in your application</h3>"
            );
            
            $make_call = callAPI('POST', 'https://maker.ifttt.com/trigger/Send-email/with/key/fGVdBxnIMCJDSBwXsS5FqWF8xAGM8dT49-nW3c4gIhD', json_encode($data_array));
            $Email_response = json_decode($make_call, true);

            $Response = array("Status" => "Create category"); 
            echo json_encode($Response) ; 

        }
        else{

            $Response = array("Status" => "Already create this category"); 
            echo json_encode($Response) ; 
        }

    }catch(Exception $e){

        mysqli_rollback($conn); 

        $Response = array("Status" => "Network request failed"); 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Update-category"){

    // **** Request update category data in database **** // 

    $Update_category_name = $InputData['Update_category_name']; 

    $Update_category_image = $InputData['Update_category_image'] ; 

    $Update_category_data = $InputData['Update_category_data'] ; 

    $Update_category_information = $InputData['Update_category_information'] ; 

    mysqli_autocommit($conn, false) ; 

    try{

        // 1. Query Update category data query

        $Update_category_data_query = "update `category` set `Category_name` = '$Update_category_name', `Category_image` = '$Update_category_image', 
        `Category_description` = '$Update_category_information' where `Category_data` = '$Update_category_data'  " ; 

        $Update_category_data_query = mysqli_query($conn, $Update_category_data_query) ; 

        mysqli_commit($conn) ; 

        // Message 

        $Temp_data = array("Status" => "Update category"); 
        echo json_encode($Temp_data) ; 

    }catch(Exception $e){

        mysqli_rollback($conn); 

        // Message 

        $Temp_data = array("Status" => "Network request failed"); 
        echo json_encode($Temp_data) ; 
    }

}   else if ($InputData['Check_status'] == "Delete-category"){

    // **** Delete category request api **** // 

    $Category_id = $InputData['Delete_category_id'] ; 
    $Category_name = $InputData['Delete_category_name'] ; 

    $Device_id = $InputData['Device_id'] ;
    $Device_name = $InputData['Device_name'] ;

    mysqli_autocommit($conn, false) ; 

    try{

        // Query 1. Delete category query 

        $Delete_category_query = "DELETE FROM `category` WHERE `Category_data` = '$Category_id' " ; 
        $Delete_category_query = mysqli_query($conn, $Delete_category_query) ; 
        
        // Query 2. Insert information query 

        $Delete_category_information = $Category_name."**".$Category_id ; 
        $Device_information = $Device_name."**".$Device_id ; 

        $Information_query = "INSERT INTO `admin-panel` (`admin_id`, `admin_option`, `admin_data`, `admin_data_time`, `admin_device_id`) 
        VALUES (NULL, 'Delete-category', '$Delete_category_information', current_timestamp(), '$Device_information' ) " ; 
        $Information_query = mysqli_query($conn, $Information_query) ; 

        // **** Send email message **** // 

        $Email_mesage = "<h3>One category delete from your application. <br> Category name = ".$Category_name."</h3>" ; 
        $data_array =  array(
            "value1" => $Admin_email_value, 
            "value2" => "Delete category", 
            "value3" => $Email_mesage
        );
        
        $make_call = callAPI('POST', 'https://maker.ifttt.com/trigger/Send-email/with/key/fGVdBxnIMCJDSBwXsS5FqWF8xAGM8dT49-nW3c4gIhD', json_encode($data_array));
        $Email_response = json_decode($make_call, true);

        mysqli_commit($conn) ; 

        // Message 

        $Response = array("Status" => "Delete") ; 
        echo json_encode($Response) ; 
   
    }catch(Exception $e){

        mysqli_rollback($conn) ;

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Category-list") {

    // **** Fetch all category list request **** // 

    try {
        
        $Select_category_list_query = "SELECT * FROM `category` " ; 
        $Select_category_list_query = mysqli_query($conn, $Select_category_list_query) ; 
        $Select_category_list_query_data = mysqli_fetch_all($Select_category_list_query, MYSQLI_ASSOC) ; 

        $Response = array("Status" => "Fetch", "Data" => $Select_category_list_query_data) ; 
        echo json_encode($Response) ; 

    } catch (Exception $e) {
        
        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Admin-update-password"){

    // **** Request for update admin password **** // 

    $Update_password = $InputData['Update_password'] ; 

    $Device_name = $InputData['Device_name'] ; 

    $Device_id = $InputData['Device_id'] ; 

    mysqli_autocommit($conn, false) ; 

    try{
        
        // Hash Password 

        $HashPassword = password_hash($Update_password, PASSWORD_DEFAULT) ; 

        // 1. Query Update Passsowrd query 

        $Update_password_query = "UPDATE `admin-panel` SET `admin_data` = '$HashPassword' WHERE `admin_option` = 'Password' " ; 
        $Update_password_query = mysqli_query($conn, $Update_password_query) ; 

        // 2. Query Update password information message 

        $Update_password_information_query = "INSERT INTO `admin-panel` (`admin_id`, `admin_option`, `admin_data`, `admin_data_time`, `admin_device_id`) 
        VALUES (NULL, 'Update-password-info', '$Device_name', current_timestamp() , '$Device_id') " ; 

        $Update_password_information_query = mysqli_query($conn, $Update_password_information_query) ; 
        
        // **** Email message **** // 

        $data_array =  array(
            "value1" => $Admin_email_value, 
            "value2" => "Update admin password", 
            "value3" => "<h3>Someone update your admin login password. Check it out !</h3>"
        );
        
        $make_call = callAPI('POST', 'https://maker.ifttt.com/trigger/Send-email/with/key/fGVdBxnIMCJDSBwXsS5FqWF8xAGM8dT49-nW3c4gIhD', json_encode($data_array));
        $Email_response = json_decode($make_call, true);

        mysqli_commit($conn) ; 

        // Message 

        $Response = array("Status" => "Update passsword") ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        mysqli_rollback($conn); 

        // Message 

        $Response = array("Status" => "Network request failed"); 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Admin-passsword-check"){

    // **** Request check admin password **** // 

    $User_AdminPassword = $InputData['AdminPassword']; 

    mysqli_autocommit($conn, false) ; 

    try{

        // 1. Query Fetch admin password 

        $Fetch_password_query = "SELECT * FROM `admin-panel` WHERE  `admin_option` = 'Password' ";
        $Fetch_password_query = mysqli_query($conn, $Fetch_password_query); 
        $Fetch_password_query_data = mysqli_fetch_all($Fetch_password_query, MYSQLI_ASSOC); 
        
        mysqli_commit($conn) ; 

        $AdminPassword = $Fetch_password_query_data[0]['admin_data']; 

        if (password_verify($User_AdminPassword, $AdminPassword)){
            

            // **** Email message **** // 

            $data_array =  array(
                "value1" => $Admin_email_value, 
                "value2" => "Admin login", 
                "value3" => "<h3>Someone login to your admin control panel. Check it out !</h3>"
            );
            
            $make_call = callAPI('POST', 'https://maker.ifttt.com/trigger/Send-email/with/key/fGVdBxnIMCJDSBwXsS5FqWF8xAGM8dT49-nW3c4gIhD', json_encode($data_array));
            $Email_response = json_decode($make_call, true);
            
            $Response = array("Status" => "Vaild Password"); 
            echo json_encode($Response) ; 

        }
        else{
        
            $Response = array("Status" => "Invaild Password") ; 
            echo json_encode($Response) ;  
        }

    }catch (Exception $e){

        $Response = array("Status" => "Network request failed"); 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Admin-mobile-check"){

    // **** Request check mobile number already registe or not of Admin **** // 

    $MobileNumber = $InputData['Mobilenumber'];
    
    try{
        
        // 1. Query Check Mobile number 

        $Check_mobile_number_query = "SELECT `admin_data` FROM `admin-panel` WHERE `admin_data` = '$MobileNumber' " ; 
        $Check_mobile_number_query = mysqli_query($conn, $Check_mobile_number_query); 
    
        $Check_mobile_number_query_row_count = mysqli_num_rows($Check_mobile_number_query); 
    
        if ($Check_mobile_number_query_row_count == 0){
            
            $Temp_data = array("Status" => "Mobile number not register") ;
            echo json_encode($Temp_data) ; 
        }
        else{

            // **** Send Verification code to Mobilenumber **** // 

            $Verification_code_data = "1234567890";
            $Verification_code_data = str_shuffle($Verification_code_data);
            $Verification_code = substr($Verification_code_data, 0, 4);

            $curl = curl_init();

            curl_setopt_array($curl, array(
                CURLOPT_URL => "https://www.fast2sms.com/dev/bulkV2?authorization=".$AuthenticationKey."&variables_values=$Verification_code&route=otp&numbers=" . urlencode($MobileNumber),
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_SSL_VERIFYHOST => 0,
                CURLOPT_SSL_VERIFYPEER => 0,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "GET",
                CURLOPT_HTTPHEADER => array(
                    "cache-control: no-cache"
                ),
            ));


            $Temp_data = curl_exec($curl);
            $err = curl_error($curl);
            curl_close($curl);

            $curl_Temp_data = json_decode($Temp_data, true);
        
    
            if ($curl_Temp_data['return'] == true){
                
                // **** Verification code send successfully **** // 

                $Temp_data = array("Status" => "OTP send", "OTP" =>  $Verification_code); 
                echo json_encode($Temp_data) ; 
            }
            else{
               
                // **** Verification code failed **** // 

                $Temp_data = array("Status" => "OTP send failed"); 
                echo json_encode($Temp_data) ; 
            }
        }

    
    }catch (Exception $e){

        $Temp_data = array("Status" => "Network request failed"); 
        echo json_encode($Temp_data) ; 
    }
}   else if ($InputData['Check_status'] == "Upload-product"){

    // **** Request for upload product in category **** // 

    $Category_id = $InputData['Category_id'] ; 

    $Product_information = $InputData['Product_information'] ; 

    $Product_image1 = $InputData['Product_image1'] ; 

    $Product_image2 = $InputData['Product_image2'] ; 

    $Product_image3 = $InputData['Product_image3'] ; 

    $Product_retail_price = $InputData['Product_retail_price'] ; 

    $Product_discount_price = $InputData['Product_discount_price'] ; 

    $Product_flavour = $InputData['Product_flavour'] ; 

    $Product_bread = $InputData['Product_bread'] ; 

    $Product_cream = $InputData['Product_cream'] ; 

    mysqli_autocommit($conn , false) ; 

    try{

        // Create prouct id 

        $Data = "abcdefghijklmnopqrstuvwxyz" ; 
        $Data = str_shuffle($Data) ; 
        $Product_id = substr($Data, 0, 10) ; 
        
        // Query 1. Insert Product information query 

        $Insert_product_data_query = "INSERT INTO `$Category_id` (`Product_key`, `Product_id`, `Product_information`, `Product_image1`, `Product_image2`, `Product_image3`, `Product_retail_price`, `Product_discount_price`, `Product_flavour`, `Product_bread`, `Product_cream`, `Product_time`) 
        VALUES (NULL, '$Product_id', '$Product_information', '$Product_image1', '$Product_image2', '$Product_image3', '$Product_retail_price', '$Product_discount_price', '$Product_flavour', '$Product_bread', '$Product_cream', current_timestamp() )  ";     

        $Insert_product_data_query = mysqli_query($conn, $Insert_product_data_query) ; 

        mysqli_commit($conn) ; 

        $Response = array("Status" => "Upload product") ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        mysqli_rollback($conn) ; 

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Fetch-product"){

    // **** Request for fetch category product ***** // 

    $Category_id = $InputData['Category_id'] ; 

    try{

        $Select_category_product_data = "SELECT * FROM `$Category_id` "  ;
        $Select_category_product_data = mysqli_query($conn, $Select_category_product_data) ; 
        $Select_category_product_data_result = mysqli_fetch_all($Select_category_product_data, MYSQLI_ASSOC) ; 
        
        // Message 

        $Response = array("Status" => "Fetch", "ProductData" => $Select_category_product_data_result) ; 
        echo json_encode($Response) ; 
    
    }catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Delete-product"){

    // ***** Request for Delete product from category ***** // 

    $Category_id = $InputData['Category_id'] ; 
    $Product_id  = $InputData['Product_id'] ; 

    mysqli_autocommit($conn, false) ; 

    try{

        $Delete_product_query = "DELETE FROM `$Category_id` WHERE `Product_id` = '$Product_id' " ;
        $Delete_product_query = mysqli_query($conn, $Delete_product_query) ; 
        
        mysqli_commit($conn) ; 

        // Message 

        $Response = array("Status" => "Delete product") ; 
        echo json_encode($Response) ;

    }catch(Exception $e){
        
        mysqli_rollback($conn) ; 

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Update-product"){

    // **** Request for update product details **** // 
}   else if ($InputData['Check_status'] == "Fetch-banner"){

    // **** Request for fetch banner images **** // 

    try{

        $Select_fetch_banner_query = "SELECT * FROM `banner_data` " ; 
        $Select_fetch_banner_query = mysqli_query($conn, $Select_fetch_banner_query) ; 
        $Select_fetch_banner_query_result = mysqli_fetch_all($Select_fetch_banner_query, MYSQLI_ASSOC) ; 

        // Message 

        $Response = array("Status" => "Fetch", "Banner" => $Select_fetch_banner_query_result) ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Delete-banner"){

    // **** Request for Delete banner image **** // 

    $Banner_id = $InputData['Banner_id'] ; 

    mysqli_autocommit($conn, false) ; 
    try{

        $Delete_banner_image_query = "DELETE FROM `banner_data` WHERE `Banner_id` = '$Banner_id' " ; 
        $Delete_banner_image_query = mysqli_query($conn, $Delete_banner_image_query) ; 

        mysqli_commit($conn) ; 

        // **** Email message **** // 

        $data_array =  array(
            "value1" => $Admin_email_value, 
            "value2" => "Delete banner image", 
            "value3" => "<h3>Someone Delete your application banner image. Check it out !</h3>"
        );
        
        $make_call = callAPI('POST', 'https://maker.ifttt.com/trigger/Send-email/with/key/fGVdBxnIMCJDSBwXsS5FqWF8xAGM8dT49-nW3c4gIhD', json_encode($data_array));
        $Email_response = json_decode($make_call, true);

        // Message 

        $Response = array("Status" => "Delete") ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        mysqli_rollback($conn) ; 

        // Message

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Insert-banner"){

    // **** Request for insert new banner image **** // 

    $Banner_image = $InputData['Banner_image'] ; 

    mysqli_autocommit($conn, false) ; 

    try{

        // Query 1. Insert banner image query 

        $Insert_banner_image_query = "INSERT INTO `banner_data` (`Banner_id`, `Banner_image`) VALUES (NULL, '$Banner_image') " ;
        $Insert_banner_image_query = mysqli_query($conn, $Insert_banner_image_query) ; 
        
        mysqli_commit($conn) ; 

        // **** Email message **** // 

        $data_array =  array(
            "value1" => $Admin_email_value, 
            "value2" => "Upload banner image", 
            "value3" => "<h3>Someone Upload new banner image in  your application. Check it out !</h3>"
        );
        
        $make_call = callAPI('POST', 'https://maker.ifttt.com/trigger/Send-email/with/key/fGVdBxnIMCJDSBwXsS5FqWF8xAGM8dT49-nW3c4gIhD', json_encode($data_array));
        $Email_response = json_decode($make_call, true);

        // Message 

        $Response = array("Status" => "Insert") ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        mysqli_rollback($conn) ; 

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Update-banner"){

    // **** Request for insert new banner image **** // 

    $Banner_image = $InputData['Banner_image'] ; 

    $Banner_id = $InputData['Banner_id'] ; 

    mysqli_autocommit($conn, false) ; 

    try{

        // Query 1. Insert banner image query 

        $Update_banner_image_query = "UPDATE `banner_data` SET `Banner_image` = '$Banner_image' WHERE `Banner_id` = '$Banner_id'" ;
        $Update_banner_image_query = mysqli_query($conn, $Update_banner_image_query) ; 
        
        mysqli_commit($conn) ; 

        // **** Email message **** // 

        $data_array =  array(
            "value1" => $Admin_email_value, 
            "value2" => "Update banner image", 
            "value3" => "<h3>Someone update your application banner image. Check it out !</h3>"
        );
        
        $make_call = callAPI('POST', 'https://maker.ifttt.com/trigger/Send-email/with/key/fGVdBxnIMCJDSBwXsS5FqWF8xAGM8dT49-nW3c4gIhD', json_encode($data_array));
        $Email_response = json_decode($make_call, true);

        // Message 

        $Response = array("Status" => "Update") ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        mysqli_rollback($conn) ; 

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Insert-latest-product"){

    // **** Request for insert latest product option ***** // 
    
    $Product_image = $InputData['image'] ; 
    
    mysqli_autocommit($conn, false) ; 

    try{

        // Query 1 Insert latest product query 

        $Insert_latest_product_query = "INSERT INTO `status_data` (`Status_id`, `Status_image`) VALUES (NULL, '$Product_image')" ; 
        $Insert_latest_product_query = mysqli_query($conn, $Insert_latest_product_query) ; 
        
        mysqli_commit($conn) ;

        // **** Email message **** // 

        $data_array =  array(
            "value1" => $Admin_email_value, 
            "value2" => "Upload latest product", 
            "value3" => "<h3>Someone upload latest product images. Check it out !</h3>"
        );
        
        $make_call = callAPI('POST', 'https://maker.ifttt.com/trigger/Send-email/with/key/fGVdBxnIMCJDSBwXsS5FqWF8xAGM8dT49-nW3c4gIhD', json_encode($data_array));
        $Email_response = json_decode($make_call, true);

        $Response = array("Status" => "Insert") ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){
        
        mysqli_rollback($conn) ; 

        // Message 

        $Response =  array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Delete-latest-product"){

    // ***** Request for delete all latest product ***** // 

    mysqli_autocommit( $conn, false) ; 

    try{

        $Delete_latest_product = "DELETE FROM `status_data`" ; 
        $Delete_latest_product = mysqli_query($conn, $Delete_latest_product) ; 

        mysqli_commit($conn) ; 

        // Message 

        $Response = array("Status" => "Delete") ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        mysqli_rollback($conn) ; 

        // Message

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Fetch-custom-cake-order"){

    // **** Request for fetch custom cake order **** // 

    try{

        $Fetch_custom_order_data_query = "SELECT * FROM `custom-cake-order` WHERE `Order_status` = 'Pending' " ; 
        $Fetch_custom_order_data_query = mysqli_query($conn, $Fetch_custom_order_data_query) ; 
        $Fetch_custom_order_data_query_result = mysqli_fetch_all($Fetch_custom_order_data_query, MYSQLI_ASSOC) ; 

        $Response = array("Status" => "Fetch", "Order" => $Fetch_custom_order_data_query_result) ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Complete-custom-cake-order"){

    // ***** Request which fetch custom cake order **** // 

    try{

        $Fetch_custom_order_query = "SELECT * FROM `custom-cake-order` WHERE `Order_status` = 'Complete' " ; 
        $Fetch_custom_order_query = mysqli_query($conn, $Fetch_custom_order_query) ; 
        $Fetch_custom_order_query_result = mysqli_fetch_all($Fetch_custom_order_query, MYSQLI_ASSOC) ; 

        // Message 

        $Response = array("Status" => "Fetch", "Order" => $Fetch_custom_order_query_result) ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        // Message 

        $Response = array("Status" => "Fetch") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Admin-password-update-check"){
    
    // **** Request for check admin password update or not **** // 

    $Password = $InputData['Password'] ; 

    try{

        // 1. Query Fetch admin password 

        $Fetch_password_query = "SELECT * FROM `admin-panel` WHERE  `admin_option` = 'Password' ";
        $Fetch_password_query = mysqli_query($conn, $Fetch_password_query); 
        $Fetch_password_query_data = mysqli_fetch_all($Fetch_password_query, MYSQLI_ASSOC); 
        
        $AdminPassword = $Fetch_password_query_data[0]['admin_data']; 

        if (password_verify($Password, $AdminPassword)){
            
            $Response = array("Status" => "Vaild Password"); 
            echo json_encode($Response) ; 

        }
        else{
        
            $Response = array("Status" => "Invaild Password") ; 
            echo json_encode($Response) ;  
        }

    }catch (Exception $e){

        $Response = array("Status" => "Network request failed"); 
        echo json_encode($Response) ; 
    }


}   else if ($InputData['Check_status'] == "Admin-mobile-number-list"){

    // ***** Request which fetch admin total register mobile number **** .. 

    try{

        $Select_resgiter_mobile_number = "SELECT * FROM `admin-panel` WHERE `admin_option` = 'Admin-mobile-number' " ; 
        $Select_resgiter_mobile_number = mysqli_query($conn, $Select_resgiter_mobile_number) ; 
        $Select_resgiter_mobile_number_result = mysqli_fetch_all($Select_resgiter_mobile_number, MYSQLI_ASSOC) ;  

        // Message 

        $Response = array("Status" => "Fetch", "Data" => $Select_resgiter_mobile_number_result) ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Admin-delete-mobile-number") {

    $Delete_number = $InputData['Number'] ; 

    mysqli_autocommit($conn, false) ; 

    try{

        $Delete_number_query = "DELETE FROM `admin-panel` WHERE `admin_option` = 'Admin-mobile-number' AND `admin_data` = '$Delete_number' " ; 
        $Delete_number_query = mysqli_query($conn, $Delete_number_query) ; 

        mysqli_commit($conn) ;
        
        // Message 

        $Response = array("Status" => "Delete") ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        mysqli_rollback($conn) ; 

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 

    }


}   else if ($InputData['Check_status'] == "Admin-register-number"){

    // **** Request for register admin login number **** .. 

    $Mobile_number = $InputData['Number'] ; 

    mysqli_autocommit($conn, false) ; 

    try{

        $Insert_number_query = "INSERT INTO `admin-panel` (`admin_id`, `admin_option`, `admin_data`, `admin_data_time`, `admin_device_id`) 
        VALUES (NULL, 'Admin-mobile-number', '$Mobile_number', '', '') " ; 
        $Insert_number_query = mysqli_query($conn, $Insert_number_query) ; 

        mysqli_commit($conn) ; 

        // Message 

        $Response = array("Status" => "Insert") ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        mysqli_rollback($conn) ; 

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }

}   else if ($InputData['Check_status'] == "Admin-dashboard-data"){

    // **** Request for fetch Admin dashboard data ***** // 
    try{

        $Current_date = date('Y-m-d') ; 

        // Fetch today user count 

        $Fetch_today_user_count = "SELECT COUNT(*) as `Count` FROM `userdata` WHERE `Account_create_time` LIKE '$Current_date %'" ; 
        $Fetch_today_user_count = mysqli_query($conn, $Fetch_today_user_count) ; 
        $Fetch_today_user_count_data = mysqli_fetch_all($Fetch_today_user_count, MYSQLI_ASSOC) ; 

        // Fetch today order count        

        $Fetch_today_order_count = "SELECT COUNT(*) as `Count` FROM `order_data` WHERE `Order_time` LIKE '$Current_date %'" ; 
        $Fetch_today_order_count = mysqli_query($conn, $Fetch_today_order_count) ; 
        $Fetch_today_order_count_data = mysqli_fetch_all($Fetch_today_order_count, MYSQLI_ASSOC) ; 

        // Fetch refund payment pending count 

        $Fetch_refund_count_query = "SELECT COUNT(*) as 'COUNT' FROM `refund_data` WHERE `Status` = 'Pending' " ; 
        $Fetch_refund_count_query = mysqli_query($conn, $Fetch_refund_count_query) ; 
        $Fetch_refund_count_query_data = mysqli_fetch_all($Fetch_refund_count_query, MYSQLI_ASSOC) ; 

        // Message 

        $Response = array("Today_user_count" => $Fetch_today_user_count_data, 
            "Order_count" => $Fetch_today_order_count_data, 
            "Refund_count" => $Fetch_refund_count_query_data) ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){


        // Message 

        $Response = array("Network request failed") ; 
        echo json_encode($Response) ; 

    }

}   else if ($InputData['Check_status'] == "Userdata-fetch"){

    try{

        $Select_userdata_query = "SELECT `Username`, `Mobilenumber`, `Account_create_time` FROM `userdata`" ; 
        $Select_userdata_query = mysqli_query($conn, $Select_userdata_query) ; 
        $Select_userdata_query_data = mysqli_fetch_all($Select_userdata_query, MYSQLI_ASSOC) ; 

        // Message 

        $Response = array("Status" => "Fetch", "Users" => $Select_userdata_query_data) ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Fetch-pending-order"){

    // **** Request for fetch Admin side pending order data **** // 

    try{

        $Pending_order_query = "SELECT * FROM `Order_data` WHERE `Order_status` = 'Pending'" ; 
        $Pending_order_query = mysqli_query($conn, $Pending_order_query) ; 
        $Pending_order_query_result = mysqli_fetch_all($Pending_order_query, MYSQLI_ASSOC) ;
        
        // Order id array
        $Order_id ; 
        
        for($i = 0 ; $i<count($Pending_order_query_result); $i++){
            $Order_id[$i] = [$Pending_order_query_result[$i]] ; 
        
            // Temp order id 
            $Temp_order_id = $Pending_order_query_result[$i]['Order_id'];
        
            // Select Product data from `Order_product_data` table 
            $Select_order_product_data_query = "SELECT * FROM `Order_product_data` WHERE `Order_id` = '$Temp_order_id'" ; 
            $Select_order_product_data_query = mysqli_query($conn, $Select_order_product_data_query) ; 
            $Select_order_product_data_query_result = mysqli_fetch_all($Select_order_product_data_query, MYSQLI_ASSOC) ; 
        
            array_push($Order_id[$i], $Select_order_product_data_query_result) ; 
        }

        // Message 

        $Response = array("Status" => "Fetch", "Order" => $Order_id) ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Accept-custom-cake-cancel"){

    // **** Request for fetch custom cake order **** // 

    $Table_name = $InputData['Table_name'] ; 

    $Order_id = $InputData['Order_id'] ; 

    $MobileNumber = $InputData['Mobile_number'] ; 

    $Cancel_reason = $InputData['Cancel_reason'] ; 

    mysqli_autocommit($conn, false) ; 

    try{


        // Query 1. Update order status in Custom-cake-order data table 

        $Update_order_data_table = "UPDATE `custom-cake-order` SET `Order_status` = 'Cancel', `Order_cancel_reason` = '$Cancel_reason' WHERE `Order_id` = '$Order_id'  " ; 
        $Update_order_data_table = mysqli_query($conn, $Update_order_data_table) ; 

        // Query 2. Update order status in userdata table 

        $Update_user_data_table = "UPDATE `$Table_name` SET `Data1` = 'Cancel' WHERE `Data2` = '$Order_id' " ; 
        $Update_user_data_table = mysqli_query($conn, $Update_user_data_table) ;
        
        // **** Email message **** // 

        $data_array =  array(
            "value1" => $Admin_email_value, 
            "value2" => "Cancel custom cake order", 
            "value3" => "<h3>Someone just cancel custom cake order. Check it out !</h3>"
        );
        
        $make_call = callAPI('POST', 'https://maker.ifttt.com/trigger/Send-email/with/key/fGVdBxnIMCJDSBwXsS5FqWF8xAGM8dT49-nW3c4gIhD', json_encode($data_array));
        $Email_response = json_decode($make_call, true);

        mysqli_commit($conn) ; 

        // Message 

        $Response = array("Status" => "Accept") ; 
        echo json_encode($Response) ; 
    
    }catch(Exception $e){

        mysqli_rollback($conn) ; 

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }

}   else if ($InputData['Check_status'] == "Fetch-complete-order"){

    // **** Request for fetch Complete order **** // 

    // **** Request for fetch Admin side pending order data **** // 

    try{

        $Pending_order_query = "SELECT * FROM `Order_data` WHERE `Order_status` = 'Complete'" ; 
        $Pending_order_query = mysqli_query($conn, $Pending_order_query) ; 
        $Pending_order_query_result = mysqli_fetch_all($Pending_order_query, MYSQLI_ASSOC) ;
        
        // Order id array
        $Order_id = array(); 
        
        for($i = 0 ; $i<count($Pending_order_query_result); $i++){
            $Order_id[$i] = [$Pending_order_query_result[$i]] ; 
        
            // Temp order id 
            $Temp_order_id = $Pending_order_query_result[$i]['Order_id'];
        
            // Select Product data from `Order_product_data` table 
            $Select_order_product_data_query = "SELECT * FROM `Order_product_data` WHERE `Order_id` = '$Temp_order_id'" ; 
            $Select_order_product_data_query = mysqli_query($conn, $Select_order_product_data_query) ; 
            $Select_order_product_data_query_result = mysqli_fetch_all($Select_order_product_data_query, MYSQLI_ASSOC) ; 
        
            array_push($Order_id[$i], $Select_order_product_data_query_result) ; 
        }

        // Message 

        $Response = array("Status" => "Fetch", "Order" => $Order_id) ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Fetch-cancel-order"){
    // **** Request for fetch Complete order **** // 

    // **** Request for fetch Admin side pending order data **** // 

    try{

        $Pending_order_query = "SELECT * FROM `Order_data` WHERE `Order_status` = 'Cancel'" ; 
        $Pending_order_query = mysqli_query($conn, $Pending_order_query) ; 
        $Pending_order_query_result = mysqli_fetch_all($Pending_order_query, MYSQLI_ASSOC) ;
        
        // Order id array
        $Order_id = array(); 
        
        for($i = 0 ; $i<count($Pending_order_query_result); $i++){
            $Order_id[$i] = [$Pending_order_query_result[$i]] ; 
        
            // Temp order id 
            $Temp_order_id = $Pending_order_query_result[$i]['Order_id'];
        
            // Select Product data from `Order_product_data` table 
            $Select_order_product_data_query = "SELECT * FROM `Order_product_data` WHERE `Order_id` = '$Temp_order_id'" ; 
            $Select_order_product_data_query = mysqli_query($conn, $Select_order_product_data_query) ; 
            $Select_order_product_data_query_result = mysqli_fetch_all($Select_order_product_data_query, MYSQLI_ASSOC) ; 
        
            array_push($Order_id[$i], $Select_order_product_data_query_result) ; 
        }

        // Message 

        $Response = array("Status" => "Fetch", "Order" => $Order_id) ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Fetch-date-order"){

    $Search_date = $InputData['Date'] ; 

    try{

        $Pending_order_query = "SELECT * FROM `Order_data` WHERE `Order_time` LIKE '$Search_date %'" ;
        $Pending_order_query = mysqli_query($conn, $Pending_order_query) ; 
        $Pending_order_query_result = mysqli_fetch_all($Pending_order_query, MYSQLI_ASSOC) ;
        
        // Order id array
        $Order_id = array(); 
        
        for($i = 0 ; $i<count($Pending_order_query_result); $i++){
            $Order_id[$i] = [$Pending_order_query_result[$i]] ; 
        
            // Temp order id 
            $Temp_order_id = $Pending_order_query_result[$i]['Order_id'];
        
            // Select Product data from `Order_product_data` table 
            $Select_order_product_data_query = "SELECT * FROM `Order_product_data` WHERE `Order_id` = '$Temp_order_id'" ; 
            $Select_order_product_data_query = mysqli_query($conn, $Select_order_product_data_query) ; 
            $Select_order_product_data_query_result = mysqli_fetch_all($Select_order_product_data_query, MYSQLI_ASSOC) ; 
        
            array_push($Order_id[$i], $Select_order_product_data_query_result) ; 
        }

        // Message 

        $Response = array("Status" => "Fetch", "Order" => $Order_id) ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Fetch-today-order"){

    // **** Request for fetch today order data **** // 

    try{

        $Date = date("Y-m-d") ; 
        
        $Pending_order_query = "SELECT * FROM `Order_data` WHERE `Order_time` LIKE '$Date %'" ;
        $Pending_order_query = mysqli_query($conn, $Pending_order_query) ; 
        $Pending_order_query_result = mysqli_fetch_all($Pending_order_query, MYSQLI_ASSOC) ;
        
        // Order id array
        $Order_id = array(); 
        
        for($i = 0 ; $i<count($Pending_order_query_result); $i++){
            $Order_id[$i] = [$Pending_order_query_result[$i]] ; 
        
            // Temp order id 
            $Temp_order_id = $Pending_order_query_result[$i]['Order_id'];
        
            // Select Product data from `Order_product_data` table 
            $Select_order_product_data_query = "SELECT * FROM `Order_product_data` WHERE `Order_id` = '$Temp_order_id'" ; 
            $Select_order_product_data_query = mysqli_query($conn, $Select_order_product_data_query) ; 
            $Select_order_product_data_query_result = mysqli_fetch_all($Select_order_product_data_query, MYSQLI_ASSOC) ; 
        
            array_push($Order_id[$i], $Select_order_product_data_query_result) ; 
        }

        // Message 

        $Response = array("Status" => "Fetch", "Order" => $Order_id) ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Fetch-yesterday-order"){

    //  ***** Request for fetch Yesterday order data ***** // 

    try{

        $Yesterday = date('Y-m-d',strtotime("-1 days"));

        $Pending_order_query = "SELECT * FROM `Order_data` WHERE `Order_time` LIKE '$Yesterday %'" ;
        $Pending_order_query = mysqli_query($conn, $Pending_order_query) ; 
        $Pending_order_query_result = mysqli_fetch_all($Pending_order_query, MYSQLI_ASSOC) ;
        
        // Order id array
        $Order_id = array(); 
        
        for($i = 0 ; $i<count($Pending_order_query_result); $i++){
            $Order_id[$i] = [$Pending_order_query_result[$i]] ; 
        
            // Temp order id 
            $Temp_order_id = $Pending_order_query_result[$i]['Order_id'];
        
            // Select Product data from `Order_product_data` table 
            $Select_order_product_data_query = "SELECT * FROM `Order_product_data` WHERE `Order_id` = '$Temp_order_id'" ; 
            $Select_order_product_data_query = mysqli_query($conn, $Select_order_product_data_query) ; 
            $Select_order_product_data_query_result = mysqli_fetch_all($Select_order_product_data_query, MYSQLI_ASSOC) ; 
        
            array_push($Order_id[$i], $Select_order_product_data_query_result) ; 
        }

        // Message 

        $Response = array("Status" => "Fetch", "Order" => $Order_id) ; 
        echo json_encode($Response) ; 


    }catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
    date('d.m.Y',strtotime("-1 days"));
}   else if ($InputData['Check_status'] == "Fetch_order_id"){

    // ***** Requets for fetch particular order id function ***** // 

    $Order_id = $InputData['Order_id'] ; 

    try{

        $Pending_order_query = "SELECT * FROM `Order_data` WHERE `Order_id` = '$Order_id'" ;
        $Pending_order_query = mysqli_query($conn, $Pending_order_query) ; 
        $Pending_order_query_result = mysqli_fetch_all($Pending_order_query, MYSQLI_ASSOC) ;
        
        // Order id array
        $Order_id = array(); 
        
        for($i = 0 ; $i<count($Pending_order_query_result); $i++){
            $Order_id[$i] = [$Pending_order_query_result[$i]] ; 
        
            // Temp order id 
            $Temp_order_id = $Pending_order_query_result[$i]['Order_id'];
        
            // Select Product data from `Order_product_data` table 
            $Select_order_product_data_query = "SELECT * FROM `Order_product_data` WHERE `Order_id` = '$Temp_order_id'" ; 
            $Select_order_product_data_query = mysqli_query($conn, $Select_order_product_data_query) ; 
            $Select_order_product_data_query_result = mysqli_fetch_all($Select_order_product_data_query, MYSQLI_ASSOC) ; 
        
            array_push($Order_id[$i], $Select_order_product_data_query_result) ; 
        }

        // Message 

        $Response = array("Status" => "Fetch", "Order" => $Order_id) ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Cancel-user-order"){

    // **** Request for cancel user order **** // 

    $Order_id = $InputData['Order_id'] ; 
    
    $User_id = $InputData['User_id'] ; 
    
    $Mobile_number = $InputData['Mobile_number'] ; 
    
    $Cancel_reason = $InputData['Cancel_reason'] ; 

    $Order_total = $InputData['Order_total'] ; 

    $Order_date = $InputData['Order_date'] ; 

    $Order_payment_id = $InputData['Order_payment_id'] ; 

    $Order_username = $InputData['Username'] ; 

    mysqli_autocommit($conn, false) ; 


        $Today_date = date("Y-m-d") ; 

        // Query 1. Cancel order in Order data table 

        $Update_order_data_table = "UPDATE `order_data` SET `Order_cancel_date`= '$Today_date', `Order_cancel_reason` = '$Cancel_reason', 
        `Order_status` = 'Cancel' WHERE `Order_id` = '$Order_id' " ;
        $Update_order_data_table = mysqli_query($conn, $Update_order_data_table) ; 
        
        // Query 2. Update userdata table 

        $Update_user_data_table = "UPDATE `$User_id` SET `Date6` = '$Today_date', `Data7` = '$Cancel_reason' , `Data2` = 'Cancel' WHERE `Order_id` = '$Order_id' " ; 
        $Update_user_data_table = mysqli_query($conn, $Update_user_data_table) ; 

        // Query 3. Insert Refund payment information 
        $Insert_refund_payment = "INSERT INTO `refund_data` (`Refund_key`, `Order_id`, `Order_total`, `Username`, `Mobilenumber`, `Payment_id`, `User_id`, `Status`, `Order_date`) 
        VALUES (NULL, '$Order_id', '$Order_total', '$Order_username', '$MobileNumber', '$Order_payment_id', '$User_id', 'Pending', '$Order_date') " ; 

        $Insert_refund_payment = mysqli_query($conn, $Insert_refund_payment) ; 

        mysqli_commit($conn) ; 

        // **** Email message **** // 

        $data_array =  array(
            "value1" => $Admin_email_value, 
            "value2" => "cancel order", 
            "value3" => "<h3>Someone just cancel one order. Check it out!</h3>"
        );
        
        $make_call = callAPI('POST', 'https://maker.ifttt.com/trigger/Send-email/with/key/fGVdBxnIMCJDSBwXsS5FqWF8xAGM8dT49-nW3c4gIhD', json_encode($data_array));
        $Email_response = json_decode($make_call, true);

        // Message 

        $Response = array("Status" => "Cancel-order") ; 
        echo json_encode($Response) ; 
    


        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
}   else if ($InputData['Check_status'] == "Dashboard_order"){

    // **** Request for fetch Admin side pending order data **** // 

    try{

        $Pending_order_query = "SELECT * FROM `Order_data` WHERE `Order_status` = 'Pending' LIMIT 5" ; 
        $Pending_order_query = mysqli_query($conn, $Pending_order_query) ; 
        $Pending_order_query_result = mysqli_fetch_all($Pending_order_query, MYSQLI_ASSOC) ;
        
        // Order id array
        $Order_id ; 
        
        for($i = 0 ; $i<count($Pending_order_query_result); $i++){
            $Order_id[$i] = [$Pending_order_query_result[$i]] ; 
        
            // Temp order id 
            $Temp_order_id = $Pending_order_query_result[$i]['Order_id'];
        
            // Select Product data from `Order_product_data` table 
            $Select_order_product_data_query = "SELECT * FROM `Order_product_data` WHERE `Order_id` = '$Temp_order_id'" ; 
            $Select_order_product_data_query = mysqli_query($conn, $Select_order_product_data_query) ; 
            $Select_order_product_data_query_result = mysqli_fetch_all($Select_order_product_data_query, MYSQLI_ASSOC) ; 
        
            array_push($Order_id[$i], $Select_order_product_data_query_result) ; 
        }

        // Message 

        $Response = array("Status" => "Fetch", "Order" => $Order_id) ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Fetch-refund-payments"){

    // ***** Request for fetch refund payment details ***** // 

    try{

        $Select_refund_order = "SELECT * FROM `refund_data` " ; 
        $Select_refund_order = mysqli_query($conn, $Select_refund_order) ; 
        $Select_refund_order_result = mysqli_fetch_all($Select_refund_order, MYSQLI_ASSOC) ; 

        // Message 

        $Response = array("Status" => "Fetch", "Refund" => $Select_refund_order_result) ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "New-location"){

    // **** Request for create new delivery location **** // 

    $Location_name = $InputData['Location-name'] ; 
    $Location_pincode = $InputData['Location-pincode'] ; 

    try{

        $Insert_new_location = "INSERT INTO `delivery_location` (`Delivery_location_key`, `Delivery_location_name`, `Delivery_location_pincode`)
        VALUES (NULL, '$Location_name', '$Location_pincode') " ; 

        $Insert_new_location = mysqli_query($conn, $Insert_new_location) ; 

        // **** Email message **** // 

        $data_array =  array(
            "value1" => $Admin_email_value, 
            "value2" => "New delivery location", 
            "value3" => "<h3>Someone just enter new delivery location. Check it out!</h3>"
        );
        
        $make_call = callAPI('POST', 'https://maker.ifttt.com/trigger/Send-email/with/key/fGVdBxnIMCJDSBwXsS5FqWF8xAGM8dT49-nW3c4gIhD', json_encode($data_array));
        $Email_response = json_decode($make_call, true);

        // Response 

        $Response = array("Status" => "Insert") ; 
        echo  json_encode($Response) ; 

    }catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Fetch-location"){

    // **** Fetch all delivery location **** // 

    try{

        $Select_all_location = "SELECT * FROM `delivery_location` " ; 
        $Select_all_location = mysqli_query($conn, $Select_all_location) ; 
        $Select_all_location_result = mysqli_fetch_all($Select_all_location, MYSQLI_ASSOC) ; 

        // Message 

        $Response = array("Location" => $Select_all_location_result) ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Delete-location"){

    // **** Request for Delete location ***** // 

    $Location_pincode = $InputData['Location-pincode'] ; 
    try{

        $Delete_location = "DELETE FROM `delivery_location` WHERE `Delivery_location_pincode` = '$Location_pincode' " ; 
        $Delete_location = mysqli_query($conn, $Delete_location) ; 

        // **** Email message **** // 

        $data_array =  array(
            "value1" => $Admin_email_value, 
            "value2" => "Delete location ", 
            "value3" => "<h3>Someone just delete one delivery location. Check it out !</h3>"
        );
        
        $make_call = callAPI('POST', 'https://maker.ifttt.com/trigger/Send-email/with/key/fGVdBxnIMCJDSBwXsS5FqWF8xAGM8dT49-nW3c4gIhD', json_encode($data_array));
        $Email_response = json_decode($make_call, true);

        $Response = array("Status" => "Delete") ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Complete-order"){

    // ***** Request for complete user order ***** // 

    $User_id = $InputData['User_id'] ; 

    $Order_id = $InputData['Order_id'] ; 

    $Mobile_number = $InputData['Mobile_number'] ; 

    mysqli_autocommit($conn, false) ; 

    try{
        // Today date 

        $Today_date = date("Y-m-d") ; 

        // Query 1 Update order data table 

        $Update_order_data_table = "UPDATE `order_data` SET `Order_status` = 'Complete' ,  `Order_deliver_date` = '$Today_date' 
            WHERE `Order_id` = '$Order_id' " ; 

        $Update_order_data_table = mysqli_query($conn, $Update_order_data_table ) ; 

        // Query 2 Update userdata table 

        $Update_user_data_table = "UPDATE `$User_id` SET `Data2` = 'Complete', `Data8` = '$Today_date' 
            WHERE `Data1` = '$Order_id' " ; 

        $Update_user_data_table = mysqli_query($conn , $Update_user_data_table) ; 

        mysqli_commit($conn) ; 

        // **** Email message **** // 

        $data_array =  array(
            "value1" => $Admin_email_value, 
            "value2" => "Complete order", 
            "value3" => "<h3>Someone just complete your order. Check it out !</h3>"
        );
        
        $make_call = callAPI('POST', 'https://maker.ifttt.com/trigger/Send-email/with/key/fGVdBxnIMCJDSBwXsS5FqWF8xAGM8dT49-nW3c4gIhD', json_encode($data_array));
        $Email_response = json_decode($make_call, true);

        // **** User information message **** // 

        Send_message("Your Devils Cafe & Bakery order deliver successfully", $Mobile_number) ; 

        // Message 

        $Response = array("Status" => "Complete") ; 
        echo json_encode($Response) ; 
    
    }catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}else if ($InputData['Check_status'] == "Admin-complete-custom-cake-order"){

    // ***** Request for complete custom cake order ****** // 

    $Order_id = $InputData['Order_id'] ; 

    $User_id = $InputData["User_id"] ; 

    $Mobile_number = $InputData['Mobile_number'] ; 

    mysqli_autocommit($conn, false) ; 

    try{

        // Todaye date 

        $Today_date = date("Y-m-d") ; 

        // Query 1 Update order data table 
        $Update_order_data_table = "UPDATE `custom-cake-order` SET `Order_status` = 'Complete', `Order_delivery_date` = '$Today_date' 
        WHERE `Order_id` = '$Order_id' " ; 
        $Update_order_data_table = mysqli_query($conn, $Update_order_data_table) ; 

        // Query 2. Update userdata table 
        $Update_userdata_table = "UPDATE `$User_id` SET `Data1` = 'Complete', `Data4` = '$Today_date' WHERE `Data2` = '$Order_id' " ; 
        $Update_userdata_table = mysqli_query($conn, $Update_userdata_table) ; 

        mysqli_commit($conn) ; 

        // **** Email message **** // 

        $data_array =  array(
            "value1" => $Admin_email_value, 
            "value2" => "Complete custom cake order", 
            "value3" => "<h3>Someone just complete your custom cake order. Check it out !</h3>"
        );
        
        $make_call = callAPI('POST', 'https://maker.ifttt.com/trigger/Send-email/with/key/fGVdBxnIMCJDSBwXsS5FqWF8xAGM8dT49-nW3c4gIhD', json_encode($data_array));
        $Email_response = json_decode($make_call, true);

        // **** Send message **** // 

        Send_message("Your Devils Cafe & Bakery order delivery successfully", $Mobile_number) ; 

        // Message 

        $Response = array("Status" => "Complete") ; 
        echo json_encode($Response) ; 


    }catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
        
    }
}
?>
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

require "./OTPMessage.php" ; 

// ---- Include global variable file ---- // 

include './Global-variable/Global-variable.php' ; 

// **** Function which decode user table name **** // 

// ==== Total API Request ==== // 

// 1. Signup check              -->  Check user mobile number already register or not 
// 2. Signup                    -->  Create user data entry in Database 
// 3. Signin                    -->  Check User Password when user try to Signin 
// 4. Send_opt                  -->  Send Verification OTP to user for Forget password option
// 5. Update_password           -->  Update Password option 
// 6. Fetch_address             -->  Fetch user added address 
// 7. Insert_address            -->  Insert user address 
// 8. Delete address            -->  Delete user address 
// 9. Update address            -->  Update user address details 
// 10. Fetch-banner             -->  Fetch Banner images 
// 11. Fetch-category           -->  Fetch all categories 
// 12. Fetch-status             -->  Fetch all status images 
// 13. Update-mobile-check      -->  Check update mobile register or not 
// 14. Placed-custom-cake-order
// 15. Fetch-watchlist-product
// 16. Fetch-watchlist-product-count
// 17. Fetch-cart-item
// 18. Delete-cart-item 
// 19. All-delivery-location
// 20. Delivery-location-suggesstion 
// 21. Update-address
// 22. Custom-cake-order
// 23. Fetch-custom-cake-order
// 24. Fetch-custom-cake-complete-order
// 25. Placed_order


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

if ($InputData['Check_status'] == "Signup_check"){
    
    // **** Check Mobile number already register or not **** // 

    $MobileNumber = $InputData['Mobilenumber'];
    
    try{
        
        // 1. Query Check Mobile number 

        $Check_mobile_number_query = "SELECT `Mobilenumber` FROM `userdata` WHERE `Mobilenumber` = '$MobileNumber' " ; 
        $Check_mobile_number_query = mysqli_query($conn, $Check_mobile_number_query); 
    
        $Check_mobile_number_query_row_count = mysqli_num_rows($Check_mobile_number_query); 
    
        if ($Check_mobile_number_query_row_count > 0){
            
            $Temp_data = array("Status" => "Mobile number already register") ;
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
}   else if ($InputData['Check_status'] == "Signup"){
   
    // **** Create userdata table when user Signup **** // 

    $Username = $InputData['Username']; 

    $MobileNumber = $InputData['Mobilenumber']; 

    $Password = $InputData['Password'] ; 

    $Notification_id = $InputData['Notification_id'] ; 
    
    mysqli_autocommit($conn, false); 
    
    try{

        // Create hash password 

        $HashPassword = password_hash($Password, PASSWORD_DEFAULT); 

        // Create user table id

        $Data = "abcdefghijklmnopqrstuvwxyz";
        $Data = str_shuffle($Data); 
        $Tablename = substr($Data, 0, 12);
        $Tablename = "user-".$Tablename ;   

        // 1. Query  Create Table query 
        
        $Create_table_query = "CREATE TABLE `$Tablename` (
            `User_key` int NOT NULL AUTO_INCREMENT  ,
            `Option` varchar(100), 
            `Data1` varchar(200),
            `Data2` varchar(200),
            `Data3` varchar(200),
            `Data4` varchar(200),
            `Data5` varchar(200),
            `Data6` varchar(200),
            `Data7` varchar(200),
            `Data8` varchar(200),
            `Data9` varchar(200),
            `Data10` varchar(100), 
            `Data11` varchar(100), 
            `Data12` varchar(100), 
            `Data13` varchar(100), 
            `Data14` varchar(100),
            `Data15` varchar(100),
            PRIMARY KEY(User_key)
        )"; 

        $Create_table_query = mysqli_query($conn, $Create_table_query); 

        // 2. Query  Insert inital data to userdata 

        $Insert_user_required_data = "INSERT INTO `$Tablename` (`User_key`, `Option`, `Data1`, `Data2`, `Data3`, `Data4`, `Data5`, `Data6`, `Data7`)
        VALUES (NULL, 'cart-id', '0', '', '', '', '', '', ''), (NULL, 'address', '0', '', '', '', '', '', '') ";
        
        $Insert_user_required_data = mysqli_query($conn, $Insert_user_required_data); 
        
        // ---- Create JWT Token ---- // 

        $payload = [
            'userdata' => $Tablename
        ];

        $jwt = JWT::encode($payload, $JWT_key, 'HS256');

        // 2. Query Insert userdata query 

        $Insert_userdata_query = "INSERT INTO `userdata` (`User_id`, `Username`, `Mobilenumber`, `Password`, `Userdata`, `Account_create_time`) 
        VALUES (NULL, '$Username', '$MobileNumber', '$HashPassword', '$jwt', current_timestamp()) "; 

        $Insert_userdata_query = mysqli_query($conn , $Insert_userdata_query); 

        // 3. Query Insert data in Notification id store table 

        $Insert_notification_id_query = "INSERT INTO `notification_data` (`Notification_id`, `Notification_key`, `Mobilenumber`) 
        VALUES (NULL, '$Notification_id', '$MobileNumber') " ; 

        $Insert_notification_id_query = mysqli_query($conn, $Insert_notification_id_query)  ; 

        // **** Send Message **** // 

        Send_message($Authentication_message, $MobileNumber) ; 

        mysqli_commit($conn) ; 

        $Temp_data = array("Status" => "Insert data", "Table" => $jwt); 
        echo json_encode($Temp_data) ; 

    }catch(Exception $e){
        
        mysqli_rollback($conn); 

        // Send Response 

        $Temp_data = array("Status" => "Network request failed"); 
        echo json_encode($Temp_data) ; 

    }
}   else if ($InputData['Check_status'] == "Signin"){

    // **** Check user password on Signup time **** // 

    $MobileNumber = $InputData['Mobilenumber']; 

    $UserPassword = $InputData['Password'] ; 

    $Notification_id = $InputData['notification'] ; 

    mysqli_autocommit($conn, false) ; 

    try{

        // 1. Query Fetch user password

        $User_password_fetch_query = "SELECT `Password`, `Userdata`, `Username` FROM `userdata` WHERE `Mobilenumber` = '$MobileNumber' "; 
        $User_password_fetch_query = mysqli_query($conn, $User_password_fetch_query); 
        $User_password_fetch_query_data = mysqli_fetch_all($User_password_fetch_query, MYSQLI_ASSOC); 

        if (count($User_password_fetch_query_data) == 0){
            
            // Message 

            $Temp_data = array("Status" => "Mobile number not register"); 
            echo json_encode($Temp_data) ; 
        }
        else{

            $HashPassword = $User_password_fetch_query_data[0]['Password'];
            $UserTable = $User_password_fetch_query_data[0]['Userdata'] ;  
            $Username = $User_password_fetch_query_data[0]['Username'] ; 
            
            if (password_verify($UserPassword, $HashPassword)){
                
                // Notification insert query 

                $Insert_notification_id_query = "INSERT INTO `notification_data` (`Notification_id`, `Notification_key`, `Mobilenumber`) 
                VALUES (NULL, '$Notification_id', '$MobileNumber') " ; 
        
                $Insert_notification_id_query = mysqli_query($conn, $Insert_notification_id_query)  ; 

                // ***** Send message ***** // 

                Send_message($Authentication_message, $MobileNumber) ; 

                mysqli_commit($conn) ; 

                // Message

                $Temp_data = array("Status" => "Signin", "Tablename" => $UserTable, "Username" => $Username ); 
                echo json_encode($Temp_data) ; 
            }
            else{

                // Message

                $Temp_data = array("Status" => "Invalid Password"); 
                echo json_encode($Temp_data) ; 
            }
        }

    }catch (Exception $e){

        mysqli_rollback($conn); 

        $Temp_data = array("Status" => "Network request failed"); 
        echo json_encode($Temp_data) ; 
    }
}   else if ($InputData['Check_status'] == "Send_otp"){

    // **** Send OTP to user mobile number for Forget Password **** // 

    $MobileNumber = $InputData['Mobilenumber'] ; 
    
    try{

        // 1. Query Check Mobile number register or not  

        $Fetch_mobile_number_query = "SELECT `Mobilenumber` FROM `userdata` WHERE `Mobilenumber` = '$MobileNumber' ";
        $Fetch_mobile_number_query = mysqli_query($conn, $Fetch_mobile_number_query); 
        $Fetch_mobile_number_query_row_count = mysqli_num_rows($Fetch_mobile_number_query); 

        if ($Fetch_mobile_number_query_row_count == 0){

            // Message 

            $Response = array("Status" => "Mobile number not register"); 
            echo json_encode($Response) ; 
        }
        else{

            // **** Send Verification code to user mobile number **** // 

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


            $response = curl_exec($curl);
            $err = curl_error($curl);
            curl_close($curl);

            $curl_response = json_decode($response, true);

            if ($curl_response['return'] == true){

                // Message 

                $Response = array("Status" => "OTP send", "OTP" => $Verification_code); 
                echo json_encode($Response) ; 
            }
            else{

                // Message 

                $Response = array("Status" => " "); 
                echo json_encode($Response) ; 
            }
        }
    }catch (Exception $e){

        $Response = array("Status" => "Network request failed");
        echo json_encode($Response) ; 
    }
    
}   else if ($InputData['Check_status'] == "Update_password"){

    // **** Update Password request **** //  

    $MobileNumber = $InputData['Mobilenumber']; 
    $Password = $InputData['Password'] ; 

    try{

        // ---- Create hash password ---- // 

        $HashPassword = password_hash($Password, PASSWORD_DEFAULT); 

        // 1. Query Update password query 

        $Update_password_query = "UPDATE `userdata` SET `Password` = '$HashPassword' WHERE `Mobilenumber` = '$MobileNumber' "; 
        $Update_password_query = mysqli_query($conn, $Update_password_query); 
        
        // Message 

        $Response = array("Status" => "Update password"); 
        echo json_encode($Response) ; 

    }catch (Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed"); 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Fetch_address"){

    // **** Fetch user addeded address **** // 

    $Table_name = $InputData['Table_name'] ; 

    // ---- Decode userdata table name ---- // 

    $Decoded_data= JWT::decode($Table_name, new Key($JWT_key, 'HS256'));

    $Decoded_data = json_decode(json_encode($Decoded_data),true);

    $Table_name = $Decoded_data['userdata'] ; 

    mysqli_autocommit($conn, false); 

    try{

        // 1. Query Fetch user address

        $Fetch_address_query = "SELECT * FROM `$Table_name` WHERE `Option` LIKE 'address-%' "; 
        $Fetch_address_query = mysqli_query($conn, $Fetch_address_query); 
        $Fetch_address_query_result = mysqli_fetch_all($Fetch_address_query, MYSQLI_ASSOC); 

        mysqli_commit($conn) ;

        // Message 

        $Response = array("Status" => "Fetch", "Address" => $Fetch_address_query_result) ; 
        echo json_encode($Response)  ;  

    }catch(Exception $e){

        mysqli_rollback($conn); 

        // Message 

        $Response = array("Status" => "Network request failed"); 
        echo json_encode($Response)  ;  
    }
}   else if ($InputData['Check_status'] == "Insert_address"){

    // **** Insert address to user table **** // 
    
    $Table_name = $InputData['Table_name']; 
    
    // **** Decode user table name **** // 

    $Decoded_data= JWT::decode($Table_name, new Key($JWT_key, 'HS256'));

    $Decoded_data = json_decode(json_encode($Decoded_data),true);

    $Table_name = $Decoded_data['userdata'] ; 

    // **** Complete **** // 

    $Username = $InputData['Username']; 
    
    $Street_address = $InputData['Street_address'];
    
    $Area = $InputData['Area']; 
    
    $Landmark = $InputData['City']; 
    
    $Pincode = $InputData['Pincode']; 

    mysqli_autocommit($conn, false); 

    try{
        
        // 1. Query Check pincode available for delivery or not 

        $Check_pincode_available = "SELECT `Delivery_location_name` FROM  `delivery_location` WHERE `Delivery_location_pincode` = '$Pincode' " ; 
        $Check_pincode_available = mysqli_query($conn, $Check_pincode_available) ; 
        $Check_pincode_available_row = mysqli_num_rows($Check_pincode_available) ; 

        if ($Check_pincode_available_row > 0){

            // 2. Query Fetch address id of User 
    
            $Fetch_address_id = "SELECT `Data1` FROM `$Table_name` WHERE `Option` = 'address'"; 
            $Fetch_address_id = mysqli_query($conn, $Fetch_address_id); 
            $Fetch_address_id_result = mysqli_fetch_all($Fetch_address_id, MYSQLI_ASSOC);
            
            // ---- Update address count ---- // 
    
            $Address_id_count = $Fetch_address_id_result[0]['Data1']; 
            $Address_id = "address-".$Address_id_count; 
        
            // 3. Query Insert address data 
    
            // **** Data Information **** // 
            // Data2 - Username 
            // Data3 - Street address 
            // Data4 - Area information
            // Data5 - Landmark information 
            // Data6 - Pincode information 
    
            $Insert_address_query = "INSERT INTO `$Table_name` (`User_key`, `Option`, `Data1`, `Data2`, `Data3`, `Data4`, `Data5`, `Data6`, `Data7`) 
            VALUES (NULL, '$Address_id', '$Username', '$Street_address', '$Area', '$Landmark', '$Pincode', NULL, NULL) " ; 
            
            $Insert_address_query = mysqli_query($conn, $Insert_address_query); 
            
            // 4. Query Update address id query 
    
            $Update_address_id_count = (int)$Address_id_count; 
            $Update_address_id_count = $Update_address_id_count + 1; 
    
            $Update_address_id_query = "UPDATE `$Table_name` SET `Data1` = '$Update_address_id_count' WHERE `Option` = 'address' "; 
            $Update_address_id_query = mysqli_query($conn, $Update_address_id_query); 
    
            mysqli_commit($conn); 
            
            // Message 
    
            $Response = array("Status" => "Insert"); 
            echo json_encode($Response)  ; 
        }else{

            $Response = array("Status" => "Not found"); 
            echo json_encode($Response)  ; 
        }
        

    }catch (Exception $e){
        mysqli_rollback($conn); 

        // Message 

        $Response = array("Status" => "Network request failed"); 
        echo json_encode($Response)  ; 
    }
}   else if ($InputData['Check_status'] == "Delete_address"){

    // **** Delete user adddress from userdata table **** // 

    $Table_name = $InputData['Table_name']; 

    // **** Decode table name *** // 

    $Decoded_data= JWT::decode($Table_name, new Key($JWT_key, 'HS256'));

    $Decoded_data = json_decode(json_encode($Decoded_data),true);

    $Table_name = $Decoded_data['userdata'] ;

    // **** Complete **** //

    $Delete_address_id = $InputData['Delete_address_id'];

    mysqli_autocommit($conn, false); 

    try{

        // 1. Query Delete address query

        $Delete_address_query = "DELETE FROM `$Table_name` WHERE `Option` = '$Delete_address_id' ";
        $Delete_address_query = mysqli_query($conn, $Delete_address_query); 

        mysqli_commit($conn); 

        $Response = array("Status" => "Delete"); 
        echo json_encode($Response)  ;  


    }catch(Exception $e){
        mysqli_rollback($conn); 

        $Response = array("Status" => "Network request failed"); 
        echo json_encode($Response)  ; 
    }
}   else if ($InputData['Check_status'] == "Update_address"){

    // **** Update user address **** // 

    $Table_name = $InputData['Table_name'] ; 

    // **** Decode user table name **** // 

    $Decoded_data= JWT::decode($Table_name, new Key($JWT_key, 'HS256'));

    $Decoded_data = json_decode(json_encode($Decoded_data),true);

    $Table_name = $Decoded_data['userdata'] ; 

    // **** Complete **** //

    $Username = $InputData['Username'] ; 
    
    $Street_address = $InputData['Street_address'] ; 
    
    $Area = $InputData['Area'] ; 
    
    $Pincode = $InputData['Pincode'] ;  
    
    $Landmark = $InputData['Landmark'] ;
    
    $Address_id = $InputData['address_id']; 

    mysqli_autocommit($conn, false); 

    try{
        
        // 1. Query - Update address query 

        $Update_address_query = "UPDATE `$Table_name` SET `Data1` = '$Username', `Data2` = '$Street_address', 
        `Data3` = '$Area', `Data4` = '$Landmark', `Data5` = '$Pincode' WHERE `Option` = '$Address_id' " ;
        
        $Update_address_query = mysqli_query($conn, $Update_address_query); 

        mysqli_commit($conn); 

        // Message 

        $Response = array("Status" => "Update"); 
        echo json_encode($Response)  ;  

    }catch(Exception $e){

        mysqli_rollback($conn); 

        // Message 
        
        $Response = array("Status" => "Network request failed"); 
        echo json_encode($Response)  ;  
    }
}   else if ($InputData['Check_status'] == "Fetch-banner"){

    // **** Fetch Banner images from database **** // 

    try{
        
        $Banner_image_fetch_query = "SELECT `Banner_image` AS 'image' FROM `banner_data`  "; 
        $Banner_image_fetch_query = mysqli_query($conn, $Banner_image_fetch_query); 
        $Banner_image_fetch_query_data = mysqli_fetch_all($Banner_image_fetch_query, MYSQLI_ASSOC);

        $Decoration_image_fetch_query = "SELECT `Banner_image` AS 'image' FROM `party_decoration_image`  " ; 
        $Decoration_image_fetch_query = mysqli_query($conn, $Decoration_image_fetch_query) ; 
        $Decoration_image_fetch_query_data = mysqli_fetch_all($Decoration_image_fetch_query, MYSQLI_ASSOC) ; 

        $Fetch_random_category = "SELECT * FROM `category` ORDER BY RAND() LIMIT 4" ; 
        $Fetch_random_category = mysqli_query($conn, $Fetch_random_category) ; 
        $Fetch_random_category_result = mysqli_fetch_all($Fetch_random_category, MYSQLI_ASSOC) ; 

        
        $Response = array("Status" => "Fetch", 
        "Banner" => $Banner_image_fetch_query_data, 
        "Decoration" => $Decoration_image_fetch_query_data,
        "Category" => $Fetch_random_category_result) ; 
        echo json_encode($Response) ; 

    }catch (Exception $e){

        $Response = array("Status" => "Network request failed"); 
        echo json_encode($Response) ;  
    }
    
}   else if ($InputData['Check_status'] == "Fetch-category"){

    // **** Fetch all categories **** // 

    try{

        $Fetch_category_query = "SELECT `Category_image`, `Category_name`, `Category_data`, `Category_description` FROM `category` " ; 
        $Fetch_category_query = mysqli_query($conn, $Fetch_category_query) ; 
        $Fetch_category_query_result = mysqli_fetch_all($Fetch_category_query, MYSQLI_ASSOC) ; 

        $Response = array("Status" => "Fetch", "Category" => $Fetch_category_query_result) ; 
        echo json_encode($Response) ; 
    
    }catch(Exception $e){
        
        // Message 

        $Response = array("Status" => "Network request failed"); 
        echo json_encode($Response) ;  
    }
}   else if ($InputData['Check_status'] == "Fetch-status"){

    // **** Fetch status images from database **** // 

    try{
        
        $Status_image_fetch_query = "SELECT `Status_image` AS 'image' FROM `status_data`  "; 
        $Status_image_fetch_query = mysqli_query($conn, $Status_image_fetch_query); 
        $Status_image_fetch_query_data = mysqli_fetch_all($Status_image_fetch_query, MYSQLI_ASSOC);
        
        $Response = array("Status" => "Fetch", "Banner" => $Status_image_fetch_query_data) ; 
        echo json_encode($Response) ; 

    }catch (Exception $e){

        $Response = array("Status" => "Network request failed"); 
        echo json_encode($Response) ;  
    }
}   else if ($InputData['Check_status'] == "Update-mobile-check"){

    // **** Check update mobile number enter by user already register or not **** // 

    $MobileNumber = $InputData['Mobilenumber'];
    
    try{
    
        // 1. Query  Check mobile number register or not 

        $Check_mobile_number_query = "SELECT `Mobilenumber` FROM `userdata` WHERE `Mobilenumber` = '$MobileNumber' " ; 
        $Check_mobile_number_query = mysqli_query($conn, $Check_mobile_number_query); 
        $Check_mobile_number_query_row_count = mysqli_num_rows($Check_mobile_number_query); 
    
        if ($Check_mobile_number_query_row_count == 0){

            // **** Create verification code **** // 
            // **** Send Verification code to user **** // 

            $Verification_code_data = "1234567890";
            $Verification_code_data = str_shuffle($Verification_code_data);
            $Verification_code = substr($Verification_code_data, 0, 4);

            $curl = curl_init();

            curl_setopt_array($curl, array(
                CURLOPT_URL => "https://www.fast2sms.com/dev/bulkV2?authorization=".$AuthenticationKey."&variables_values=$Verification_code&route=otp&                    numbers=" . urlencode($MobileNumber),
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


            $response = curl_exec($curl);
            $err = curl_error($curl);
            curl_close($curl);

            $curl_response = json_decode($response, true);

            if ($curl_response['return'] == true){
                
                // Message - OTP send successfully 

                $Response = array("Status" => "OTP send", "OTP" =>  $Verification_code); 
                echo json_encode($Response) ;  
            }
            else{

                // Message - OTP Failed 

                $Response = array("Status" => "OTP send failed"); 
                echo json_encode($Response) ;   
            }
            
        }
        else{

            $Response = array("Status" => "Mobile number already register") ;
            echo json_encode($Response) ; 
            
        }

    
    }catch (Exception $e){

        // Message

        $Response = array("Status" => "Network request failed"); 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Fetch-watchlist-product"){

    // **** Request which fetch watchlist product **** // 

    $Table_name = $InputData['User_id'] ; 

    // ---- Decode userdata table name ---- // 

    $Decoded_data= JWT::decode($Table_name, new Key($JWT_key, 'HS256'));

    $Decoded_data = json_decode(json_encode($Decoded_data),true);

    $Table_name = $Decoded_data['userdata'] ; 


    try{

        // Query 1 -- Fetch Prouct id, Category id from userdata table 
        
        $Fetch_watchlist_product_data = "SELECT `Data1`, `Data2` FROM `$Table_name` WHERE `Option` = 'watchlist' "; 
        $Fetch_watchlist_product_data = mysqli_query($conn, $Fetch_watchlist_product_data); 
        $Fetch_watchlist_product_data_result = mysqli_fetch_all($Fetch_watchlist_product_data, MYSQLI_ASSOC); 
        
        $Category_table_wise_product_id  ; 
        
        $Category_id = array() ; 
        
        $Category_wise_product_data = array() ; 

        // Store category id wise product id 

        for($i = 0 ; $i<count($Fetch_watchlist_product_data_result); $i++){
        
            if (isset($Category_table_wise_product_id[$Fetch_watchlist_product_data_result[$i]['Data2']])){
            
                array_push($Category_table_wise_product_id[$Fetch_watchlist_product_data_result[$i]['Data2']], $Fetch_watchlist_product_data_result[$i]['Data1']) ; 
            }
            else{
                
                array_push($Category_id, $Fetch_watchlist_product_data_result[$i]['Data2']) ; 
                
                $Category_table_wise_product_id[$Fetch_watchlist_product_data_result[$i]['Data2']] = array($Fetch_watchlist_product_data_result[$i]['Data1']) ; 
            }
        }

        // Query 2 Fetch product data from category table 

        for($i = 0 ; $i<count($Category_id); $i++){
            
            if (count($Category_table_wise_product_id[$Category_id[$i]])){
                
                $ids = implode(', ', $Category_table_wise_product_id[$Category_id[$i]]);

                $Select_product_data_query = "SELECT * FROM `$Category_id[$i]` WHERE `Product_id` IN ( '" . implode( "', '",                                               $Category_table_wise_product_id[$Category_id[$i]] ) . "' ) " ;
                $Select_product_data_query = mysqli_query($conn , $Select_product_data_query) ; 
        
                $Select_product_data_query_result = mysqli_fetch_all($Select_product_data_query, MYSQLI_ASSOC); 
                
                for($j = 0 ; $j<count($Select_product_data_query_result); $j++){
                    
                    $Select_product_data_query_result[$j]["Category_id"] = $Category_id[$i]; 
                    array_push($Category_wise_product_data, $Select_product_data_query_result[$j]); 
                }

            }
        }


        unset($Category_id); 
        unset($Category_table_wise_product_id); 

        $Response = array("Status" => "Fetch", "Data" => $Category_wise_product_data); 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request ") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Fetch-watchlist-product-count"){

    // **** Request watchlist product count query **** // 

    $Table_name = $InputData['User_id'] ; 

    // ---- Decode userdata table name ---- // 

    $Decoded_data= JWT::decode($Table_name, new Key($JWT_key, 'HS256'));

    $Decoded_data = json_decode(json_encode($Decoded_data),true);

    $Table_name = $Decoded_data['userdata'] ; 
    
    try{

        $Wwatchlist_product_count = "SELECT * FROM `$Table_name` WHERE `Option` = 'watchlist' " ; 
        $Wwatchlist_product_count = mysqli_query($conn, $Wwatchlist_product_count) ; 
        $Wwatchlist_product_count_row = mysqli_num_rows($Wwatchlist_product_count) ; 

        // Message 

        $Response = array("Status" => "Fetch", "Count" => $Wwatchlist_product_count_row) ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Fetch-cart-item"){

    // **** Request for fetch cart item **** // 

    $Table_name = $InputData['User_id'] ; 

    // ---- Decode userdata table name ---- // 

    $Decoded_data= JWT::decode($Table_name, new Key($JWT_key, 'HS256'));

    $Decoded_data = json_decode(json_encode($Decoded_data),true);

    $Table_name = $Decoded_data['userdata'] ; 
    

    try{

        // Query 1 Fetch cart item data 

        $Fetch_cart_data_query = "SELECT `Data1`, `Data2`, `Data3`, `Data4`, `Data5` FROM `$Table_name` WHERE `Option` = 'cart-item' " ; 
        $Fetch_cart_data_query = mysqli_query($conn, $Fetch_cart_data_query) ; 
        $Fetch_cart_data_query_result = mysqli_fetch_all($Fetch_cart_data_query, MYSQLI_ASSOC); 

        $Category_table_wise_product_id  ; 

        $Category_id = array() ; 
        
        $Category_wise_product_data = array() ; 

        $Product_id_wise_information = array() ; 

        for($i = 0; $i<count($Fetch_cart_data_query_result); $i++){

            $Product_id_wise_information[$Fetch_cart_data_query_result[$i]['Data1']] = array($Fetch_cart_data_query_result[$i]['Data3'], $Fetch_cart_data_query_result[$i]['Data4'], $Fetch_cart_data_query_result[$i]['Data5']) ; 

            if (isset($Category_table_wise_product_id[$Fetch_cart_data_query_result[$i]['Data2']])){
                
                array_push($Category_table_wise_product_id[$Fetch_cart_data_query_result[$i]['Data2']], $Fetch_cart_data_query_result[$i]['Data1']) ; 
            }
            else{

                array_push($Category_id, $Fetch_cart_data_query_result[$i]['Data2']) ; 
                $Category_table_wise_product_id[$Fetch_cart_data_query_result[$i]['Data2']] = array($Fetch_cart_data_query_result[$i]['Data1']) ; 
            }
        }

        $Subtotal = 0 ;

        for($i = 0 ; $i<count($Category_id); $i++){

            if (count($Category_table_wise_product_id[$Category_id[$i]]) > 0 ){

                $ids = implode(', ', $Category_table_wise_product_id[$Category_id[$i]]);

                $Select_product_data_query = "SELECT * FROM `$Category_id[$i]` WHERE `Product_id` IN ( '" . implode( "', '",$Category_table_wise_product_id[$Category_id[$i]] ) . "' ) " ;
                $Select_product_data_query = mysqli_query($conn , $Select_product_data_query) ; 
        
                $Select_product_data_query_result = mysqli_fetch_all($Select_product_data_query, MYSQLI_ASSOC); 
                
                for($j = 0 ; $j<count($Select_product_data_query_result); $j++){

                    $Subtotal = $Subtotal + intval($Select_product_data_query_result[$j]["Product_discount_price"]) ;
                    
                    $Select_product_data_query_result[$j]["Category_id"] = $Category_id[$i]; 
                    $Select_product_data_query_result[$j]['Product_details'] = $Product_id_wise_information[$Select_product_data_query_result[$j]["Product_id"]] ; 
                    
                    array_push($Category_wise_product_data, $Select_product_data_query_result[$j]); 
                }
            }
        }

        mysqli_commit($conn) ; 

        unset($Category_id); 
        unset($Category_table_wise_product_id);

        $Response = array("Status" => "Fetch", "Data" => $Category_wise_product_data, "Subtotal" => $Subtotal) ; 

        echo json_encode($Response) ; 

    }catch(Exception $e){

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
        
    }
}   else if ($InputData['Check_status'] == "Delete-cart-item"){

    // **** Request for remove product from cart ***** // 

    $Table_name = $InputData['User_id'] ; 

    // ---- Decode userdata table name ---- // 

    $Decoded_data= JWT::decode($Table_name, new Key($JWT_key, 'HS256'));

    $Decoded_data = json_decode(json_encode($Decoded_data),true);

    $Table_name = $Decoded_data['userdata'] ; 

    $Category_id = $InputData['Category_id'] ; 

    $Product_id = $InputData['Product_id'] ; 

    mysqli_autocommit($conn, false) ; 

    try{

        // Query 1 Delete product from cart query 

        $Delete_product_from_cart_query = "DELETE FROM `$Table_name` WHERE `Option` = 'cart-item' AND `Data1` = '$Product_id' AND `Data2` = '$Category_id' " ; 
        $Delete_product_from_cart_query = mysqli_query($conn, $Delete_product_from_cart_query) ; 

        mysqli_commit($conn) ; 

        $Response = array("Status" => "Delete product") ;
        echo json_encode($Response) ; 

    }catch(Exception $e){

        mysqli_rollback($conn) ; 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "All-delivery-location"){

    // **** Request fro fetch all delivery location **** // 

    try{

        $Select_delivery_location_query = "SELECT * FROM `delivery_location`" ; 
        $Select_delivery_location_query = mysqli_query($conn, $Select_delivery_location_query) ; 
        $Select_delivery_location_query_result = mysqli_fetch_all($Select_delivery_location_query, MYSQLI_ASSOC) ; 

        $Response = array("Status" => "Fetch", "Location" => $Select_delivery_location_query_result) ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Delivery-location-suggesstion"){

    // **** Request for deleivery location suggesstion **** // 

    $Location_name = $InputData['Location_name'] ; 

    $Location_pincode = $InputData['Location_pincode'] ; 

    $Username = $InputData['Username'] ;
    
    $MobileNumber = $InputData['Mobilenumber'] ; 

    mysqli_autocommit($conn, false)  ; 

    try{

        $Insert_location_suggesstion_query = "INSERT INTO `delivery_location_suggesstion` (`Suesstion_key`, `Delivery_location_pincode`, `Delivery_location_name`, `Username`, `Mobilenumber`) 
        VALUES (NULL, '$Location_pincode', '$Location_name', '$Username', '$MobileNumber') " ; 

        $Insert_location_suggesstion_query = mysqli_query($conn, $Insert_location_suggesstion_query) ; 

        mysqli_commit($conn) ; 

        // Message 

        $Response = array("Status" => "Insert suggesstion") ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        mysqli_rollback($conn) ; 

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Update-address"){

    // ***** Request for update address ***** // 

    $Table_name = $InputData['Table_name'] ; 

    // ---- Decode userdata table name ---- // 

    $Decoded_data= JWT::decode($Table_name, new Key($JWT_key, 'HS256'));

    $Decoded_data = json_decode(json_encode($Decoded_data),true);

    $Table_name = $Decoded_data['userdata'] ;

    $Street_address = $InputData['Street_address'] ; 

    $Area = $InputData['Area'] ; 

    $City = $InputData['City'] ; 

    $Pincode = $InputData['Pincode'] ; 

    $Username = $InputData['Username'] ; 

    $Address_id = $InputData['address_id'] ; 
 
    mysqli_autocommit($conn, false) ; 

    try{

        $Update_address_query = "UPDATE `$Table_name` SET `Data1` = '$Username', `Data2` = '$Street_address', 
        `Data3` = '$Area', `Data4` = '$City', `Data5` = '$Pincode' WHERE `Option` = '$Address_id' " ; 

        $Update_address_query = mysqli_query($conn, $Update_address_query); 

        mysqli_commit($conn) ; 

        // Message 

        $Response = array("Status" => "Update") ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        mysqli_rollback($conn) ; 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Custom-cake-order"){

    // **** Request for custom cake order ***** // 

    $Table_name = $InputData['Table_name'] ; 

    // ---- Decode userdata table name ---- // 

    $Decoded_data= JWT::decode($Table_name, new Key($JWT_key, 'HS256'));

    $Decoded_data = json_decode(json_encode($Decoded_data),true);

    $Table_name = $Decoded_data['userdata'] ; 

    $Username = $InputData['Username'] ; 

    $MobileNumber = $InputData['Mobilenumber'] ; 

    $Cake_weight = $InputData['Product_weight'] ; 

    $Product_information = $InputData['Product_information'] ; 

    $Product_falvour = $InputData['Product_flavour'] ; 

    $Product_color = $InputData['Product_color'] ; 

    $Product_name = $InputData['Product_name'] ; 

    $Street_address = $InputData['Street_address'] ; 

    $Area = $InputData['Area'] ; 

    $City = $InputData['City'] ; 

    $Pincode = $InputData['Pincode'] ; 

    $Product_image1 = $InputData['Product_image1'] ; 

    $Product_image2 = $InputData['Product_image2'] ; 

    $Product_image3 = $InputData['Product_image3'] ; 

    mysqli_autocommit($conn, false) ; 

    // User table entry 

    // Option   -   Custom-cake-order
    // Data1    -   Order_status
    // Data2    -   Order_id
    // Data3    -   Order_date
    // Data4    -   Order_deliver_date
    // Data5    -   Order_cancel_reason
    // Data6    -   Product_image1
    // Data7    -   Product_image2
    // Data8    -   Product_image3
    // Data9    -   Product_information 
    // Data10    -  Product_weight**Product_color
    // Data11   -   Product_name
    // Data12   -   Street_address
    // Data13   -   Area, Landmark
    // Data14   -   City
    // Data15   -   Pincode

    try{

        // Create order id 

        $Data = "abcdefghijklmnopqrstuvwxyz" ; 
        $Data = str_shuffle($Data) ; 
        $Order_id = substr($Data, 0, 10) ; 

        // Query 1 --- Insert Custom order details in User table 

        $Product_weight_color = $Cake_weight."**".$Product_color ; 

        $Insert_userdata_query = "INSERT INTO `$Table_name` (`User_key`, `Option`, `Data1`, `Data2`, `Data3`, `Data4`, `Data5`, `Data6`, `Data7`, `Data8`, `Data9`, `Data10`, `Data11`, `Data12`, `Data13`, `Data14`, `Data15`) 
        VALUES (NULL, 'Custom-cake-order', 'Pending', '$Order_id', current_timestamp(), '-', '-', '$Product_image1', '$Product_image2', '$Product_image3', '$Product_information',  '$Product_weight_color', '$Product_name', '$Street_address', '$Area', '$City', '$Pincode') " ;
        
        $Insert_userdata_query = mysqli_query($conn, $Insert_userdata_query) ; 

        // Query 2 ---- Custom cake order entry for Admin side 

        $Insert_admin_query = "INSERT INTO `custom-cake-order` (`Custom-cake-id`, `Custom-cake-image1`, `Custom-cake-image2`, `Custom-cake-image3`, `Custom-cake-information`, `Custom-cake-weight`, `Custom-cake-top-name`, `Custom_cake_flavour`, `Custom_cake_color`, `Custom_cake_orderid`, `Order_delivery_date`, `Order_cancel_reason`, `Username`, `Userdata`, `Mobilenumber`, `Street_address`, `Area`, `Order_date`, `City`, `Pincode`, `Order_status`) 
        VALUES (NULL, '$Product_image1', '$Product_image2', '$Product_image3', '$Product_information', '$Cake_weight', '$Product_name', '$Product_falvour', '$Product_color', '$Order_id', '-', '-', '$Username', '$Table_name', '$MobileNumber', '$Street_address', '$Area', current_timestamp() , '$City', '$Pincode', 'Pending') " ;
        
        $Insert_admin_query = mysqli_query($conn, $Insert_admin_query) ; 

        // ====== Message ====== // 

        // 1. Send Message to user 

        Send_message($Custom_cake_order_message, $MobileNumber);
        Send_message($Custom_cake_contact_message, $MobileNumber) ; 

        // 2. Send Message to admin 

        Send_message($Custom_cake_order_admin_message,$Admin_mobile_number ) ;

        mysqli_commit($conn) ; 

        // Message 

        $Response = array("Status" => "Placed order") ; 
        echo json_encode($Response) ; 
     
    }catch(Exception $e){

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Fetch-custom-cake-order"){

    // **** Request for fetch custom cake order **** // 

    $Table_name = $InputData['Table_name'] ; 

    // ---- Decode userdata table name ---- // 

    $Decoded_data= JWT::decode($Table_name, new Key($JWT_key, 'HS256'));

    $Decoded_data = json_decode(json_encode($Decoded_data),true);

    $Table_name = $Decoded_data['userdata'] ; 
    

    try{

        // Query 1. Fetch Custom cake order


        $Fetch_custom_order = "SELECT * FROM `$Table_name` WHERE `Option` = 'Custom-cake-order' AND `Data1` = 'Pending' " ; 
        $Fetch_custom_order = mysqli_query($conn, $Fetch_custom_order) ; 
        
        $Fetch_custom_order_data = mysqli_fetch_all($Fetch_custom_order, MYSQLI_ASSOC) ; 

        // Message 

        $Response = array("Status" => "Fetch", "Order" => $Fetch_custom_order_data) ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Fetch-custom-cake-complete-order"){

    // **** Request for fetch custom cake order **** // 

    $Table_name = $InputData['Table_name'] ; 

    // ---- Decode userdata table name ---- // 

    $Decoded_data= JWT::decode($Table_name, new Key($JWT_key, 'HS256'));

    $Decoded_data = json_decode(json_encode($Decoded_data),true);

    $Table_name = $Decoded_data['userdata'] ; 


    try{

        // Query 1. Fetch Custom cake order


        $Fetch_custom_order = "SELECT * FROM `$Table_name` WHERE `Option` = 'Custom-cake-order' AND `Data1` = 'Complete' " ; 
        $Fetch_custom_order = mysqli_query($conn, $Fetch_custom_order) ; 
        
        $Fetch_custom_order_data = mysqli_fetch_all($Fetch_custom_order, MYSQLI_ASSOC) ; 

        // Message 

        $Response = array("Status" => "Fetch", "Order" => $Fetch_custom_order_data) ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Placed-order"){

    // **** Request for placed order request **** // 

    $Table_name = $InputData['Table_name'] ;

    // ---- Decode userdata table name ---- // 

    $Decoded_data= JWT::decode($Table_name, new Key($JWT_key, 'HS256'));

    $Decoded_data = json_decode(json_encode($Decoded_data),true);

    $Table_name = $Decoded_data['userdata'] ; 


    // ====== Order total value ====== // 
    
    $Order_total = $InputData['Order_total'] ;
    $Order_delivery_charge = $InputData['Order_delivery_charge'] ; 

    // ====== Order Product information ====== // 

    $Order_product_data =  json_decode(json_encode($InputData['Order_product_data']), true) ; 

    // ====== Order Payment details ===== // 

    $Order_payment = "Online payment pending" ; 
    $Payment_id = "None" ;
    
    // ===== Order address details ===== // 
    
    $Order_address = json_decode(json_encode($InputData['Order_address']), true); 
    
    // ===== User details information ===== // 
    $Username = $Order_address['Data1'] ; 
    $MobileNumber = $InputData['Mobile_number'] ; 
    
    $Street_address = $Order_address['Data2'] ; 
    
    $Area = $Order_address['Data3'] ; 
    
    $Landmark = $Order_address['Data4'] ; 
    
    $Pincode = $Order_address['Data5'] ; 

    // ===== Order status information ====== // 
    $Order_status = "Pending" ;  

    mysqli_autocommit($conn, false) ; 

    try{

        // **** Query1 Fetch current cart id of user **** // 

        $Fetch_cart_id = "SELECT `Data1` FROM `$Table_name` WHERE `Option` = 'cart-id' "; 
        $Fetch_cart_id = mysqli_query($conn, $Fetch_cart_id) ; 
        $Fetch_cart_id_result = mysqli_fetch_all($Fetch_cart_id, MYSQLI_ASSOC) ; 
        
        $Current_cart_id = "cart-item-".$Fetch_cart_id_result[0]['Data1'] ; 

        // ====== Create current order-item key ======= // 

        $Order_item_id = "order-item-".$Fetch_cart_id_result[0]['Data1'] ;  

        // ***** Query2 Update cart-item to order-item **** // 

        $Update_cart_item_query = "UPDATE `$Table_name` SET `Option` = '$Order_item_id' WHERE `Option` = 'cart-item' " ; 
        $Update_cart_item_query = mysqli_query($conn, $Update_cart_item_query); 
        
        // ***** Query3  Update cart-id to +1 ***** // 

        $Update_cart_id = strval(intval($Fetch_cart_id_result[0]['Data1'])+1) ; 
        $Update_cart_id_query = "UPDATE `$Table_name` SET `Data1` = '$Update_cart_id'  WHERE `Option`= 'cart-id' " ;  
        $Update_cart_id_query = mysqli_query($conn, $Update_cart_id_query) ; 
    
        // ----- Genrate order id ------ // 

        $Order_id_data = "1234567890" ; 
        $Order_id_data = str_shuffle($Order_id_data); 
        $Order_id = substr($Order_id_data, 0 , 6); 

        // ****** Query4 Insert Order information query to user table ****** //  

        // ---- Insert data details ---- //
        // Option   -   Order
        // Data1    -   Order_id
        // Data2    -   Order_status
        // Data3    -   Order_date
        // Data4    -   Order_payment_method
        // Data5    -   Order_payment_id
        // Data6    -   Order_cancel_date
        // Data7    -   Order_cancel_reason
        // Data8    -   Order_delivery_date
        // Data9    -   Order_total_amount
        // Data10   -   Street_address
        // Data11   -   Area
        // Data12   -   City
        // Data13   -   Pincode
        // Data14   -   Username
        // Data15   -   Mobilenumber

        $Insert_user_order_data = "INSERT INTO `$Table_name` (`User_key`, `Option`, `Data1`, `Data2`, `Data3`, `Data4`, `Data5`, `Data6`, `Data7`, `Data8`, `Data9`, `Data10`, `Data11`, `Data12`, `Data13`, `Data14`, `Data15`)
        VALUES (NULL, 'Order', '$Order_id', '$Order_status', current_timestamp(), '$Order_payment', '$Payment_id', '-', '-', '-', '$Order_total', '$Street_address', '$Area', '$Landmark', '$Pincode', '$Username', '$MobileNumber') " ; 
        
        $Insert_user_order_data = mysqli_query($conn, $Insert_user_order_data) ; 

        // ***** Query5 Order information entry in Order data table **** // 

        $Insert_order_information_into_OrderData = "INSERT INTO `order_data` (`Order_key`, `Order_id`, `Order_status`, `Order_payment_status`, `Order_payment_id`, `Order_payment_refund`, `Order_time`, `Order_deliver_date`, `Order_cancel_date`, `Order_cancel_reason`, `Username`, `Mobile_number`, `User_data`, `Street_address`, `Landmark`, `Pincode`, `Order_total_amount`, `Order_delivery_charge`, `Area`) VALUES 
        (NULL, '$Order_id', 'Pending', 'Pending', '$Payment_id', 'No-refund', current_timestamp(), '-', '-', '-', '$Username', '$MobileNumber', '$Table_name', '$Street_address', '$Landmark', '$Pincode', '$Order_total', '$Order_delivery_charge', '$Area');" ; 

        $Insert_order_information_into_OrderData = mysqli_query($conn, $Insert_order_information_into_OrderData) ; 

        // **** Query6 Insert Product information query **** // 

        for($i=0 ; $i<count($Order_product_data); $i++){
            
            $Product_id = $Order_product_data[$i]["Product_id"] ; 
            $Product_category_id = $Order_product_data[$i]['Category_id'] ; 

            $Product_image1 = $Order_product_data[$i]['Product_image1'] ; 
            
            $Product_discount_price = $Order_product_data[$i]["Product_discount_price"] ; 
            $Product_retail_price = $Order_product_data[$i]["Product_retail_price"] ; 
            
            $Product_information = $Order_product_data[$i]["Product_information"] ; 
            
            $Product_weight = $Order_product_data[$i]["Product_details"][0] ; 
            $Product_name = $Order_product_data[$i]["Product_details"][1] ; 

            $Product_flavour = $Order_product_data[$i]["Product_flavour"] ; 
            $Product_bread = $Order_product_data[$i]["Product_bread"]  ; 
            $Product_cream = $Order_product_data[$i]["Product_cream"] ;             

            // **** Insert Product data **** // 

            $Insert_product_data_query = "INSERT INTO `order_product_data` (`Order_product_key`, `Order_id`, `Product_id`, `Product_image`, `Product_weight`, `Product_retail_price`, `Product_discount_price`, `Product_on_name`, `Product_quantity`, `Product_flavour`, `Product_bread`, `Product_cream`) 
            VALUES (NULL, '$Order_id', '$Product_id', '$Product_image1', '$Product_weight', '$Product_retail_price', '$Product_discount_price', '$Product_name', '1', '$Product_flavour', '$Product_bread', '$Product_cream') " ;

            $Insert_all_product_data = mysqli_query($conn, $Insert_product_data_query) ;  
            
        }
            
        mysqli_commit($conn) ; 

        // **** Send Message **** // 

        Send_message($Placed_order_information_message, $MobileNumber) ; 

        $Response = array("Status" =>"Placed_order" , "Order_id" => $Order_id) ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        // Message

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Fetch-pending-order"){

    // **** Request for fetch pending order ***** // 

    $Table_name = $InputData['Table_name'] ; 

    // ---- Decode userdata table name ---- // 

    $Decoded_data= JWT::decode($Table_name, new Key($JWT_key, 'HS256'));

    $Decoded_data = json_decode(json_encode($Decoded_data),true);

    $Table_name = $Decoded_data['userdata'] ; 

    try{

        // **** Query1 Fetch Pending order from userdata table ***** // 

        $Fetch_order_data_query = "SELECT * FROM `$Table_name` WHERE `Option` = 'Order' AND `Data2` = 'Pending' " ; 
        $Fetch_order_data_query = mysqli_query($conn, $Fetch_order_data_query) ; 
        $Fetch_order_data_query_result = mysqli_fetch_all($Fetch_order_data_query, MYSQLI_ASSOC) ; 

        for($i = 0 ; $i<count($Fetch_order_data_query_result); $i++){
            
            // Fetch order id 
            $Order_id = $Fetch_order_data_query_result[$i]['Data1'] ; 

            // Fetch product information from Order_product_data table 

            $Fetch_order_product_data = "SELECT * FROM `Order_product_data` WHERE `Order_id` = '$Order_id' " ; 
            $Fetch_order_product_data = mysqli_query($conn, $Fetch_order_product_data) ; 
            $Fetch_order_product_data_result = mysqli_fetch_all($Fetch_order_product_data, MYSQLI_ASSOC) ;

            $Fetch_order_data_query_result[$i]['Product_data'] = $Fetch_order_product_data_result ; 
        } 

        $Response = array("Status" => "Fetch", "Order" => $Fetch_order_data_query_result ) ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Fetch-complete-order"){
    // **** Request for fetch pending order ***** // 

    $Table_name = $InputData['Table_name'] ; 

    // ---- Decode userdata table name ---- // 

    $Decoded_data= JWT::decode($Table_name, new Key($JWT_key, 'HS256'));

    $Decoded_data = json_decode(json_encode($Decoded_data),true);

    $Table_name = $Decoded_data['userdata'] ; 

    try{

        // **** Query1 Fetch Pending order from userdata table ***** // 

        $Fetch_order_data_query = "SELECT * FROM `$Table_name` WHERE `Option` = 'Order' AND `Data2` = 'Complete' " ; 
        $Fetch_order_data_query = mysqli_query($conn, $Fetch_order_data_query) ; 
        $Fetch_order_data_query_result = mysqli_fetch_all($Fetch_order_data_query, MYSQLI_ASSOC) ; 

        for($i = 0 ; $i<count($Fetch_order_data_query_result); $i++){
            
            // Fetch order id 
            $Order_id = $Fetch_order_data_query_result[$i]['Data1'] ; 

            // Fetch product information from Order_product_data table 

            $Fetch_order_product_data = "SELECT * FROM `Order_product_data` WHERE `Order_id` = '$Order_id' " ; 
            $Fetch_order_product_data = mysqli_query($conn, $Fetch_order_product_data) ; 
            $Fetch_order_product_data_result = mysqli_fetch_all($Fetch_order_product_data, MYSQLI_ASSOC) ;

            $Fetch_order_data_query_result[$i]['Product_data'] = $Fetch_order_product_data_result ; 
        } 

        $Response = array("Status" => "Fetch", "Order" => $Fetch_order_data_query_result ) ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Random-category"){

    // **** Fetch home screen category list **** // 

    try{

        $Fetch_random_category = "SELECT * FROM `category` ORDER BY RAND() LIMIT 4" ; 
        $Fetch_random_category = mysqli_query($conn, $Fetch_random_category) ; 
        $Fetch_random_category_result = mysqli_fetch_all($Fetch_random_category, MYSQLI_ASSOC) ; 

        // Message 

        $Response = array("Status"=> "Fetch", "Category" => $Fetch_random_category_result) ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ;  
    }
}   else if ($InputData['Check_status'] == "Fetch-category-product"){

    // **** Request for fetch category list product **** // 

    $Category_id = $InputData['Catgeory_id'] ; 

    try{

        $Fetch_category_product_query = "SELECT * FROM `$Category_id` " ; 
        $Fetch_category_product_query = mysqli_query($conn, $Fetch_category_product_query) ; 
        $Fetch_category_product_query_data = mysqli_fetch_all($Fetch_category_product_query, MYSQLI_ASSOC) ; 

        // Message 

        $Response = array("Status" => "Fetch", "Product" => $Fetch_category_product_query_data) ; 
        echo json_encode($Response)  ;
        
    }catch(Exception $e){

        // Message 

    }
}   else if ($InputData['Check_status'] == "Fetch-particular-product"){

    // **** Request for Fetch particular product information ***** // 

    $Category_id = $InputData['Category_id'];

    // ----- Product id information ----- // 
    $Product_id =  $InputData['Product_id']; 

    // ----- User table name ----- // 
    $User_table_name = $InputData['user_id'] ; 

    // ---- Decode userdata table name ---- // 

    $Decoded_data= JWT::decode($User_table_name, new Key($JWT_key, 'HS256'));

    $Decoded_data = json_decode(json_encode($Decoded_data),true);

    $User_table_name = $Decoded_data['userdata'] ; 


    try{

        // ===== Request for fetch prarticular category product ====== // 

        $Fetch_product_information_query = "SELECT * FROM `$Category_id` WHERE `Product_id` = '$Product_id' " ; 
        $Fetch_product_information_query = mysqli_query($conn , $Fetch_product_information_query); 
        $Fetch_product_information_query_data = mysqli_fetch_all($Fetch_product_information_query, MYSQLI_ASSOC) ; 

        // ===== Request fro fetch smilar product from this category table ===== // 

        $Similar_product_query = "SELECT * FROM `$Category_id` ORDER BY RAND() LIMIT 3 " ;
        $Similar_product_query = mysqli_query($conn, $Similar_product_query) ; 
        $Similar_product_query_data = mysqli_fetch_all($Similar_product_query, MYSQLI_ASSOC) ; 

        // ===== Check this product already added in user watchlist or not ===== // 

        $User_watchlist_query = "SELECT `Data1` FROM `$User_table_name` WHERE `Data1` = '$Product_id' AND `Data2` = '$Category_id' " ; 
        $User_watchlist_query = mysqli_query($conn, $User_watchlist_query) ; 
        $User_watchlist_query_row_count = mysqli_num_rows($User_watchlist_query) ;

        // Message 

        $Response =  array("Status" => "Fetch", "Product" => $Fetch_product_information_query_data, "Similar_product" => $Similar_product_query_data, "Watchlist" => $User_watchlist_query_row_count) ; 
        echo json_encode($Response) ;
 

    }catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Fetch-random-products"){

    // **** Request for fetch random products **** // 

    try{

        // Query 1. Fetch random category id 

        $Fetch_random_category_id = "SELECT `Category_data` FROM `category` ORDER BY RAND() LIMIT 4 " ; 
        $Fetch_random_category_id = mysqli_query($conn, $Fetch_random_category_id) ; 
        $Fetch_random_category_id_result = mysqli_fetch_all($Fetch_random_category_id, MYSQLI_ASSOC) ; 

        $Product_data = array() ; 

        // Query 2. Fetch random product data 

        for ($i = 0; $i<count($Fetch_random_category_id_result); $i++){

            $Category_id = $Fetch_random_category_id_result[$i]['Category_data'] ; 

            $Fetch_random_product_data = "SELECT * FROM `$Category_id` ORDER BY RAND() LIMIT 3" ; 
            $Fetch_random_product_data = mysqli_query($conn, $Fetch_random_product_data) ; 
            $Fetch_random_product_data_result = mysqli_fetch_all($Fetch_random_product_data, MYSQLI_ASSOC) ; 

            for ($j = 0 ; $j<count($Fetch_random_product_data_result); $j++){
                $Fetch_random_product_data_result[$j]['Category_id'] = $Category_id ; 
                array_push($Product_data, $Fetch_random_product_data_result[$j]) ; 
            }
        }

        // Message 

        $Response = array("Status" => "Fetch", "Product" => $Product_data) ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Insert-watchlist-product"){

    $User_table = $InputData['User_table'] ; 

    // ---- Decode userdata table name ---- // 

    $Decoded_data= JWT::decode($User_table, new Key($JWT_key, 'HS256'));

    $Decoded_data = json_decode(json_encode($Decoded_data),true);

    $User_table = $Decoded_data['userdata'] ; 

    $Product_id = $InputData['Product_id'] ; 
    
    $Category_id = $InputData['Category_id'] ; 

    mysqli_autocommit($conn, false) ; 

    try{

        // Query 1. Insert data query 

        $Insert_watchlist_query = "INSERT INTO `$User_table` (`User_key`, `Option`, `Data1`, `Data2`, `Data3`, `Data4`, `Data5`, `Data6`, `Data7`, `Data8`, `Data9`, `Data10`, `Data11`, `Data12`, `Data13`, `Data14`, `Data15`)
         VALUES (NULL, 'watchlist', '$Product_id', '$Category_id', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL) " ; 

        $Insert_watchlist_query = mysqli_query($conn, $Insert_watchlist_query) ; 

        mysqli_commit($conn) ; 

        // Message 

        $Response = array("Status" => "Insert") ; 
        echo json_encode($Response) ; 
    }
    catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed") ;
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Remove-watchlist-product"){

    $User_table = $InputData['User_table'] ; 

    // ---- Decode userdata table name ---- // 

    $Decoded_data= JWT::decode($User_table, new Key($JWT_key, 'HS256'));

    $Decoded_data = json_decode(json_encode($Decoded_data),true);

    $User_table = $Decoded_data['userdata'] ; 

    $Product_id = $InputData['Product_id'] ; 
    
    $Category_id = $InputData['Category_id'] ; 

    mysqli_autocommit($conn, false) ; 

    try{

        $Delete_watchlist_product_query = "DELETE FROM `$User_table` WHERE `Data1` = '$Product_id' AND `Data2` = '$Category_id' " ; 
        $Delete_watchlist_product_query = mysqli_query($conn, $Delete_watchlist_product_query) ; 

        mysqli_commit($conn) ; 

        // Message 

        $Response = array("Status" => "Remove") ; 
        echo json_encode($Response) ; 
    }
    catch(Exception $e){

        // Message 

        $Response = array("Status" => "Network request failed") ;
        echo json_encode($Response) ; 
    }
}   else if ($InputData['Check_status'] == "Insert-cart-product"){

    // **** Request for add product to cart option **** // 

    // Option   =   cart-item
    // Data1    =   Product-id
    // Data2    =   Category-id
    // Data3    =   Product-weight
    // Data4    =   Product-name-on-cake

    $Product_id = $InputData['Product_id'];  

    $Category_id = $InputData['Category_id'] ; 

    $Product_weight = $InputData['Product_weight'] ; 

    $Product_name  = $InputData['Product_name'] ; 

    $User_id = $InputData['User_id'] ; 

    $Decoded_data= JWT::decode($User_id, new Key($JWT_key, 'HS256'));

    $Decoded_data = json_decode(json_encode($Decoded_data),true);

    $User_id = $Decoded_data['userdata'] ; 

    
    mysqli_autocommit($conn, false) ; 
    
    try{

        $Insert_cart_item_query = "INSERT INTO `$User_id` (`User_key`, `Option`, `Data1`, `Data2`, `Data3`, `Data4`, `Data5`, `Data6`, `Data7`, `Data8`, `Data9`, `Data10`, `Data11`, `Data12`, `Data13`, `Data14`, `Data15`) 
        VALUES (NULL, 'cart-item', '$Product_id', '$Category_id', '$Product_weight', '$Product_name', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL) " ; 

        $Insert_cart_item_query = mysqli_query($conn, $Insert_cart_item_query) ; 

        mysqli_commit($conn) ; 

        $Response = array("Status" => "Insert")  ; 
        echo json_encode($Response) ; 

    }catch(Exception $e){

        mysqli_rollback($conn) ; 

        // Message 

        $Response = array("Status" => "Network request failed") ; 
        echo json_encode($Response) ; 

    }
}   
?>
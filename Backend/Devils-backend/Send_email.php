<?php

function Send_email(){

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

    $data_array =  array(
        "value1" => "vaghasiyakeyur162002@gmail.com", 
        "value2" => "Create category", 
        "value3" => "<h3>New category create in your application</h3>"
    );
    
    $make_call = callAPI('POST', 'https://maker.ifttt.com/trigger/Send-email/with/key/fGVdBxnIMCJDSBwXsS5FqWF8xAGM8dT49-nW3c4gIhD', json_encode($data_array));
    $Response = json_decode($make_call, true);
}

Send_email() ; 
?>
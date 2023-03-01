<?php

    // ===== 1. Total payment information ===== // 

    $Payment_total = $_GET['total'] ; 
    
    // ===== 2. Username information ===== // 

    $Username = $_GET["username"] ; 
    
    // ==== 3. Mobile number ==== // 
    
    $Mobile_number = $_GET["Mobile_number"] ;
    
    $Payment_total = $Payment_total."00" ; 

    $results ; 

    // ===== User id and Order id information ====== // 
    
    $User_id = $_GET['User_id'] ; 
    
    $Order_id = $_GET['Order_id'] ; 

    // Create Payment failed and Payment success url 
    
    $Payment_failed_url = "./Payment_response.php?Status=Payment_fail&Order_id=".$Order_id."&User_id=".$User_id."&Mobile_number=".$Mobile_number ; 
    
    $Payment_accept_url = "./Payment_response.php?Status=Payment_success&Order_id=".$Order_id."&User_id=".$User_id."&Mobile_number=".$Mobile_number."&Payment_id=" ; 

?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment page</title>

</head>

<body>

    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

    <script>

        var options = {

            "amount": "<?php global $Payment_total; echo $Payment_total;  ?>", 
            
            "key": "rzp_test_bWhDOltOtKqQdU", 
            
            "currency": "INR",
            
            "name": "Devils Cafe & Bakery Pvt. Ltd",
            
            "description": "Cake payment",
            
            "image": "https://res.cloudinary.com/dsc8egt36/image/upload/v1677143933/Logo_quergb.png",
            
            "prefill": {
                "name": "<?php global $Username; echo $Username; ?>",
                "email": "information.cafe123@gmail.com",
                "contact": "<?php global $Mobile_number; echo $Mobile_number; ?>"
            },
            
            "notes": {
                "address": "Shop no 122b ward-6b src shopping center, near hemu colony nagar adipur gandhidham kutch-370201"
            },
            
            "theme": {
                "color": "#8f9fff"
            }, 
            
            "handler": function (response) { 
                let payment_accept_url = '<?php global $Payment_accept_url; echo $Payment_accept_url;  ?>' + response.razorpay_payment_id; 
                window.location.href = payment_accept_url ; 
            },
            
            "modal": {
                "ondismiss": function () {
                    window.location.href = '<?php global $Payment_failed_url; echo $Payment_failed_url;  ?>';
                }
            }
            
        };

        var rzp1 = new Razorpay(options);


        rzp1.on('payment.failed', function (response){
            window.location.href = '<?php global $Payment_failed_url; echo $Payment_failed_url;  ?>'
        });

        rzp1.open();
        e.preventDefault();

</script>
</body>
</html>
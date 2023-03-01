import React, {useState, useEffect} from "react";
import { View, StyleSheet, Alert, ToastAndroid, BackHandler } from "react-native";

// **** Colorcode and ScreenStyle **** // 
import * as colorCode from '../../Color-code/Color-codes' ; 
import * as style from '../../Style/AuthenticationStyle' ; 

// **** Text and StatusBar component **** // 
import TextComponent from "../../Component/TextComp";
import StatusbarComponent from '../../Component/StatusbarComp' ; 

// **** Import require packages **** // 
import * as Navigationbar from 'expo-navigation-bar' ;
import * as Font from 'expo-font' ;  

// **** Import Device and Notification package **** // 
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

// **** Import Request URL **** // 
import * as URL from '../../URL/RequestURL' ; 
import { WebView } from 'react-native-webview';
import { SkypeIndicator } from "react-native-indicators";

export default function PaymentScreen({navigation, route}){

    const {Order_total, Order_id} = route.params ; 

    // ---- Set NavigationBar color ---- //

    Navigationbar.setBackgroundColorAsync("#ffffff");

    // ---- Payment page loading layout ---- // 

    const [payment_page_load, set_payment_page_load] = useState(true) ; 
    const [web_view_url, set_web_view_url] =  useState('') ; 

    // ===== Back handler function ===== // 

    const backAction = () => {
     
        Alert.alert('Hold on!', 'Are you sure you want to cancel payment?', [
            {
                    text: 'Cancel',
                        onPress: () => null,
                    style: 'cancel',
            },
            {   text: 'YES', 
                    onPress: () => BackHandler.exitApp()},
        ]);
        return true;
    };

    useEffect(() => {

        // ===== Setup inital data ===== // 

        const set_web_view_url_function = async () => {

            let User_table = await AsyncStorage.getItem("Table") ; 

            let Mobile_number = await AsyncStorage.getItem("Mobilenumber") ; 

            let Username = await AsyncStorage.getItem("Username") ; 

            let url_value = "https://3830-2409-4041-6eb5-a8ad-25f9-7cbf-bb04-60d4.in.ngrok.io/Devils-backend/Payment_page.php?total="+ Order_total +"&username="+ Username +"&Mobile_number="+ Mobile_number ; 
            url_value = url_value + "&User_id=" + User_table + "&Order_id=" + Order_id ; 

            set_web_view_url(url_value) ; 
        }

        set_web_view_url_function() ; 

        // ===== BackHandler functionality ====== // 

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
             backAction,
        );
      
        return () => backHandler.remove();
    }, [])

    // ===== Web view load start function ===== // 

    const On_load_start = () => {

        set_payment_page_load(false) ; 
    }

    // ===== Web view load end function ===== // 

    const On_load_end = () => {

        set_payment_page_load(false) ; 
    }

    if (web_view_url != ""){

        return(
            <View style={PaymentScreenStyle.PaymentScreenLayout}>
    
                {/* ==== Statusbar component ====  */}
    
                <StatusbarComponent
                    color = {colorCode.Authentication_button_ripper_color}
                />

                {/* ==== Payment page handling ===  */}
                
                <WebView
    
                    source={{uri:web_view_url}}

                    style = {{height:"100%", width:"100%"}}

                    onLoadStart = {On_load_start}

                    onLoadEnd = {On_load_end}
                />

                {payment_page_load?<>
                
                    <SkypeIndicator></SkypeIndicator>
                </>:<></>}
                
    
            
            </View>   
        )
    }

}

const PaymentScreenStyle = new StyleSheet.create({
    PaymentScreenLayout:{
        height: '100%', 
        width: '100%', 
        backgroundColor: colorCode.Authentication_input_color
    }
})
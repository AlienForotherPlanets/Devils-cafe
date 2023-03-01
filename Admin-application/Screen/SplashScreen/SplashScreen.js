import React, {useState, useEffect} from "react";
import { View, StatusBar, StyleSheet, Image } from "react-native";
import * as Navigationbar from 'expo-navigation-bar' ; 

// **** Import color code **** // 
import * as colorCode from '../../Color-code/Color-codes' ; 

// **** Import Text and Statusbar component  **** // 
import StatusbarComponent from '../../Component/StatusbarComp' ; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as URL from '../../URL/RequestURL' ; 

export default function SplashScreen({navigation}){
    
    // ---- Set Navigation bar color ---- // 
    Navigationbar.setBackgroundColorAsync(colorCode.SplashScreenColor) ; 
    
    // ---- UseEffect for change image ---- // 

    useEffect(() => {
            
        const Check_data = async () => {

            // ***** Update Password check request ***** // 

            let Request_url = URL.Authentication_url ; 

            let UserPrevious_password = await AsyncStorage.getItem("Password") ; 
                    
            let Request_data = {
                "Check_status": "Admin-password-update-check",
                "Password": UserPrevious_password
            } ; 
            
            let Request_option = {
                method: 'POST',
                headers: {
                    'Content-Type': 
                        'application/json;charset=utf-8'
                },
                body: JSON.stringify(Request_data)
            } ; 
    
            let Request = await fetch(Request_url, Request_option) ; 
            
            let Response = await Request.json() ; 

            let Response_status = Response.Status ;
            
            if (Response_status == "Vaild Password"){

                navigation.navigate("Home") ; 
            }else{

                navigation.navigate("AdminLogin") ; 
            }

        }

        Check_data() ; 
            

    }, []) ; 

    return(

        <View style={SplashScreenStyle.SplashScreenLayout}>

            {/* Stataus bar  */}

            <StatusbarComponent
                color = {colorCode.Authentication_statusBar_color}
            />
            
            {/* Logo Image  */}

            <Image
                style = {SplashScreenStyle.LogoImage}
                source={require('../../assets/Logo/Logo.png')}
            />
                

        </View>
    )
}

const SplashScreenStyle = new StyleSheet.create(
    {
        SplashScreenLayout: {
            backgroundColor: colorCode.SplashScreenColor, 
            height: '100%', 
            width: '100%', 
            display: 'flex', 
            alignItems: 'center'
        }, 

        LogoImage: {
            height: '20%',
            resizeMode: 'contain' , 
            marginTop: 'auto', 
            marginBottom: 'auto'
        }

    }
)
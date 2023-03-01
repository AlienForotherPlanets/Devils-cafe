import React, {useState, useEffect} from "react";
import { View, StatusBar, StyleSheet, Image } from "react-native";

// **** Import colorCode and Navigation bar component **** // 
import * as Navigationbar from 'expo-navigation-bar' ; 
import * as colorCode from '../../Color-code/Color-codes' ; 

// **** Import Async storage **** // 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({navigation}){
    
    // ---- Set Navigation bar color ---- // 

    Navigationbar.setBackgroundColorAsync(colorCode.SplashScreenColor) ; 
    
    // ---- State for show Animated and Logo images ---- // 
    
    const [animationImage, setAnimatedImage] = useState(false) ; 

    // ---- UseEffect for change image ---- // 

    useEffect(() => {
        
        setTimeout(() => {

            // ---- Update adnimated image state ----// 
            setAnimatedImage(true) ; 

            setTimeout(() => {

                // 1. Check user require data available or not 

                let User_data = AsyncStorage.getItem("Table") ; 

                if (User_data == null) {

                    navigation.navigate("Signin") ; 
                }else{

                    navigation.navigate("HomeScreen") ; 
                }
                
            }, 2000) ; 

        }, 2500) ; 

    }, []) ; 

    return(

        <View style={SplashScreenStyle.SplashScreenLayout}>

            <StatusBar
                backgroundColor={colorCode.SplashScreenColor}
            />

            {animationImage?
                <Image
                    style = {SplashScreenStyle.AnimatedImage}
                    source={require('../../assets/Images/Shop.gif')}
                />
            :
                <Image
                    style = {SplashScreenStyle.LogoImage}
                    source={require('../../assets/Logo/Logo.png')}
                />
            }

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

        AnimatedImage: {
            height: '45%', 
            width: '45%', 
            marginTop: 'auto', 
            marginBottom: 'auto'
        },

        LogoImage: {
            height: '20%',
            resizeMode: 'contain' , 
            marginTop: 'auto', 
            marginBottom: 'auto'
        }

    }
)
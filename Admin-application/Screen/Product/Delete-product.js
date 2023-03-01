import React, {useState, useEffect} from "react";
import { View, StyleSheet, ScrollView, TextInput, Pressable, ActivityIndicator, ToastAndroid } from "react-native";

// **** Colorcode and ScreenStyle **** // 
import * as colorCode from '../../Color-code/Color-codes' ;
import * as style from '../../Style/AuthenticationStyle' ; 

// **** Text and StatusBar component **** // 
import TextComponent from "../../Component/TextComp";
import StatusbarComponent from '../../Component/StatusbarComp' ; 

// **** Import require packages **** // 
import * as Navigationbar from 'expo-navigation-bar' ;
import * as Font from 'expo-font' ;  

// **** Import URL **** // 
import * as URL from '../../URL/RequestURL' ; 

export default function UploadProduct({navigation}){

    // ---- Set NavigationBar color ---- //
        
    Navigationbar.setBackgroundColorAsync("#ffffff");

    // ---- Load Font ---- //

    const [loadFont, setLoadFont] = useState(false);

    useEffect(() => {

        const LoadFont = async () => {
            await Font.loadAsync({
                Mukta: require("../../assets/Fonts/MerriweatherSans-Regular.ttf"),
                Sans: require("../../assets/Fonts/SourceSansPro-Regular.ttf"),
                Ubuntu: require("../../assets/Fonts/Ubuntu-Medium.ttf"),
                Roboto: require("../../assets/Fonts/Roboto-Medium.ttf"),
            });

            setLoadFont(true);
        };

        LoadFont();
    }, []);

    // ---- Activity Indicator ---- //

    const [indicatorValue, setIndicatorValue] = useState(false);

    if (loadFont){

        return(
    
            <View style={UploadProductStyle.UploadProductScreen}>
    
                {/* StatusBar component  */}
    
                <StatusbarComponent
                    color={colorCode.Authentication_statusBar_color}
                />
    
                {/* Title  */}
                
                <TextComponent 
                    TextValue="Welcome Back ! 🤞" 
                    TextFamily = "Ubuntu"
                    TextSize = {22}
                    TextColor = {colorCode.Authentication_title_color}
                    TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop: 15}}
                />
            </View>
        
        )
        
    }

}

const UploadProductStyle = new StyleSheet.create({
    UploadProductScreen: {
        ...style.AuthenticationScreen_style
    }
})
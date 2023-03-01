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
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Admin_new_mobile({navigation}){

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

    // ---- Focus Handler ---- // 

    const [passwordBorder, setPasswordBorder] = useState(false) ; 

    const onFocus = () => {
        setPasswordBorder(true) ; 
    }

    // ===== Password request handler ===== // 

    const [password, setPassword] = useState('') ; 

    const Register_number_handler = async () => {

        setIndicatorValue(true) ; 

        if (password == ""){

            ToastAndroid.show("Enter, Register mobile number", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (password.length != 10) {

            ToastAndroid.show("Invalid mobile number", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else{

            try {

                // ---- Password check request handler ---- // 
                        
                let Request_url = URL.Authentication_url ; 
                        
                let Request_data = {
                    "Check_status":"Admin-register-number", 
                    "Number": password
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
    
                if (Response_status == "Insert"){

                    ToastAndroid.show("New mobile number insert successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

                    navigation.goBack() ; 
                }else{

                    ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                }

            } catch (error) {
                
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
        }

        setIndicatorValue(false) ; 

    }

    if (loadFont){
        return (
          <View style={RegisterNumberScreen.RegisterNumberScreenLayout}>
            
            {/* StatusBar component  */}

            <StatusbarComponent
              color={colorCode.Authentication_statusBar_color}
            />

            {/* Title  */}
            
            <TextComponent 
                TextValue="Register new number ! 🤞" 
                TextFamily = "Ubuntu"
                TextSize = {22}
                TextColor = {colorCode.Authentication_title_color}
                TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop: 15}}
            />

            {/* Input Layout  */}
            
            <ScrollView style={RegisterNumberScreen.InputLayout}>

                {/* Number input  */}

                <TextInput
                    style = {[RegisterNumberScreen.InputWidget, {borderWidth:passwordBorder?1:0}]}
                    allowFontScaling = {false}
                    cursorColor = {colorCode.Authentication_subtitle_color}
                    keyboardType = "phone-pad"

                    placeholder = "Enter new admin-login number"
                    placeholderTextColor= {colorCode.Authentication_subtitle_color}
                    
                    onFocus = {() => onFocus()}
                    value = {password}
                    onChangeText = {(value) => setPassword(value)}
                
                />

                {/* Resgiter number button  */}

                {indicatorValue?
                    <View style={[RegisterNumberScreen.ButtonLayout, {paddingTop:7, paddingBottom: 7}]}>
                        <ActivityIndicator size= "large"
                            color= {colorCode.Authentication_button_textColor}/>
                    </View>
                :
                    <Pressable style={RegisterNumberScreen.ButtonLayout}
                        android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                        onPress = {Register_number_handler}>
                            
                        <TextComponent
                            TextValue = "Register number"
                            TextFamily = "Ubuntu"
                            TextSize = {19}
                            TextColor = {colorCode.Authentication_button_textColor}
                        />

                    </Pressable>
                }
                

            </ScrollView>

          </View>
        );
    }
}

const RegisterNumberScreen = new StyleSheet.create({
    RegisterNumberScreenLayout: {
        ...style.AuthenticationScreen_style
    }, 

    InputLayout: {
        ...style.AuthenticationScreen_inputlayout
    }, 

    InputWidget:{
        ...style.Authentication_inputWidget
    }, 

    ButtonLayout: {
        ...style.Authentication_button
    }
})
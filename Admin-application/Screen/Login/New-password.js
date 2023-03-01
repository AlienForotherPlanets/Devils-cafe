import React, {useState, useEffect} from "react";
import { View, StyleSheet, ScrollView, TextInput, Pressable, 
    ActivityIndicator, Image, ToastAndroid } from "react-native";

// **** Colorcode and ScreenStyle **** // 
import * as colorCode from '../../Color-code/Color-codes' ; 
import * as style from '../../Style/AuthenticationStyle' ; 

// **** Text and StatusBar component **** // 
import TextComponent from "../../Component/TextComp";
import StatusbarComponent from '../../Component/StatusbarComp' ; 

// **** Import require packages **** // 
import * as Navigationbar from 'expo-navigation-bar' ;
import * as Font from 'expo-font' ; 

// *** Import device package **** // 
import * as Device from 'expo-device';

import * as URL from '../../URL/RequestURL' ; 

import {useNavigation} from '@react-navigation/native';


export default function NewPassword(){

    // ---- Set NavigationBar color ---- //

    Navigationbar.setBackgroundColorAsync("#ffffff");

    // --- Navigation stack ---- // 

    const navigation = useNavigation();

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
    const [rePasswordBorder, setRePasswordBorder] = useState(false) ; 

    const onFocusHandler = (x) => {

        setPasswordBorder(false) ; 
        setRePasswordBorder(false) ; 

        if (x == 0){
            setPasswordBorder(true) ; 
        }else {
            setRePasswordBorder(true) ; 
        }
    }

    // ===== New Password back handler ===== // 

    const New_password_back_handler = () => {
        navigation.goBack() ; 
    }

    // ---- Input widget value ---- // 

    const [password, setPassword] = useState('') ; 
    const [rePassword, setRePassword] = useState('') ; 

    const Password_update_handler = async () => {

        setIndicatorValue(true) ; 

        if (password == ""){

            ToastAndroid.show("Enter Password", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (rePassword == ""){

            ToastAndroid.show("Re-enter Password", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (password.length < 8){

            ToastAndroid.show("Password must be greater than 8", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (password != rePassword){

            ToastAndroid.show("Both Password must be same", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else{

            try {
                // ---- Admin password update request handler ---  // 
                            
                let Request_url = URL.Authentication_url ; 
                            
                let Request_data = {
                    "Check_status": "Admin-update-password", 
                    "Update_password": password, 
                    "Device_name": Device.deviceName, 
                    "Device_id": Device.osBuildId
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

                if (Response_status == "Update passsword"){

                    ToastAndroid.show("Update Password successfully", ToastAndroid.BOTTOM,ToastAndroid.SHORT) ; 

                    navigation.reset({
                        index: 0,
                        routes: [{name: 'AdminLogin'}],
                      });

                }else {
                    ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                }
                
            } catch (error) {
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT)  ;   
            }
        }

        setIndicatorValue(false) ; 
    }
 
    if (loadFont){

        return(
            <View style={NewPasswordScreen.UpdatePasswordLayout}>
                
                {/* StatusBar component  */}

                <StatusbarComponent
                    color={colorCode.Authentication_statusBar_color}
                />

                {/* Back option and title layout */}

                <View style={NewPasswordScreen.BackOptionLayout}>
                
                    {/* Back option  */}

                    <Pressable
                        android_ripple={{color:colorCode.Authentication_button_ripper_color}}
                        style = {NewPasswordScreen.BackImageLayout}
                        onPress = {New_password_back_handler}>
                        
                        <Image
                            style={style.Authentication_BackImage}
                            source={require("../../assets/Images/Back-option.png")}
                        />

                    </Pressable>

                    {/* Title layout  */}

                    <TextComponent
                        TextValue = "Update password"
                        TextSize = {21}
                        TextFamily = "Ubuntu"
                        TextColor = {colorCode.Authentication_title_color}
                        TextStyle = {{marginTop: "auto", marginBottom: 'auto', marginLeft: 4}}
                    />

                </View>

                {/* Input layout  */}

                <View style={style.AuthenticationScreen_inputlayout}>

                    {/* Password input widget  */}

                    <TextInput
                        style = {[style.Authentication_inputWidget, {borderWidth:passwordBorder?1:0}]}
                        allowFontScaling = {false}
                        cursorColor = {colorCode.Authentication_subtitle_color}

                        placeholder = "Password"
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}
                        
                        onFocus = {() => onFocusHandler(0)}
                        value = {password}
                        onChangeText = {(value) => setPassword(value)}
                    />
                    
                    {/* Re-enter password input widget  */}

                    <TextInput
                        style = {[style.Authentication_inputWidget, {borderWidth:rePasswordBorder?1:0}]}
                        allowFontScaling = {false}
                        cursorColor = {colorCode.Authentication_subtitle_color}

                        placeholder = "Re-enter password"
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}
                        
                        onFocus = {() => onFocusHandler(1)}
                        value = {rePassword}
                        onChangeText = {(value) => setRePassword(value)} 
                    />
                    
                    {/* Update password button  */}

                    {indicatorValue?
                        <View style={[NewPasswordScreen.ButtonLayout, {paddingTop:7, paddingBottom: 7}]}>
                            
                            <ActivityIndicator size= "large"
                                color= {colorCode.Authentication_button_textColor}/>
                        
                        </View>
                    :
                        <Pressable style={NewPasswordScreen.ButtonLayout}
                            android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                            onPress = {Password_update_handler}>
                            
                            <TextComponent
                                TextValue = "Update password"
                                TextFamily = "Ubuntu"
                                TextSize = {19}
                                TextColor = {colorCode.Authentication_button_textColor}
                            />

                        </Pressable>
                    }

                </View>

            </View>
        )

    }
}

const NewPasswordScreen = new StyleSheet.create({
    UpdatePasswordLayout: {
        ...style.AuthenticationScreen_style
    }, 

    BackOptionLayout: {
        ...style.Authentication_BackLayout
    },

    BackImageLayout : {
        ...style.Authentication_BackImage_layout
    }, 

    ButtonLayout: {
        ...style.Authentication_button
    }
})
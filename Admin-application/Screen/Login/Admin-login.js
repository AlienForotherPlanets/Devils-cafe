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

export default function Admin_login({navigation}){

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

    const Password_check_handler = async () => {

        setIndicatorValue(true) ; 

        if (password == ""){

            ToastAndroid.show("Enter Password", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else{

            try {

                // ---- Password check request handler ---- // 
                        
                let Request_url = URL.Authentication_url ; 
                        
                let Request_data = {
                    "Check_status": "Admin-passsword-check",
                    "AdminPassword": password, 
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
    
                if (Response_status == "Invaild Password"){

                    ToastAndroid.show("Please provide valid password", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                }else if (Response_status == "Vaild Password"){

                    ToastAndroid.show("Login successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

                    await AsyncStorage.setItem("Password", password) ; 
                    await AsyncStorage.setItem("LoginStatus", "1") ; 
                    
                    navigation.navigate("Home") ; 

                }else{

                    ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                
                }

            } catch (error) {
                
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
        }

        setIndicatorValue(false) ; 

    }

    // ==== Forget password request handler ==== // 

    const Forget_password_handler = () => {
        navigation.navigate("UpdatePassword") ; 
    }

    if (loadFont){
        return (
          <View style={AdminLoginScreen.AdminLoginScreenLayout}>
            
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

            {/* Input Layout  */}
            
            <ScrollView style={AdminLoginScreen.InputLayout}>

                {/* Password input  */}

                <TextInput
                    style = {[AdminLoginScreen.InputWidget, {borderWidth:passwordBorder?1:0}]}
                    allowFontScaling = {false}
                    cursorColor = {colorCode.Authentication_subtitle_color}

                    placeholder = "Password"
                    placeholderTextColor= {colorCode.Authentication_subtitle_color}
                    
                    onFocus = {() => onFocus()}
                    value = {password}
                    onChangeText = {(value) => setPassword(value)}
                
                />

                {/* Admin login button  */}

                {indicatorValue?
                    <View style={[AdminLoginScreen.ButtonLayout, {paddingTop:7, paddingBottom: 7}]}>
                        <ActivityIndicator size= "large"
                            color= {colorCode.Authentication_button_textColor}/>
                    </View>
                :
                    <Pressable style={AdminLoginScreen.ButtonLayout}
                        android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                        onPress = {Password_check_handler}>
                            
                        <TextComponent
                            TextValue = "Admin login"
                            TextFamily = "Ubuntu"
                            TextSize = {19}
                            TextColor = {colorCode.Authentication_button_textColor}
                        />

                    </Pressable>
                }

                {/* Forget Password option  */}
                
                <Pressable
                    onPress={Forget_password_handler
                    }>

                    <TextComponent
                        TextValue = "Forget Password ?"
                        TextFamily = "Mukta"
                        TextSize = {15}
                        TextColor = {colorCode.Authentication_subtitle_color}
                        TextStyle = {{marginLeft:"auto", marginRight:'auto', marginTop: 8}}
                    />
                </Pressable>
                

            </ScrollView>

          </View>
        );
    }
}

const AdminLoginScreen = new StyleSheet.create({
    AdminLoginScreenLayout: {
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
import React, {useState, useEffect} from "react";
import { View, StyleSheet, TextInput, ScrollView, 
    Pressable, ActivityIndicator, Image, ToastAndroid} from "react-native";

// **** Colorcode and ScreenStyle **** // 
import * as colorCode from '../../Color-code/Color-codes' ; 
import * as style from '../../Style/AuthenticationStyle' ; 

// **** Text and StatusBar component **** // 
import TextComponent from "../../Component/TextComp";
import StatusbarComponent from '../../Component/StatusbarComp' ; 

// **** Import require packages **** // 
import * as Navigationbar from 'expo-navigation-bar' ;
import * as Font from 'expo-font' ;  

// **** Import Request url ***** // 
import * as URL from '../../URL/RequestURL' ; 

export default function Signup({navigation,...props}) {

    // ---- Set NavigationBar color ---- // 

    Navigationbar.setBackgroundColorAsync('#ffffff') ; 

    // ---- Load Font ---- // 

    const [loadFont, setLoadFont] = useState(false) ; 

    useEffect(() => {

        const LoadFont = async () => {
        
            await Font.loadAsync({
                'Mukta': require("../../assets/Fonts/MerriweatherSans-Regular.ttf"), 
                'Sans': require("../../assets/Fonts/SourceSansPro-Regular.ttf"),
                'Ubuntu': require('../../assets/Fonts/Ubuntu-Medium.ttf'),
                'Roboto': require('../../assets/Fonts/Roboto-Medium.ttf')
            }) ; 

            setLoadFont(true) ; 
        }

        LoadFont() ; 

    }, []) ; 

    // ---- Activity Indicator ---- // 

    const [indicatorValue, setIndicatorValue] = useState(false) ; 

    // ----- Focus handler ----- // 

    const [usernameBorder, setUsernameBorder] = useState(false) ; 
    const [mobileNumberBorder, setMobileNumberBorder] = useState(false) ; 
    const [passwordBorder, setPasswordBorder] = useState(false) ; 
    const [rePasswordBorder, setRePasswordBorder] = useState(false) ;

    const FocusHandler = (x) => {

        setUsernameBorder(false) ; 
        setMobileNumberBorder(false) ; 
        setPasswordBorder(false) ; 
        setRePasswordBorder(false) ; 

        if (x == 0){
            
            setUsernameBorder(true) ; 
        }else if (x == 1){

            setMobileNumberBorder(true) ; 
        }else if (x == 2){

            setPasswordBorder(true) ; 
        }else{

            setRePasswordBorder(true) ; 
        }
    }

    // ---- Inout widget value ---- // 

    const [username, setUsername] = useState('') ; 
    const [mobileumber, setMobileNumber] = useState('') ;
    const [password, setPassword] = useState('') ; 
    const [rePassword, setRePassword] = useState('') ; 

    // ====== Signup Handler ====== // 

    const SignupHandler = async () => {

        setIndicatorValue(true) ; 

        if (username == ""){

            ToastAndroid.show("Enter Username", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (mobileumber == ""){

            ToastAndroid.show("Enter Mobilenumber", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (mobileumber.length != 10) {

            ToastAndroid.show("Mobilenumber must be valid", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (password == ""){

            ToastAndroid.show("Enter Password", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (rePassword == ""){

            ToastAndroid.show("Re-enter Password", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (password != rePassword) {

            ToastAndroid.show("Both Password must be same", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (password.length <8){

            ToastAndroid.show("Password length must be greater than 8", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else{

            try {

                // ---- Signup check Request ---- // 
                
                let Request_url = URL.Authentication_request_url ; 
                
                let Request_data = {
                    "Mobilenumber": mobileumber, 
                    "Check_status": "Signup_check"
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

                if (Response_status == "Mobile number already register"){

                    ToastAndroid.show(Response_status, ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                }else if (Response_status == "OTP send failed"){

                    ToastAndroid.show("Send OTP request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                }else if (Response_status == "OTP send"){

                    ToastAndroid.show("OTP send successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ;
                    
                    // ---- Navigation data ---- // 
                    
                    let VerificationOTP = Response.OTP ; 
                    let Navigation_data = {"Username":username, "Mobilenumber":mobileumber, "Password":password, "OTP":VerificationOTP} ; 

                    navigation.navigate("SignupVerification", Navigation_data) ; 

                }else {

                    ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ;
                }


            } catch (error) {
                
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
        }

        setIndicatorValue(false) ; 
    }

    // ====== Already have account request handler ===== // 

    const Already_have_account = () => {

        navigation.navigate("Signin") ; 
    }

    if (loadFont){
        
        return(
            <View style={SignupScreen.SignupScreenLayout}>
                
                {/* Statusbar  */}
        
                <StatusbarComponent 
                    color = {colorCode.Authentication_statusBar_color}
                ></StatusbarComponent>
                
                {/* Title */}
        
                <TextComponent
                    TextValue = "Welcome to Devils Cafe 👋"
                    TextFamily = "Ubuntu"
                    TextSize = {22}
                    TextColor = {colorCode.Authentication_title_color}
                    TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop: 10}}
                />
        
                {/* Input layout */}
        
                <ScrollView style = {SignupScreen.InputLayout}>

                    {/* Username input widget  */}

                    <TextInput
                        style = {[SignupScreen.InputWidget, {borderWidth: usernameBorder?1:0}]}
                        allowFontScaling = {false}
                        cursorColor = {colorCode.Authentication_subtitle_color}

                        placeholder = "Username"    
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}

                        onFocus = {() => FocusHandler(0)}
                        value = {username}
                        onChangeText = {(value) => setUsername(value)}
                    />

                    {/* Mobilenumber input widget  */}

                    <TextInput
                        style = {[SignupScreen.InputWidget, {borderWidth: mobileNumberBorder?1:0}]}
                        allowFontScaling = {false}
                        keyboardType = "phone-pad"
                        cursorColor = {colorCode.Authentication_subtitle_color}

                        placeholder = "Mobile number"    
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}

                        onFocus = {() => FocusHandler(1)}
                        value = {mobileumber}
                        onChangeText = {(value) => setMobileNumber(value)}
                    />

                    {/* Password input widget  */}
                    
                    <TextInput
                        style = {[SignupScreen.InputWidget, {borderWidth: passwordBorder?1:0}]}
                        allowFontScaling = {false}
                        secureTextEntry = {true}
                        cursorColor = {colorCode.Authentication_subtitle_color}

                        placeholder = "Password"    
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}

                        onFocus = {() => FocusHandler(2)}
                        value = {password} 
                        onChangeText = {(value) => setPassword(value)}
                    />

                    {/* Re-Password input widget  */}
                    
                    <TextInput
                        style = {[SignupScreen.InputWidget, {borderWidth: rePasswordBorder?1:0}]}
                        allowFontScaling = {false}
                        secureTextEntry = {true}
                        cursorColor = {colorCode.Authentication_subtitle_color}

                        placeholder = "Re-enter Password"    
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}

                        onFocus = {() => FocusHandler(3)}
                        value = {rePassword}
                        onChangeText = {(value) => setRePassword(value)}
                    />

                    {/* Signup Button  */}

                    {indicatorValue?
                        <View style={[SignupScreen.ButtonLayout, {paddingTop:7, paddingBottom: 7}]}>
                            <ActivityIndicator size= "large"
                                color= {colorCode.Authentication_button_textColor}/>
                        </View>
                    :
                        <Pressable style={SignupScreen.ButtonLayout}
                            android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                            onPress = {SignupHandler}>

                            <TextComponent
                                TextValue = "Next"
                                TextFamily = "Ubuntu"
                                TextSize = {19}
                                TextColor = {colorCode.Authentication_button_textColor}
                            />

                        </Pressable>
                    }


                    {/* Already have account request handler  */}

                    <Pressable
                        onPress={() => Already_have_account()}>

                        <TextComponent
                            TextValue = "Alreay have account ? Signin"
                            TextColor = {colorCode.Authentication_subtitle_color}
                            TextFamily = "Mukta"
                            TextSize = {15}
                            TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop: 7}}
                        />
                    
                    </Pressable>
        
                </ScrollView>
        
            </View>
        )

    }
}

const SignupScreen = new StyleSheet.create({
    
    SignupScreenLayout:{
        ...style.AuthenticationScreen_style
    }, 

    InputLayout: {
       ...style.AuthenticationScreen_inputlayout
    }, 

    InputWidget:{
        ...style.Authentication_inputWidget
    }, 

    ButtonLayout:{
        ...style.Authentication_button
    }, 


})
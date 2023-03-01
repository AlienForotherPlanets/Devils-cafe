import React, {useState, useEffect} from "react";
import { View, StyleSheet, Pressable, Image, TextInput, 
    ToastAndroid, ActivityIndicator } from "react-native";

// **** Colorcode and ScreenStyle **** // 
import * as colorCode from '../../Color-code/Color-codes' ; 
import * as style from '../../Style/AuthenticationStyle' ; 

// **** Text and StatusBar component **** // 
import TextComponent from "../../Component/TextComp";
import StatusbarComponent from '../../Component/StatusbarComp' ; 

// **** Import require packages **** // 
import * as Navigationbar from 'expo-navigation-bar' ;
import * as Font from 'expo-font' ;  

// ***** Import request URL **** // 
import * as URL from '../../URL/RequestURL' ; 

export default function ForgetPassword({navigation, ...props}){

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

    const [mobilenumberBorder, setMobileNumberBorder] = useState(false) ; 

    const FocusHandler = () => {

        setMobileNumberBorder(true) ; 
    }

    // ---- Input widget input value ---- // 

    const [mobileNumber, setMobileNumber] = useState('') ; 

    // ===== Forget Password Handler ===== // 

    const ForgetPassword_handler = async () => {

        setIndicatorValue(true) ; 

        if (mobileNumber == ""){

            ToastAndroid.show("Enter Mobile number", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (mobileNumber.length != 10){

            ToastAndroid.show("Enter valid Mobile number", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else{

            try {
                
                // ---- Forget password mobile number check request ---- // 
                
                let Request_url = URL.Authentication_request_url ; 
                
                let Request_data = {
                    "Check_status": "Send_otp", 
                    "Mobilenumber": mobileNumber
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

                if (Response_status == "Mobile number not register"){

                    ToastAndroid.show("Mobilenumber not register", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                }else if (Response_status == "OTP send failed"){

                    ToastAndroid.show("Send OTP request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                }else if (Response_status == "OTP send"){

                    ToastAndroid.show("OTP send successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

                    // ---- Verification OTP ----- //
                    let VerificationOTP = Response.OTP ; 

                    navigation.navigate("ForgetVerification", {"OTP":VerificationOTP, "Mobilenumber":mobileNumber}) ; 
                }
                else{

                    ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                }

            } catch (error) {
                
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
        }

        setIndicatorValue(false) ; 
    }

    // ===== Forget Password back handler ====== // 

    const Forget_password_back_handler = () => {

        navigation.navigate("Signin") ; 
    }

    if (loadFont){
        return(
            <View style={ForgetPasswordScreen.ForgetPasswordLayout}>

                {/* StatusBar  */}

                <StatusbarComponent 
                    color = {colorCode.Authentication_statusBar_color}
                ></StatusbarComponent>

                {/* Back image and title layout  */}

                <View style={ForgetPasswordScreen.BackOptionLayout}>
                
                    {/* Back option  */}

                    <Pressable
                        android_ripple={{color:colorCode.Authentication_button_ripper_color}}
                        style = {ForgetPasswordScreen.BackImageLayout}
                        onPress = {Forget_password_back_handler}>
                        
                        <Image
                            style={style.Authentication_BackImage}
                            source={require("../../assets/Images/Back-option.png")}
                        />

                    </Pressable>

                    {/* Title layout  */}

                    <TextComponent
                        TextValue = "Forget Password"
                        TextSize = {21}
                        TextFamily = "Ubuntu"
                        TextColor = {colorCode.Authentication_title_color}
                        TextStyle = {{marginTop: "auto", marginBottom: 'auto', marginLeft: 4}}
                    />

                </View>

                {/* Forget Password related information  */}

                <TextComponent
                    TextValue = "Provide your account's Mobilenumber for which you want to reset your password"
                    TextColor = {colorCode.Authentication_subtitle_color}
                    TextFamily = "Sans"
                    TextSize = {17}
                    TextStyle = {{marginTop: 8}}
                />

                {/* Input layout  */}

                <View style={style.AuthenticationScreen_inputlayout}>
                    
                    {/* Mobile number input  */}

                    <TextInput

                        style = {[style.Authentication_inputWidget, {borderWidth:mobilenumberBorder?1:0}]}
                        allowFontScaling = {false}
                        cursorColor = {colorCode.Authentication_subtitle_color}
                        keyboardType = "phone-pad"

                        placeholder = "Mobile number"
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}

                        onFocus = {FocusHandler}
                        value = {mobileNumber}
                        onChangeText = {(value) => setMobileNumber(value)}
                    />

                {/* Signup verification button  */}

                {indicatorValue?
                    <View style={[ForgetPasswordScreen.ButtonLayout, {paddingTop:7, paddingBottom: 7}]}>
                        <ActivityIndicator size= "large"
                            color= {colorCode.Authentication_button_textColor}/>
                    </View>
                :
                    <Pressable style={ForgetPasswordScreen.ButtonLayout}
                        android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                        onPress = {ForgetPassword_handler}>

                        <TextComponent
                            TextValue = "Send code"
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

const ForgetPasswordScreen = new StyleSheet.create({
    ForgetPasswordLayout: {
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
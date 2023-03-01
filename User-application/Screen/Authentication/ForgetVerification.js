import React, {useState, useEffect} from "react";
import { View, StyleSheet, Pressable, Image, TextInput, ToastAndroid } from "react-native";

// **** Colorcode and ScreenStyle **** // 
import * as colorCode from '../../Color-code/Color-codes' ; 
import * as style from '../../Style/AuthenticationStyle' ; 

// **** Text and StatusBar component **** // 
import TextComponent from "../../Component/TextComp";
import StatusbarComponent from '../../Component/StatusbarComp' ; 

// **** Import require packages **** // 
import * as Navigationbar from 'expo-navigation-bar' ;
import * as Font from 'expo-font' ;  

export default function ForgetVerification({navigation, route, ...props}){

    const {OTP, Mobilenumber} = route.params ; 

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

    const [verificationBorder, setVerificationBorder] = useState(false) ; 

    const FocusHandler = () => {

        setVerificationBorder(true) ; 
    }   

    // ---- Input widget value ---- //

    const [verificationcode, setVerificationCode] = useState('') ;

    // ====== Forget Password verification handler ======= //

    const ForgetPassword_handler = () => {

        setIndicatorValue(true); 

        if (verificationcode == ""){

            ToastAndroid.show("Enter Verification code", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (verificationcode != OTP) {

            ToastAndroid.show("Invalid Verification code", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else{

            navigation.navigate('UpdatePassword', {"Mobilenumber": Mobilenumber}) ; 

        }
        setIndicatorValue(false) ; 
    }

    // ===== Back handler ==== // 

    const Back_handler = () => {
        navigation.goBack() ; 
    }


    if (loadFont){
        return(
            <View style={ForgetVerificationScreen.ForgetVerificationLayout}>

                
                {/* StatusBar  */}

                <StatusbarComponent 
                    color = {colorCode.Authentication_statusBar_color}
                ></StatusbarComponent>

                {/* Back option and title layout  */}

                <View style={ForgetVerificationScreen.BackOptionLayout}>
                
                    {/* Back option  */}

                    <Pressable
                        android_ripple={{color:colorCode.Authentication_button_ripper_color}}
                        style = {ForgetVerificationScreen.BackImageLayout}
                        onPress = {Back_handler}>
                        
                        <Image
                            style={style.Authentication_BackImage}
                            source={require("../../assets/Images/Back-option.png")}
                        />

                    </Pressable>

                    {/* Title layout  */}

                    <TextComponent
                        TextValue = "Forget Verification"
                        TextSize = {21}
                        TextFamily = "Ubuntu"
                        TextColor = {colorCode.Authentication_title_color}
                        TextStyle = {{marginTop: "auto", marginBottom: 'auto', marginLeft: 4}}
                    />

                </View>

                {/* Forget verification image  */}

                <Image
                    source={require('../../assets/Images/OTP-verification.jpg')}
                    style = {{height:150, width: 150, marginLeft:"auto", marginRight:"auto"}}
                />

                {/* Input layout  */}

                <View style={style.AuthenticationScreen_inputlayout}>

                    <TextInput
                    
                        style = {[style.Authentication_inputWidget, {borderWidth:verificationBorder?1:0}]}
                        allowFontScaling = {false}
                        cursorColor = {colorCode.Authentication_subtitle_color}
                        keyboardType = "phone-pad"

                        placeholder = "6-digit verification code"
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}

                        onFocus = {FocusHandler}
                        value = {verificationcode} 
                        onChangeText = {(value) => setVerificationCode(value)}
                    />

                    {/* Signup verification button  */}

                    {indicatorValue?
                        <View style={[ForgetVerificationScreen.ButtonLayout, {paddingTop:7, paddingBottom: 7}]}>
                            <ActivityIndicator size= "large"
                                color= {colorCode.Authentication_button_textColor}/>
                        </View>
                    :
                        <Pressable style={ForgetVerificationScreen.ButtonLayout}
                            android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                            onPress = {ForgetPassword_handler}>

                            <TextComponent
                                TextValue = "Verify"
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

const ForgetVerificationScreen = new StyleSheet.create({
    ForgetVerificationLayout : {
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
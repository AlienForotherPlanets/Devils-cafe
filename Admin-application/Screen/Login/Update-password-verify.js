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


export default function Update_password_verify({navigation, route}){

    const {OTP} = route.params ; 

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

    const [verificationBorder, setverificationBorder] = useState(false) ; 

    const onFocus = () => {
        setverificationBorder(true) ; 
    }

    // ===== Verification code handler ====== // 

    const [verificationCode, setVerificationCode] = useState('') ;

    const VerificationCode_handler = () => {

        setIndicatorValue(true) ; 

        if (verificationCode == ""){

            ToastAndroid.show("Enter verification code", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (OTP != verificationCode){

            ToastAndroid.show("Invalid veriification code", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else{

            navigation.navigate("NewPassword") ; 
        }

        setIndicatorValue(false) ; 
    }

    if (loadFont){
        return (
          <View style={UpdatePasswordVerifyScreen.UpdatePasswordVerifyScreenLayout}>
            
            {/* StatusBar component  */}

            <StatusbarComponent
              color={colorCode.Authentication_statusBar_color}
            />

            {/* Title  */}
            
            <TextComponent 
                TextValue="Mobile number verify! 🤞" 
                TextFamily = "Ubuntu"
                TextSize = {22}
                TextColor = {colorCode.Authentication_title_color}
                TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop: 15}}
            />

            {/* Input Layout  */}
            
            <ScrollView style={UpdatePasswordVerifyScreen.InputLayout}>

                {/* Admin register mobile number input  */}

                <TextInput
                    style = {[UpdatePasswordVerifyScreen.InputWidget, {borderWidth:verificationBorder?1:0}]}
                    allowFontScaling = {false}
                    cursorColor = {colorCode.Authentication_subtitle_color}
                    keyboardType = "phone-pad"

                    placeholder = "6-digit verification code"
                    placeholderTextColor= {colorCode.Authentication_subtitle_color}

                    onFocus = {() => onFocus()}
                    value = {verificationCode}
                    onChangeText = {(value) => setVerificationCode(value)}
                />

                {/* Verification code check button  */}

                {indicatorValue?
                    <View style={[UpdatePasswordVerifyScreen.ButtonLayout, {paddingTop:7, paddingBottom: 7}]}>
                        <ActivityIndicator size= "large"
                            color= {colorCode.Authentication_button_textColor}/>
                    </View>
                :
                    <Pressable style={UpdatePasswordVerifyScreen.ButtonLayout}
                        android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                        onPress = {VerificationCode_handler}>

                        <TextComponent
                            TextValue = "Verify"
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

const UpdatePasswordVerifyScreen = new StyleSheet.create({
    UpdatePasswordVerifyScreenLayout: {
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
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

// **** Import request url **** // 
import * as URL from '../../URL/RequestURL' ; 

export default function Update_password({navigation}){

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

    // ==== Update password request handler ==== // 

    const [mobileNumber, setMobileNumber] = useState('') ; 

    const Update_password_handler = async () => {

        setIndicatorValue(true) ; 

        if (mobileNumber == ""){

            ToastAndroid.show("Enter Mobile number", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else{

            try {

                // ---- Admin mobile number check request ---  // 
                        
                let Request_url = URL.Authentication_url ; 
                        
                let Request_data = {
                    "Check_status":"Admin-mobile-check", 
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

                    ToastAndroid.show(Response_status, ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                }else if (Response_status == "OTP send failed"){

                    ToastAndroid.show(Response_status, ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                }else if (Response_status == "OTP send"){

                    ToastAndroid.show("OTP send successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                    
                    let VerificaionOTP = Response.OTP ; 
                    navigation.navigate("UpdatePasswordVerify", {"OTP":VerificaionOTP}) ; 

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
          <View style={UpdatePasswordScreen.UpdatePasswordScreenLayout}>
            
            {/* StatusBar component  */}

            <StatusbarComponent
              color={colorCode.Authentication_statusBar_color}
            />

            {/* Title  */}
            
            <TextComponent 
                TextValue="Update Password ! 🤞" 
                TextFamily = "Ubuntu"
                TextSize = {22}
                TextColor = {colorCode.Authentication_title_color}
                TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop: 15}}
            />

            {/* Input Layout  */}
            
            <ScrollView style={UpdatePasswordScreen.InputLayout}>

                {/* Admin register mobile number input  */}

                <TextInput
                    style = {[UpdatePasswordScreen.InputWidget, {borderWidth:passwordBorder?1:0}]}
                    allowFontScaling = {false}
                    cursorColor = {colorCode.Authentication_subtitle_color}
                    keyboardType = "phone-pad"

                    placeholder = "Register admin mobile number"
                    placeholderTextColor= {colorCode.Authentication_subtitle_color}
                    
                    onFocus = {() => onFocus()}
                    value = {mobileNumber}
                    onChangeText = {(value) => setMobileNumber(value)}
                />

                {/* Admin login button  */}

                {indicatorValue?
                    <View style={[UpdatePasswordScreen.ButtonLayout, {paddingTop:7, paddingBottom: 7}]}>
                        <ActivityIndicator size= "large"
                            color= {colorCode.Authentication_button_textColor}/>
                    </View>
                :
                    <Pressable style={UpdatePasswordScreen.ButtonLayout}
                        android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                        onPress = {Update_password_handler}>

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

const UpdatePasswordScreen = new StyleSheet.create({
    UpdatePasswordScreenLayout: {
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
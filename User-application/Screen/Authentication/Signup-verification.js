import React, {useState, useEffect} from "react";
import { View, StyleSheet, Image, Pressable, TextInput, ToastAndroid, ActivityIndicator } from "react-native";

// **** Colorcode and ScreenStyle **** // 
import * as colorCode from '../../Color-code/Color-codes' ; 
import * as style from '../../Style/AuthenticationStyle' ; 

// **** Text and StatusBar component **** // 
import TextComponent from "../../Component/TextComp";
import StatusbarComponent from '../../Component/StatusbarComp' ; 

// **** Import require packages **** // 
import * as Navigationbar from 'expo-navigation-bar' ;
import * as Font from 'expo-font' ;  

// **** Import Device and Notification package **** // 
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

// **** Import Request URL **** // 
import * as URL from '../../URL/RequestURL' ; 

// ===== Craete Notification id ====== // 

async function registerForPushNotificationsAsync() {
    let token;

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
            }

            token = (await Notifications.getDevicePushTokenAsync()).data;
            console.log(token);

        } 
        else {
        }

    if (Platform.OS === 'android') {

        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

export default function SignupVerification({navigation, route}){

    // ---- Get route variable ----- // 

    const {Username, Mobilenumber, Password, OTP } = route.params ; 

    // ---- Set NavigationBar color ---- //

    Navigationbar.setBackgroundColorAsync("#ffffff");

    // ---- Load Font ---- //

    const [loadFont, setLoadFont] = useState(false);
    const [expoPushToken, setExpoPushToken] = useState('');

    useEffect(() => {
        
        // ---- Register notification token ---- // 
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        
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
    
    const [verificationCode, setVerificationCode] = useState('') ; 

    // ===== SignupVerification Handler ====== // 

    const Signup_handler = async () => {

        setIndicatorValue(true) ; 

        if (verificationCode == ""){
            
            ToastAndroid.show("Enter Verification code", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (OTP != verificationCode ) {

            ToastAndroid.show("Invalid Verification code", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

        }else{

            try {   

                // ----- Signup request ----- // 

                let Request_url = URL.Authentication_request_url ; 
                
                let Request_data = {
                    "Username": Username, 
                    "Mobilenumber": Mobilenumber, 
                    "Password": Password, 
                    "Notification_id": expoPushToken, 
                    "Check_status": "Signup"
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

                let Response_status = Response.Status; 

                if (Response_status == "Insert data"){

                    ToastAndroid.show("Welcome to our application", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

                    // ---- Set User information in local storage ---- / /

                    // 1. Username
                    await AsyncStorage.setItem("Username", Username); 
                    
                    // 2. Mobilenumber
                    await AsyncStorage.setItem("Mobilenumber", Mobilenumber); 
                    
                    // 3. Table 

                    let Userdata_table = Response.Table ; 

                    await AsyncStorage.setItem("Table", Userdata_table );
                    
                    navigation.navigate("HomeScreen") ; 
                }
                
            } catch (error) {
                
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
        }

        setIndicatorValue(false) ; 
    }   

    // ===== Signup Verification BackHandler ===== // 

    const Signup_back_handler = () => {
        navigation.navigate("Signup") ; 
    }
 
    if (loadFont){
        return (
          <View style={SignupVerificationScreen.SignupVerificationScreen}>
            
            {/* Statusbar  */}

            <StatusbarComponent
              color={colorCode.Authentication_statusBar_color}
            ></StatusbarComponent>
            
            {/* BackOption and Title Layout  */}

            <View style={SignupVerificationScreen.BackOptionLayout}>
                
                {/* Back option  */}

                <Pressable
                    android_ripple={{color:colorCode.Authentication_button_ripper_color}}
                    style = {SignupVerificationScreen.BackImageLayout}
                    onPress = {Signup_back_handler}>
                    
                    <Image
                        style={style.Authentication_BackImage}
                        source={require("../../assets/Images/Back-option.png")}
                    />

                </Pressable>

                {/* Title layout  */}

                <TextComponent
                    TextValue = "Verification"
                    TextSize = {21}
                    TextFamily = "Ubuntu"
                    TextColor = {colorCode.Authentication_title_color}
                    TextStyle = {{marginTop: "auto", marginBottom: 'auto', marginLeft: 4}}
                />

            </View>

            {/* Mobilenumber information  */}

            <TextComponent
                TextValue = {"Mobilenumber +91-" + Mobilenumber}
                TextColor = {colorCode.Authentication_title_color}
                TextFamily = "Sans"
                TextSize = {18}
                TextStyle = {{marginTop: 5, marginLeft: 5}}
            />
            
            {/* OTP verification image  */}
            
            <Image
                style = {{height: 150, width: 150, marginLeft: "auto", marginRight: "auto"}}
                source={require('../../assets/Images/OTP-verification.jpg')}
            />

            {/* Input layout  */}

            <View style = {style.AuthenticationScreen_inputlayout}>
                
                {/* Verification code input  */}

                <TextInput
                    style = {[style.Authentication_inputWidget, {borderWidth:verificationBorder?1:0}]}
                    allowFontScaling = {false}
                    keyboardType = "phone-pad"
                    cursorColor= {colorCode.Authentication_subtitle_color}

                    placeholder = "6-digit verification code"
                    placeholderTextColor= {colorCode.Authentication_subtitle_color}

                    onFocus = {() => FocusHandler() }
                    value = {verificationCode}
                    onChangeText = {(value) => setVerificationCode(value)}
                />

                {/* Signup verification button  */}

                {indicatorValue?
                    <View style={[SignupVerificationScreen.ButtonLayout, {paddingTop:7, paddingBottom: 7}]}>
                        <ActivityIndicator size= "large"
                            color= {colorCode.Authentication_button_textColor}/>
                    </View>
                :
                    <Pressable style={SignupVerificationScreen.ButtonLayout}
                        android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                        onPress = {Signup_handler}>

                        <TextComponent
                            TextValue = "Signup"
                            TextFamily = "Ubuntu"
                            TextSize = {19}
                            TextColor = {colorCode.Authentication_button_textColor}
                        />

                    </Pressable>
                }
            </View>
          </View>
        );
    }
}

const SignupVerificationScreen = new StyleSheet.create({
    SignupVerificationScreen: {
        ...style.AuthenticationScreen_style
    }, 
    
    BackOptionLayout:{
        ...style.Authentication_BackLayout
    }, 

    BackImageLayout : {
        ...style.Authentication_BackImage_layout
    }, 

    ButtonLayout: {
        ...style.Authentication_button
    }

})
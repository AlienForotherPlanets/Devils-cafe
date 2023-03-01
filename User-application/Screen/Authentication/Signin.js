import React, {useState, useEffect} from "react";
import { View, StyleSheet, ScrollView, TextInput, 
    Pressable, ActivityIndicator, ToastAndroid } from "react-native";

// **** Colorcode and ScreenStyle **** // 
import * as colorCode from '../../Color-code/Color-codes' ; 
import * as style from '../../Style/AuthenticationStyle' ; 

// **** Text and StatusBar component **** // 
import TextComponent from "../../Component/TextComp";
import StatusbarComponent from '../../Component/StatusbarComp' ; 

// **** Import require packages **** // 
import * as Navigationbar from 'expo-navigation-bar' ;
import * as Font from 'expo-font' ;  
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";

// **** Import Checkbox Item **** // 
import { Checkbox } from 'react-native-paper';

// **** Import request url **** // 
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

export default function Signin({navigation}){

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

    const [mobileNumberBorder, setMobileNumberBorder] = useState(false) ; 
    const [passwordBorder, setPasswordBorder] = useState(false) ; 

    const FocusHandler = (x) => {

        setMobileNumberBorder(false) ; 
        setPasswordBorder(false) ; 

        if (x == 0 ){

            setMobileNumberBorder(true) ; 
        }else{

            setPasswordBorder(true) ; 
        }
    }

    // ---- Password show value ---- // 

    const [showPassword, setShowPassword] = useState(true) ; 

    // ---- Checkbox handler ---- // 

    const [check, setCheck] = useState(false) ; 

    const onCheck = () => {

        if (check){

            setCheck(false) ; 
            setShowPassword(true) ; 
        }else{
            
            setCheck(true) ; 
            setShowPassword(false) ; 
        }
    }

    // ----- Input value of input widget ----- // 

    const [mobileNumber, setMobileNumber] = useState('') ; 
    const [password, setPassword] = useState('') ; 

    // ======= Signin Request Handler ======== // 

    const SigninHandler = async () => {

        setIndicatorValue(true) ; 

        if (mobileNumber == ""){

            ToastAndroid.show("Enter Mobile number", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (mobileNumber.length != 10) {

            ToastAndroid.show("Enter valid Mobile number", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (password == ""){

            ToastAndroid.show("Enter Password", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else{
            
            try {
                
                let Request_url = URL.Authentication_request_url ; 
                
                let Request_data = {
                    "Check_status": "Signin", 
                    "Mobilenumber": mobileNumber, 
                    "Password": password, 
                    "notification": expoPushToken
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

                if (Response_status == "Invalid Password"){

                    ToastAndroid.show(Response_status, ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

                }else if (Response_status == "Mobile number not register"){

                    ToastAndroid.show(Response_status, ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                }else if (Response_status == "Signin"){

                    // ---- Set User information in local storage ---- / /

                    // 1. Username
                    await AsyncStorage.setItem("Username", Response.Username); 
                    
                    // 2. Mobilenumber
                    await AsyncStorage.setItem("Mobilenumber", mobileNumber); 
                    
                    // 3. Table 

                    await AsyncStorage.setItem("Table", Response.Tablename );

                    ToastAndroid.show("Signin successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

                    navigation.navigate("HomeScreen") ; 

                }else{

                    ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                }

            } catch (error) {
                
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT);
            }
        }
        
        setIndicatorValue(false) ; 
        
    }

    // ====== Already account Handler ====== // 

    const New_account_handler = () => {

        navigation.navigate("Signup") ; 
    }

    // ===== Forget password option handler ===== // 

    const Forget_password_handler = () => {

        navigation.navigate("ForgetPassword") ; 
    }

    if (loadFont){
        return (
          <View style={SigninScreen.SigninScreenLayout}>
            
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
                TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop: 10}}
            />

            {/* Input Layout  */}
            
            <ScrollView style={SigninScreen.InputLayout}>

                {/* Mobile number input  */}

                <TextInput

                    style = {[SigninScreen.InputWidget, {borderWidth:mobileNumberBorder?1:0}]}
                    allowFontScaling = {false}
                    cursorColor = {colorCode.Authentication_cursor_color}

                    placeholder = "Mobile number"
                    placeholderTextColor= {colorCode.Authentication_subtitle_color}

                    keyboardType="phone-pad"

                    value = {mobileNumber}
                    onChangeText = {(value) => setMobileNumber(value)}
                    onFocus = {() => FocusHandler(0)}

                />

                {/* Password input  */}

                <TextInput

                    style = {[SigninScreen.InputWidget, {borderWidth:passwordBorder?1:0}]}
                    allowFontScaling = {false}
                    cursorColor = {colorCode.Authentication_cursor_color}

                    placeholder = "Password"
                    placeholderTextColor= {colorCode.Authentication_subtitle_color}

                    secureTextEntry = {showPassword}
                    value = {password} 
                    onChangeText = {(value) => setPassword(value)}
                    onFocus = {() => FocusHandler(1)}
                />
                
                {/* Show Password checkbox  */}

                <View>

                    <Checkbox.Item 

                        label="Show Password"
                        position="leading"

                        labelStyle = {SigninScreen.ShowPasswordText}
                        style={{width:200, marginTop:3, marginBottom: 3}}

                        onPress = {() => onCheck()}
                        status = {check?'checked':'unchecked'}>

                    </Checkbox.Item>

                </View>

                {/* Signin button  */}

                {indicatorValue?<>
                    <View style={[SigninScreen.ButtonLayout, {paddingTop:7, paddingBottom: 7}]}>
                        <ActivityIndicator size= "large"
                            color= {colorCode.Authentication_button_textColor}/>
                    </View>
                </>
                :
                <>
                    <Pressable style={SigninScreen.ButtonLayout}
                        android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                        onPress = {SigninHandler}>

                        <TextComponent
                            TextValue = "Signin"
                            TextFamily = "Ubuntu"
                            TextSize = {19}
                            TextColor = {colorCode.Authentication_button_textColor}
                        />

                    </Pressable>
                </>
                }

                {/* Create new account related information  */}

                <Pressable
                    onPress={() => New_account_handler()}>

                    <TextComponent
                        TextValue = "Create new account ? Signup"
                        TextColor = {colorCode.Authentication_subtitle_color}
                        TextFamily = "Mukta"
                        TextSize = {15}
                        TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop: 7}}
                    />
                
                </Pressable>

                {/* Forget password option  */}

                <Pressable
                    onPress={() => Forget_password_handler()}>

                    <TextComponent
                        TextValue = "Forget password ?"
                        TextColor = {colorCode.Authentication_subtitle_color}
                        TextFamily = "Mukta"
                        TextSize = {15}
                        TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop: 10}}
                    />
                
                </Pressable>

            </ScrollView>

          </View>
        );
    }
}

const SigninScreen = new StyleSheet.create({
    SigninScreenLayout: {
        ...style.AuthenticationScreen_style
    }, 

    InputLayout: {
        ...style.AuthenticationScreen_inputlayout
    }, 

    InputWidget:{
        ...style.Authentication_inputWidget
    }, 

    ButtonLayout: {
        ...style.Authentication_button, 
        marginTop: 7
    }, 

    ShowPasswordText:{
        fontFamily: 'Mukta', 
        marginLeft:0
    }
})
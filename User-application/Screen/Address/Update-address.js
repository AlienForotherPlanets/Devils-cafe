import React, {useState, useEffect} from "react";
import { View, StyleSheet, Image, TextInput, ScrollView, Pressable, ActivityIndicator, ToastAndroid } from "react-native";

// **** Colorcode and ScreenStyle **** // 
import * as colorCode from '../../Color-code/Color-codes' ; 
import * as style from '../../Style/AuthenticationStyle' ; 

// **** Text and StatusBar component **** // 
import TextComponent from "../../Component/TextComp";
import StatusbarComponent from '../../Component/StatusbarComp' ; 

// **** Import require packages **** // 
import * as Navigationbar from 'expo-navigation-bar' ;
import * as Font from 'expo-font' ;  
import * as URL from '../../URL/RequestURL' ; 
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UpdateAddress({navigation, route }){

    const {data} = route.params ; 

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

    // ======= Focus handlee ======= // 

    const [usernameBorder, setUsernameBorder] = useState(false) ; 
    const [username, setUsername] = useState(data.Data1) ; 

    const [streetBorder, setStreetBorder] = useState(false) ; 
    const [streetAddress, setStreetAddress] = useState(data.Data2) ; 

    const [areaBorder, setAreaBorder] = useState(false) ; 
    const [area, setArea] = useState(data.Data3) ; 
    
    const [cityBorder, setCityBorder] = useState(false) ; 
    const [city, setCity] = useState(data.Data4) ; 

    const [pincodeBorder, setPincodeBorder] = useState(false) ; 
    const [pincode, setPincode] = useState(data.Data5) ; 

    const FocusHandler = (x) => {

        setUsernameBorder(false) ; 

        setStreetBorder(false) ; 

        setAreaBorder(false) ; 

        setCityBorder(false) ; 

        setPincodeBorder(false) ; 

        if (x == 0){

            setUsernameBorder(true) ; 
        }else if (x == 1){

            setStreetBorder(true) ; 
        }else if (x == 2){

            setAreaBorder(true) ; 
        }else if (x == 3){

            setCityBorder(true) ; 
        }else{

            setPincodeBorder(true) ; 
        }

    }

    // ======= Insert address option ======== // 

    const Update_address_option = async () => {

        setIndicatorValue(true) ; 

        let User_table_name = await AsyncStorage.getItem("Table") ; 
        
        if (username == ""){

            ToastAndroid.show("Enter, Username", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (streetAddress == ""){

            ToastAndroid.show("Enter, Your street address", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (area == ""){

            ToastAndroid.show("Enter, Your area name and landmark information", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (city == ""){

            ToastAndroid.show("Enter, You city name", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (pincode == ""){

            ToastAndroid.show("Enter, Your pincode", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (pincode.length != 6){

            ToastAndroid.show("Invalid Pincode", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else{

            try{

                // **** Insert address request **** // 

                let Request_url = URL.Authentication_request_url ; 
                
                let Request_data = {
                    "Check_status": "Update-address", 
                    "Table_name": User_table_name, 
                    "Username": username, 
                    "Street_address": streetAddress, 
                    "Area": area, 
                    "City": city, 
                    "Pincode": pincode,
                    "address_id": data.Option

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

                if (Response_status == "Not found"){

                    ToastAndroid.show("Delivery service not available on this location", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                }else if (Response_status == "Update"){

                    ToastAndroid.show("Update your address successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

                    navigation.goBack() ; 
                }

            }catch{

                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
        }

        setIndicatorValue(false) ; 

    }

    if (loadFont){

        return(
            <View style={UpdateAddressScreen.InsertAddressLayout}>

                {/* ==== Statusbar component ==== */}

                <StatusbarComponent 
                    color = {colorCode.Authentication_statusBar_color}>
                </StatusbarComponent>

                {/* ==== Location image and title ====  */}

                <View style={UpdateAddressScreen.LocationTitle}>

                    {/* Location Image  */}

                    <Image
                        style = {UpdateAddressScreen.LocationImage}
                        source={require('../../assets/Images/Location-indicator.png')}
                    />
                    
                    <TextComponent
                        TextValue  = "Update address"
                        TextFamily = "Ubuntu"
                        TextSize = {21}
                        TextTitle = {colorCode.Authentication_title_color}
                    />

                </View>

                {/* ==== Input layout ====  */}

                <ScrollView style={style.AuthenticationScreen_inputlayout}>

                    {/* Username input  */}

                    <TextInput
                        style = {[style.Authentication_inputWidget, {borderWidth:usernameBorder?1:0}]}
                        allowFontScaling = {false}
                        cursorColor = {colorCode.Authentication_subtitle_color}

                        onFocus = {() => FocusHandler(0)}
                        placeholder = "Username"
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}

                        value = {username}
                        onChangeText = {(value) => setUsername(value)}
                    />

                    {/* Street address input  */}

                    <TextInput
                        style = {[style.Authentication_inputWidget, {borderWidth:streetBorder?1:0}]}
                        allowFontScaling = {false}
                        cursorColor = {colorCode.Authentication_subtitle_color}

                        onFocus = {() => FocusHandler(1)}
                        placeholder = "Street address"
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}

                        value = {streetAddress}
                        onChangeText = {(value) => setStreetAddress(value)}
                    />

                    {/* Area input  */}

                    <TextInput
                        style = {[style.Authentication_inputWidget, {borderWidth:areaBorder?1:0}]}
                        allowFontScaling = {false}
                        cursorColor = {colorCode.Authentication_subtitle_color}

                        onFocus = {() => FocusHandler(2)}
                        placeholder = "Area , Landmark"
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}

                        value = {area}
                        onChangeText = {(value) => setArea(value) }
                    />

                    {/* City input  */}

                    <TextInput
                        style = {[style.Authentication_inputWidget, {borderWidth:cityBorder?1:0}]}
                        allowFontScaling = {false}
                        cursorColor = {colorCode.Authentication_subtitle_color}

                        onFocus = {() => FocusHandler(3)}
                        placeholder = "City"
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}

                        value = {city}
                        onChangeText = {(value) => setCity(value)}
                    />  
                    
                    {/* Pincode input  */}

                    <TextInput
                        style = {[style.Authentication_inputWidget, {borderWidth:pincodeBorder?1:0}]}
                        allowFontScaling = {false}
                        cursorColor = {colorCode.Authentication_subtitle_color}
                        keyboardType = "phone-pad"

                        onFocus = {() => FocusHandler(4)}
                        placeholder = "Pincode"
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}

                        value = {pincode}
                        onChangeText = {(value) => setPincode(value) } 
                    />  

                    {/*  Add new address button */}

                    {indicatorValue?
                        <View style={[UpdateAddressScreen.ButtonLayout, {paddingTop:7, paddingBottom: 7}]}>
                            <ActivityIndicator size= "large"
                                color= {colorCode.Authentication_button_textColor}/>
                        </View>
                        :
                        <Pressable style={UpdateAddressScreen.ButtonLayout}
                            android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                            onPress = {Update_address_option}>

                            <TextComponent
                                TextValue = "Update address"
                                TextFamily = "Ubuntu"
                                TextSize = {19}
                                TextColor = {colorCode.Authentication_button_textColor}
                            />

                        </Pressable>    
                    }

                </ScrollView>

            </View>
        )
    }
}

const UpdateAddressScreen = new StyleSheet.create({
    InsertAddressLayout: {
        ...style.AuthenticationScreen_style
    }, 

    LocationTitle:{
        display: 'flex',
        alignItems: 'center', 
        flexDirection: 'row', 
        marginLeft: 'auto', 
        marginRight: 'auto', 
        marginTop: 5
    }, 

    LocationImage: {
        height: 40, 
        width: 40
    }, 
    ButtonLayout: {
        ...style.Authentication_button
    }, 

    DeliveryLoacationWant:{
        backgroundColor: colorCode.Authentication_input_color, 
        display: 'flex', 
        alignItems: 'center', 
        paddingTop: 8, 
        paddingBottom: 8, 
        marginBottom: 10
    }, 

    DeliveryLocationInformation:{
        display: 'flex', 
        textAlign: 'center',
        flexDirection: 'row', 
        padding: 10 ,
        borderRadius: 5, 
        backgroundColor: colorCode.Authentication_input_color
    }
})
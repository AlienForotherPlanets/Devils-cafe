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

export default function InsertAddress({navigation}){

    // ---- Set NavigationBar color ---- // 

    Navigationbar.setBackgroundColorAsync('#ffffff') ; 

    // ---- Load Font ---- // 

    const [loadFont, setLoadFont] = useState(false) ; 

    const [location, setLocation] = useState([]) ; 
    const [locationLayout, setLocationLayout] = useState(false) ; 

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


        const Load_location = async () => {

            try{

                let Request_url = URL.Authentication_request_url ; 
                
                let Request_data = {
                    "Check_status": "All-delivery-location",
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

                if (Response_status == "Fetch"){

                    setLocation([...Response.Location]) ; 
                }

            }catch{

                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
        } 

        Load_location() ; 



    }, []) ; 

    // ---- Activity Indicator ---- // 

    const [indicatorValue, setIndicatorValue] = useState(false) ; 

    const [deliverIndicatorValue, setDeliveryIndicatorValue] = useState(false) ; 

    const [deliveryInformation, setDeliveryInformation] = useState(false) ; 

    const [suggestionLocation, setSuggesstionLocation] = useState('') ; 

    const [suggesstionArea, setSugesstionArea] = useState('') ; 

    // ======= Focus handlee ======= // 

    const [usernameBorder, setUsernameBorder] = useState(false) ; 
    const [username, setUsername] = useState('') ; 

    const [streetBorder, setStreetBorder] = useState(false) ; 
    const [streetAddress, setStreetAddress] = useState('') ; 

    const [areaBorder, setAreaBorder] = useState(false) ; 
    const [area, setArea] = useState('') ; 
    
    const [cityBorder, setCityBorder] = useState(false) ; 
    const [city, setCity] = useState('') ; 

    const [pincodeBorder, setPincodeBorder] = useState(false) ; 
    const [pincode, setPincode] = useState('') ; 

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

    const Insert_address_option = async () => {

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
                    "Check_status": "Insert_address", 
                    "Table_name": User_table_name, 
                    "Username": username, 
                    "Street_address": streetAddress, 
                    "Area": area, 
                    "City": city, 
                    "Pincode": pincode

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

                    setLocationLayout(true) ; 
                }else if (Response_status == "Insert"){

                    ToastAndroid.show("Insert your address successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

                    navigation.goBack() ; 
                }

            }catch{

                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
        }

        setIndicatorValue(false) ; 

    }

    // ====== Delivery location press handler ===== // 

    const Delivery_location_click_handler = (element) => {

        setSuggesstionLocation(pincode) ; 

        setSugesstionArea(area) ; 
        
        setPincode(element.Delivery_location_pincode) ; 
        
        setArea(element.Delivery_location_name) ; 

        setDeliveryInformation(true) ; 
    }

    // ===== Insert suggesstion location request handler ===== // 

    const Sugesstion_location_handler = async () => {

        setDeliveryIndicatorValue(true) ; 

        try{

            let Username = await AsyncStorage.getItem("Username") ; 
            let User_mobilenumber = await AsyncStorage.getItem("Mobilenumber") ; 

            // **** Suggestion location insert request **** // 

            let Request_url = URL.Authentication_request_url ; 
                
            let Request_data = {
                "Check_status": "Delivery-location-suggesstion", 
                "Location_name" : suggesstionArea, 
                "Location_pincode": suggestionLocation, 
                "Username": Username, 
                "Mobilenumber": User_mobilenumber

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

            if (Response_status == "Insert suggesstion"){

                ToastAndroid.show("Insert your suggesstion successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }else{

                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }

        }catch{

            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }

        setDeliveryIndicatorValue(false) ; 
        setDeliveryInformation(false) ; 
    }

    if (loadFont){

        return(
            <View style={InsertAddressScreen.InsertAddressLayout}>

                {/* ==== Statusbar component ==== */}

                <StatusbarComponent 
                    color = {colorCode.Authentication_statusBar_color}>
                </StatusbarComponent>

                {/* ==== Location image and title ====  */}

                <View style={InsertAddressScreen.LocationTitle}>

                    {/* Location Image  */}

                    <Image
                        style = {InsertAddressScreen.LocationImage}
                        source={require('../../assets/Images/Location-indicator.png')}
                    />
                    
                    <TextComponent
                        TextValue  = "Add new address"
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


                    {locationLayout?<>
                        
                        {/* ---- Available delivery location pincode title information ----  */}

                        <TextComponent
                            TextValue = "Available delivery location"
                            TextFamily = "Sans"
                            TextColor = {colorCode.Authentication_title_color}
                            TextSize = {17}
                        />

                        <ScrollView style={{marginTop: 10, marginBottom:10}} horizontal >

                            {location.map((element, index) => {
                                return(

                                    <View style={{alignItems:"baseline"}}
                                        key = {index}>

                                        {/* ==== Delivery location layout ====      */}

                                        <Pressable style={InsertAddressScreen.DeliveryLocationInformation}
                                            android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                                            onPress = {() => Delivery_location_click_handler(element)}>

                                            {/* ---- Delivery location name ----  */}

                                            <TextComponent
                                                TextValue = {element.Delivery_location_name}
                                                TextColor = {colorCode.Authentication_title_color}
                                                TextSize = {16}
                                                TextFamily = "Ubuntu"
                                            />

                                            {/* ---- Delivery location pincode ----  */}

                                            <TextComponent
                                                TextValue = {element.Delivery_location_pincode}
                                                TextColor = {colorCode.Authentication_subtitle_color}
                                                TextSize = {17}
                                                TextFamily = "Sans"
                                                TextStyle = {{marginLeft: 7}}
                                            />
                                        </Pressable>

                                    </View>
                                )
                            })}

                        </ScrollView>

                    </>
                    :<></>}

                    {/* Delivery location want option button  */}

                    {deliverIndicatorValue?
                        <View style={[InsertAddressScreen.DeliveryLoacationWant, {paddingTop:7, paddingBottom: 7}]}>
                            <ActivityIndicator size= "large"
                                color= {'#464646'}/>
                        </View>
                    :
                        
                        deliveryInformation?
                        
                            <Pressable style={InsertAddressScreen.DeliveryLoacationWant}
                                android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                                onPress = {Sugesstion_location_handler}>

                                <TextComponent
                                    TextValue = "Hii, You want our delivery in your location"
                                    TextFamily = "Mukta"
                                    TextSize = {17}
                                    TextColor = {'#6a6a6a'}
                                    TextStyle = {{marginLeft:"auto", marginRight:"auto"}}
                                />

                            </Pressable>
                        
                        :<></>
                    }

                    {/*  Add new address button */}

                    {indicatorValue?
                        <View style={[InsertAddressScreen.ButtonLayout, {paddingTop:7, paddingBottom: 7}]}>
                            <ActivityIndicator size= "large"
                                color= {colorCode.Authentication_button_textColor}/>
                        </View>
                        :
                        <Pressable style={InsertAddressScreen.ButtonLayout}
                            android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                            onPress = {Insert_address_option}>

                            <TextComponent
                                TextValue = "Insert address"
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

const InsertAddressScreen = new StyleSheet.create({
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
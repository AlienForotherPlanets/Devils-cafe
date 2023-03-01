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
import { BarCodeScanner } from 'expo-barcode-scanner';

// **** Import URL **** // 
import * as URL from '../../URL/RequestURL' ; 
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SkypeIndicator } from "react-native-indicators";

export default function Scanner({navigation}){

    // ---- Set NavigationBar color ---- //
    
    Navigationbar.setBackgroundColorAsync("#ffffff");

    // ---- Load Font ---- //

    const [loadFont, setLoadFont] = useState(false);

    const [scanner_layout, set_scanner_layout] = useState(true) ; 

    const [user_id, setUser_id] = useState('') ; 

    const [order_id, setOrder_id] = useState('') ; 

    const [username, setUsername] = useState('') ; 

    const [mobileNumber, setMobileNumber] = useState('') ; 

    const [loading_layout, setLoading_layout] = useState(false) ; 

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

    // ==== Barcode scanned handler ==== // 

    const handleBarCodeScanned = ({ type, data }) => {

        set_scanner_layout(false) ; 
        
        try{

            let Result = String(data).split("**") ;

            setUser_id(Result[0]) ; 

            setOrder_id(Result[1]) ; 

            setUsername(Result[2]) ; 

            setMobileNumber(Result[3]) ; 

        }catch{}
    };

    // ==== Complete order function ==== // 

    const Complete_order_function = async () => {

        setLoading_layout(true) ; 

        try{

            // ---- Complete order request ---- // 

            let Request_url = URL.Authentication_url ; 
                        
            let Request_data = {
                "Check_status": "Complete-order",
                "User_id": user_id, 
                "Order_id": order_id, 
                "Mobile_number": mobileNumber 
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

            if (Response_status == "Complete"){

                setLoading_layout(false) ; 

                set_scanner_layout(true) ; 

                ToastAndroid.show("Complete order successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT)  ; 
            }

        }catch{

            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }
    

    // ===== Scanner open ===== // 

    const Scanner_open = ( ) => {

        set_scanner_layout(true) ; 
    } 

    const Close_scanner = () => {

        set_scanner_layout(false) ; 
    }

    if (loadFont){

        return(
            <View style={ScannerScreenStyle.ScannerLayout}>
    
                {/* Statusbar component  */}
                            
                <StatusbarComponent
                    color = {colorCode.Authentication_statusBar_color}
                />

                {/* Title  */}

                <TextComponent
                    TextValue = "📦 Complete order"
                    TextFamily = "Ubuntu"
                    TextSize = {21}
                    TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop:10}}
                />

                {/* ====== Loading layout ======  */}

                {loading_layout?<>
                    <View style={ScannerScreenStyle.loading_layout}>
                        <SkypeIndicator></SkypeIndicator>
                    </View>
                </>:<></>}

                <Pressable style={[ScannerScreenStyle.OptionButtonLayout, {backgroundColor:"red", marginTop: 20}]}
                    onPress = {() => navigation.goBack()}>
                    
                    <TextComponent
                        TextValue = "Close scanner"
                        TextFamily = "Ubuntu"
                        TextColor = "#ffffff"
                        TextSize = {18}
                    />
                            
                </Pressable>


                {/* ====== Open scanner option =======  */}

                {scanner_layout == false?

                    <View>
                        
                        <Pressable style={[ScannerScreenStyle.OptionButtonLayout]}
                            onPress = {Scanner_open}>
                    
                            <TextComponent
                                TextValue = "Scan aganin"
                                TextFamily = "Ubuntu"
                                TextColor = "#ffffff"
                                TextSize = {18}
                            />
                            
                        </Pressable>

                        {/* ====== Order id information =====  */}

                        <View style={ScannerScreenStyle.Displaydata_layout}>

                            <TextComponent
                                TextValue = "Order id"
                                TextFamily = "Ubuntu"
                                TextColor = {colorCode.Authentication_title_color}
                                TextSize = {17}
                                TextStyle = {ScannerScreenStyle.DisplayData_title}
                            />

                            <TextComponent
                                TextValue = {order_id}
                                TextFamily = "Ubuntu"
                                TextColor = {colorCode.Authentication_subtitle_color}
                                TextSize = {17}
                                TextStyle = {ScannerScreenStyle.DisplayData_text}
                            />
                        </View>

                        {/* ====== Username information ======= */}

                        <View style={ScannerScreenStyle.Displaydata_layout}>

                            <TextComponent
                                TextValue = "Username"
                                TextFamily = "Ubuntu"
                                TextColor = {colorCode.Authentication_title_color}
                                TextSize = {17}
                                TextStyle = {ScannerScreenStyle.DisplayData_title}
                            />

                            <TextComponent
                                TextValue = {username}
                                TextFamily = "Ubuntu"
                                TextColor = {colorCode.Authentication_subtitle_color}
                                TextSize = {17}
                                TextStyle = {ScannerScreenStyle.DisplayData_text}
                            />
                        </View>

                        {/* ====== Mobile number information =====  */}

                        <View style={ScannerScreenStyle.Displaydata_layout}>

                            <TextComponent
                                TextValue = "Mobile number"
                                TextFamily = "Ubuntu"
                                TextColor = {colorCode.Authentication_title_color}
                                TextSize = {17}
                                TextStyle = {ScannerScreenStyle.DisplayData_title}
                            />

                            <TextComponent
                                TextValue = {mobileNumber}
                                TextFamily = "Ubuntu"
                                TextColor = {colorCode.Authentication_subtitle_color}
                                TextSize = {17}
                                TextStyle = {ScannerScreenStyle.DisplayData_text}
                            />
                        </View>

                        {/* ===== Complete order option =====  */}
                        
                        <Pressable style={[ScannerScreenStyle.OptionButtonLayout, {marginTop:"10%"}]}
                            onPress = {Complete_order_function}>
                    
                            <TextComponent
                                TextValue = "Complete order"
                                TextFamily = "Ubuntu"
                                TextColor = "#ffffff"
                                TextSize = {18}
                            />
                            
                        </Pressable>


                    </View>
                
                :
                    <>

                        <View style={{height: "50%", width:"100%", marginBottom: "auto", marginTop: 25}}>

                            <BarCodeScanner
                                onBarCodeScanned={handleBarCodeScanned}
                                style={{height:"100%", width:"100%", borderRadius: 8}}
                            />

                        </View>

                    </>
                }
                
            </View>
        )
    }
}

const ScannerScreenStyle = new StyleSheet.create({
    ScannerLayout:{
        ...style.AuthenticationScreen_style
    }, 

    OptionButtonLayout:{
        ...style.Authentication_button, 
        width: '75%', 
        marginLeft:"auto", 
        marginRight:"auto", 
        marginTop: 15
    }, 

    Displaydata_layout:{
        display: 'flex', 
        flexDirection: 'row',
        marginTop: 20, 
    }, 

    DisplayData_title:{
        backgroundColor:colorCode.Authentication_input_color,
        paddingTop: 8, 
        paddingBottom:8,
        paddingLeft: 13, 
        paddingRight: 13, 
        borderRedius: 5, 

        marginTop:"auto", 
        marginBottom:"auto"
    }, 

    DisplayData_text:{
        marginTop:"auto", 
        marginBottom:"auto", 
        marginLeft: 15
    }, 

    loading_layout:{
        position: 'absolute', 
        height: '100%', 
        width: '110%', 
        backgroundColor: "rgba(238, 238, 238, 0.8)" , 
        zIndex: 20
    }
})
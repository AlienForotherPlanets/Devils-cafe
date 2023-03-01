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
import DatePicker from 'react-native-date-picker'

// **** Import Request url ***** // 
import * as URL from '../../URL/RequestURL' ; 

export default function PartyDeocration({navigation}){

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

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(true)
 

    // ---- Focus handler ----- // 

    const [partyInfomationBorder, setPartyInformationBorder] = useState(false) ; 
    
    const FocusHandler = (x) => {

        setPartyInformationBorder(false) ; 
        
        if (x == 0 ){
            setPartyInformationBorder(true) ; 
        }
    }

    // ---- Input widget value ---- // 

    const [partyInformation, setPartyInformation] = useState('') ; 

    if (loadFont){

        return(
            <View>

                {/* Statusbar component  */}
                <StatusbarComponent
                    color = {colorCode.Authentication_button_color}
                />
                
                {/* Back option and title layout  */}

                <View style={PartyOrderStyle.BackOptionLayout}>
                
                    {/* Back option  */}

                    <Pressable
                        android_ripple={{color:colorCode.Authentication_button_ripper_color}}
                        style = {PartyOrderStyle.BackImageLayout}
                        onPress = {() => navigation.goBack()}>
                        
                        <Image
                            style={style.Authentication_BackImage}
                            source={require("../../assets/Images/Other_back.png")}
                        />

                    </Pressable>

                    {/* Title layout  */}

                    <TextComponent
                        TextValue = "Party decoration order"
                        TextSize = {21}
                        TextFamily = "Ubuntu"
                        TextColor = {'#ffffff'}
                        TextStyle = {{marginTop: "auto", marginBottom: 'auto', marginLeft: 4}}
                    />

                </View>

                {/* ====== Input layout =====  */}

                <View  style = {PartyOrderStyle.InputOptionLayout}>
                
                    {/* Party informaton input  */}

                    <TextInput
                        
                        style = {[style.Authentication_inputWidget, {borderWidth:partyInfomationBorder?1:0, backgroundColor:"#ffffff"}]}
                        allowFontScaling = {false}
                        cursorColor = {colorCode.Authentication_subtitle_color}
                        keyboardType = "phone-pad"

                        placeholder = "Write about party information"
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}

                        onFocus = {() => FocusHandler(0)}
                        value = {partyInformation} 
                        onChangeText = {(value) => setPartyInformation(value)}
                    />

                    {/* Party date title  */}

                    <TextComponent
                        TextValue = "Select Party date"
                        TextFamily = "Ubuntu"
                        TextSize = {17}
                        TextColor = {colorCode.Authentication_title_color}
                    />

                    <Pressable></Pressable>



                </View>
    
            </View>
        )
    }
}

const PartyOrderStyle = new StyleSheet.create({
    PartyOrderLayout: {
        ...style.AuthenticationScreen_style, 
    }, 

    BackOptionLayout: {
        ...style.Authentication_BackLayout, 
        backgroundColor: colorCode.Authentication_button_color
    },

    BackImageLayout : {
        ...style.Authentication_BackImage_layout
    }, 

    InputOptionLayout : {
        width: "94%", 
        marginLeft:"auto", 
        marginRight: "auto", 
        marginTop: 20
    }
})
import React, {useState, useEffect} from "react";
import { View, StyleSheet, ScrollView, TextInput, Pressable, ActivityIndicator } from "react-native";

// **** Colorcode and ScreenStyle **** // 
import * as colorCode from '../../Color-code/Color-codes' ; 
import * as style from '../../Style/AuthenticationStyle' ; 

// **** Text and StatusBar component **** // 
import TextComponent from "../../Component/TextComp";
import StatusbarComponent from '../../Component/StatusbarComp' ; 

// **** Import require packages **** // 
import * as Navigationbar from 'expo-navigation-bar' ;
import * as Font from 'expo-font' ;  


export default function Send_notification(){

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

    const [notificationBorder, setnotificationBorder] = useState(false) ; 

    const onFocus = () => {
        setnotificationBorder(true) ; 
    }

    if (loadFont){
        return (
          <View style={SendNotificationScreen.SendNotificationScreenLayout}>
            
            {/* StatusBar component  */}

            <StatusbarComponent
              color={colorCode.Authentication_statusBar_color}
            />

            {/* Title  */}
            
            <TextComponent 
                TextValue="Send Notification ! 🔔" 
                TextFamily = "Ubuntu"
                TextSize = {22}
                TextColor = {colorCode.Authentication_title_color}
                TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop: 15}}
            />

            {/* Input Layout  */}
            
            <ScrollView style={SendNotificationScreen.InputLayout}>

                {/* Notification input  */}

                <TextInput
                    style = {[SendNotificationScreen.InputWidget, {borderWidth:notificationBorder?1:0}]}
                    allowFontScaling = {false}
                    placeholder = "Enter Notification message"
                    placeholderTextColor= {colorCode.Authentication_subtitle_color}
                    onFocus = {() => onFocus()}
                />

                {/* Send Notification button  */}

                {indicatorValue?
                    <Pressable style={[SendNotificationScreen.ButtonLayout, {paddingTop:7, paddingBottom: 7}]}>
                        <ActivityIndicator size= "large"
                            color= {colorCode.Authentication_button_textColor}/>
                    </Pressable>
                :
                    <Pressable style={SendNotificationScreen.ButtonLayout}
                        android_ripple = {{color:colorCode.Authentication_button_ripper_color}}>
                        <TextComponent
                            TextValue = "Send"
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

const SendNotificationScreen = new StyleSheet.create({
    SendNotificationScreenLayout: {
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
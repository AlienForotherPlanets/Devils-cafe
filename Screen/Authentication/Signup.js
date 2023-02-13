import React, {useState, useEffect} from "react";
import { View, StyleSheet, TextInput, ScrollView } from "react-native";

// **** Colorcode and ScreenStyle **** // 
import * as colorCode from '../../Color-code/Color-codes' ; 
import * as style from '../../Style/AuthenticationStyle' ; 

// **** Text and StatusBar component **** // 
import TextComponent from "../../Component/TextComp";
import StatusbarComponent from '../../Component/StatusbarComp' ; 

// **** Import require packages **** // 
import * as Navigationbar from 'expo-navigation-bar' ;
import * as Font from 'expo-font' ;  

export default function Signup(props) {

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
    
    if (loadFont){
        
        return(
            <View style={SignupScreen.SignupScreenLayout}>
                
                {/* Statusbar  */}
        
                <StatusbarComponent 
                    color = {colorCode.Authentication_statusBar_color}
                ></StatusbarComponent>
                
                {/* Title  */}
        
                <TextComponent
                    TextValue = "Welcome to Devils Cafe 👋"
                    TextFamily = "Mukta"
                    TextSize = {22}
                    TextColor = {colorCode.Authentication_title_color}
                />
        
                {/* SubTitle  */}
        
                <TextComponent
                    TextValue = "Hello, I guees you are new around here. You can start using this application after Signup"
                    TextFamily = "Mukta"
                    TextSize = {16}
                    TextColor = {colorCode.Authentication_subtitle_color}
                    TextStyle = {{marginTop:4}}
                />
        
                {/* Input layout  */}
        
                <ScrollView style = {SignupScreen.InputLayout}>

                    {/* Username input widget  */}

                    <TextInput
                        style = {SignupScreen.InputWidget}
                        allowFontScaling = {false}
                        placeholder = "Username"    
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}
                    />

                    {/* Mobilenumber input widget  */}
                    <TextInput
                        style = {SignupScreen.InputWidget}
                        allowFontScaling = {false}
                        placeholder = "Mobilenumber"    
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}
                    />

                    {/* Password input widget  */}
                    <TextInput
                        style = {SignupScreen.InputWidget}
                        allowFontScaling = {false}
                        placeholder = "Password"    
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}
                    />

                    {/* Re-Password input widget  */}
                    <TextInput
                        style = {SignupScreen.InputWidget}
                        allowFontScaling = {false}
                        placeholder = "Re-enter Password"    
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}
                    />
        
                </ScrollView>
        
            </View>
        )

    }
}

const SignupScreen = new StyleSheet.create({
    
    SignupScreenLayout:{
        ...style.AuthenticationScreen_style
    }, 

    InputLayout: {
       ...style.AuthenticationScreen_inputlayout
    }, 

    InputWidget:{
        backgroundColor: colorCode.Authentication_input_color,
        fontFamily : 'Sans', 
        fontSize : 18, 
        padding: 12, 
        borderRadius: 5, 
        marginBottom: 12
    }
})
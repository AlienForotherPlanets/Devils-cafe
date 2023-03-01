import React, {useState, useEffect} from "react";
import { View, StyleSheet, Image, TextInput, ScrollView, Pressable } from "react-native";

// **** Colorcode and ScreenStyle **** // 
import * as colorCode from '../../Color-code/Color-codes' ; 
import * as style from '../../Style/AuthenticationStyle' ; 

// **** Text and StatusBar component **** // 
import TextComponent from "../../Component/TextComp";
import StatusbarComponent from '../../Component/StatusbarComp' ; 

// **** Import require packages **** // 
import * as Navigationbar from 'expo-navigation-bar' ;
import * as Font from 'expo-font' ;  

export default function Select_address(){
 
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

    if (loadFont){
        return(
            <View style={SelectAddressStyle.SelectAddressLayout}>

                {/* Status bar component  */}

                <StatusbarComponent
                    color={colorCode.Authentication_input_color}
                />

                {/* BackOption and Title Layout  */}

                <View style={SelectAddressStyle.BackOptionLayout}>
                    
                    {/* Back option  */}

                    <Pressable
                        android_ripple={{color:colorCode.Authentication_button_ripper_color}}
                        style = {SelectAddressStyle.BackImageLayout}
                        >
                        
                        <Image
                            style={style.Authentication_BackImage}
                            source={require("../../assets/Images/Back-option.png")}
                        />

                    </Pressable>

                    {/* Title layout  */}

                    <TextComponent
                        TextValue = "User address"
                        TextSize = {21}
                        TextFamily = "Ubuntu"
                        TextColor = {colorCode.Authentication_title_color}
                        TextStyle = {{marginTop: "auto", marginBottom: 'auto', marginLeft: 4}}
                    />

                </View>

                <ScrollView>

                    <View style={SelectAddressStyle.AddressLayout}>
                        <TextComponent
                            TextValue = "Username = Keyur Vaghasiya "
                            TextFamily = "Mukta"
                            TextSize = {16}
                            TextColor = {colorCode.Authentication_title_color}
                            TextStyle = {{textAlign:"left",marginBottom: 3}}
                        />

                        <TextComponent
                            TextValue = "A-201, Shayam anitllia "
                            TextFamily = "Mukta"
                            TextSize = {16}
                            TextColor = {colorCode.Authentication_subtitle_color}
                            TextStyle = {{textAlign:"left"}}
                        />
                        
                        <TextComponent
                            TextValue = "Mota varchha, Mahadev chowk"
                            TextFamily = "Sans"
                            TextSize = {18}
                            TextColor = {colorCode.Authentication_subtitle_color}
                            TextStyle = {{textAlign:"left", marginTop: 6, marginBottom: 6}}
                        />
                        
                        <TextComponent
                            TextValue = "Pincode - 394101"
                            TextFamily = "Sans"
                            TextSize = {18}
                            TextColor = {colorCode.Authentication_subtitle_color}
                            TextStyle = {{textAlign:"left", marginBottom: 6}}
                        />

                        <View style={SelectAddressStyle.DeleteUpdateOption}>

                            <Pressable style={SelectAddressStyle.UpdateAddressOption}
                                android_ripple = {{color: '#d0d0d0'}}>
                                <TextComponent
                                    TextValue = "Update"
                                    TextColor = {colorCode.Authentication_title_color}
                                    TextFamily = "Mukta"
                                    TextSize = {16}
                                    
                                />
                            </Pressable>

                            <Pressable style={[SelectAddressStyle.UpdateAddressOption, 
                                {backgroundColor:'#ff4848', 
                                marginLeft: 10}]}
                                android_ripple = {{color: '#ffa7a7'}}>

                                <TextComponent
                                    TextValue = "Delete"
                                    TextFamily = "Mukta"
                                    TextSize = {16}
                                    TextColor = {'#ffffff'}
                                />

                            </Pressable>

                        </View>
                        

                    </View>
                </ScrollView>

            </View>
        )
    }
}

const SelectAddressStyle = new StyleSheet.create({
    SelectAddressLayout:{
        ...style.AuthenticationScreen_style, 
        backgroundColor: colorCode.Authentication_input_color
    }, 

    BackOptionLayout:{
        ...style.Authentication_BackLayout
    }, 

    BackImageLayout : {
        ...style.Authentication_BackImage_layout
    }, 

    AddressLayout:{
        marginLeft:"auto", 
        marginRight: 'auto',
        marginTop: 8, 
        marginBottom: 8 , 

        paddingTop: 8, 
        paddingBottom: 8 , 
        paddingLeft: 15, 
        paddingRight: 15, 
        
        width: '100%', 
        backgroundColor: '#ffffff', 
        borderRadius: 5
    }, 

    DeleteUpdateOption:{
        display: 'flex', 
        flexDirection: 'row', 
        marginTop: 10
    }, 

    UpdateAddressOption:{
        backgroundColor: colorCode.Authentication_input_color, 
        paddingTop: 5, 
        paddingBottom: 8, 
        paddingLeft: 13, 
        paddingRight: 13, 
        borderRadius: 5

    }
})
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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function User_information({navigation}){

    // ---- Set NavigationBar color ---- // 

    Navigationbar.setBackgroundColorAsync('#ffffff') ; 

    // ---- Load Font ---- // 

    const [loadFont, setLoadFont] = useState(false) ; 

    const [username, setUsername] = useState('') ; 

    const [mobileNumber, setMobile_number] = useState('') ; 

    useEffect(() => {

        const LoadFont = async () => {

            let Username = await AsyncStorage.getItem("Username") ; 

            let Mobilenumber = await AsyncStorage.getItem("Mobilenumber") ; 

            setUsername(Username)  ; 

            setMobile_number(Mobilenumber) ; 
        
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
            <View style={UserInformationStyle.UserInformationLayout}>

                {/* Status bar component  */}
                <StatusbarComponent
                    color = {colorCode.Authentication_button_color}
                />

                {/* ===== Back option layout =====  */}

                <View style={UserInformationStyle.BackOptionLayout}>
                    
                    {/* Back option  */}

                    <Pressable
                        android_ripple={{color:colorCode.Authentication_button_ripper_color}}
                        style = {UserInformationStyle.BackImageLayout}
                        onPress = {() => navigation.goBack()}>
                        
                        <Image
                            style={style.Authentication_BackImage}
                            source={require("../../assets/Images/Other_back.png")}
                        />

                    </Pressable>

                    {/* Title layout  */}

                    <TextComponent
                        TextValue = "User details"
                        TextSize = {20}
                        TextFamily = "Ubuntu"
                        TextColor = {'#ffffff'}
                        TextStyle = {{marginTop: "auto", marginBottom: 'auto', marginLeft: 4}}
                    />

                </View>

                {/* ======= Username and Userimage layout =======  */}

                <View style={UserInformationStyle.UserImage_name_layout}>

                    <View style={UserInformationStyle.User_image_layout}>

                        <Image
                            style = {UserInformationStyle.UserImage}
                            source={require('../../assets/Bottom-navigator/Disable-user.png')}
                        />

                    </View>

                    <View>

                        {/* Username information  */}

                        <TextComponent
                            TextValue = {username}
                            TextFamily = "Ubuntu"
                            TextColor = {colorCode.Authentication_title_color}
                            TextSize = {20}
                            TextStyle = {{marginTop:20, marginBottom:"auto", marginLeft: 15}}
                        />

                        {/* Mobilenumber information  */}
                        
                        <TextComponent
                            TextValue = {"Contact - +91-"+ mobileNumber}
                            TextFamily = "Ubuntu"
                            TextColor = {colorCode.Authentication_subtitle_color}
                            TextSize = {17}
                            TextStyle = {{marginTop:10, marginBottom:"auto", marginLeft: 15}}
                        />

                    </View>


                </View>


                {/* ===== Purchased order option =====  */}

                <Pressable style={UserInformationStyle.UserOptionLayout}
                    onPress = {() => navigation.navigate("Orderlist")}>

                    <Image
                        style ={UserInformationStyle.UserOptionImage}
                        source = {require('../../assets/Images/Order.png')}/>

                    <TextComponent
                        TextValue = "Purchased order"
                        TextFamily = "Mukta"
                        TextSize = {16}
                        TextColor = {colorCode.Authentication_title_color}
                        TextStyle = {{marginLeft: 15, marginTop:"auto", marginBottom:"auto"}}
                    />
                </Pressable>

                {/* ===== Completed order option =====  */}

                <Pressable style={UserInformationStyle.UserOptionLayout}
                    onPress = {() => navigation.navigate("Orderlist")}>

                    <Image
                        style ={[UserInformationStyle.UserOptionImage, {height: 30, width: 30, marginLeft:5}]}
                        source = {require('../../assets/Images/Complete-order.png')}/>

                    <TextComponent
                        TextValue = "Completed order"
                        TextFamily = "Mukta"
                        TextSize = {16}
                        TextColor = {colorCode.Authentication_title_color}
                        TextStyle = {{marginLeft: 15, marginTop:"auto", marginBottom:"auto"}}
                    />
                </Pressable>
                
                {/* ===== Custom cake order option =====  */}

                <Pressable style={UserInformationStyle.UserOptionLayout}
                    onPress = {() => navigation.navigate("Orderlist")}>

                    <Image
                        style ={[UserInformationStyle.UserOptionImage, {height: 30, width: 30}]}
                        source = {require('../../assets/Images/Custom-cake.png')}/>

                    <TextComponent
                        TextValue = "Custom cake order"
                        TextFamily = "Mukta"
                        TextSize = {16}
                        TextColor = {colorCode.Authentication_title_color}
                        TextStyle = {{marginLeft: 15, marginTop:"auto", marginBottom:"auto"}}
                    />
                </Pressable>

                {/* ===== Update mobile number option =====  */}

                <Pressable style={UserInformationStyle.UserOptionLayout}>

                    <Image
                        style ={UserInformationStyle.UserOptionImage}
                        source = {require('../../assets/Images/Mobile.png')}/>

                    <TextComponent
                        TextValue = "Upload mobile number"
                        TextFamily = "Mukta"
                        TextSize = {16}
                        TextColor = {colorCode.Authentication_title_color}
                        TextStyle = {{marginLeft: 15, marginTop:"auto", marginBottom:"auto"}}
                    />
                </Pressable>

                {/* ===== Privacy and Policy option =====  */}

                <Pressable style={UserInformationStyle.UserOptionLayout}>

                    <Image
                        style ={UserInformationStyle.UserOptionImage}
                        source = {require('../../assets/Images/Policy.png')}/>

                    <TextComponent
                        TextValue = "Privacy & Policy"
                        TextFamily = "Mukta"
                        TextSize = {16}
                        TextColor = {colorCode.Authentication_title_color}
                        TextStyle = {{marginLeft: 15, marginTop:"auto", marginBottom:"auto"}}
                    />
                </Pressable>


                {/* ====== About use option ======  */}

                <Pressable style={[UserInformationStyle.UserOptionLayout, {borderBottomWidth:0}]}>

                    <Image
                        style ={[UserInformationStyle.UserOptionImage]}
                        source = {require('../../assets/Images/About.png')}/>

                    <TextComponent
                        TextValue = "About us"
                        TextFamily = "Mukta"
                        TextSize = {16}
                        TextColor = {colorCode.Authentication_title_color}
                        TextStyle = {{marginLeft: 15, marginTop:"auto", marginBottom:"auto"}}
                    />
                </Pressable>

            </View>
        )
    }

}

const UserInformationStyle = new StyleSheet.create({
    UserInformationLayout:{
        ...style.AuthenticationScreen_style,
        backgroundColor: colorCode.HomeScreen_bg_color, 
        paddingTop: 0,
        paddingLeft: 0, 
        paddingRight: 0 
    }, 

    BackOptionLayout: {
        ...style.Authentication_BackLayout, 
        backgroundColor: colorCode.Authentication_button_color
    },

    BackImageLayout : {
        ...style.Authentication_BackImage_layout
    }, 

    UserImage_name_layout:{
        display: 'flex', 
        flexDirection: 'row', 
        marginTop: 20, 
        borderBottomColor: '#b7b7b7', 
        borderBottomWidth: 1, 
        paddingBottom: 20, 
        width: '90%', 
        marginLeft: "auto", 
        marginRight:"auto"
    }, 

    User_image_layout:{
        backgroundColor: '#ffffff', 
        padding: 20, 
        elevation: 10, 
        shadowColor: '#9e9e9e'
    }, 

    UserImage:{
        height: 70, 
        width: 70, 
    }, 

    UserOptionLayout:{
        display: 'flex', 
        flexDirection: 'row', 
        paddingTop: 10, 
        paddingBottom: 10, 
        borderBottomColor: '#e4e4e4', 
        borderBottomWidth: 1, 
        width:"90%", 
        marginLeft:"auto", 
        marginRight:"auto"
    }, 

    UserOptionImage:{
        height: 35 ,
        width: 35
    }
})
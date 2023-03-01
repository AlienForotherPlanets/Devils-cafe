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
import * as URL from '../../URL/RequestURL' ; 
import { FlatListSlider } from "react-native-flatlist-slider";

// **** Import Slider **** // 
import HomePreview from "../Slider/LatestProductSlider";

export default function LatestPorudct({navigation, route}){

    // ---- Set NavigationBar color ---- //

    Navigationbar.setBackgroundColorAsync("#ffffff");

    // ---- Load Font ---- //

    const [loadFont, setLoadFont] = useState(false);

    const [status_image, set_status_image] = useState([]) ; 

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

        const Fetch_status_images = async () => {

            // ---- Banner image fetch request ---- // 

            let Request_url = URL.Authentication_request_url ; 
                
            let Request_data = {
                "Check_status": "Fetch-status"
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

            if (Response_status == "Fetch"){

                set_status_image([...Response.Banner]) ; 
            }

        }

        Fetch_status_images() ; 

    }, []);
 
    if (loadFont){
        return (
          <View style={LatestProductScreen.LatestProductScreen}>
            
            {/* Statusbar  */}

            <StatusbarComponent
              color={colorCode.Authentication_button_color}
            ></StatusbarComponent>
            
            {/* BackOption and Title Layout  */}

            <View style={LatestProductScreen.BackOptionLayout}>
                
                {/* Back option  */}

                <Pressable
                    android_ripple={{color:colorCode.Authentication_button_ripper_color}}
                    style = {LatestProductScreen.BackImageLayout}
                    onPress = {() => navigation.goBack()}>
                    
                    <Image
                        style={style.Authentication_BackImage}
                        source={require("../../assets/Images/Other_back.png")}
                    />

                </Pressable>

                {/* Title layout  */}

                <TextComponent
                    TextValue = "Latest cakes"
                    TextSize = {20}
                    TextFamily = "Ubuntu"
                    TextColor = {"#ffffff"}
                    TextStyle = {{marginTop: "auto", marginBottom: 'auto', marginLeft: 4}}
                />

            </View>

            {status_image.length > 0?<>
            
                <View style={LatestProductScreen.BannerImageLayout}>
                    <FlatListSlider
                        data = {status_image}
                        component = {<HomePreview/>}
                        autoscroll = {false}
                    />
                </View>

            </>:<></>}

           
          </View>
        );
    }
}

const LatestProductScreen = new StyleSheet.create({
    LatestProductScreen: {
        ...style.AuthenticationScreen_style, 
        paddingTop: 0 ,
        paddingLeft:0, 
        paddingRight: 0 
    }, 
    
    BackOptionLayout:{
        ...style.Authentication_BackLayout, 
        backgroundColor: colorCode.Authentication_button_color
    }, 

    BackImageLayout : {
        ...style.Authentication_BackImage_layout
    }, 

    ButtonLayout: {
        ...style.Authentication_button
    }, 

    BannerImageLayout:{
        marginTop: '5%'
    }

})
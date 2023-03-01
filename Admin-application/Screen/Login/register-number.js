import React, {useState, useEffect} from "react";
import { View, StyleSheet, ScrollView, TextInput, Pressable, ActivityIndicator, ToastAndroid, Image } from "react-native";

// **** Colorcode and ScreenStyle **** // 
import * as colorCode from '../../Color-code/Color-codes' ;
import * as style from '../../Style/AuthenticationStyle' ; 

// **** Text and StatusBar component **** // 
import TextComponent from "../../Component/TextComp";
import StatusbarComponent from '../../Component/StatusbarComp' ; 

// **** Import require packages **** // 
import * as Navigationbar from 'expo-navigation-bar' ;
import * as Font from 'expo-font' ;  

// **** Import URL **** // 
import * as URL from '../../URL/RequestURL' ; 
import { SkypeIndicator } from "react-native-indicators";

export default function RegisterNumber({navigation}){

    // ---- Set NavigationBar color ---- //
    
    Navigationbar.setBackgroundColorAsync("#ffffff");

    // ---- Load Font ---- //

    const [loadFont, setLoadFont] = useState(false);

    const [contact_layout, set_contact_layout] = useState(false) ; 

    const [contact_number, set_contact_number] = useState([]) ; 

    const [reload_count, setReload_count] = useState(0) ; 

    useEffect(() => {

        // ===== Function --- Load font  ====== // 

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


        // ====== Function ==== Load register number ====== //

        const Load_number = async () => {

            set_contact_layout(false) ; 

            try{

                // **** Request for admin register number list **** // 

                let Request_url = URL.Authentication_url ; 
                        
                let Request_data = {
                    "Check_status": "Admin-mobile-number-list", 
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

                    set_contact_number([...Response.Data]) ; 

                    set_contact_layout(true) ; 
                }

            }catch{

                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
        }

        Load_number() ; 


    }, [reload_count]);

    const Delete_mobile_number_option = async (number) => {

        set_contact_layout(false) ; 
     
        try{

            // **** Request for delete admin mobile number **** // 

            let Request_url = URL.Authentication_url ; 
                        
            let Request_data = {
                "Check_status": "Admin-delete-mobile-number", 
                "Number": number
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

            if (Response_status == "Delete"){

                set_contact_layout(true) ; 

                ToastAndroid.show("Delete contact successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

                setReload_count(reload_count + 1) ; 
            }

        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }

    if (loadFont){

        return(
            <View style={RegisterNumberStyle.ResgiterNumberLayout}>

                {/* StatusBar component  */}
                <StatusbarComponent
                    color= {colorCode.Authentication_input_color}
                ></StatusbarComponent>

                {/* Title  */}

                <TextComponent
                    TextValue = "📝 Register number"
                    TextFamily = "Ubuntu"
                    TextSize = {21}
                    TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop:10}}
                />

                {contact_layout?<>
                
                    <ScrollView>

                        {contact_number.map((element, index) => {
                            return(

                                <View style={RegisterNumberStyle.NumberInformationLayout}
                                    key={index}>

                                    <Pressable
                                        onPress={() => Delete_mobile_number_option(element.admin_data)}>

                                        <Image
                                            style = {RegisterNumberStyle.DeleteOptionImage}
                                            source = {require('../../assets/Images/Delete.png')}
                                        />

                                    </Pressable>

                                    <TextComponent
                                        TextValue = {element.admin_data}
                                        TextFamily = "Mukta"
                                        TextSize = {17}
                                        TextColor = {colorCode.Authentication_subtitle_color}
                                        TextStyle = {{marginTop:"auto", marginBottom:"auto", marginLeft: 10}}
                                    />

                                </View>
                            )
                        })}


                    </ScrollView>

                </>:<>

                    <SkypeIndicator></SkypeIndicator>  

                </>}


            </View>
        )
    }
}

const RegisterNumberStyle = new StyleSheet.create({
    ResgiterNumberLayout:{
        ...style.AuthenticationScreen_style, 
        backgroundColor: colorCode.Authentication_input_color
    }, 

    NumberInformationLayout:{
        display: 'flex', 
        flexDirection: 'row', 
        backgroundColor: '#ffffff',
        
        padding: 10, 
        marginTop: 15, 

        borderRadius: 5
    }, 

    DeleteOptionImage:{
        height: 35, 
        width: 35
    }
})
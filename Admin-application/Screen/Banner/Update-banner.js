import React, {useState, useEffect} from 'react' ; 
import { View, StyleSheet, ScrollView, Image, Pressable, Alert, ToastAndroid } from "react-native";

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
import { useIsFocused } from "@react-navigation/native";
import { SkypeIndicator } from 'react-native-indicators';

export default function UpdateBanner({navigation}){

    // ---- Set NavigationBar color ---- //
    
    Navigationbar.setBackgroundColorAsync('#ffffff');

    const isScreenFocus = useIsFocused() ; 

    // ---- Load Font ---- //

    const [loadFont, setLoadFont] = useState(false);

    const [Banner_data, setBanner_data] = useState([]) ; 

    const [Banner_data_layout, setBanner_data_layout] = useState(false) ; 

    useEffect(() => {

        // ====== Function 1 ---- Load font ======= // 

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
        
        // ===== Function 2  ---- Load Banner ======= // 

        const Load_banner_image = async () => {

            setBanner_data_layout(false) ; 

            // ---- Password check request handler ---- // 
                                    
            let Request_url = URL.Authentication_url ; 
                                    
            let Request_data = {
                "Check_status": "Fetch-banner"
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

                setBanner_data([...Response.Banner]) ; 

                setBanner_data_layout(true) ; 

            }

        }

        Load_banner_image() ; 

        if (isScreenFocus == true){

            Load_banner_image() ; 

        }

    }, [isScreenFocus]);

    // ===== Function Delete Poster Handler ==== // 

    const Delete_poster_request = async (element) => {

        // ---- Delete password request handler ---- // 
                                
        let Request_url = URL.Authentication_url ; 
                                
        let Request_data = {
            "Check_status": "Delete-banner", 
            "Banner_id": element.Banner_id
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

            ToastAndroid.show("Delete banner image successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

            navigation.goBack() ; 
        }

    }

    const Delete_poster_handler = (element) => {

        Alert.alert("Delete banner image", 
            'Are you sure you want to delete this banner image ?',
            [ 
                {
                    text: "Yes", 
                    onPress: () => Delete_poster_request(element)
                }, 
                {
                    text: "No"
                }
            ]
        )
    }


    if (loadFont){

        return(
            <View style={UpdateBannerScreen.UpdateBannerLayout}>

                {/* Statusbar component  */}
                <StatusbarComponent
                    color = {colorCode.Authentication_input_color}
                />
                
                {/* Title component  */}

                <TextComponent
                    TextValue="Update Banner 🖼️" 
                    TextFamily = "Ubuntu"
                    TextSize = {22}
                    TextColor = {colorCode.Authentication_title_color}
                    TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop: 10}}
                />

                {/* Information  */}

                <TextComponent
                    TextValue = "Maximum limit upto 4"
                    TextFamily = "Sans"
                    TextColor = {colorCode.Authentication_subtitle_color}
                    TextSize = {18}
                    TextStyle = {{marginTop: 10, marginLeft: 15}}
                />

                <TextComponent
                    TextValue = "Upto 1 poster must be required"
                    TextFamily = "Sans"
                    TextColor = {colorCode.Authentication_subtitle_color}
                    TextSize = {18}
                    TextStyle = {{marginTop: 5, marginBottom: 10, marginLeft: 15}}
                />

                {Banner_data_layout?
                
                    <ScrollView>

                        {Banner_data.map((element, index) => {
                            return(
                                <View style = {UpdateBannerScreen.BannerLayout}
                                    key = {index}>

                                    {/* Banner title  */}

                                    <TextComponent
                                        TextValue = {"Banner " + (index + 1)}
                                        TextFamily = "Sans"
                                        TextColor = "#555555"
                                        TextSize = {19}
                                    />

                                    {/* Banner Image  */}

                                    <Image
                                        style = {UpdateBannerScreen.BannerImage}
                                        source={{uri:element.Banner_image}}
                                    />

                                    {/* Update and Delete option  */}

                                    <View style={UpdateBannerScreen.UpdateDeleteLayout}>
                                        
                                        {/* Update option  */}

                                        <Pressable
                                            style = {UpdateBannerScreen.UpdateButton}
                                            android_ripple = {{color:colorCode.Update_button_ripper_color}}
                                            onPress = {() => navigation.navigate("InsertUpdate_banner", {"Option":"Update", "Data":element})}>
                                            
                                            <TextComponent
                                                TextValue = "Update"
                                                TextFamily = "Ubuntu"
                                                TextSize = {17}
                                                TextColor = "white"
                                            />
                                        
                                        </Pressable>
                                        
                                        {/* Delete option  */}

                                        <Pressable
                                            style = {UpdateBannerScreen.DeleteButton}
                                            android_ripple = {{color:colorCode.Delete_button_ripple_color}}
                                            onPress = {() => Delete_poster_handler(element)}>
                                            
                                            <TextComponent
                                                TextValue = "Delete"
                                                TextFamily = "Ubuntu"
                                                TextSize = {17}
                                                TextColor = "white"
                                            />

                                        </Pressable>

                                    </View>

                                </View>
                            )
                        })}

                    </ScrollView>
                : 
                    <SkypeIndicator/>
                }

                {/* ===== Show Insert banner option =====  */}

                {Banner_data.length < 4?<>
                
                    <Pressable style={style.Authentication_button}
                        android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                        onPress = {() => navigation.navigate("InsertUpdate_banner", {"Option": "Insert"})}>

                        <TextComponent
                            TextValue = "Insert banner"
                            TextFamily = "Ubuntu"
                            TextSize = {19}
                            TextColor = {colorCode.Authentication_button_textColor}
                        />

                    </Pressable>
                </>:<></>}

            </View>
        )
    }
}

const UpdateBannerScreen = new StyleSheet.create({
    UpdateBannerLayout:{
        ...style.AuthenticationScreen_style, 
        backgroundColor: colorCode.Authentication_input_color, 
        paddingLeft: '1%', 
        paddingRight: '1%'
    }, 

    BannerLayout:{
        width: '97%', 
        backgroundColor: '#ffffff', 
        paddingLeft: 8 ,
        paddingRight:8, 
        paddingTop: 10, 
        paddingBottom: 10, 
        marginLeft: 'auto', 
        marginRight: 'auto', 
        marginTop: 12, 
        marginBottom: 12 , 
        borderRadius: 5
    }, 

    BannerImage: {
        width: '98%', 
        height: 160, 
        marginLeft: 'auto', 
        marginRight: 'auto', 
        marginTop: 8
    }, 

    UpdateDeleteLayout:{
        display: 'flex', 
        alignItems: 'center', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginTop: 13, 
    }, 

    UpdateButton:{
        backgroundColor: colorCode.Update_button_color, 
        paddingLeft: 20, 
        paddingRight: 20, 
        paddingTop: 7, 
        paddingBottom: 7, 
        borderRadius: 5, 
        marginRight: 10
    }, 

    DeleteButton: {
        backgroundColor: colorCode.Delete_button_color, 
        paddingLeft: 20, 
        paddingRight: 20, 
        paddingTop: 7, 
        paddingBottom: 7, 
        borderRadius: 5, 
        marginLeft: 10
    }
})
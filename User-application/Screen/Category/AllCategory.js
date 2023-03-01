import React, {useState, useEffect} from "react";
import { View, StyleSheet, TextInput, ScrollView, 
    Pressable, ActivityIndicator, Image, ToastAndroid} from "react-native";
import {Dimensions} from 'react-native';

// **** Colorcode and ScreenStyle **** // 
import * as colorCode from '../../Color-code/Color-codes' ; 
import * as style from '../../Style/AuthenticationStyle' ; 

// **** Text and StatusBar component **** // 
import TextComponent from "../../Component/TextComp";
import StatusbarComponent from '../../Component/StatusbarComp' ; 

// **** Import require packages **** // 
import * as Navigationbar from 'expo-navigation-bar' ;
import * as Font from 'expo-font' ;  

// **** Import Request url ***** // 
import * as URL from '../../URL/RequestURL' ; 
import { SkypeIndicator } from "react-native-indicators";

export default function AllCategory({navigation}){

    // ---- Set NavigationBar color ---- // 

    Navigationbar.setBackgroundColorAsync('#ffffff') ; 

    // --- Cake option image width --- // 

    const CakeOption_imageWidth =  (Dimensions.get('window').width*0.45) ; 

    // ---- Load Font ---- // 

    const [loadFont, setLoadFont] = useState(false) ; 

    const [category_list, setCategory_list] = useState([]) ; 

    const [Loading_layout, setLoading_layout] = useState(false) ; 
 
    useEffect(() => {

        // ======= Function1 -- Load Font ======= // 

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

        // ======= Function2 -- Fetch catgory data ======== // 

        const Fetch_all_category = async () => {

            // **** Fetch all category request **** // 

            setLoading_layout(true) ; 

            let Request_url = URL.Authentication_request_url ; 
                
            let Request_data = {
                "Check_status": "Fetch-category"
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

                setCategory_list([...Response.Category]) ; 

                setLoading_layout(false) ; 

            }

        }

        Fetch_all_category() ; 

    }, []) ; 

    if (loadFont){
        return(
            <View style={AllCategoryStyle.AllCategoryLayout}>

                {/* Statubar component  */}
                <StatusbarComponent
                    color = {colorCode.Authentication_button_color}
                />

                {/* BackOption and Title Layout  */}
    
                <View style={AllCategoryStyle.BackOptionLayout}>
                    
                    {/* Back option  */}
    
                    <Pressable
                        android_ripple={{color:colorCode.Authentication_button_ripper_color}}
                        style = {AllCategoryStyle.BackImageLayout}
                        onPress = {() => navigation.goBack()}>
                        
                        <Image
                            style={style.Authentication_BackImage}
                            source={require("../../assets/Images/Other_back.png")}
                        />
    
                    </Pressable>
    
                    {/* Title layout  */}
    
                    <TextComponent
                        TextValue = "Category"
                        TextSize = {20}
                        TextFamily = "Ubuntu"
                        TextColor = {"#ffffff"}
                        TextStyle = {{marginTop: "auto", marginBottom: 'auto', marginLeft: 4}}
                    />
    
                </View>

                {Loading_layout?<>
                    <SkypeIndicator></SkypeIndicator>
                </>:<>
                
                    <ScrollView>

                        <View style={AllCategoryStyle.YummycakeOptionLayout}>

                            {category_list.map((element, index) => {
                                return(

                                    <Pressable style={[AllCategoryStyle.CakeOptionMainLayout]}
                                        key={index}
                                        onPress = {() => navigation.navigate("CategoryProduct", {"Category_data":element})}>
                                        
                                        {/* ---- Category image ----  */}

                                        <Image
                                            
                                            style = {[AllCategoryStyle.CakeOptionImage, {width:CakeOption_imageWidth}]}
                                            source={{uri:element.Category_image}}
                                        />

                                        {/* ---- Category information ----  */}

                                        <View style={AllCategoryStyle.CakeOptionTextLayout}>

                                            <TextComponent
                                                TextValue = {element.Category_name}
                                                TextFamily = "Mukta"
                                                TextColor = {colorCode.Cake_option_text_title_color}
                                                TextSize = {15}
                                            />

                                            <TextComponent

                                                TextValue = {element.Category_description}
                                                TextFamily = "Sans"
                                                TextColor = {colorCode.Cake_option_price_text_color}
                                                TextSize = {16}
                                                TextStyle = {{marginTop: 5}}
                                            />

                                        </View>
                                    </Pressable>
                                
                                )
                            })}

                        </View>
                    </ScrollView>

                </>}

                    
            </View>
        )
    }
}

const AllCategoryStyle = new StyleSheet.create({
    AllCategoryLayout:{
        height: '100%', 
        width:'100%'
    }, 

    YummycakeOptionLayout:{
        display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        marginTop: 15, 
        marginLeft: 'auto', 
        marginRight: 'auto',
        marginBottom: 130,  
        width: '100%'
    }, 

    CakeOptionMainLayout:{
        elevation: 10 , 
        shadowColor: '#656565', 
        marginLeft: '3.3%', 
        marginBottom: '3%'
    }, 

    CakeOptionImage:{
        height: 170,
        resizeMode: 'contain', 
        borderTopLeftRadius: 5, 
        borderTopRightRadius: 5
    }, 

    CakeOptionTextLayout:{
        backgroundColor: '#ffffff', 
        borderBottomLeftRadius: 5, 
        borderBottomRightRadius: 5, 
        paddingTop: 5, 
        paddingLeft: 5, 
        paddingRight: 5, 
        paddingBottom: 8, 
    }, 

    BackOptionLayout:{
        ...style.Authentication_BackLayout , 
        backgroundColor: colorCode.Authentication_button_color
    }, 

    BackImageLayout : {
        ...style.Authentication_BackImage_layout
    }

})
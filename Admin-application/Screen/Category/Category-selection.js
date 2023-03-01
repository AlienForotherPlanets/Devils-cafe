import React, {useState, useEffect} from "react";
import { View, StyleSheet, ScrollView, Pressable, Image, Dimensions, Alert, ToastAndroid } from "react-native";

// **** Import colorCode file **** //
import * as colorCode from '../../Color-code/Color-codes'; 
import * as style from '../../Style/AuthenticationStyle' ; 

// **** Import Text and Statusbar Component **** // 
import TextComponent from '../../Component/TextComp' ; 
import StatusbarComponent from '../../Component/StatusbarComp' ; 

// **** Import Font and Navigationbar libarary **** // 
import * as Font from 'expo-font'; 
import * as Navigationbar from 'expo-navigation-bar' ;
import { useIsFocused } from "@react-navigation/native";
import * as URL from '../../URL/RequestURL' ; 
import * as Device from 'expo-device';
import { SkypeIndicator } from "react-native-indicators";

export default function CategorySelection({navigation, route}){

    const {SelectOption} = route.params ; 

    // ---- Set NavigationBar color ---- //
    
    Navigationbar.setBackgroundColorAsync("#ffffff");

    // == Screen Focus attributes 

    const isScreenFocus = useIsFocused() ; 

    // ---- Load Font ---- //

    const [loadFont, setLoadFont] = useState(false);

    const [categoryList, setCategoryList] = useState([]) ; 
    
    const [categoryList_layout, setCategoryList_layout] = useState(false) ; 

    useEffect(() => {

        // ===== Function --- load font ====== // 

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

        // ====== Function ---- Load category list function ====== // 

        const Load_category_list = async () => {

            // **** Fetch category list request **** // 

            let Request_url = URL.Authentication_url ; 
                    
            let Request_data = {
                "Check_status": "Category-list"
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

                setCategoryList([...Response.Data]) ; 

                setCategoryList_layout(true) ; 
            }

        }

        Load_category_list() ; 

        if (isScreenFocus == true){
            Load_category_list() ; 

        }

    }, [isScreenFocus]);

    // ==== Delete category request handler ==== // 

    const Delete_category_handler = async (element) => {
        
        try {
            
            // ---- Delete category request ---- //

            let Request_url = URL.Authentication_url ; 
                            
            let Request_data = {
                "Check_status": "Delete-category",
                "Delete_category_id": element.Category_data, 
                "Delete_category_name": element.Category_name, 
                "Device_id": Device.osBuildId, 
                "Device_name":Device.deviceName
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

                ToastAndroid.show("Delete category successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

                navigation.goBack() ; 

            }else{
                
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
        } catch {
            
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }

    // ==== Select category pres handler ==== // 

    const Selection_option_handler = (element) => {

        if (SelectOption == "Update"){

            navigation.navigate("UpdateCategory", {"data":element}) ; 

        }else if (SelectOption == "Delete"){

            Alert.alert("Delete category", 
                'Are you sure you want to delete this ' + element.Category_name + ' category ? ',
                [ 
                    {
                        text: "Yes", 
                        onPress: () => Delete_category_handler(element)
                    }, 
                    {
                        text: "No"
                    }
                ]
            )
        }else if (SelectOption == "Upload Product"){

            navigation.navigate("UploadProduct", {"data":element}) ; 

        }else if (SelectOption == "Update product"){

            navigation.navigate("SelectProduct", {"data":element}) ; 

        }else if (SelectOption == "Delete product"){

            navigation.navigate("SelectProduct", {"data":element}) ; 

        }
    }
    
    if (loadFont){

        return(
            <View style={CategorySelection_style.Category_selection_screeen}>
    
                {/* Statusbar component  */}
                
                <StatusbarComponent
                    color = {colorCode.Authentication_statusBar_color}
                />
    
                {/* Title  */}
    
                <TextComponent
                    TextValue = {"👆 Select category for " + SelectOption}
                    TextFamily = "Ubuntu"
                    TextSize = {20}
                    TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop:10}}
                />

                {categoryList_layout?
                
                    <ScrollView showsVerticalScrollIndicator = {false} style={{marginTop: 10}} >

                        {categoryList.map((element, index) => {
                            return(
                                
                                // Category option layout 

                                <Pressable style={[CategorySelection_style.Category_selection_option_layout, 
                                    {marginTop: index == 0?15:5}]}
                                    android_ripple = {{color:  "#dedede"}}
                                    onPress = {() => Selection_option_handler(element)}
                                    key = {index}>
                                    
                                    {/* Category image  */}

                                    <Image
                                        style = {CategorySelection_style.Category_selection_image}
                                        source={{uri:element.Category_image}}
                                    />
                
                                    {/* Category title  */}

                                    <TextComponent
                                        TextValue = {element.Category_name}
                                        TextFamily = "Mukta"
                                        TextColor = '#484848'
                                        TextSize = {18}
                                        TextStyle = {{marginTop: "auto", marginBottom:"auto", marginLeft: 10}}
                                    />
                                </Pressable>
                            )
                        })}
        
        
                    
                    </ScrollView>
                :
                    <SkypeIndicator/>       
                }
            
            </View>
        )
    
    }
}

const CategorySelection_style = new StyleSheet.create({
    Category_selection_screeen:{
        ...style.AuthenticationScreen_style
    }, 

    Category_selection_option_layout:{
        backgroundColor: colorCode.Authentication_input_color, 
        marginBottom: 5, 
        borderRadius: 5, 
        paddingLeft: 10, 
        paddingRight: 10, 
        paddingTop: 8, 
        paddingBottom: 8, 
        display: 'flex', 
        flexDirection: 'row'
    }, 

    Category_selection_image:{
        height: 60,
        width: 60, 
        borderRadius: 5
    }, 

})
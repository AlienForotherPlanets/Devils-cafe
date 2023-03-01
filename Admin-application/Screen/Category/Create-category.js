import { View, StyleSheet, StatusBar, Text, TextInput, Pressable, 
Image, ActivityIndicator, ToastAndroid, PermissionsAndroid } from "react-native";
import React, { useState, useEffect } from "react";

// **** Import colorCode file **** //
import * as colorCode from '../../Color-code/Color-codes'; 
import * as style from '../../Style/AuthenticationStyle' ; 

// **** Import Text and Statusbar Component **** // 
import TextComponent from '../../Component/TextComp' ; 
import StatusbarComponent from '../../Component/StatusbarComp' ; 

// **** Import Font and Image Picker libarary **** // 
import * as Font from 'expo-font'; 
import * as ImagePicker from 'expo-image-picker'; 
import * as Navigationbar from 'expo-navigation-bar' ;

// **** Import URL **** // 
import * as URL from '../../URL/RequestURL' ; 

export default function CreateCategory({navigation}){

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

    // ---- Image file data ---- // 

    const [imageFile, setImageFile] = useState('') ; 
    const [imageFileData, setImageFileData] = useState() ; 
 
    // ===== Function --- Category image selector ===== // 

    const CategoryImage_selector = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 0.6
        });
        
        if ( 'uri' in result.assets[0]){      

            setImageFile(result.assets[0].uri) ;

            let TempData = {
  
                uri: result.assets[0].uri,
                type: `test/${result.assets[0].uri.split(".")[1]}`, 
                name: `test.${result.assets[0].uri.split(".")[1]}`,
            };
              
            setImageFileData(TempData) ; 
        }
    }

    // ---- Focus Handler ---- // 

    const [categoryBorder, setCategoryBorder] = useState(false) ; 
    const [categoryInformationBorder, setCategoryInformationBorder] = useState(false) ; 

    const FocusHandler = (x) => {

        setCategoryBorder(false) ; 
        setCategoryInformationBorder(false) ; 

        if (x == 0 ){

            setCategoryBorder(true) ; 
        }else{

            setCategoryInformationBorder(true) ; 
        }
    }
    
    // ---- Input widget value ---- // 

    const [categoryName, setCategoryName] = useState('') ; 
    const [categoryInformation, setCategoryInformation] = useState('') ;
    
    // ===== Function -- Create category request ===== //

    const Create_category_handler = async () => {

        setIndicatorValue(true) ; 

        if (categoryName == ""){

            ToastAndroid.show("Enter Category name ", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (categoryInformation == ""){

            ToastAndroid.show("Enter Category Information", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ;
        }else if (imageFile == ""){

            ToastAndroid.show("Please, Select Category image", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else{

            try {
                
                // ===== Upload image to Cloudinary ===== // 

                const ImageData = new FormData() ; 
                ImageData.append('file', imageFileData); 
                ImageData.append('upload_preset', 'Devilcafe'); 
                ImageData.append('cloud_name', 'dsc8egt36'); 
                
                let Upload_image = await fetch('https://api.cloudinary.com/v1_1/dsc8egt36/image/upload', {
                    method : 'post',
                    headers:{
                        'Content-Type': 'multipart/form-data' 
                    }, 
                    body   : ImageData
                }); 

                let Upload_image_response = await Upload_image.json() ; 
                let Upload_image_url = Upload_image_response.url ; 

                ToastAndroid.show("Upload image successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

                // ===== Create category request ==== // 

                let Request_url = URL.Authentication_url ; 
                        
                let Request_data = {
                    "Check_status": "Create-category", 
                    "Category_name": categoryName, 
                    "Category_image": Upload_image_url, 
                    "Category_primary": "0", 
                    "Category_information": categoryInformation
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

                if (Response_status == "Already create this category"){
                
                    ToastAndroid.show(Response_status, ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                }else if (Response_status == "Create category"){

                    ToastAndroid.show("Create category successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

                    navigation.goBack() ; 
                }else{

                    ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                }

            } catch (error) {
                
                ToastAndroid.show("Failed to upload image", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }

        }

        setIndicatorValue(false) ; 
    }

    if (loadFont){

        return(
            <View style={CreateCategoryStyle.CreateCatgeoryLayout}>

                {/* Statusbar component  */}
                
                <StatusbarComponent
                    color = {colorCode.Authentication_statusBar_color}
                />

                {/* Title  */}

                <TextComponent
                    TextValue = "➕ Create category"
                    TextFamily = "Ubuntu"
                    TextSize = {21}
                    TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop:10}}
                />

                {/* Input layout  */}

                <View style={CreateCategoryStyle.InputLayout}>

                    {/* Category name input  */}

                    <TextInput
                        style = {[CreateCategoryStyle.InputWidget, {borderWidth: categoryBorder?1:0}]}
                        allowFontScaling = {false}
                        cursorColor = {colorCode.Authentication_subtitle_color}

                        placeholder = "Enter category name"
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}

                        onFocus = {() => FocusHandler(0)}
                        value = {categoryName}
                        onChangeText = {(value) => setCategoryName(value)}
                    />

                    {/* Category information input  */}

                    <TextInput
                        style = {[CreateCategoryStyle.InputWidget, {borderWidth: categoryInformationBorder?1:0}]}
                        allowFontScaling = {false}
                        cursorColor = {colorCode.Authentication_subtitle_color}

                        placeholder = "Enter category information"
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}

                        onFocus = {() => FocusHandler(1)}
                        value = {categoryInformation}
                        onChangeText = {(value) => setCategoryInformation(value)}
                    />

                    {/* Category Image select title  */}

                    <TextComponent
                        TextValue = "Category image"
                        TextFamily = "Mukta"
                        TextSize = {17}
                        TextColor = {'#7a7a7a'}
                        TextStyle = {{marginTop: 3}}
                    />


                    {/* Category image  */}

                    {imageFile != ""?
                    
                        <Image
                            style = {CreateCategoryStyle.CategoryImage}
                            source={{uri:imageFile}}
                        />
                    :<></>}


                    {/* Category image select option  */}

                    <Pressable 
                        style={CreateCategoryStyle.CategoryImageSelect}
                        android_ripple = {{color:colorCode.Other_button_rippler_color}}
                        onPress = {CategoryImage_selector}>

                        <TextComponent
                            TextValue = "Select"
                            TextFamily = "Sans"
                            TextSize = {19}
                            TextColor = {colorCode.Authentication_title_color}
                        />

                    </Pressable>

                    {/* Create category button  */}

                    {indicatorValue?
                        <View style={[CreateCategoryStyle.ButtonLayout, {paddingTop:7, paddingBottom: 7}]}>
                            <ActivityIndicator size= "large"
                                color= {colorCode.Authentication_button_textColor}/>
                        </View>
                    :
                        <Pressable style={CreateCategoryStyle.ButtonLayout}
                            android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                            onPress = {Create_category_handler}>

                            <TextComponent
                                TextValue = "Create"
                                TextFamily = "Ubuntu"
                                TextSize = {19}
                                TextColor = {colorCode.Authentication_button_textColor}
                            />

                        </Pressable>
                    }
                    
                </View>

            </View>
        )
    }
    
}

const CreateCategoryStyle = StyleSheet.create({

    CreateCatgeoryLayout:{
        ...style.AuthenticationScreen_style
    }, 

    InputLayout: {
        marginTop: '6%'
    }, 

    InputWidget:{
        ...style.Authentication_inputWidget
    }, 

    ButtonLayout: {
        ...style.Authentication_button, 
        marginTop: 15
    }, 

    CategoryImageSelect: {
        backgroundColor: colorCode.Other_button_color, 
        display: 'flex', 
        alignItems: 'center', 
        width: '30%', 
        marginTop: 15, 
        paddingTop: 7, 
        paddingBottom: 7, 
        borderRadius: 5 
    }, 

    CategoryImage: {
        height: 150, 
        width: 150, 
        resizeMode: 'contain', 
        marginTop: 10
    }, 

    
})
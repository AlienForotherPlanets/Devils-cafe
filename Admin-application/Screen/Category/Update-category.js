import { View, StyleSheet,TextInput, Pressable, 
    Image, ActivityIndicator, ToastAndroid} from "react-native";
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

// **** Import URL for request api **** // 
import * as URL from '../../URL/RequestURL' ; 

export default function UpdateCategory({navigation, route}){

    const {data} = route.params ; 

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

    const [imageFile, setImageFile] = useState(data.Category_image) ; 
    const [imageFileData, setImageFileData] = useState('') ; 

    // ---- Focus handler ---- // 

    const [categoryNameBorder, setCategoryNameBorder] = useState(false) ; 
    const [categoryInformationBorder, setCategoryInformationBorder] = useState(false) ; 

    const FocusHandler = (x) => {

        setCategoryNameBorder(false) ; 
        setCategoryInformationBorder(false) ; 

        if (x == 0){

            setCategoryNameBorder(true) ; 
        }else{

            setCategoryInformationBorder(true) ; 
        }
    }
 
    // ===== Function --- Category image picker ===== // 

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

    // ---- Input widget value ---- //

    const [categoryName, setCategoryName] = useState(data.Category_name) ; 
    const [categoryInformation, setCategoryInformation] = useState(data.Category_description) ; 

    // ===== Function --- Category update request handler ===== // 

    const Update_catgory_handler = async () => {

        setIndicatorValue(true) ; 

        if (categoryName == ""){

            ToastAndroid.show("Enter Category name", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else{

            // **** Check image update or not **** // 

            let Upload_image_url ; 

            if (imageFileData != ''){

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
                Upload_image_url = Upload_image_response.url ; 

                ToastAndroid.show("Upload image successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
            
            // **** Update category data request **** // 

            let Request_url = URL.Authentication_url ; 
                        
            let Request_data = {
                "Check_status":"Update-category", 
                "Update_category_name": categoryName, 
                "Update_category_image": imageFileData != ""?Upload_image_url:data.Category_image, 
                "Update_category_data": data.Category_data, 
                "Update_category_information": categoryInformation
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

            if (Response_status == "Update category"){

                ToastAndroid.show("Update category successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                
                navigation.goBack() ; 
                
            }else{

                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
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
                    TextValue = " ✏️ Update category"
                    TextFamily = "Ubuntu"
                    TextSize = {21}
                    TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop:10}}
                />

                {/* Input layout  */}

                <View style={CreateCategoryStyle.InputLayout}>

                    {/* Update Category name input  */}

                    <TextInput
                        style = {[CreateCategoryStyle.InputWidget, {borderWidth:categoryNameBorder?1:0}]}
                        allowFontScaling = {false}
                        cursorColor = {colorCode.Authentication_subtitle_color}

                        placeholder = "Enter Update category name"
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}

                        onFocus = {() => FocusHandler(0)} 
                        value = {categoryName}
                        onChangeText = {(value) => setCategoryName(value)}
                    />

                    {/* Update category information input  */}

                    <TextInput
                        style = {[CreateCategoryStyle.InputWidget, {borderWidth:categoryInformationBorder?1:0}]}
                        allowFontScaling = {false}
                        cursorColor = {colorCode.Authentication_subtitle_color}

                        placeholder = "Enter Update category information"
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}

                        onFocus = {() => FocusHandler(1)} 
                        value = {categoryInformation}
                        onChangeText = {(value) => setCategoryInformation(value)}
                    />

                    {/* Update  Category Image select title  */}

                    <TextComponent
                        TextValue = "Update Category image"
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
                            onPress = {Update_catgory_handler}>
                        
                            <TextComponent
                                TextValue = "Update"
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
    }

})
import React, {useState, useEffect} from 'react' ; 
import { View, StyleSheet,  Image, Pressable, ToastAndroid, ActivityIndicator } from "react-native";

// **** Colorcode and ScreenStyle **** // 
import * as colorCode from '../../Color-code/Color-codes' ; 
import * as style from '../../Style/AuthenticationStyle' ; 

// **** Text and StatusBar component **** // 
import TextComponent from "../../Component/TextComp";
import StatusbarComponent from '../../Component/StatusbarComp' ; 

// **** Import require packages **** // 
import * as Navigationbar from 'expo-navigation-bar' ;
import * as Font from 'expo-font' ;  
import * as ImagePicker from 'expo-image-picker'; 
import * as URL from '../../URL/RequestURL' ; 

export default function InsertUpdate_banner({navigation, route}){

    const {Option, Data} = route.params ; 

    // ---- Set NavigationBar color ---- //
    
    Navigationbar.setBackgroundColorAsync('#ffffff');

    // ---- Load Font ---- //

    const [loadFont, setLoadFont] = useState(false);

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

        // ===== Function 2 --- Set dependent data fro Update banner image ===== // 

        const Set_update_banner_data = () => {

            if (Option == "Update"){

                setImageFile(Data.Banner_image) ; 
            }
        } ; 

        Set_update_banner_data() ; 

    }, []);

    // ----- Indicator value ---- /// 

    const [InsertIndicator, setInsertIndicator] = useState(false) ; 
    const [UpdateIndicator, setUpdateIndicator] = useState(false) ; 

    // ====== Image file picker ====== // 

    const [imageFile, setImageFile] = useState('') ; 
    const [imageFileData, setImageFileData] = useState('') ; 


    const Image_file_picker = async () => {
        
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

    // ===== Insert banner image handler ===== // 

    const Insert_banner_image_handler = async () => {

        setInsertIndicator(true) ; 

        if (imageFile == ""){

            ToastAndroid.show("Please, Select banner image", ToastAndroid.BOTTOM, ToastAndroid.SHORT ) ; 
        }else{

            try{
                
                let Upload_image_url ; 

                // ===== Upload banner image ====== // 

                const ImageData = new FormData() ; 
                ImageData.append('file', imageFileData); 
                ImageData.append('upload_preset', 'DevileCafe_banner'); 
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

                // ===== Insert banner image request ====== // 
                
                let Request_url = URL.Authentication_url ; 
                        
                let Request_data = {
                    "Check_status":"Insert-banner",
                    "Banner_image": Upload_image_url
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

                if (Response_status == "Insert"){

                    ToastAndroid.show("Insert banner image sucessfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

                    navigation.goBack() ; 

                }else{

                    ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                }


            }catch{
    
                ToastAndroid.show("Network request failed") ; 
            }
        }

        setInsertIndicator(false) ; 
    }

    // ===== Update banner image handler ====== // 

    const Update_banner_image_handler = async () => {

        setUpdateIndicator(true) ; 

        if (imageFile == ""){

            ToastAndroid.show("Please, Select banner image", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else{

            try{

                let Update_banner_image ; 
            
                // ===== Upload update banner image ===== // 
            
                if (imageFileData != ""){

                    const ImageData = new FormData() ; 
                    ImageData.append('file', imageFileData); 
                    ImageData.append('upload_preset', 'DevileCafe_banner'); 
                    ImageData.append('cloud_name', 'dsc8egt36'); 
                    
                    let Upload_image = await fetch('https://api.cloudinary.com/v1_1/dsc8egt36/image/upload', {
                        method : 'post',
                        headers:{
                            'Content-Type': 'multipart/form-data' 
                        }, 
                        body   : ImageData
                    }); 
    
                    let Upload_image_response = await Upload_image.json() ; 
                    Update_banner_image = Upload_image_response.url ; 
    
                    ToastAndroid.show("Upload image successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
    
                    // ===== Update banner image request ===== // 

                    let Request_url = URL.Authentication_url ; 
                        
                    let Request_data = {
                        "Check_status":"Update-banner", 
                        "Banner_image": imageFileData != ""?Update_banner_image:imageFile, 
                        "Banner_id": Data.Banner_id
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

                    if (Response_status == "Update"){

                        ToastAndroid.show("Update banner image successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

                        navigation.goBack(); 
                    }

                }
            }catch{

                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
        }

        setUpdateIndicator(false) ; 
    }

    if (loadFont){

        return(
            <View style={InsertUpdate_bannerStyle.InsertUpdate_bannerLayout}>
                
                {/* Statusbar component  */}
                                
                <StatusbarComponent
                    color = {colorCode.Authentication_statusBar_color}
                />
    
                {/* Title  */}
    
                <TextComponent
                    TextValue = {"➕ " + Option +  " banner image"}
                    TextFamily = "Ubuntu"
                    TextSize = {21}
                    TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop:10}}
                />
                
                {/* Information  */}

                <TextComponent
                    TextValue = "First select image than click on Insert or Update banner"
                    TextFamily = "Sans"
                    TextSize = {17}
                    TextColor = {colorCode.Authentication_subtitle_color}
                    TextStyle = {{marginTop: 8}}
                />
    
                {/* Banner image  */}
                
                {imageFile != ""?<>
                
                    <Image
                        style = {InsertUpdate_bannerStyle.Banner_image}
                        source={{uri:imageFile}}
                    />
                
                </>:<></>}

                {/* Select image and Update image file picker  */}

                <Pressable style={[InsertUpdate_bannerStyle.SelectImage_buttonLayout, {marginTop: 30}]}
                    android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                    onPress = {Image_file_picker}>

                    <TextComponent
                        TextValue = "Select image"
                        TextFamily = "Ubuntu"
                        TextSize = {17}
                        TextColor = {colorCode.Authentication_title_color}
                    />

                </Pressable>

                {/* ==== Insert banner and Update banner option layout =====  */}

                {Option == "Insert"?<>
                    {InsertIndicator?
                        <View style={[InsertUpdate_bannerStyle.ButtonLayout, {paddingTop:7, paddingBottom: 7}]}>
                            <ActivityIndicator size= "large"
                                color= {colorCode.Authentication_button_textColor}/>
                        </View>
                        :
                        <Pressable style={InsertUpdate_bannerStyle.ButtonLayout}
                            android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                            onPress = {Insert_banner_image_handler}>

                            <TextComponent
                                TextValue = "Insert banner"
                                TextFamily = "Ubuntu"
                                TextSize = {19}
                                TextColor = {colorCode.Authentication_button_textColor}
                            />

                        </Pressable>
                    }
                </>:<>
                    {UpdateIndicator?
                        <View style={[InsertUpdate_bannerStyle.ButtonLayout, {paddingTop:7, paddingBottom: 7}]}>
                            <ActivityIndicator size= "large"
                                color= {colorCode.Authentication_button_textColor}/>
                        </View>
                        :
                        <Pressable style={InsertUpdate_bannerStyle.ButtonLayout}
                            android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                            onPress = {Update_banner_image_handler}>

                            <TextComponent
                                TextValue = "Update banner"
                                TextFamily = "Ubuntu"
                                TextSize = {19}
                                TextColor = {colorCode.Authentication_button_textColor}
                            />

                        </Pressable>
                    }
                
                </>}
    
            </View>
        )

    }

}

const InsertUpdate_bannerStyle = new StyleSheet.create({
    InsertUpdate_bannerLayout:{
        ...style.AuthenticationScreen_style, 
    }, 

    Banner_image:{
        height: 180, 
        width: '98%', 
        borderRadius: 5, 
        marginTop: 30, 
        marginBottom: 8 , 
        resizeMode: 'contain'
    }, 
    
    SelectImage_buttonLayout:{
        ...style.Authentication_button, 
        backgroundColor: colorCode.Authentication_input_color
    },  

    ButtonLayout: {
        ...style.Authentication_button, 
        marginTop: 10
    }
})
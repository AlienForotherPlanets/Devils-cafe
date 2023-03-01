import React, {useState, useEffect} from "react";
import { View, StyleSheet, ScrollView, Pressable, Image, Text, ToastAndroid } from "react-native";

// **** Import colorCode file **** //
import * as colorCode from '../../Color-code/Color-codes'; 
import * as style from '../../Style/AuthenticationStyle' ; 

// **** Import Text and Statusbar Component **** // 
import TextComponent from '../../Component/TextComp' ; 
import StatusbarComponent from '../../Component/StatusbarComp' ; 

// **** Import Font and Navigationbar libarary **** // 
import * as Font from 'expo-font'; 
import * as Navigationbar from 'expo-navigation-bar' ;
import * as ImagePicker from 'expo-image-picker'; 
import * as URL from '../../URL/RequestURL' ; 

export default function LatestProduct({navigation}){

    // ---- Set NavigationBar color ---- //
    
    Navigationbar.setBackgroundColorAsync("#ffffff");

    // ---- Load Font ---- //

    const [loadFont, setLoadFont] = useState(false);

    useEffect(() => {
    
        // ===== Function1  ---- Load font ======= // 

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

    // ====== Status image picker function ====== // 

    const [Status_image_data, set_Status_image_data] = useState([]) ; 

    // ===== Status image picker function ===== // 

    const Status_image_picker_handler = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 0.6,
        });

        if ( 'uri' in result){

            if (Status_image_data.length > 7){

                ToastAndroid.show("You can not upload more than 6 images for Status", ToastAndroid.BOTTOM, ToastAndroid.LONG) ; 
            
            }
            else{
            
                set_Status_image_data([...Status_image_data, result.assets[0].uri]) ; 
                console.warn(Status_image_data);

            }
        }
    }

    // ==== Status image close option function ===== // 

    const Status_image_close_handler = (element) => {

        for (let i = 0 ; i<Status_image_data.length; i++){

            if(Status_image_data[i] == element){

                Status_image_data.splice(i, 1) ; 

            }
        }

        set_Status_image_data([...Status_image_data]) ; 
    }

    // ====== Upload status image handler ======= // 

    const Upload_status_handler = async () => {

        if (Status_image_data.length == 0){

            ToastAndroid.show("Please, Select at least one image", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else{

            // ***** First, Delete all previous status image information ***** // 
            
            let Request_url = URL.Authentication_url ; 
                        
            let Request_data = {
                "Check_status":"Delete-latest-product",
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

                try{
    
                    let Upload_image_url ; 

                    for(let i = 0; i<Status_image_data.length; i++){
                           
                        let Temp_data = {uri: Status_image_data[i],
                            type: `test/${Status_image_data[i].split('.')[1]}`,
                            name: `test.${Status_image_data[i].split('.')[1]}`
                        } ;
        
                        let Image_temp_data = new FormData() ; 
        
                        Image_temp_data.append('file', Temp_data); 
                        Image_temp_data.append('upload_preset', 'DevileCafe_banner'); 
                        Image_temp_data.append('cloud_name', 'dsc8egt36') ; 
        
                        let Upload_image = await fetch('https://api.cloudinary.com/v1_1/dsc8egt36/image/upload', {
                            method : 'post', 
                            body   : Image_temp_data
                        }); 
        
                        let Upload_image_response = await Upload_image.json() ; 
        
                        if (Upload_image_response != null){
        
                            Upload_image_url = Upload_image_response.url ; 
        
                            ToastAndroid.show("Upload status image" + (i+1) + " successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT ) ; 
        
                            try {
                                
                                let Request_url = URL.Authentication_url ; 
                                
                                let Request_data = {
                                    "Check_status":"Insert-latest-product",
                                    "image": Upload_image_url
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
        
                                    ToastAndroid.show("Insert status image"+ (i+1) +" successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                                }
        
                            } catch{
                                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                            }
        
                        }
                    }

                    navigation.goBack() ;     
    
                }catch{
    
                    ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                }
            }
            
        }
    }


    if (loadFont){

        return(
        
            <View style={LatestProductStyle.LatestProductLayout}>

                
                {/* Statusbar component  */}
                
                <StatusbarComponent
                    color = {colorCode.Authentication_statusBar_color}
                />

                {/* Title  */}

                <TextComponent
                    TextValue = "➕ Upload latest product"
                    TextFamily = "Ubuntu"
                    TextSize = {21}
                    TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop:10}}
                />

                <TextComponent
                    TextValue = "You can only upload upto 6 images"
                    TextFamily = "Sans"
                    TextSize = {17}
                    TextColor = {colorCode.Authentication_subtitle_color}
                    TextStyle = {{marginTop: 8}}
                />

                {/* ====== Latest image selected view layout ======  */}

                <ScrollView showsVerticalScrollIndicator={false}>

                    {Status_image_data.map((element, index) => {
                        return(

                            <View style={{  height:300, width: "98%", 
                                            marginTop: 6, marginBottom: 6, marginLeft: "auto", marginRight: "auto", 
                                            backgroundColor: "white", 
                                            paddingTop:12 , paddingBottom: 12 
                                        }}
                                key={index}>

                                {/* ===== Status image close option =====  */}

                                <View style={{  display: "flex", flexDirection:"row", position:"absolute", 
                                                zIndex:15, width:"100%"}}>
                                    
                                    <Pressable style={{ backgroundColor:"#2f2f2f71", 
                                                        marginLeft:"auto", marginRight:20, marginTop:15 }}
                                        onPress={() => Status_image_close_handler(element)}>

                                        <Image
                                            source={require('../../assets/Images/Close.png')}
                                            style={{height:30, width:30, zIndex:20}}
                                        />
                                    
                                    </Pressable>

                                </View>
                                
                                {/* Status image  */}

                                <Image

                                    source={{uri:element}}   
                                    style={{    height: "100%", width: "96%", marginLeft:"auto", 
                                                marginRight: "auto", resizeMode:"contain"}}
                                />

                            </View>
                        )

                    })}

                </ScrollView>

                {/* ====== Select status image and Upload status option =====  */}

                <View style={LatestProductStyle.UploadStatusButtonLayout}>

                    {/* ===== Select status image option =====  */}
                    
                    <Pressable style={LatestProductStyle.UploadStatusPressableButton}
                        android_ripple={{color:colorCode.Authentication_button_ripper_color}}
                        onPress = {Status_image_picker_handler}>
                     
                        <Text allowFontScaling={false} style={LatestProductStyle.UploadStatusButtonText}>Select Status</Text>
                    
                    </Pressable>

                    {/* ===== Upload status option ===== 
                    ` */}

                    <Pressable style={LatestProductStyle.UploadStatusPressableButton}
                        android_ripple={{color:colorCode.Authentication_button_ripper_color}}
                        onPress = {Upload_status_handler}>
                    
                        <Text allowFontScaling={false} style={LatestProductStyle.UploadStatusButtonText}>Upload Status</Text>
                    
                    </Pressable>

                </View>

            </View>
        
        )
    }
}

const LatestProductStyle = new StyleSheet.create({
    LatestProductLayout: {
        ...style.AuthenticationScreen_style
    }, 

    UploadStatusButtonLayout:{
        display: "flex", 
        flexDirection: "row", 
        textAlign: "center", 
        justifyContent: "center",
        alignItems: "center", 
        width: "100%", 
        marginBottom: 10
    }, 

    UploadStatusPressableButton:{
        width: "45%", 
        backgroundColor: colorCode.Authentication_button_color,
        marginLeft: "3%", 
        marginRight: "2%", 
        alignItems: "center", 
        paddingTop: 10 ,
        paddingBottom: 10, 
        borderRadius: 5  
    }, 

    UploadStatusButtonText:{
        fontFamily: "Ubuntu", 
        fontSize: 18, 
        color: "white"
    }
})
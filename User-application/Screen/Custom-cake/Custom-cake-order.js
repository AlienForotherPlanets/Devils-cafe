import React, {useState, useEffect} from "react";
import { View, StyleSheet, TextInput, ScrollView, 
    Pressable, ActivityIndicator, Image, ToastAndroid} from "react-native";

// **** Colorcode and ScreenStyle **** // 
import * as colorCode from '../../Color-code/Color-codes' ; 
import * as style from '../../Style/AuthenticationStyle' ; 

// **** Text and StatusBar component **** // 
import TextComponent from "../../Component/TextComp";
import StatusbarComponent from '../../Component/StatusbarComp' ; 

// **** Import require packages **** // 
import * as Navigationbar from 'expo-navigation-bar' ;
import * as ImagePicker from 'expo-image-picker'; 
import * as Font from 'expo-font' ;  

// **** Import Request url ***** // 
import * as URL from '../../URL/RequestURL' ; 
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Custom_cake_order({navigation}){

    // ---- Set NavigationBar color ---- // 

    Navigationbar.setBackgroundColorAsync('#ffffff') ; 

    // ---- Load Font ---- // 

    const [loadFont, setLoadFont] = useState(false) ; 

    // ===== Input data ===== // 

    const [imageFile, setImageFile] = useState([]) ; 

    const [imageFile1, setImageFile1] = useState('') ; 
    const [imageFile1_url, setImageFile1_url] = useState('') ; 

    const [imageFile2, setImageFile2] = useState('') ; 
    const [imageFile2_url, setImageFile2_url] = useState('') ; 
 
    const [imageFile3, setImageFile3] = useState('') ; 
    const [imageFile3_url, setImageFile3_url] = useState('') ; 
  
    useEffect(() => {

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

    }, []) ; 

    // ------ Image file picker ------ // 

    const Image_file_picker = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 0.6
        });
        
        if (imageFile.length < 3){

            if ( 'uri' in result.assets[0]){      
    
                setImageFile([...imageFile, result.assets[0].uri]) ;
    
            }
        }else{

            ToastAndroid.show("You can only select 3 images", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }

    const Image_file_remover = (index) => {

        imageFile.splice(index, 1) ; 
        setImageFile([...imageFile]) ; 

    }

    // ====== Focus handler ======= // 

    const [productInformation, setPorudctInformation] = useState('') ; 
    
    const [productInformationBorder, setPoructInformationBorder] = useState('') ; 
    
    const [cakeName, setCakeName] = useState('') ; 
    
    const [cakeNameBorder, setCakeNameBorder] = useState(false) ; 

    const FocusHandler = (x) =>{

        setPoructInformationBorder(false) ; 
        setCakeNameBorder(false) ; 

        if (x == 0){
            setPoructInformationBorder(true) ; 
        }else if (x == 1){
            
            setFlavourBorder(true) ; 
        }else{

            setCakeNameBorder(true) ; 
        }
    }

    // ----- Product weight selection handler ------ // 

    const [Weight500, setWeight500] = useState(false) ; 
    
    const [Weight1KG, setWeight1KG] = useState(false) ; 
    
    const [Weight1_5KG, setWeight1_5KG] = useState(false) ; 
    
    const [Weight2KG, setWeight2KG] = useState(false) ; 
    
    const [Weight3KG, setWeight3KG] = useState(false) ; 

    const [weight750, setWeight750] = useState(false) ; 

    const Weight_handler = (x) => {

        setWeight500(false) ; 

        setWeight1KG(false) ; 

        setWeight1_5KG(false) ; 

        setWeight2KG(false) ; 

        setWeight3KG(false) ; 

        setWeight750(false) ; 

        if (x == 0){

            setWeight500(true) ; 
        }else if (x == 1){
            
            setWeight750(true) ; 
        }else if (x == 2){
            
            setWeight1KG(true) ; 
        }else if (x == 3){

            setWeight1_5KG(true) ; 
        }else if (x == 4){

            setWeight2KG(true) ; 
        }else{

            setWeight3KG(true) ; 
        }
    }

    // ------ Product flavour selection handler ----- // 

    const [flavour1, setFlavour1] = useState(false) ; 
    
    const [flavour2, setFlavour2] = useState(false) ; 
    
    const [flavour3, setFlavour3] = useState(false) ; 

    const [flavour, setFlavour] = useState('') ; 

    const [flavourBorder, setFlavourBorder] = useState(false) ; 

    const Flavour_handler = (x) => {

        setFlavour1(false) ; 
        setFlavour2(false) ; 
        setFlavour3(false) ; 

        if (x == 0 ){

            setFlavour1(true) ; 
        }else if (x == 1){

            setFlavour2(true) ; 
        }else{

            setFlavour3(true) ; 
        }
    }

    const Reset_flavour = () => {

        setFlavour1(false) ; 
        setFlavour2(false) ; 
        setFlavour3(false) ; 
    }

    // ---- Product color selection handler ---- // 

    const [color1, setColor1] = useState(false) ; 
    
    const [color2, setColor2] = useState(false) ; 

    const Cake_color_handler = (x) => {

        setColor1(false) ; 
        setColor2(false) ; 

        if (x == 0){

            setColor1(true) ; 
        }else{

            setColor2(true) ; 
        }
    }

    // ====== Activity Indicator ===== // 

    const [indicatorValue, setIndicatorValue] = useState(false) ; 

    // ====== Product checkout option handler ====== // 

    const Product_checkout_handler = async () => {

        setIndicatorValue(true) ; 

        if (imageFile.length == 0){

            ToastAndroid.show("Please, Select at least provide one cake image", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

        }else if (productInformation == ""){

            ToastAndroid.show("Please, Provide cake information that you want", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

        }else if (Weight500 == false && Weight1KG == false && Weight1_5KG == false && Weight2KG == false && Weight3KG == false ){

            ToastAndroid.show("Please, Select weight of cake", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

        }else if (flavour1 == false && flavour2 == false && flavour3 == false && flavour == ""){
            
            ToastAndroid.show("Please, Select or Enter cake flavour", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

        }else if (color1 == false && color2 == false){

            ToastAndroid.show("Please, Select cake color", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

        }else if (cakeName == ""){

            ToastAndroid.show("Please, Enter name on cake", ToastAndroid.BOTTOM,  ToastAndroid.SHORT) ; 

        }else{

            // ===== Image file template data ===== // 

            let TempData1 = null ; 
            let TempData2 = null ; 
            let TempData3 = null ;

            // ===== Set Image file1 ===== // 
            
            TempData1 = {

                uri: imageFile[0],
                type: `test/${imageFile[0].split(".")[1]}`, 
                name: `test.${imageFile[0].split(".")[1]}`,
            };

            // ====== Set Image file2 ====== // 

            if (imageFile.length == 2){

                TempData2 = {

                    uri: imageFile[1],
                    type: `test/${imageFile[1].split(".")[1]}`, 
                    name: `test.${imageFile[1].split(".")[1]}`,
                };

            }

            // ===== Set Image file2 and Image file3 ===== // 

            if (imageFile.length == 3){

                TempData2 = {

                    uri: imageFile[1],
                    type: `test/${imageFile[1].split(".")[1]}`, 
                    name: `test.${imageFile[1].split(".")[1]}`,
                };

                TempData3  = {

                    uri: imageFile[2],
                    type: `test/${imageFile[2].split(".")[1]}`, 
                    name: `test.${imageFile[2].split(".")[1]}`,
                };

            }

            // ===== Upload image response url ===== // 

            let Upload_image1 = null ; 
            let Upload_image2 = null ; 
            let Upload_image3 = null ; 

            // ======= Upload Product image1 ======= // 

            try {
            
                if (TempData1 != null){
                    
                    // ===== Upload product image1 ===== // 

                    const ImageData = new FormData() ; 
                    ImageData.append('file', TempData1); 
                    ImageData.append('upload_preset', 'DevilsCafe_custom_order'); 
                    ImageData.append('cloud_name', 'dsc8egt36'); 
                    
                    let Upload_image = await fetch('https://api.cloudinary.com/v1_1/dsc8egt36/image/upload', {
                        method : 'post',
                        headers:{
                            'Content-Type': 'multipart/form-data' 
                        }, 
                        body   : ImageData
                    }); 

                    let Upload_image_response = await Upload_image.json() ; 
                    Upload_image1 = await Upload_image_response.url  ; 

                    ToastAndroid.show("Upload product image1 successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ;
                    
                } 
            }catch{
                
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            } 

            // ======= Upload Product image2 ======== // 


            try {
            
                if (TempData2 != null){
                    
                    // ===== Upload product image1 ===== // 

                    const ImageData = new FormData() ; 
                    ImageData.append('file', TempData2); 
                    ImageData.append('upload_preset', 'DevilsCafe_custom_order'); 
                    ImageData.append('cloud_name', 'dsc8egt36'); 
                    
                    let Upload_image = await fetch('https://api.cloudinary.com/v1_1/dsc8egt36/image/upload', {
                        method : 'post',
                        headers:{
                            'Content-Type': 'multipart/form-data' 
                        }, 
                        body   : ImageData
                    }); 

                    let Upload_image_response = await Upload_image.json() ; 
                    Upload_image2 = await Upload_image_response.url  ; 

                    ToastAndroid.show("Upload product image2 successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ;
                    
                } 
            }catch{
                
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            } 

            // ====== Upload Product image3 ======= // 

            try {
                
                if (TempData3 != null){
                    
                    // ===== Upload product image1 ===== // 

                    const ImageData = new FormData() ; 
                    ImageData.append('file', TempData3); 
                    ImageData.append('upload_preset', 'DevilsCafe_custom_order'); 
                    ImageData.append('cloud_name', 'dsc8egt36'); 
                    
                    let Upload_image = await fetch('https://api.cloudinary.com/v1_1/dsc8egt36/image/upload', {
                        method : 'post',
                        headers:{
                            'Content-Type': 'multipart/form-data' 
                        }, 
                        body   : ImageData
                    }); 

                    let Upload_image_response = await Upload_image.json() ; 
                    Upload_image3 = Upload_image_response.url ; 

                    ToastAndroid.show("Upload product image3 successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ;
                    
                } 
            }catch{
                
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }

            //====== Create custom cake order information ====== // 

            // ---- Calculate Product weight ---- // 
            
            let Product_weight ; 

            if (Weight500 == true){
                
                Product_weight = "500gm" ; 

            }else if (Weight1KG == true){

                Product_weight = "1Kg" ; 

            }else if (Weight1_5KG == true){

                Product_weight = "1.5Kg" ; 

            }else if (Weight2KG == true){

                Product_weight = "2Kg" ; 
                
            }else if (weight750 == true){

                Product_weight = "750gm" ; 
            }else{

                Product_weight = "3Kg" ; 
            }

            // ---- Calculate Product flavout information ---- // 

            let Product_flavour ; 

            if (flavour1 == true){

                Product_flavour = "Chocolate" ; 

            }else if (flavour2 == true){

                Product_flavour = "Vanila" ; 

            }else if (flavour3 == true){
                
                Product_flavour = "Storebary" ; 

            }else{

                Product_flavour = flavour ; 
            }

            // ---- Calculate Product color information ---- // 

            let Product_color ; 

            if (color1 == true){

                Product_color = "Single" ; 
            }else{

                Product_color = "Multiple" ; 
            }

            let Order_information = {
                "Product_image1": Upload_image1, 
                "Product_image2": Upload_image2 == null?"None":Upload_image2,
                "Product_image3": Upload_image3 == null ?"None": Upload_image3, 
                "Product_information":productInformation, 
                "Product_weight": Product_weight, 
                "Product_flavour": Product_flavour, 
                "Product_color": Product_color, 
                "Product_name": cakeName
            }

            await AsyncStorage.setItem("Custom-cake-order-data", JSON.stringify(Order_information)) ; 

            // ====== Create custom cake order related data ====== // 

            navigation.navigate("SelectCartAddress", {"Option":"Custom_order"})  ;                
            

        }

        setIndicatorValue(false) ; 
    }

    if (loadFont){

        return(
            <View style={CustomOrderStyle.CustomOrderLayout}>

                {/* Statusbar  */}

                <StatusbarComponent
                    color={colorCode.Authentication_input_color}
                ></StatusbarComponent>
            
                {/* ======= Back Option and Title layout =======  */}

                <View style={CustomOrderStyle.BackOptionLayout}>
                    
                    {/* Back option  */}

                    <Pressable
                        android_ripple={{color:colorCode.Authentication_button_ripper_color}}
                        style = {CustomOrderStyle.BackImageLayout}
                        onPress = {() => navigation.goBack()}>
                        
                        <Image
                            style={style.Authentication_BackImage}
                            source={require("../../assets/Images/Back-option.png")}
                        />

                    </Pressable>

                    {/* Title layout  */}

                    <TextComponent
                        TextValue = "Custom cake order"
                        TextSize = {20}
                        TextFamily = "Ubuntu"
                        TextColor = {colorCode.Authentication_title_color}
                        TextStyle = {{marginTop: "auto", marginBottom: 'auto', marginLeft: 4}}
                    />

                </View>

                {/* ======= Input option layout =======  */}

                <ScrollView style={CustomOrderStyle.AllInputLayout} showsVerticalScrollIndicator={false}>

                    {/* ===== Start Product image selection option =====  */}

                    {/* Title  */}

                    <TextComponent 
                        TextValue="Cake images" 
                        TextFamily = "Mukta"
                        TextSize = {18}
                        TextColor = "#494949"
                        TextStyle = {{marginTop: 10}}
                    />
                    
                    {/* Information  */}

                    <TextComponent

                        TextValue = "You can only select upto 3 product images"
                        TextFamily = "Sans"
                        TextColor = "#3c3c3c"
                        TextSize = {17}
                        TextStyle = {{marginTop:8, marginBottom:8}}
                    
                    />

                    {/* ---- Product images ----  */}

                    <ScrollView style={CustomOrderStyle.All_product_image_layout} horizontal>
                    
                        {imageFile.map((element, index) => {
                            return(

                                <View style={CustomOrderStyle.Product_image_layout}
                                    key = {index}>

                                    {/* Close option  */}

                                    <Pressable style={CustomOrderStyle.Product_close_option_layout}
                                        onPress = {(index) => Image_file_remover(index)}>

                                        <Image
                                            style = {CustomOrderStyle.Product_close_option_image}
                                            source={require('../../assets/Images/Close.png')}
                                        />
                                    
                                    </Pressable>

                                    {/* Product image  */}

                                    <Image

                                        style = {CustomOrderStyle.Upload_product_image}
                                        source={{uri:element}}
                                    />

                                </View>
                            )
                        })}
                
                    </ScrollView>

                    {/* ===== Product image selector ====  */}

                    <Pressable style={[style.Authentication_button, {marginTop: 10}]}
                        android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                        onPress = {Image_file_picker}>
                    
                        <TextComponent
                            TextValue = "Select your cake image"
                            TextFamily = "Mukta"
                            TextColor = "#ffffff"
                            TextSize = {18}
                        />
                    
                    </Pressable>

                    {/* ====== Stop Product image selection option =======  */}

                    {/* ====== Product information input ======  */}

                    <TextInput
                        style = {[CustomOrderStyle.InputWidget, {borderWidth: productInformationBorder?1:0, marginTop: 20}]}
                        allowFontScaling = {false}
                        cursorColor = {colorCode.Authentication_subtitle_color}

                        placeholder = "Write some information about cake"
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}

                        onFocus = {() => FocusHandler(0)}
                        value = {productInformation}
                        onChangeText = {(value) => setPorudctInformation(value)}
                    />

                    {/* ====== Start Product weight selection option ======  */}

                    <TextComponent 
                        TextValue="Cake Weight" 
                        TextFamily = "Ubuntu"
                        TextSize = {17}
                        TextColor = {colorCode.Authentication_title_color}
                        TextStyle = {{marginTop: 8}}
                    />

                    {/* ---- Weight option ----  */}

                    <View style = {{display:"flex", textAlign:"center", flexDirection:"row", flexWrap:"wrap", marginTop: 20}}>

                        {/* 5000gm option  */}
                        
                        <Pressable style={[CustomOrderStyle.SelectionOption, 
                            {   backgroundColor:Weight500?colorCode.Authentication_button_color:'#ffffff' }]}
                            onPress = {() => Weight_handler(0)}>

                            <TextComponent
                                TextValue = "500gm"
                                TextFamily = "Ubuntu"
                                TextSize = {16}
                                TextColor = {Weight500?'#ffffff':'#2c2c2c'}
                            />

                        </Pressable>

                        {/* 750gm weight option  */}

                        <Pressable style={[CustomOrderStyle.SelectionOption, 
                            {   backgroundColor:weight750?colorCode.Authentication_button_color:'#ffffff' }]}
                            onPress = {() => Weight_handler(1)}>

                            <TextComponent
                                TextValue = "750gm"
                                TextFamily = "Ubuntu"
                                TextSize = {16}
                                TextColor = {weight750?'#ffffff':'#2c2c2c'}
                            />

                        </Pressable>


                        {/* 1KG option  */}

                        <Pressable style={[CustomOrderStyle.SelectionOption, 
                            {   backgroundColor:Weight1KG?colorCode.Authentication_button_color:'#ffffff' }]}
                            onPress = {() => Weight_handler(2)}>

                            <TextComponent
                                TextValue = "1KG"
                                TextFamily = "Ubuntu"
                                TextSize = {16}
                                TextColor = {Weight1KG?'#ffffff':'#2c2c2c'}
                            />

                        </Pressable>

                        {/* 1.5KG option  */}

                        <Pressable style={[CustomOrderStyle.SelectionOption, 
                            {   backgroundColor:Weight1_5KG?colorCode.Authentication_button_color:'#ffffff' }]}
                            onPress = {() => Weight_handler(3)}>

                            <TextComponent
                                TextValue = "1.5KG"
                                TextFamily = "Ubuntu"
                                TextSize = {16}
                                TextColor = {Weight1_5KG?'#ffffff':'#2c2c2c'}
                            />

                        </Pressable>

                        {/* 2KG option  */}

                        <Pressable style={[CustomOrderStyle.SelectionOption, 
                            {   backgroundColor:Weight2KG?colorCode.Authentication_button_color:'#ffffff' }]}
                            onPress = {() => Weight_handler(4)}>

                            <TextComponent
                                TextValue = "2KG"
                                TextFamily = "Ubuntu"
                                TextSize = {16}
                                TextColor = {Weight2KG?'#ffffff':'#2c2c2c'}
                            />

                        </Pressable>

                        {/* 3KG Option  */}

                        <Pressable style={[CustomOrderStyle.SelectionOption, 
                            {   backgroundColor:Weight3KG?colorCode.Authentication_button_color:'#ffffff' }]}
                            onPress = {() => Weight_handler(5)}>

                            <TextComponent
                                TextValue = "3KG"
                                TextFamily = "Ubuntu"
                                TextSize = {16}
                                TextColor = {Weight3KG?'#ffffff':'#2c2c2c'}
                            />

                        </Pressable>

                    </View>

                    {/* ======= Stop Product weight selection option =======  */}
                    
                    {/* ===== Start flavour selection option ======  */}

                    <TextComponent 
                        TextValue="Cake flavour" 
                        TextFamily = "Ubuntu"
                        TextSize = {17}
                        TextColor = {colorCode.Authentication_title_color}
                        TextStyle = {{marginTop: 20}}
                    />

                    <TextComponent 
                        TextValue="First priority conside to selection option than custom enter option consider" 
                        TextFamily = "Sans"
                        TextSize = {17}
                        TextColor = "#494949"
                        TextStyle = {{marginTop: 8}}
                    />

                    {/* ---- flavour option ----  */}

                    <View style = {{display:"flex", textAlign:"center", flexDirection:"row", marginTop: 20}}>

                        {/* Chocolate option  */}
                        
                        <Pressable style={[CustomOrderStyle.SelectionOption, 
                            {   backgroundColor:flavour1?colorCode.Authentication_button_color:'#ffffff' }]}
                            onPress = {() => Flavour_handler(0)}>

                            <TextComponent
                                TextValue = "Chocolate"
                                TextFamily = "Ubuntu"
                                TextSize = {16}
                                TextColor = {flavour1?'#ffffff':'#2c2c2c'}
                            />

                        </Pressable>


                        {/* Vanila option  */}

                        <Pressable style={[CustomOrderStyle.SelectionOption, 
                            {   backgroundColor:flavour2?colorCode.Authentication_button_color:'#ffffff' }]}
                            onPress = {() => Flavour_handler(1)}>

                            <TextComponent
                                TextValue = "Vanila"
                                TextFamily = "Ubuntu"
                                TextSize = {16}
                                TextColor = {flavour2?'#ffffff':'#2c2c2c'}
                            />

                        </Pressable>

                        {/* Storebary option  */}

                        <Pressable style={[CustomOrderStyle.SelectionOption, 
                            {   backgroundColor:flavour3?colorCode.Authentication_button_color:'#ffffff' }]}
                            onPress = {() => Flavour_handler(2)}>

                            <TextComponent
                                TextValue = "Storebary"
                                TextFamily = "Ubuntu"
                                TextSize = {16}
                                TextColor = {flavour3?'#ffffff':'#2c2c2c'}
                            />

                        </Pressable>

                        {/* Reset option  */}

                        <Pressable style={[CustomOrderStyle.SelectionOption]}
                            onPress = {() => Reset_flavour()}>

                            <TextComponent
                                TextValue = "Reset"
                                TextFamily = "Ubuntu"
                                TextSize = {16}
                                TextColor = {'#ff2e2e'}
                            />

                        </Pressable>


                    </View>

                    {/* ---- Custome flavour name input -----  */}

                    <TextInput
                        style = {[CustomOrderStyle.InputWidget, {borderWidth: flavourBorder?1:0, marginTop: 20}]}
                        allowFontScaling = {false}
                        cursorColor = {colorCode.Authentication_subtitle_color}

                        placeholder = "Custom cake flavour which you want"
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}

                        onFocus = {() => FocusHandler(1)}
                        value = {flavour}
                        onChangeText = {(value) => setFlavour(value)}
                    />

                    {/* ===== Stop flavour selection option ======  */}


                    {/* ===== Start cake color option layout =====  */}

                    <TextComponent 
                        TextValue="Cake color option" 
                        TextFamily = "Ubuntu"
                        TextSize = {17}
                        TextColor = {colorCode.Authentication_title_color}
                        TextStyle = {{marginTop: 8}}
                    />

                    {/* ---- Color option ----  */}

                    <View style = {{display:"flex", textAlign:"center", flexDirection:"row", marginTop: 20}}>

                        {/* Single color */}
                        
                        <Pressable style={[CustomOrderStyle.SelectionOption, 
                            {   backgroundColor:color1?colorCode.Authentication_button_color:'#ffffff' }]}
                            onPress = {() => Cake_color_handler(0)}>

                            <TextComponent
                                TextValue = "Single color"
                                TextFamily = "Ubuntu"
                                TextSize = {16}
                                TextColor = {color1?'#ffffff':'#2c2c2c'}
                            />

                        </Pressable>


                        {/* Multiple color option  */}

                        <Pressable style={[CustomOrderStyle.SelectionOption, 
                            {   backgroundColor:color2?colorCode.Authentication_button_color:'#ffffff' }]}
                            onPress = {() => Cake_color_handler(1)}>

                            <TextComponent
                                TextValue = "Multiple color"
                                TextFamily = "Ubuntu"
                                TextSize = {16}
                                TextColor = {color2?'#ffffff':'#2c2c2c'}
                            />

                        </Pressable>

                    </View>

                    {/* ====== End cake flavour option layout ======  */}

                    {/* ======= Name on cake input ======  */}

                    <TextInput
                        style = {[CustomOrderStyle.InputWidget, {borderWidth: cakeNameBorder?1:0, marginTop: 20}]}
                        allowFontScaling = {false}
                        cursorColor = {colorCode.Authentication_subtitle_color}

                        placeholder = "Name on cake"
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}

                        onFocus = {() => FocusHandler(2)}
                        value = {cakeName}
                        onChangeText = {(value) => setCakeName(value)}
                    />

                    {/* ----- Other information -----  */}

                    <TextComponent

                        TextValue = "After placing order our team reach you as soon as possible for disccuss other details"
                        TextFamily = "Sans"
                        TextColor = "#3c3c3c"
                        TextSize = {17}
                        TextStyle = {{marginTop:8, marginBottom:8}}

                    />
                    
                    {/* ===== Placed order option button ======  */}

                    {indicatorValue?
                        <View style={[CustomOrderStyle.ButtonLayout, {paddingTop:7, paddingBottom: 7}]}>
                            <ActivityIndicator size= "large"
                                color= {colorCode.Authentication_button_textColor}/>
                        </View>
                    :

                        <Pressable style={[style.Authentication_button, {marginTop: 10}]}
                            android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                            onPress = {Product_checkout_handler}>
                        
                            <TextComponent
                                TextValue = "Checkout"
                                TextFamily = "Mukta"
                                TextColor = "#ffffff"
                                TextSize = {18}
                            />
                        
                        </Pressable>
                    }


                </ScrollView>


            </View>
        )
    }
}

const CustomOrderStyle = new StyleSheet.create({
    CustomOrderLayout:{
        ...style.AuthenticationScreen_style, 
        backgroundColor: colorCode.Authentication_input_color
    }, 

    BackOptionLayout:{
        ...style.Authentication_BackLayout
    }, 

    BackImageLayout : {
        ...style.Authentication_BackImage_layout
    }, 

    AllInputLayout:{
        marginTop: 5
    }, 

    All_product_image_layout:{
        marginTop: 10,
        marginBottom: 10
    },

    Product_image_layout:{
        marginRight: 10
    }, 

    Product_close_option_layout:{
        position: 'absolute', 
        zIndex: 10, 
        marginTop: 5, 
        marginLeft: 5
    }, 

    Product_close_option_image:{
        height: 25, 
        width: 25
    },

    Upload_product_image:{
        height: 180, 
        width: 180, 
        borderRadius: 5, 
        resizeMode: 'contain'
    }, 

    InputWidget:{
        ...style.Authentication_inputWidget, 
        backgroundColor: '#ffffff'
    }, 

    SelectionOption:{
        backgroundColor: '#ffffff', 
        padding: 10, 
        borderRadius: 5, 
        marginRight: 10, 
        marginBottom: 10
    }, 

    ButtonLayout: {
        ...style.Authentication_button
    }


})
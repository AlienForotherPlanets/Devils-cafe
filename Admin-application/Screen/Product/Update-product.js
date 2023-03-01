import React, {useState, useEffect} from "react";
import { View, StyleSheet, ScrollView, TextInput, 
    Pressable, ActivityIndicator, ToastAndroid, Image } from "react-native";

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

// **** Import URL **** // 
import * as URL from '../../URL/RequestURL' ; 

export default function UpdateProduct({navigation, route}){

    const {data} = route.params ; 

    // ---- Set NavigationBar color ---- //
        
    Navigationbar.setBackgroundColorAsync("#ffffff");

    // ---- Load Font ---- //

    const [loadFont, setLoadFont] = useState(false);

    useEffect(() => {

        // ===== Function1 ---- Load font ===== // 

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

        // ====== Function2  ---- Load inital data ======= // 

        const Set_inital_data = () => {

            setImageFile([...imageFile, data.Product_image1]) ; 

            if (data.Product_image2 != "None"){

                setImageFile([...imageFile, data.Product_image2]) ; 
            }

            if (data.Product_image3 != "None"){

                setImageFile([...imageFile, data.Product_image3]) ; 
            }
            
            // ---- Set Product flavour ---- // 

            if (data.Product_flavour == "Chocolate"){

                flavour_selection_handler(0) ; 
            }else if (data.Product_flavour == "Vanila"){

                flavour_selection_handler(1) ; 
            }else if (data.Product_flavour == "Storebary"){

                flavour_selection_handler(2) ; 
            }else{

                setFlavour(data.Product_flavour) ; 
            }

            // ---- Set Bread type ---- // 

            if (data.Product_bread == "Chocolate"){

                Bread_selection_handler(0) ; 
            }else if (data.Product_bread == "Vanila"){

                Bread_selection_handler(1) ; 
            }else if (data.Product_bread == "Storebary"){

                Bread_selection_handler(2) ; 
            }else{

                setBread(data.Product_bread) ; 
            }
            
            // ---- Set cream type ----- // 
            
            if (data.Product_cream == "Chocolate"){

                Cream_selection_handler(0) ; 
            }else if (data.Product_cream == "Vanila"){

                Cream_selection_handler(1) ; 
            }else if (data.Product_cream == "Storebary"){

                Cream_selection_handler(2) ; 
            }else{

                setCream(data.Product_cream) ; 
            }


        }

        Set_inital_data() ; 
        
    }, []);

    // ---- Activity Indicator ---- //

    const [indicatorValue, setIndicatorValue] = useState(false);

    // ===== Focus handler ===== // 

    const [productInfoBorder, setProductInfoBorder] = useState(false) ; 
    const [productRetailBorder, setProductRetailBorder] = useState(false) ; 
    const [productDiscountBorder, steProductDiscountBorder] = useState(false) ; 
    const [flavourBorder, setFlavoutBorder] = useState(false) ; 
    const [breadBorder, setBreadBorder] = useState(false) ; 
    const [creamBorder, setCreamBorder] = useState(false) ; 

    const FocusHandler = (x) => {

        setProductInfoBorder(false) ; 
        setProductRetailBorder(false) ; 
        steProductDiscountBorder(false) ; 

        if (x == 0){

            setProductInfoBorder(true) ; 
        }else if (x == 1){
            
            setProductRetailBorder(true) ; 
        }else if (x == 2){
            
            steProductDiscountBorder(true) ; 
        }else if (x ==3){

            setFlavoutBorder(true) ; 
        }else if (x == 4){

            setBreadBorder(true) ; 
        }else{

            setCreamBorder(true) ; 
        }
    }

    // ==== Product Information, Retail Price, Discount Price input ==== // 

    const [productInformation, setProductInformation] = useState(data.Product_information) ; 
    const [productRetailPrice, setProductRetailPrice] = useState(data.Product_retail_price) ; 
    const [productDiscountPrice, setProductDiscountPrice] = useState(data.Product_discount_price) ; 

    const Retail_price_input = (value) => {
        
        setProductRetailPrice(value) ; 

        setPrice500Retail(value) ; 
        setPrice1KGRetail(value*2) ; 
        setPrice2KGRetail(value*4) ; 
        setPrice3KGRetail(value*6) ; 
    }

    const Discount_price_input = (value) => {

        setProductDiscountPrice(value) ; 

        setPrice500Discount(value) ; 
        setPrice1KGDiscount(value*2) ; 
        setPrice2KGDiscount(value*4) ; 
        setPrice3KGDiscount(value*6); 
    }

    // ----- Price calculated base on 500gm price ---- // 

    const [Price500Retail, setPrice500Retail] = useState(productRetailPrice) ; 
    const [Price1KGRetail, setPrice1KGRetail] = useState(productRetailPrice*2) ; 
    const [Price2KGRetail, setPrice2KGRetail] = useState(productRetailPrice*4) ; 
    const [Price3KGRetail, setPrice3KGRetail] = useState(productRetailPrice*6) ; 
    
    const [Price500Disocunt, setPrice500Discount] = useState(productDiscountPrice) ; 
    const [Price1KGDisocunt, setPrice1KGDiscount] = useState(productDiscountPrice*2) ; 
    const [Price2KGDisocunt, setPrice2KGDiscount] = useState(productDiscountPrice*4) ; 
    const [Price3KGDisocunt, setPrice3KGDiscount] = useState(productDiscountPrice*6) ; 

    // ---- Cake flavour input ---- // 

    const [flavour1, setFlavour1] = useState(false) ; 
    const [flavour2, setFlavour2] = useState(false) ; 
    const [flavour3, setFlavour3] = useState(false) ; 
    const [selectFlavour, setSelectFlavour] = useState('') ; 

    const [flavour, setFlavour] = useState('') ; 
     
    const flavour_selection_handler = (x) => {

        setFlavour1(false) ; 
        setFlavour2(false) ; 
        setFlavour3(false) ; 

        if (x == 0 ){

            setFlavour1(true) ; 
            setSelectFlavour('Chocolate') ; 
        }else if (x == 1){

            setFlavour2(true) ; 
            setSelectFlavour("Vanila") ; 
        }else{

            setFlavour3(true) ; 
            setSelectFlavour('Storebary') ; 
        }
    }

    const Flavour_reset = () => {

        setFlavour1(false) ; 
        setFlavour2(false) ; 
        setFlavour3(false) ; 
        setSelectFlavour('') ; 
    }

    // --- Cake Bread type input ---- // 

    const [bread1, setBread1] = useState(false) ; 
    const [bread2, setBread2] = useState(false) ; 
    const [bread3, setBread3] = useState(false) ;
    const [selectedBread, setSelectedBread] = useState('') ; 
    
    const [bread, setBread] = useState('') ; 

    const Bread_selection_handler = (x) => {

        setBread1(false) ; 
        setBread2(false) ; 
        setBread3(false) ; 

        if (x == 0){

            setBread1(true) ; 
            setSelectedBread('Chocolate') ; 

        }else if (x == 1){
            
            setBread2(true) ; 
            setSelectedBread("Vanila") ; 
        }else{
            
            setBread3(true) ; 
            setSelectedBread("Storebary") ; 
        }
    }

    const Bread_reset = () => {

        setBread1(false) ; 
        setBread2(false) ; 
        setBread3(false) ; 
        setSelectedBread('') ; 
    }

    // ---- Cake cream type input ---- //

    const [cream1, setCream1] = useState(false) ; 
    const [cream2, setCream2] = useState(false) ; 
    const [cream3, setCream3] = useState(false) ; 

    const [selectCream, setSelectCream] = useState('') ; 

    const [cream, setCream] = useState('') ; 

    const Cream_selection_handler = (x) => {

        setCream1(false) ; 
        setCream2(false) ; 
        setCream3(false) ; 

        if (x == 0 ){

            setCream1(true) ; 
            setSelectCream('Chocolate') ; 
        }else if (x == 1){

            setCream2(true) ; 
            setSelectCream('Vanila') ; 
        }else{

            setCream3(true) ; 
            setSelectCream('Storebary') ; 
        }
    }

    const Cream_reset = () => {

        setCream1(false) ; 
        setCream2(false) ; 
        setCream3(false) ; 
        setSelectCream('') ; 

    }

    // ===== Product image picker ====== // 

    const [imageFile, setImageFile] = useState([]) ; 

    const [imageFile1Data, setImageFile1Data] = useState('') ; 
    const [image1File, setImage1File] = useState('') ; 

    const [imageFile2Data, setImageFile2Data] = useState('') ; 
    const [image2File, setImageFile2] = useState('') ; 

    const [imageFile3Data, setImageFile3Data] = useState('') ; 
    const [imageFile3, setImageFile3] = useState('') ; 

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

    // ===== Upload Product request ===== // 

    const Upload_product = async () => {

        setIndicatorValue(true) ; 

        if  (productInformation == ""){

            ToastAndroid.show("Enter Product Information", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (imageFile.length == 0){

            ToastAndroid.show("Please, Select at least one Product Image", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (productRetailPrice == ""){

            ToastAndroid.show("Please, Enter Product retail price", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (productDiscountPrice == ""){

            ToastAndroid.show("Please, Enter Product discount price", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (flavour1 == false && flavour2 == false && flavour3 == false && flavour == ""){

            ToastAndroid.show("Please, Select or Enter cake flavour", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (bread1 == false && bread2 == false && bread3 == false && bread == ""){

            ToastAndroid.show("Please, Select or Enter bread type", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else if (cream1 == false && cream2 == false && cream3 == false && cream == ""){

            ToastAndroid.show("Please, Select or Enter cream type", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else{

            for (let i = 0 ; i<imageFile.length; i++){
                
                let TempData = {

                    uri: imageFile[i],
                    type: `test/${imageFile[i].split(".")[1]}`, 
                    name: `test.${imageFile[i].split(".")[1]}`,
                };
                
                if ( i == 0 ){
                      
                    setImageFile1Data(TempData) ;  
                }else if ( i == 1){

                    setImageFile2Data(TempData) ; 
                }else{

                    setImageFile3Data(TempData) ; 
                }

            }

            try {
                
                if (imageFile1Data != ""){
                    
                    // ===== Upload product image1 ===== // 

                    const ImageData = new FormData() ; 
                    ImageData.append('file', imageFile1Data); 
                    ImageData.append('upload_preset', 'DevileCafe_product'); 
                    ImageData.append('cloud_name', 'dsc8egt36'); 
                    
                    let Upload_image = await fetch('https://api.cloudinary.com/v1_1/dsc8egt36/image/upload', {
                        method : 'post',
                        headers:{
                            'Content-Type': 'multipart/form-data' 
                        }, 
                        body   : ImageData
                    }); 

                    let Upload_image_response = await Upload_image.json() ; 
                    setImage1File(Upload_image_response.url) ; 

                    ToastAndroid.show("Upload product image1 successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ;
                    
                } 
            }catch{
             
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            } 


            try {
                
                if (imageFile2Data != ""){
                    
                    // ===== Upload product image1 ===== // 

                    const ImageData = new FormData() ; 
                    ImageData.append('file', imageFile2Data); 
                    ImageData.append('upload_preset', 'DevileCafe_product'); 
                    ImageData.append('cloud_name', 'dsc8egt36'); 
                    
                    let Upload_image = await fetch('https://api.cloudinary.com/v1_1/dsc8egt36/image/upload', {
                        method : 'post',
                        headers:{
                            'Content-Type': 'multipart/form-data' 
                        }, 
                        body   : ImageData
                    }); 

                    let Upload_image_response = await Upload_image.json() ; 
                    setImageFile2(Upload_image_response.url) ; 

                    ToastAndroid.show("Upload product image2 successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ;
                    
                } 
            }catch{
             
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            } 

            try {
                
                if (imageFile3Data != ""){
                    
                    // ===== Upload product image1 ===== // 

                    const ImageData = new FormData() ; 
                    ImageData.append('file', imageFile3Data); 
                    ImageData.append('upload_preset', 'DevileCafe_product'); 
                    ImageData.append('cloud_name', 'dsc8egt36'); 
                    
                    let Upload_image = await fetch('https://api.cloudinary.com/v1_1/dsc8egt36/image/upload', {
                        method : 'post',
                        headers:{
                            'Content-Type': 'multipart/form-data' 
                        }, 
                        body   : ImageData
                    }); 

                    let Upload_image_response = await Upload_image.json() ; 
                    setImageFile3(Upload_image_response.url) ; 

                    ToastAndroid.show("Upload product image3 successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ;
                    
                } 
            }catch{
             
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }

            // ===== Upload Product request  ==== // 

            let Request_url = URL.Authentication_url ; 
                        
            let Request_data = {
                "Check_status": "Upload-product", 
                "Product_information": productInformation, 
                "Product_image1": image1File, 
                "Product_image2": image2File == ''?'None':image2File,
                "Product_image3": imageFile3 == ''?'None':imageFile3,  
                "Product_retail_price": productRetailPrice, 
                "Product_discount_price": productDiscountPrice, 
                "Product_flavour": selectFlavour == ""?flavour:selectFlavour, 
                "Product_bread": selectedBread == ""?bread:selectedBread,
                "Product_cream": selectCream == ""?cream:selectCream, 
                "Category_id": data.Category_data
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

            if (Response_status == "Upload product"){

                ToastAndroid.show("Upload product successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

                navigation.goBack() ; 
                
            }else{

                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }

        }

        setIndicatorValue(false) ; 
    }

    if (loadFont){

        return(
    
            <View style={UploadProductStyle.UploadProductScreen}>
    
                {/* StatusBar component  */}
    
                <StatusbarComponent
                    color={colorCode.Authentication_statusBar_color}
                />
    
                {/* ==== Upload product title ====  */}
                
                <TextComponent 
                    TextValue={"➕ Upload Product in " + data.Category_name} 
                    TextFamily = "Ubuntu"
                    TextSize = {20}
                    TextColor = {colorCode.Authentication_title_color}
                    TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop: 15}}
                />

                {/* ====== All input value ======  */}

                <ScrollView style={UploadProductStyle.UploadProduct_inputLayout}
                    showsVerticalScrollIndicator = {false}>
                    
                    {/* ====== Start to select Product Image =======  */}

                    {/* Title  */}

                    <TextComponent 
                        TextValue="Product images" 
                        TextFamily = "Ubuntu"
                        TextSize = {19}
                        TextColor = "#2c2c2c"
                        TextStyle = {{marginTop: 10}}
                    />

                    {/* Product image select information  */}

                    <TextComponent

                        TextValue = "First image show as home image . You can select upto 3 images"
                        TextFamily = "Sans"
                        TextColor = "#6d6d6d"
                        TextSize = {18}
                        TextStyle = {{marginTop: 5}}
                    />
                    
                    {/* Product images upto show 3 images  */}

                    <ScrollView style={UploadProductStyle.All_product_image_layout} horizontal>
                    
                        {imageFile.map((element, index) => {
                            return(

                                <View style={UploadProductStyle.Product_image_layout}
                                    key = {index}>

                                    {/* Close option  */}

                                    <Pressable style={UploadProductStyle.Product_close_option_layout}
                                        onPress = {(index) => Image_file_remover(index)}>

                                        <Image
                                            style = {UploadProductStyle.Product_close_option_image}
                                            source={require('../../assets/Images/Close.png')}
                                        />
                                    
                                    </Pressable>

                                    {/* Product image  */}

                                    <Image

                                        style = {UploadProductStyle.Upload_product_image}
                                        source={{uri:element}}
                                    />

                                </View>
                            )
                        })}
                    
                    </ScrollView>

                    {/* ===== Product image picker ====  */}

                    <Pressable style={[style.Authentication_button, {marginTop: 10}]}
                        onPress = {Image_file_picker}>
                    
                        <TextComponent
                            TextValue = "Select image"
                            TextFamily = "Mukta"
                            TextColor = "#ffffff"
                            TextSize = {18}
                        />
                    
                    </Pressable>

                    {/* ======= Stop Select Product image option =======  */}
                    
                    {/* ===== Product Information ======  */}

                    <TextInput
                        style = {[UploadProductStyle.InputWidget, {borderWidth: productInfoBorder?1:0, marginTop: 15}]}
                        allowFontScaling = {false}
                        cursorColor = {colorCode.Authentication_subtitle_color}

                        placeholder = "Enter Product information"
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}

                        onFocus = {() => FocusHandler(0)}
                        value = {productInformation}
                        onChangeText = {(value) => setProductInformation(value)}
                    />

                    {/* ====== Start Product price related layout ======  */}
                
                    {/* Title  */}

                    <TextComponent 
                    
                        TextValue="₹ Product price info" 
                        TextFamily = "Ubuntu"
                        TextSize = {22}
                        TextColor = {colorCode.Authentication_title_color}
                        TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop: 5}}
                    />

                    {/* Information  */}

                    <TextComponent

                        TextValue = "All cake price calculated base on 500gm cake price."
                        TextFamily = "Sans"
                        TextColor = "#3c3c3c"
                        TextSize = {17}
                        TextStyle = {{marginTop:12}}
                    />

                    {/* ---- 500 gm cake price information ----    */}

                    <View style={UploadProductStyle.ProductPriceLayout}>

                        {/* Cake wight information  */}

                        <View style={{alignItems:'baseline', marginTop: "auto", marginBottom:"auto"}}>

                            <TextComponent

                                TextValue = "500gm"
                                TextFamily = "Mukta"
                                TextSize = {16}
                                TextColor = "#2c2c2c"
                                TextStyle = {{backgroundColor:colorCode.Authentication_input_color, 
                                    paddingTop: 5, 
                                    paddingBottom:5,
                                    paddingLeft:10, 
                                    paddingRight: 10, 
                                    borderRadius: 5}}
                            />

                        </View>

                        {/* Cake discount price information  */}

                        <View style={{alignItems:'baseline', marginTop: "auto", marginBottom:"auto"}}>

                            <TextComponent
                                TextValue = {Price500Disocunt}
                                TextFamily = "Sans"
                                TextColor = "#2c2c2c"
                                TextSize = {20}
                                TextStyle = {{marginLeft: 10, marginTop:"auto", marginBottom:"auto"}}
                            />
                        
                        </View>
                        
                        {/* Cake retail price information  */}

                        <View style={{alignItems:'baseline', marginTop: "auto", marginBottom:"auto"}}>

                            <TextComponent
                                TextValue = {Price500Retail}
                                TextFamily = "Sans"
                                TextColor = "#2c2c2c"
                                TextSize = {20}
                                TextStyle = {{marginLeft: 10, marginTop:"auto", marginBottom:"auto", 
                                    textDecorationLine: 'line-through'}}
                            />
                        
                        </View>

                    </View>

                    {/* ---- 1KG cake price information ----  */}

                    <View style={UploadProductStyle.ProductPriceLayout}>

                        <View style={{alignItems:'baseline', marginTop: "auto", marginBottom:"auto"}}>

                            <TextComponent
                                TextValue = "1KG"
                                TextFamily = "Mukta"
                                TextSize = {16}
                                TextColor = "#2c2c2c"
                                TextStyle = {{backgroundColor:colorCode.Authentication_input_color, 
                                    paddingTop: 5, 
                                    paddingBottom:5,
                                    paddingLeft:10, 
                                    paddingRight: 10, 
                                    borderRadius: 5}}
                            />
                        </View>

                        <View style={{alignItems:'baseline', marginTop: "auto", marginBottom:"auto"}}>

                            <TextComponent
                                TextValue =  {Price1KGDisocunt}
                                TextFamily = "Sans"
                                TextColor = "#2c2c2c"
                                TextSize = {20}
                                TextStyle = {{marginLeft: 10, marginTop:"auto", marginBottom:"auto"}}
                            />
                        
                        </View>
                        
                        <View style={{alignItems:'baseline', marginTop: "auto", marginBottom:"auto"}}>

                            <TextComponent
                                TextValue = {Price1KGRetail}
                                TextFamily = "Sans"
                                TextColor = "#2c2c2c"
                                TextSize = {20}
                                TextStyle = {{marginLeft: 10, marginTop:"auto", marginBottom:"auto", 
                                    textDecorationLine: 'line-through'}}
                            />
                        
                        </View>

                    </View>

                    {/* ---- 2KG cake price information ----  */}

                    <View style={UploadProductStyle.ProductPriceLayout}>

                        <View style={{alignItems:'baseline', marginTop: "auto", marginBottom:"auto"}}>

                            <TextComponent
                                TextValue = "2KG"
                                TextFamily = "Mukta"
                                TextSize = {16}
                                TextColor = "#2c2c2c"
                                TextStyle = {{backgroundColor:colorCode.Authentication_input_color, 
                                    paddingTop: 5, 
                                    paddingBottom:5,
                                    paddingLeft:10, 
                                    paddingRight: 10, 
                                    borderRadius: 5}}
                            />
                        </View>

                        <View style={{alignItems:'baseline', marginTop: "auto", marginBottom:"auto"}}>

                            <TextComponent
                                TextValue = {Price2KGDisocunt}
                                TextFamily = "Sans"
                                TextColor = "#2c2c2c"
                                TextSize = {20}
                                TextStyle = {{marginLeft: 10, marginTop:"auto", marginBottom:"auto"}}
                            />
                        
                        </View>
                        
                        <View style={{alignItems:'baseline', marginTop: "auto", marginBottom:"auto"}}>

                            <TextComponent
                                TextValue = {Price2KGRetail}
                                TextFamily = "Sans"
                                TextColor = "#2c2c2c"
                                TextSize = {20}
                                TextStyle = {{marginLeft: 10, marginTop:"auto", marginBottom:"auto", 
                                    textDecorationLine: 'line-through'}}
                            />
                        
                        </View>

                    </View>
                    
                    {/* ---- 3KG cake price information ----  */}

                    <View style={UploadProductStyle.ProductPriceLayout}>

                        <View style={{alignItems:'baseline', marginTop: "auto", marginBottom:"auto"}}>

                            <TextComponent
                                TextValue = "3KG"
                                TextFamily = "Mukta"
                                TextSize = {16}
                                TextColor = "#2c2c2c"
                                TextStyle = {{backgroundColor:colorCode.Authentication_input_color, 
                                    paddingTop: 5, 
                                    paddingBottom:5,
                                    paddingLeft:10, 
                                    paddingRight: 10, 
                                    borderRadius: 5}}
                            />
                        </View>

                        <View style={{alignItems:'baseline', marginTop: "auto", marginBottom:"auto"}}>

                            <TextComponent
                                TextValue = {Price3KGDisocunt}
                                TextFamily = "Sans"
                                TextColor = "#2c2c2c"
                                TextSize = {20}
                                TextStyle = {{marginLeft: 10, marginTop:"auto", marginBottom:"auto"}}
                            />
                        
                        </View>
                        
                        <View style={{alignItems:'baseline', marginTop: "auto", marginBottom:"auto"}}>

                            <TextComponent
                                TextValue = {Price3KGRetail}
                                TextFamily = "Sans"
                                TextColor = "#2c2c2c"
                                TextSize = {20}
                                TextStyle = {{marginLeft: 10, marginTop:"auto", marginBottom:"auto", 
                                    textDecorationLine: 'line-through'}}
                            />
                        
                        </View>

                    </View>

                    {/* ====== Cake retail price input ======  */}

                    <TextInput
                        style = {[UploadProductStyle.InputWidget, {borderWidth: productRetailBorder?1:0, marginTop: 8}]}
                        allowFontScaling = {false}
                        cursorColor = {colorCode.Authentication_subtitle_color}
                        keyboardType = "phone-pad"

                        placeholder = "Enter Product retail price"
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}

                        onFocus = {() => FocusHandler(1)}
                        value = {productRetailPrice}
                        onChangeText = {(value) => Retail_price_input(value)}
                    />

                    {/* ======= Cake discount price input ========  */}

                    <TextInput
                        style = {[UploadProductStyle.InputWidget, {borderWidth: productDiscountBorder?1:0, marginTop: 8}]}
                        allowFontScaling = {false}
                        cursorColor = {colorCode.Authentication_subtitle_color}
                        keyboardType = "phone-pad"

                        placeholder = "Enter Product discount price"
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}

                        onFocus = {() => FocusHandler(2)}
                        value = {productDiscountPrice}
                        onChangeText = {(value) => Discount_price_input(value)}
                    />

                    {/* ====== Stop product price view layout =======  */}

                    
                    {/* ------ Input value priority information ------  */}

                    <TextComponent

                        TextValue = "First priority consider to selected option than manully enter value consider"
                        TextFamily = "Sans"
                        TextColor = "#3c3c3c"
                        TextSize = {17}
                        TextStyle = {{marginTop:8, marginBottom:8}}
                    />

                    {/* ======= Start Flavour layout ========  */}

                    {/* Title  */}

                    <TextComponent 
                    
                        TextValue="Cake flavour" 
                        TextFamily = "Ubuntu"
                        TextSize = {19}
                        TextColor = {colorCode.Authentication_title_color}
                        TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop: 5}}
                    />

                    {/* ---- All cake flavour option ----  */}

                    <View style = {{display:"flex", textAlign:"center", flexDirection:"row", marginTop: 20}}>

                        {/* Chocolate option  */}

                        <Pressable style={[UploadProductStyle.SelectionOption, 
                            {   backgroundColor:flavour1?colorCode.Authentication_button_color:colorCode.Authentication_input_color }]}
                            onPress = {() => flavour_selection_handler(0)}>

                            <TextComponent
                                TextValue = "Chocolate"
                                TextFamily = "Ubuntu"
                                TextSize = {16}
                                TextColor = {flavour1?'#ffffff':'#2c2c2c'}
                            />

                        </Pressable>
                        
                        {/* Vanila option  */}

                        <Pressable style={[UploadProductStyle.SelectionOption, 
                            {   backgroundColor:flavour2?colorCode.Authentication_button_color:colorCode.Authentication_input_color }]}
                            onPress = {() => flavour_selection_handler(1)}>

                            <TextComponent
                                TextValue = "Vanila"
                                TextFamily = "Ubuntu"
                                TextSize = {16}
                                TextColor = {flavour2?'#ffffff':'#2c2c2c'}
                            />

                        </Pressable>
                        
                        {/* Storbary option / */}

                        <Pressable style={[UploadProductStyle.SelectionOption, 
                            {   backgroundColor:flavour3?colorCode.Authentication_button_color:colorCode.Authentication_input_color }]}
                            onPress = {() => flavour_selection_handler(2)}>

                            <TextComponent
                                TextValue = "Storbary"
                                TextFamily = "Ubuntu"
                                TextSize = {16}
                                TextColor = {flavour3?'#ffffff':'#2c2c2c'}
                            />

                        </Pressable>
                        
                        {/* Reset option  */}

                        <Pressable style={UploadProductStyle.SelectionOption}
                            onPress = {Flavour_reset}>

                            <TextComponent
                                TextValue = "Reset"
                                TextFamily = "Ubuntu"
                                TextColor = "#ff2020"
                                TextSize = {16}
                            />
                        </Pressable>

                    </View>

                    {/* ---- Manual cake flavour option input ----  */}
                    
                    <TextInput
                        style = {[UploadProductStyle.InputWidget, {borderWidth: flavourBorder?1:0, marginTop: 8}]}
                        allowFontScaling = {false}
                        cursorColor = {colorCode.Authentication_subtitle_color}

                        placeholder = "Manully enter cake flavour"
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}

                        onFocus = {() => FocusHandler(3)}
                        value = {flavour}
                        onChangeText = {(value) => setFlavour(value)}
                    />

                    {/* ===== Stop cake flavout input option ======  */}


                    {/* ====== Start Bread type input option ======  */}

                    {/* Title  */}
                    <TextComponent 
                    
                        TextValue="Bread type" 
                        TextFamily = "Ubuntu"
                        TextSize = {19}
                        TextColor = {colorCode.Authentication_title_color}
                        TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop: 5}}
                    />

                    {/* All selection option  */}
                    
                    <View style = {{display:"flex", textAlign:"center", flexDirection:"row", marginTop: 20}}>

                        {/* Chocolate option  */}

                        <Pressable style={[UploadProductStyle.SelectionOption, 
                            {   backgroundColor:bread1?colorCode.Authentication_button_color:colorCode.Authentication_input_color }]}
                            onPress = {() => Bread_selection_handler(0)}>

                            <TextComponent
                                TextValue = "Chocolate"
                                TextFamily = "Ubuntu"
                                TextSize = {16}
                                TextColor = {bread1?'#ffffff':'#2c2c2c'}
                            />

                        </Pressable>
                        
                        {/* Vanila option  */}

                        <Pressable style={[UploadProductStyle.SelectionOption, 
                            {   backgroundColor:bread2?colorCode.Authentication_button_color:colorCode.Authentication_input_color }]}
                            onPress = {() => Bread_selection_handler(1)}>

                            <TextComponent
                                TextValue = "Vanila"
                                TextFamily = "Ubuntu"
                                TextSize = {16}
                                TextColor = {bread2?'#ffffff':'#2c2c2c'}
                            />

                        </Pressable>
                        
                        {/* Storbary option / */}

                        <Pressable style={[UploadProductStyle.SelectionOption, 
                            {   backgroundColor:bread3?colorCode.Authentication_button_color:colorCode.Authentication_input_color }]}
                            onPress = {() => Bread_selection_handler(2)}>

                            <TextComponent
                                TextValue = "Storbary"
                                TextFamily = "Ubuntu"
                                TextSize = {16}
                                TextColor = {bread3?'#ffffff':'#2c2c2c'}
                            />

                        </Pressable>

                         {/* Reset option  */}

                         <Pressable style={UploadProductStyle.SelectionOption}
                            onPress = {Bread_reset}>

                            <TextComponent
                                TextValue = "Reset"
                                TextFamily = "Ubuntu"
                                TextColor = "#ff2020"
                                TextSize = {16}
                            />
                        </Pressable>

                   </View>
                    
                    {/* ---- Manully bread type entry ----  */}

                    <TextInput
                        style = {[UploadProductStyle.InputWidget, {borderWidth: breadBorder?1:0, marginTop: 8}]}
                        allowFontScaling = {false}
                        cursorColor = {colorCode.Authentication_subtitle_color}

                        placeholder = "Manully enter bread type"
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}

                        onFocus = {() => FocusHandler(4)}
                        value = {bread}
                        onChangeText = {(value) => setBread(value)}
                    />
                    
                    {/* ====== Stop bread type input option =======  */}

                    {/* ====== Start cream type input option ======  */}

                    {/* Title  */}
                    
                    <TextComponent 
                    
                        TextValue="Cream type" 
                        TextFamily = "Ubuntu"
                        TextSize = {19}
                        TextColor = {colorCode.Authentication_title_color}
                        TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop: 5}}
                    />

                    {/* All selection option / */}

                    <View style = {{display:"flex", textAlign:"center", flexDirection:"row", marginTop: 20}}>
                        
                        {/* Chocolate option  */}

                        <Pressable style={[UploadProductStyle.SelectionOption, 
                            {   backgroundColor:cream1?colorCode.Authentication_button_color:colorCode.Authentication_input_color }]}
                            onPress = {() => Cream_selection_handler(0)}>

                            <TextComponent
                                TextValue = "Chocolate"
                                TextFamily = "Ubuntu"
                                TextSize = {16}
                                TextColor = {cream1?'#ffffff':'#2c2c2c'}
                            />

                        </Pressable>
                        
                        {/* Vanila option  */}

                        <Pressable style={[UploadProductStyle.SelectionOption, 
                            {   backgroundColor:cream2?colorCode.Authentication_button_color:colorCode.Authentication_input_color }]}
                            onPress = {() => Cream_selection_handler(1)}>

                            <TextComponent
                                TextValue = "Vanila"
                                TextFamily = "Ubuntu"
                                TextSize = {16}
                                TextColor = {cream2?'#ffffff':'#2c2c2c'}
                            />

                        </Pressable>
                        
                        {/* Storbary option / */}

                        <Pressable style={[UploadProductStyle.SelectionOption, 
                            {   backgroundColor:cream3?colorCode.Authentication_button_color:colorCode.Authentication_input_color }]}
                            onPress = {() => Cream_selection_handler(2)}>

                            <TextComponent
                                TextValue = "Storbary"
                                TextFamily = "Ubuntu"
                                TextSize = {16}
                                TextColor = {cream3?'#ffffff':'#2c2c2c'}
                            />

                        </Pressable>

                         {/* Reset option  */}

                         <Pressable style={UploadProductStyle.SelectionOption}
                            onPress = {Cream_reset}>

                            <TextComponent
                                TextValue = "Reset"
                                TextFamily = "Ubuntu"
                                TextColor = "#ff2020"
                                TextSize = {16}
                            />
                        </Pressable>

                        

                    </View>

                    {/* ----- Cream input widget ----  */}

                    <TextInput
                        style = {[UploadProductStyle.InputWidget, {borderWidth: creamBorder?1:0, marginTop: 8}]}
                        allowFontScaling = {false}
                        cursorColor = {colorCode.Authentication_subtitle_color}

                        placeholder = "Manully enter cream type"
                        placeholderTextColor= {colorCode.Authentication_subtitle_color}

                        onFocus = {() => FocusHandler(5)}
                        value = {cream}
                        onChangeText = {(value) => setCream(value)}
                    />


                    {/* ====== Stop cream type input option ======  */}


                    {/* ======== Upload product option =======  */}
                    
                    {indicatorValue?<>
                        <View style={[style.Authentication_button, {paddingTop:7, paddingBottom: 7, width: '100%'}]}>
                            <ActivityIndicator size= "large"
                                color= {colorCode.Authentication_button_textColor}/>
                        </View>
                    </>
                    :<>
                        <Pressable style={[style.Authentication_button, {marginBottom: 20}]}
                            onPress = {Upload_product}
                            android_ripple = {{color:colorCode.Authentication_button_ripper_color}}>

                            <TextComponent
                                TextValue = "Update product"
                                TextFamily = "Ubuntu"
                                TextSize = {20}
                                TextColor = "#ffffff"
                            />
                    
                        </Pressable>
                    </>

                    }
                </ScrollView>

            </View>
        
        )
        
    }

}

const UploadProductStyle = new StyleSheet.create({
    UploadProductScreen: {
        ...style.AuthenticationScreen_style
    }, 

    UploadProduct_inputLayout:{
        marginTop: 15
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
        ...style.Authentication_inputWidget
    }, 

    ProductPriceLayout:{
        marginTop: 13, 
        display: 'flex', 
        textAlign: 'center',
        flexDirection: 'row', 
        height: 40, 
        width: '50%'
    }, 

    SelectionOption:{
        backgroundColor: colorCode.Authentication_input_color, 
        padding: 10, 
        borderRadius: 5, 
        marginRight: 10
    }

})
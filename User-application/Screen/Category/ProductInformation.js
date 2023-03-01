import React, {useState, useEffect, useRef} from "react";
import { View, StyleSheet,ScrollView, 
    Pressable, ActivityIndicator, Image, ToastAndroid, 
    Dimensions, TextInput} from "react-native";

// **** Colorcode and ScreenStyle **** // 
import * as colorCode from '../../Color-code/Color-codes' ; 
import * as style from '../../Style/AuthenticationStyle' ; 

// **** Text and StatusBar component **** // 
import TextComponent from "../../Component/TextComp";
import StatusbarComponent from '../../Component/StatusbarComp' ; 

// **** Import require packages **** // 
import * as Navigationbar from 'expo-navigation-bar' ;
import * as Font from 'expo-font' ;  
import {FlatListSlider} from 'react-native-flatlist-slider';
import HomePreview from '../Slider/ProductSlider' ; 
import * as URL from '../../URL/RequestURL' ; 

// **** Import react native webview **** //
import { SkypeIndicator } from "react-native-indicators";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProductInformation({navigation, route}){

    const {Category_id, Product_id}  = route.params ; 

    // ---- Set NavigationBar color ---- //

    Navigationbar.setBackgroundColorAsync('#ffffff');

    const [loadFont, setLoadFont] = useState(false);

    const ProductOption_imageWidth = (Dimensions.get('window').width*0.43) ; 


    const [Product_image, setProduct_image] = useState([]) ; 
    
    // --- Name on cake input ---- // 

    const [nameBorder, setNameBorder] = useState(false) ; 
    const [cakeName, setCakeName] = useState('') ; 

    const [Product_information, setProduct_information] = useState('') ; 

    const [Product_discount_price, setProduct_discount_price] = useState('') ; 

    const [Product_retail_price, setProduct_retail_price] = useState('') ; 

    const [Product_discount, setProduct_discount] = useState('') ; 

    const [Cake_flavour, setCake_flavour] = useState('') ; 

    const [Cake_bread, SetCake_bread] = useState('') ; 

    const [Cake_cream, setCake_cream] = useState('') ; 

    const [Similar_product, setSimilarProduct] = useState([]) ; 

    const [watchlist_count, setWacthlist_count] = useState() ; 

    const [Loading_layout, setLoading_layout] = useState(false) ; 

    useEffect(() => {

        // ===== Function load font ===== // 

        const LoadFont = async () => {

            await Font.loadAsync({
                
                Mukta: require("../../assets/Fonts/MerriweatherSans-Regular.ttf"),
                Sans: require("../../assets/Fonts/SourceSansPro-Regular.ttf"),
                Ubuntu: require("../../assets/Fonts/Ubuntu-Medium.ttf"),
                Roboto: require("../../assets/Fonts/Roboto-Medium.ttf"),
            
            });

            setLoadFont(true);
        };

        // ===== Function which Fetch Particular product information ====== // 

        const Fetch_product_information = async () => {

            try{

                let User_table_name = await AsyncStorage.getItem("Table") ; 

                let Request_url = URL.Authentication_request_url ; 
                
                let Request_data = {
                    "Check_status":"Fetch-particular-product", 
                    "Category_id": Category_id, 
                    "Product_id": Product_id, 
                    "user_id" : User_table_name 
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

                    // ====== Set Product images ====== // 

                    setProduct_image([...Product_image, {"image":Response.Product[0].Product_image1}]) ; 
                    
                    if (Response.Product[0].Product_image2 != "None"){

                        setProduct_image([...Product_image, {"image":Response.Product[0].Product_image2}]) ; 
                    }
                    
                    if (Response.Product[0].Product_image3 != "None"){

                        setProduct_image([...Product_image, {"image":Response.Product[0].Product_image3}]) ; 
                    }
                    
                    setProduct_information(Response.Product[0].Product_information) ; 

                    setProduct_discount_price(Response.Product[0].Product_discount_price) ; 

                    setProduct_retail_price(Response.Product[0].Product_retail_price) ; 

                    setCake_flavour(Response.Product[0].Product_flavour) ; 

                    SetCake_bread(Response.Product[0].Product_bread) ; 

                    setCake_cream(Response.Product[0].Product_cream) ; 

                    setProduct_discount((100*(Product_retail_price-Product_discount_price))/Product_retail_price) ; 
                    
                    setSimilarProduct([...Response.Similar_product]) ; 

                    setWacthlist_count(Response.Watchlist) ; 

                }

            }catch{

                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
        }

        LoadFont();

        Fetch_product_information()  ; 


    }, []) ; 

    // ===== Product weight selection ===== // 

    const [weight500, setWeight500] = useState(false) ; 
   
    const [weight750, setWeight750] = useState(false) ; 
   
    const [weight1, setWeight1] = useState(false) ; 
   
    const [weight15, setWeight15] = useState(false) ; 
   
    const [weight2, setWeight2] = useState(false) ; 
   
    const [weight3, setWeight3] = useState(false) ;  

    const Weight_focus_handler = (x) => {

        setWeight500(false) ; 

        setWeight750(false) ;

        setWeight1(false) ; 

        setWeight15(false) ; 

        setWeight2(false) ; 

        setWeight3(false) ; 

        if (x == 0){

            setWeight500(true) ; 
        }else if (x == 1){
            
            setWeight750(true) ;
        }else if (x == 2){

            setWeight1(true) ; 
        }else if (x == 3){

            setWeight15(true) ; 
        }else if (x == 4){

            setWeight2(true) ; 
        }else{

            setWeight3(true) ; 
        }
    }

    // ===== Function for Add product to watchlist ====== // 

    const Add_to_watchlist = async () => {

        setLoading_layout(true) ; 

        try{

            let User_table_name = await AsyncStorage.getItem("Table") ; 

            let Request_url = URL.Authentication_request_url ; 
            
            let Request_data = {
                "Check_status":"Insert-watchlist-product", 
                "Category_id": Category_id, 
                "Product_id": Product_id, 
                "User_table" : User_table_name 
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

                setLoading_layout(false) ; 

                setWacthlist_count(1) ; 

                ToastAndroid.show("Insert Product into Watchlist", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

            }

        }catch{

            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }

    // ====== Function for Remove pproduct from watchlist ===== // 

    const Remove_to_watchlist = async () => {

        setLoading_layout(true) ; 

        try{

            let User_table_name = await AsyncStorage.getItem("Table") ; 

            let Request_url = URL.Authentication_request_url ; 
            
            let Request_data = {
                "Check_status":"Remove-watchlist-product", 
                "Category_id": Category_id, 
                "Product_id": Product_id, 
                "User_table" : User_table_name 
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

            if (Response_status == "Remove"){

                setLoading_layout(false) ; 

                setWacthlist_count(0) ; 

                ToastAndroid.show("Remove Product from Watchlist", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

            }

        }catch{

            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }

    // ===== Function which add product into cart ====== // 

    const Add_to_cart = async () => {

        if (cakeName == ""){

            ToastAndroid.show("Please, Enter name on cake", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        
        }else if  (weight500 == false && weight750 == false && weight1 == false && weight15 == false && weight2 == false && weight3 == false){

            ToastAndroid.show("Please, Select cake weight", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }else{

            try{

                setLoading_layout(true) ; 

                let CakeWeight ; 

                if (weight500 == true){

                    CakeWeight = "500gm" ; 

                }else if (weight750 == true){

                    CakeWeight = "750gm" ; 

                }else if (weight1 == true){

                    CakeWeight = "1KG" ; 

                }else if (weight15 == true){

                    CakeWeight = "1.5KG" ; 

                }else if (weight2 == true) {

                    CakeWeight = "2KG" ; 

                }else{

                    CakeWeight = "3KG" ; 
                }

                let User_table_name = await AsyncStorage.getItem("Table") ; 

                let Request_url = URL.Authentication_request_url ; 
                
                let Request_data = {
                    "Check_status":"Insert-cart-product", 
                    "Category_id": Category_id, 
                    "Product_id": Product_id, 
                    "User_id" : User_table_name,
                    "Product_name": cakeName, 
                    "Product_weight":  CakeWeight
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

                    setLoading_layout(false) ; 

                    setCakeName('') ; 

                    setWeight500(false) ; 
                    
                    setWeight750(false) ; 
                    
                    setWeight1(false) ; 
                    
                    setWeight15(false) ; 

                    setWeight2(false) ; 

                    setWeight3(false) ; 

                    ToastAndroid.show("Insert Product into cart", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

                    navigation.goBack() ; 
                    
                }
                
    
            }catch{
    
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
        }
    }

    if (loadFont){

        return(
            
            <View style={ProuductInformationStyle.ProductInformationLayout}>

                {/* Stastubar component  */}

                <StatusbarComponent
                    color = {colorCode.Authentication_button_color}
                />

                {/* ===== Back option layout =====  */}

                <View style={ProuductInformationStyle.TitleLayout}>
    
                    {/* Menu option  */}

                    <Pressable style={ProuductInformationStyle.MenuOptionLayout}
                        android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                        onPress = {() => navigation.goBack() }>

                        <Image
                            style = {ProuductInformationStyle.MenuImage}
                            source={require('../../assets/Images/Other_back.png')}/>

                    </Pressable>

                    {/* Category option title  */}

                    <TextComponent
                        TextValue = "Product"
                        TextFamily = "Mukta"
                        TextColor = {colorCode.HomeScreen_title_color}
                        TextSize = {20}
                        TextStyle = {{marginTop: "auto", marginBottom:"auto", marginLeft:10}}
                    />
    
                </View>

                {/* ======= Loading layout =======  */}

                {Loading_layout?<>
                
                    <View style={ProuductInformationStyle.LoadingLayout}>
                        <SkypeIndicator></SkypeIndicator>
                    </View>
                
                </>:<></>}

                {/* ======= Product information layout =====  */}
                
                <ScrollView>

                    {/* ==== Product images slider ====  */}

                    <View style={{marginTop:10, paddingBottom:10}}>

                        {Product_image.length>0?<>
                        
                            <FlatListSlider 
                                data={Product_image} 
                                component = {<HomePreview/>}
                                autoscroll = {false}
                            />
                        </>:<></>}
                        
                    </View>

                    {/* ===== Product information =====  */}

                    <View style={ProuductInformationStyle.ProductData}>

                        {/* ===== Product description =====  */}

                        <TextComponent
                            TextValue = {Product_information}
                            TextFamily = "Ubuntu"
                            TextSize = {19}
                            TextColor = {colorCode.Authentication_title_color}
                        />

                        {/* ===== Product price information ====  */}

                        <View style={ProuductInformationStyle.ProductPrice}>

                            <TextComponent
                                TextValue = {"₹" + Product_discount_price + "/-"}
                                TextFamily = "Ubuntu"
                                TextColor = {colorCode.Authentication_title_color}
                                TextSize = {28}
                            />

                            <View style={ProuductInformationStyle.ProductDiscountPriceData}>

                                <View style={ProuductInformationStyle.ProductDiscountPirceInformation}>

                                    <TextComponent
                                        TextValue = {"₹" + Product_retail_price + "/-"}
                                        TextFamily = "Ubuntu"
                                        TextColor = {colorCode.Authentication_title_color}
                                        TextSize = {19}
                                        TextStyle = {{marginTop:"auto", marginBottom:"auto"}}
                                    />

                                    <TextComponent
                                        TextValue = {((100*(Product_retail_price-Product_discount_price))/Product_retail_price) + "% off"}
                                        TextFamily = "Ubuntu"
                                        TextColor = "#0f8a0f"
                                        TextSize = {17}
                                        TextStyle = {{marginTop:"auto", marginBottom:"auto", marginLeft: 8}}
                                    />

                                </View>

                                <TextComponent
                                    TextValue = "Inclusive of all taxes"
                                    TextFamily = "Sans"
                                    TextColor = {colorCode.Authentication_subtitle_color}
                                    TextSize = {18}
                                    TextStyle = {{marginTop: 5, marginBottom:"auto"}}
                                />



                            </View>


                        </View>

                        {/* ==== Name on cake input ====  */}

                        <TextInput
                            style = {[style.Authentication_inputWidget, 
                                {   borderWidth:nameBorder?1:0,
                                    backgroundColor: '#ffffff',
                                    marginTop: 13}]}
                            
                            allowFontScaling = {false}
                            keyboardType = "default"
                            cursorColor= {colorCode.Authentication_subtitle_color}

                            placeholder = "Name on cake"
                            placeholderTextColor= {colorCode.Authentication_subtitle_color}
                            
                            onFocus = {() => setNameBorder(true)}
                            value = {cakeName}
                            onChangeText = {(value) => setCakeName(value)}
                        />

                        {/* ==== Cake weight input value ====  */}

                        <TextComponent
                            TextValue = "Cake weight"
                            TextFamily = "Ubuntu"
                            TextSize = {18}
                            TextColor = {colorCode.Authentication_subtitle_color}
                        />

                        {/* All weight selection option  */}
                        
                        <View style = {{display:"flex", textAlign:"center", flexDirection:"row", flexWrap:"wrap" , 
                            marginTop: 12}}>
                            
                            {/* 500gm weight option  */}

                            <Pressable style={[ProuductInformationStyle.SelectionOption, 
                                {backgroundColor:weight500?colorCode.Authentication_button_color:'#ffffff' }]}
                                onPress = {() => Weight_focus_handler(0)}>

                                <TextComponent
                                    TextValue = "500gm"
                                    TextFamily = "Ubuntu"
                                    TextSize = {16}
                                    TextColor = {weight500?'#ffffff':'#2c2c2c'}
                                />

                            </Pressable>

                            {/* 750gm weight option  */}

                            <Pressable style={[ProuductInformationStyle.SelectionOption, 
                                {backgroundColor:weight750?colorCode.Authentication_button_color:'#ffffff' }]}
                                onPress = {() => Weight_focus_handler(1)}>

                                <TextComponent
                                    TextValue = "750gm"
                                    TextFamily = "Ubuntu"
                                    TextSize = {16}
                                    TextColor = {weight750?'#ffffff':'#2c2c2c'}
                                />

                            </Pressable>

                            {/* 1KG cake option  */}

                            <Pressable style={[ProuductInformationStyle.SelectionOption, 
                                {backgroundColor:weight1?colorCode.Authentication_button_color:'#ffffff' }]}
                                onPress = {() => Weight_focus_handler(2)}>

                                <TextComponent
                                    TextValue = "1KG"
                                    TextFamily = "Ubuntu"
                                    TextSize = {16}
                                    TextColor = {weight1?'#ffffff':'#2c2c2c'}
                                />

                            </Pressable>

                            {/* 1.5 KG cake option  */}
                            
                            <Pressable style={[ProuductInformationStyle.SelectionOption, 
                                {backgroundColor:weight15?colorCode.Authentication_button_color:'#ffffff' }]}
                                onPress = {() => Weight_focus_handler(3)}>

                                <TextComponent
                                    TextValue = "1.5KG"
                                    TextFamily = "Ubuntu"
                                    TextSize = {16}
                                    TextColor = {weight15?'#ffffff':'#2c2c2c'}
                                />

                            </Pressable>

                            {/* 2KG cake option  */}

                            <Pressable style={[ProuductInformationStyle.SelectionOption, 
                                {backgroundColor:weight2?colorCode.Authentication_button_color:'#ffffff' }]}
                                onPress = {() => Weight_focus_handler(4)}>

                                <TextComponent
                                    TextValue = "2KG"
                                    TextFamily = "Ubuntu"
                                    TextSize = {16}
                                    TextColor = {weight2?'#ffffff':'#2c2c2c'}
                                />

                            </Pressable>

                            {/* 3KG cake option  */}

                            <Pressable style={[ProuductInformationStyle.SelectionOption, 
                                {backgroundColor:weight3?colorCode.Authentication_button_color:'#ffffff' }]}
                                onPress = {() => Weight_focus_handler(5)}>

                                <TextComponent
                                    TextValue = "3KG"
                                    TextFamily = "Ubuntu"
                                    TextSize = {16}
                                    TextColor = {weight3?'#ffffff':'#2c2c2c'}
                                />

                            </Pressable>
                        </View>

                        {/* ===== Product delivery related option =====  */}

                        <View style={ProuductInformationStyle.PosterInformationLayout}>

                            <Image
                                style = {ProuductInformationStyle.PosterImage}
                                source = {require('../../assets/Images/Purchase-protection.jpg')}
                            />

                            <Image
                                style = {ProuductInformationStyle.PosterImage}
                                source = {require('../../assets/Images/Hygenic.jpg')}
                            />

                        </View>

                        {/* ===== Product details division =====  */}

                        <TextComponent
                            TextValue = "Cake description"
                            TextFamily = "Ubuntu"
                            TextSize = {18}
                            TextColor = {colorCode.Authentication_title_color}
                        />

                        {/* Cake flavour information  */}

                        <View style={ProuductInformationStyle.ProductDescription_data}>

                            <TextComponent
                                TextValue = "Cake flavour"
                                TextFamily = "Mukta"
                                TextSize = {16} 
                                TextColor = {colorCode.Authentication_title_color}
                                TextStyle = {{backgroundColor:'#ffffff', 
                                    paddingTop:6, paddingBottom:6, paddingLeft:10, paddingRight:10, 
                                    borderRadius: 5}}
                            />

                            <TextComponent
                                TextValue = {Cake_flavour}
                                TextFamily = "Mukta"
                                TextSize = {16} 
                                TextColor = {colorCode.Authentication_subtitle_color}
                                TextStyle = {{marginLeft:12, marginTop:"auto", marginBottom:"auto"}}
                            />

                        </View>

                        {/* Cake bread information  */}

                        <View style={ProuductInformationStyle.ProductDescription_data}>

                            <TextComponent
                                TextValue = "Cake bread"
                                TextFamily = "Mukta"
                                TextSize = {16} 
                                TextColor = {colorCode.Authentication_title_color}
                                TextStyle = {{backgroundColor:'#ffffff', 
                                    paddingTop:6, paddingBottom:6, paddingLeft:10, paddingRight:10, 
                                    borderRadius: 5}}
                            />

                            <TextComponent
                                TextValue = {Cake_bread}
                                TextFamily = "Mukta"
                                TextSize = {16} 
                                TextColor = {colorCode.Authentication_subtitle_color}
                                TextStyle = {{marginLeft:12, marginTop:"auto", marginBottom:"auto"}}
                            />

                        </View>

                        {/* Cake cream information  */}

                        <View style={[ProuductInformationStyle.ProductDescription_data,{marginBottom:10}]}>

                            <TextComponent
                                TextValue = "Cake cream"
                                TextFamily = "Mukta"
                                TextSize = {16} 
                                TextColor = {colorCode.Authentication_title_color}
                                TextStyle = {{backgroundColor:'#ffffff', 
                                    paddingTop:6, paddingBottom:6, paddingLeft:10, paddingRight:10, 
                                    borderRadius: 5}}
                            />

                            <TextComponent
                                TextValue = {Cake_cream}
                                TextFamily = "Mukta"
                                TextSize = {16} 
                                TextColor = {colorCode.Authentication_subtitle_color}
                                TextStyle = {{marginLeft:12, marginTop:"auto", marginBottom:"auto"}}
                            />

                        </View>

                        {/* ===== Delivery details information =====  */}

                        <View style={ProuductInformationStyle.DeliveryDetails}>

                            <TextComponent
                                TextValue = "Delivery details"
                                TextFamily = "Ubuntu"
                                TextSize = {18}
                                TextColor = {colorCode.Authentication_title_color}
                            />

                            {/* Instrucation1  */}

                            <TextComponent
                                TextValue = "Our delivery boy in a good quality cardboard box hand-delivers the delicious cake."
                                TextFamily = "Mukta"
                                TextSize = {15} 
                                TextColor = {colorCode.Authentication_subtitle_color}
                                TextStyle = {{paddingTop:6, paddingBottom:6, paddingLeft:10, paddingRight:10, 
                                    borderRadius: 5, marginTop: 10}}
                            />

                            {/* Instruction2  */}

                            <TextComponent
                                TextValue = "Candle and knife will be delivered as per the availability"
                                TextFamily = "Mukta"
                                TextSize = {15} 
                                TextColor = {colorCode.Authentication_subtitle_color}
                                TextStyle = {{paddingTop:6, paddingBottom:6, paddingLeft:10, paddingRight:10, 
                                    borderRadius: 5}}
                            />

                        </View>

                        {/* ==== Care instruction ====  */}

                        <View style={ProuductInformationStyle.DeliveryDetails}>

                            <TextComponent
                                TextValue = "Delivery details"
                                TextFamily = "Ubuntu"
                                TextSize = {18}
                                TextColor = {colorCode.Authentication_title_color}
                            />

                            {/* Instrucation1  */}

                            <TextComponent
                                TextValue = "Store the cake in a refrigerator"
                                TextFamily = "Mukta"
                                TextSize = {15} 
                                TextColor = {colorCode.Authentication_subtitle_color}
                                TextStyle = {{
                                    paddingTop:6, paddingBottom:6, paddingLeft:10, paddingRight:10, 
                                    borderRadius: 5, marginTop: 10}}
                            />

                            {/* Instruction2  */}

                            <TextComponent
                                TextValue = "Consume the cake within 24 hours"
                                TextFamily = "Mukta"
                                TextSize = {15} 
                                TextColor = {colorCode.Authentication_subtitle_color}
                                TextStyle = {{
                                    paddingTop:6, paddingBottom:6, paddingLeft:10, paddingRight:10, 
                                    borderRadius: 5}}
                            />

                        </View>

                        {/* ===== Similare product divsiion =====  */}

                        <View style={ProuductInformationStyle.CustomizedCakeOption}
                            android_ripple = {{color: colorCode.Custom_cake_option_layout_ripple_color}}
                            onPress = {() => navigation.navigate("CustomOrder")}>

                            <Image

                                style = {{height: 40, width: 40, borderRadius: 30}}
                                source={require('../../assets/Images/CustomizedCake.jpg')}
                            />

                            <TextComponent
                                TextValue = "Similar Products"
                                TextFamily = "Ubuntu"
                                TextColor = {colorCode.Custom_cake_option_text_color}
                                TextSize = {17}
                                TextStyle = {{marginTop: 'auto', marginBottom: 'auto', marginLeft: 15}}
                            />

                        </View>

                        {/* All Product option  */}

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={ProuductInformationStyle.AllProductOptionLayout} >
                                    
                            {Similar_product.map((element, index) => {
                                return(
                            
                                    <Pressable 
                                        key = {index}>

                                        <View style = {{marginLeft:10}}>

                                            <Image
                                                style = {[ProuductInformationStyle.productImage, {width:ProductOption_imageWidth}]}
                                                source={{uri:element.Product_image1}}
                                            />

                                            <View style={[ProuductInformationStyle.ProductInformation, {width:ProductOption_imageWidth}]}>

                                            <TextComponent

                                                TextValue = {element.Product_information}
                                                TextFamily = "Mukta"
                                                TextColor = {colorCode.Cake_option_text_title_color}
                                                TextSize = {14}
                                                TextStyle = {{width:'100%'}}
                                            />

                                            <View style={ProuductInformationStyle.ProductPriceBuyNow_option}>

                                                <TextComponent

                                                    TextValue = {"₹" + element.Product_discount_price +  "/-"}
                                                    TextFamily = "Sans"
                                                    TextColor = {colorCode.Cake_option_price_text_color}
                                                    TextSize = {18}
                                                />

                                            </View>

                                            </View>

                                        </View>

                                    </Pressable>

                                )
                            })}

                        </ScrollView>

                    </View>
                    

                </ScrollView>

                <View style={ProuductInformationStyle.WatchlistOption}>
                    
                    {/* Add to watchlist option  */}

                    {watchlist_count > 0?<>

                        <Pressable style={[ProuductInformationStyle.WatchList]}
                            onPress = {Remove_to_watchlist}>

                            <TextComponent
                                TextValue = "Remove  watchlist"
                                TextFamily = "Ubuntu"
                                TextSize = {17}
                                TextColor = {'#ff0000'}
                            />

                        </Pressable>


                    </>:<>
                    
                        <Pressable style={ProuductInformationStyle.WatchList}
                            android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                            onPress = {Add_to_watchlist}>

                            <TextComponent
                                TextValue = "Add to watchlist"
                                TextFamily = "Ubuntu"
                                TextSize = {17}
                                TextColor = {'#ffffff'}
                            />
                            
                        </Pressable>
                    
                    </>}


                    {/* Add to cart option  */}

                    <Pressable style={[ProuductInformationStyle.WatchList, {borderLeftWidth:1, borderLeftColor:colorCode.Custom_cake_option_layout_ripple_color}]}
                        onPress = {Add_to_cart}>

                        <TextComponent
                            TextValue = "Add to cart"
                            TextFamily = "Ubuntu"
                            TextSize = {17}
                            TextColor = {'#ffffff'}
                        />

                    </Pressable>

                </View>
                
            </View>   
        )
    }

}

const ProuductInformationStyle = new StyleSheet.create({

    ProductInformationLayout:{
        height: "100%", 
        width: '100%', 
        backgroundColor: colorCode.HomeScreen_bg_color
    }, 

    ProductData : {
        paddingLeft:10, 
        paddingRight:10, 
        paddingTop: 10, 

        borderTopColor: '#dfdfdf', 
        borderTopWidth:1
    }, 

    ProductPrice:{
        display: 'flex', 
        flexDirection:"row", 
        marginTop: 14
    }, 

    ProductDiscountPriceData:{
        marginLeft:20
    }, 

    ProductDiscountPirceInformation:{
        display: "flex", 
        flexDirection:"row"
    }, 

    SelectionOption:{
        backgroundColor: '#ffffff', 
        padding: 10, 
        borderRadius: 5, 
        marginRight: 10, 
        marginBottom: 6
    }, 

    PosterInformationLayout:{
        display: 'flex', 
        textAlign: 'center', 
        flexDirection: 'row'
    }, 

    PosterImage:{
        height: 120, 
        width: '48%', 
        resizeMode: 'contain', 
        marginRight: '2%'
    }, 

    ProductDescription_data:{
        display: 'flex', 
        flexDirection: 'row', 
        marginTop: 13
    }, 

    DeliveryDetails:{
        borderTopColor: '#dfdfdf', 
        borderTopWidth:1, 
        paddingTop: 20,
        paddingBottom: 20
    }, 

    CustomizedCakeOption:{
        backgroundColor: colorCode.Custom_cake_option_layout_bg_color, 
        borderRadius: 10, 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'row', 
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: 10, 
        paddingRight: 10,
        paddingTop: 8,  
        paddingBottom: 8 , 
        justifyContent: 'center'
    },

    AllProductOptionLayout:{
        marginTop: 15, 
        marginBottom: 7, 
        marginRight: 10
    }, 

    ProductMainLayout:{
        backgroundColor: '#ffffff'
    }, 

    ProductLayout:{
        marginRight: '3%'
    }, 

    productImage:{
        height: 170,
        borderTopLeftRadius: 5, 
        borderTopRightRadius: 5
    }, 

    ProductInformation:{
        backgroundColor: '#ffffff', 
        paddingLeft: 5, 
        paddingRight: 5, 
        paddingTop: 5, 
        paddingBottom: 8,
        borderBottomLeftRadius: 5, 
        borderBottomRightRadius: 5
    },

    ProductPriceBuyNow_option:{
        display: 'flex', 
        flexDirection: 'row', 
        marginTop: 7
    }, 

    BuyNowOption :{
        backgroundColor: colorCode.Authentication_button_color , 
        marginLeft: 'auto', 
        marginRight: 5, 
        paddingTop: 4, 
        paddingBottom: 4, 
        paddingLeft: 7,
        paddingRight: 7, 
        borderRadius: 5
    }, 

    WatchlistOption:{
        display: 'flex', 
        flexDirection: 'row'
    }, 

    WatchList:{
        ...style.Authentication_button, 
        width:'50%', 
        borderRadius: 0, 
        paddingTop:13, 
        paddingBottom:13
    }, 

    LoadingLayout:{
        height: '100%', 
        width: '100%', 
        position: 'absolute', 
        zIndex: 10, 
        backgroundColor:"rgba(247, 247, 247, 0.686)"
    }, 

    TitleLayout:{
        backgroundColor: colorCode.HomeScreen_statusbar_color, 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'row', 
        paddingTop:3,
        paddingBottom:3
    }, 

    MenuOptionLayout:{
        paddingTop: 8, 
        paddingBottom: 8, 
        paddingLeft: 10, 
        paddingRight: 10, 
        marginTop: 'auto', 
        marginBottom: 'auto'
    }, 

    MenuImage:{
        height: 30, 
        width:  30
    }, 

})
    
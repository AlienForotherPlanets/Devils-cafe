import React, {useState, useEffect, useRef} from "react";
import { View, StyleSheet,ScrollView, 
    Pressable, ActivityIndicator, Image, ToastAndroid, 
    Dimensions} from "react-native";

// **** Colorcode and ScreenStyle **** // 
import * as colorCode from '../../Color-code/Color-codes' ; 
import * as style from '../../Style/AuthenticationStyle' ; 

// **** Text and StatusBar component **** // 
import TextComponent from "../../Component/TextComp";
import StatusbarComponent from '../../Component/StatusbarComp' ; 

// **** Import require packages **** // 
import * as Navigationbar from 'expo-navigation-bar' ;
import * as Font from 'expo-font' ;  
import AsyncStorage from "@react-native-async-storage/async-storage";

// **** Import Request url ***** // 
import * as URL from '../../URL/RequestURL' ; 

// **** Import react native webview **** //
import { SkypeIndicator } from "react-native-indicators";

export default function CategoryPoroduct({navigation, route}){

    const {Category_data} = route.params ; 

    // ---- Set NavigationBar color ---- //

    Navigationbar.setBackgroundColorAsync('#ffffff');

    const ProductOption_imageWidth = (Dimensions.get('window').width*0.46) ; 

    // ---- Load Font ---- //

    const [loadFont, setLoadFont] = useState(false);

    const [category_porduct, set_category_product] = useState([]) ; 

    const [category_product_layout, set_category_product_layout] = useState(false) ; 

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

        LoadFont();
        
        const Load_category_product_list = async () => {

            set_category_product_layout(false) ; 

            try{

                let Request_url = URL.Authentication_request_url ; 
                
                let Request_data = {
                    "Check_status":"Fetch-category-product", 
                    "Catgeory_id": Category_data.Category_data 
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
                    
                    set_category_product([...Response.Product]) ; 

                    set_category_product_layout(true) ; 


                }

            }catch{

                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
        }

        Load_category_product_list() ; 



    }, []);



    if (loadFont){
        
        return(
            <View style={CategoryProductScreen.CartegoryProductLayout}>
    
                {/* Statusbar component  */}
    
                <StatusbarComponent
                        color = {colorCode.HomeScreen_statusbar_color}
                />
    
                {/* ====== Title option layout ======  */}
                
                <View style={CategoryProductScreen.TitleLayout}>
    
                    {/* Menu option  */}

                    <Pressable style={CategoryProductScreen.MenuOptionLayout}
                        android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                        onPress = {() => navigation.goBack() }>

                        <Image
                            style = {CategoryProductScreen.MenuImage}
                            source={require('../../assets/Images/Other_back.png')}/>

                    </Pressable>

                    {/* Category option title  */}

                    <TextComponent
                        TextValue = {Category_data.Category_name}
                        TextFamily = "Mukta"
                        TextColor = {colorCode.HomeScreen_title_color}
                        TextSize = {20}
                        TextStyle = {{marginTop: "auto", marginBottom:"auto", marginLeft:10}}
                    />
    
                </View>

                {/* ===== All product list =====  */}

                {category_product_layout?
                
                    <ScrollView >

                        <View style={[CategoryProductScreen.AllProductList, {backgroundColor:"transparent"}]}>

                            {category_porduct.length == 0?<>

                                <View style={[CategoryProductScreen.LoadingLayout, {display:"flex", 
                                            alignItems:"center", 
                                            justifyContent:'center', 
                                            height: '100%', 
                                            width:'100%', 
                                            paddingTop: 100,
                                            backgroundColor: 'transparent'}]}>
                            
                                    <Image
                                        style = {{height: 120, width:120, margin:"auto"}}
                                        source={require('../../assets/Images/Notavailable.png')}
                                    />
                            
                                </View>
                            
                            </>:<></>}
                            
                            {category_porduct.map((element, index) => {

                                return(

                                    <Pressable 
                                        key = {index}
                                        onPress = {() => navigation.navigate("ProductInformation", {"Category_id":Category_data.Category_data, "Product_id":element.Product_id})}>

                                        <View style = {{marginLeft:10, width:"46%"}}>

                                            <Image
                                                style = {[CategoryProductScreen.productImage, {width:ProductOption_imageWidth}]}
                                                source={{uri:element.Product_image1}}
                                            />

                                            <View style={[CategoryProductScreen.ProductInformation, {width:ProductOption_imageWidth}]}>

                                            <TextComponent

                                                TextValue = {element.Product_information}
                                                TextFamily = "Mukta"
                                                TextColor = {colorCode.Cake_option_text_title_color}
                                                TextSize = {15}
                                                TextStyle = {{width:'100%'}}
                                            />

                                            <View style={CategoryProductScreen.ProductPriceBuyNow_option}>

                                                <TextComponent

                                                    TextValue = {"₹"+ element.Product_discount_price  +"/-"}
                                                    TextFamily = "Sans"
                                                    TextColor = {colorCode.Cake_option_text_title_color}
                                                    TextSize = {18}
                                                    TextStyle = {{marginTop:"auto", marginBottom:"auto"}}
                                                />

                                                <TextComponent

                                                    TextValue = {"₹" + element.Product_retail_price + "/-"}
                                                    TextFamily = "Sans"
                                                    TextColor = {colorCode.Cake_option_price_text_color}
                                                    TextSize = {18}
                                                    TextStyle = {{  textDecorationLine: 'line-through', 
                                                                    marginLeft:6,
                                                                    marginTop:"auto",
                                                                    marginBottom:"auto"}}
                                                />

                                                <Pressable style={CategoryProductScreen.BuyNowOption}
                                                    android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                                                    onPress = {() => navigation.navigate("ProductInformation", {"Category_id":Category_data.Category_data, "Product_id":element.Product_id})}>

                                                    <TextComponent
                                                        TextValue = "Buy"
                                                        TextFamily = "Mukta"
                                                        TextSize = {15}
                                                        TextColor = "white"
                                                    />
                                                </Pressable>

                                            </View>

                                            </View>

                                        </View>

                                    </Pressable>
                                
                                )
                            })}

                        </View>

                    </ScrollView>
                
                :<>
                
                    <View style={CategoryProductScreen.LoadingLayout}>

                        <SkypeIndicator></SkypeIndicator>
                    </View>
                </>

                }


            </View>
        )

    }
}

const CategoryProductScreen = new StyleSheet.create({
    CartegoryProductLayout:{
        heighht: '100%',
        width: '100%', 
    }, 

    // ---- Option1 Title option layout ---- // 

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

    OptionLayout:{
        display:'flex', 
        flexDirection: 'row', 
        marginLeft:'auto', 
        marginTop: 'auto', 
        marginBottom: 'auto', 
        marginRight: 5
    }, 

    OptionImageLayout:{
        padding: 7, 
        marginTop: 'auto', 
        marginBottom: 'auto'
    },

    AllProductList:{
        display: "flex", 
        flexDirection: "row", 
        flexWrap: 'wrap', 
        marginLeft:"auto", 
        marginRight:"auto",
        width: "99%"
    }, 

    
    productImage:{
        height: 170,
        borderTopLeftRadius: 5, 
        borderTopRightRadius: 5, 
        marginLeft: "auto", 
        marginTop: 8, 
        marginBottom: 8
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
        marginRight: 2, 
        marginTop:"auto", 
        marginBottom:"auto",

        paddingTop: 4, 
        paddingBottom: 4, 
        paddingLeft: 7,
        paddingRight: 7, 
        borderRadius: 5
    }, 

    LoadingLayout:{
        height: '90%'
    }

})
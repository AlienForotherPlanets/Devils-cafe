import React, {useState, useEffect} from "react";
import { View, StatusBar, StyleSheet, Image, Pressable, ScrollView, ToastAndroid } from "react-native";

// **** Colorcode and ScreenStyle **** // 
import * as colorCode from '../../Color-code/Color-codes' ; 
import * as style from '../../Style/AuthenticationStyle' ; 

// **** Text and StatusBar component **** // 
import TextComponent from "../../Component/TextComp";
import StatusbarComponent from '../../Component/StatusbarComp' ; 

// **** Import require packages **** // 
import * as Navigationbar from 'expo-navigation-bar' ;
import * as Font from 'expo-font' ;  
import { SkypeIndicator } from "react-native-indicators";

// ***** Import request URL **** // 
import * as URL from '../../URL/RequestURL' ; 
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CartLayout({navigation}){

    // ---- Set NavigationBar color ---- //

    Navigationbar.setBackgroundColorAsync('#ffffff');
 
    // ---- Load Font ---- //

    const [loadFont, setLoadFont] = useState(false);

    const [cart_item, set_cart_item] = useState([]) ; 

    const [cart_subtotal, set_cart_subtotal] = useState(0) ; 

    const [cart_change, set_cart_change] = useState(0) ; 

    const [cart_product_layout, set_cart_product_layout] = useState(false) ; 

    useEffect(() => {
    
        // ===== Function ---- Load font ======= // 

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

        // ===== Function ----- Load cart item function ======= // 

        const Load_cart_item = async () => {

            let User_table = await AsyncStorage.getItem("Table") ; 
 
            try{

                let Request_url = URL.Authentication_request_url ; 
                
                let Request_data = {
                    "Check_status": "Fetch-cart-item", 
                    "User_id": User_table
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

                    set_cart_item([...Response.Data]) ; 
                    set_cart_subtotal(Response.Subtotal) ; 
                    set_cart_product_layout(true) ; 
                }
    

            }catch{

                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
        }; 

        Load_cart_item() ; 

    }, [cart_change]);

    // ====== Function --- Delete cart item function ======= // 

    const Delete_cart_item = async (Product_id, Category_id) => {

        try{

            let User_table = await AsyncStorage.getItem("Table") ; 

            let Request_url = URL.Authentication_request_url ; 
                
            let Request_data = {
                "Check_status": "Delete-cart-item", 
                "User_id": User_table, 
                "Category_id": Category_id, 
                "Product_id": Product_id
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

            if (Response_status == "Delete product"){

                ToastAndroid.show("Product remove from cart", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

                set_cart_change(cart_change + 1) ; 
            }

        }catch{

        }
    }

    // ===== Function ---- Proceed to buy option handler  ===== // 

    const Procced_to_buy_option_handler = async () => {

        let Order_data = await AsyncStorage.getItem("Order_data") ; 

        if (Order_data == null){

            await AsyncStorage.setItem("Product_data", JSON.stringify(cart_item)) ; 
            await AsyncStorage.setItem("Product_total",  String(cart_subtotal)) ; 

            navigation.navigate("SelectCartAddress", {"Option":"Order"}) ; 
        }
        
    }

    return(
        <View style={CartScreenStyle.CartScreenLayout}>

            {/* Statusbar Component   */}
            <StatusbarComponent
                color = {colorCode.Authentication_button_color}
            />

            {/* BackOption and Title Layout  */}
                
            <View style={CartScreenStyle.BackOptionLayout}>
                    
                {/* Back option  */}

                <Pressable
                    android_ripple={{color:colorCode.Authentication_button_ripper_color}}
                    style = {CartScreenStyle.BackImageLayout}
                    onPress = {() => navigation.goBack()}>
                    
                    <Image
                        style={style.Authentication_BackImage}
                        source={require("../../assets/Images/Other_back.png")}
                    />

                </Pressable>

                {/* Title layout  */}

                <TextComponent
                    TextValue = "Cart"
                    TextSize = {21}
                    TextFamily = "Ubuntu"
                    TextColor = {'#ffffff'}
                    TextStyle = {{marginTop: "auto", marginBottom: 'auto', marginLeft: 4}}
                />

    
            </View>

            {cart_product_layout?<>

                <View style={CartScreenStyle.CartTotalValue}>

                    <TextComponent

                        TextValue = {"Cart total " + cart_subtotal + "/-"}
                        TextFamily = "Ubuntu"
                        TextColor = '#000000'
                        TextSize = {20}
                        TextStyle = {{marginLeft:"auto", marginRight:"auto", }}
                    />
                </View>

                {/* ====== Cart Products =====  */}

                {cart_item.length == 0 ?<>
                    
                    <View style={{display: "flex", height:'80%', width:"100%", justifyContent:"center"}}>

                        <Image
                            style = {{height:150, width: 150, marginLeft:"auto", marginRight:"auto"}}
                            source={require('../../assets/Images/Empty-cart.png')}
                        />

                    </View>

                </>:
                <>
                
                    <ScrollView style={{width: '96%', marginLeft:"auto", marginRight:"auto"}}>

                        {cart_item.map((element, index) => {
                            return(

                                <View style={CartScreenStyle.ProductmainLayout}
                                    key = {index}
                                    >

                                    {/* ====== Product image and description information layout ======  */}

                                    <View style={CartScreenStyle.ProductLayout}>
                                        
                                        {/* ---- Product image ----  */}

                                        <Pressable
                                            onPress = {() => navigation.navigate("ProductInformation", {"Category_id":element.Category_id, "Product_id":element.Product_id})}>

                                            <Image
                                                style = {CartScreenStyle.ProductImage}
                                                source={{uri:element.Product_image1}}
                                            />

                                        </Pressable>


                                        {/* ---- Product description ----  */}

                                        <View style={CartScreenStyle.ProductInformation}>
                                            
                                            {/* Product information  */}

                                            <TextComponent
                                                TextValue = {element.Product_information}
                                                TextFamily = "Mukta"
                                                TextSize = {16}
                                                TextColor = {'#000000'}
                                            />
                                            
                                            {/* Product retail price and Product discount price  */}

                                            <View style = {CartScreenStyle.ProductPrice}>

                                                <TextComponent
                                                    TextValue = {"₹" + element.Product_discount_price}
                                                    TextFamily = "Ubuntu"
                                                    TextColor = {colorCode.Authentication_title_color}
                                                    TextSize = {17}
                                                />
                                                        
                                                <TextComponent
                                                    TextValue = {"₹" + element.Product_retail_price}
                                                    TextColor = {colorCode.Authentication_subtitle_color}
                                                    TextSize = {17}
                                                    TextFamily = "Ubuntu"
                                                    TextStyle = {{textDecorationLine: 'line-through', marginLeft: 15}}
                                                />
                                            </View>

                                            {/* Product flavour informmation  */}

                                            <View style = {CartScreenStyle.ProductPrice}>

                                                <TextComponent
                                                    TextValue = "Flavour |"
                                                    TextFamily = "Ubuntu"
                                                    TextColor = {colorCode.Authentication_title_color}
                                                    TextSize = {16}
                                                />
                                                        
                                                <TextComponent
                                                    TextValue = {element.Product_flavour}
                                                    TextColor = {colorCode.Authentication_subtitle_color}
                                                    TextSize = {16}
                                                    TextFamily = "Ubuntu"
                                                    TextStyle = {{marginLeft: 10}}
                                                />
                                            </View>
                                            
                                            {/* Product bread type information  */}

                                            <View style = {CartScreenStyle.ProductPrice}>

                                                <TextComponent
                                                    TextValue = "Bread |"
                                                    TextFamily = "Ubuntu"
                                                    TextColor = {colorCode.Authentication_title_color}
                                                    TextSize = {16}
                                                />
                                                        
                                                <TextComponent
                                                    TextValue = {element.Product_bread}
                                                    TextColor = {colorCode.Authentication_subtitle_color}
                                                    TextSize = {16}
                                                    TextFamily = "Ubuntu"
                                                    TextStyle = {{marginLeft: 10}}
                                                />
                                            </View>

                                            {/* Name on cake information  */}

                                            <View style = {CartScreenStyle.ProductPrice}>

                                                <TextComponent
                                                    TextValue = "Name on cake |"
                                                    TextFamily = "Ubuntu"
                                                    TextColor = {colorCode.Authentication_title_color}
                                                    TextSize = {15}
                                                />
                                                        
                                                <TextComponent
                                                    TextValue = {element.Product_details[1]}
                                                    TextColor = {colorCode.Authentication_subtitle_color}
                                                    TextSize = {15}
                                                    TextFamily = "Ubuntu"
                                                    TextStyle = {{marginLeft: 10}}
                                                />
                                            </View>
                                            
                                            {/* Product Weight information  */}

                                            <View style = {CartScreenStyle.ProductPrice}>

                                                <TextComponent
                                                    TextValue = "Weight |"
                                                    TextFamily = "Ubuntu"
                                                    TextColor = {colorCode.Authentication_title_color}
                                                    TextSize = {16}
                                                />
                                                        
                                                <TextComponent
                                                    TextValue = {element.Product_details[0]}
                                                    TextColor = {colorCode.Authentication_subtitle_color}
                                                    TextSize = {16}
                                                    TextFamily = "Ubuntu"
                                                    TextStyle = {{marginLeft: 10}}
                                                />
                                            </View>

                                        </View>

                                    </View>

                                    {/* ======= Product delete and Update quantity option ======  */}

                                    <View style={CartScreenStyle.DeleteUpdateOption}>

                                        {/* ----- Product delete option -----  */}

                                        <Pressable style={{marginTop:"auto", marginBottom:"auto", padding: 8}}
                                            android_ripple = {{color:'#ff9d9d'}}
                                            onPress = {() => Delete_cart_item(element.Product_id, element.Category_id) }>
                                        
                                            <Image
                                                style = {CartScreenStyle.DeleteOptionImage}
                                                source= {require('../../assets/Images/Delete.png')}
                                            />
                                        
                                        </Pressable>

                                    </View>

                                </View>

                            )
                        })}
                        
                        
                    </ScrollView>
                
                    {/* ===== Procced to buy option =====  */}

                    <Pressable style={CartScreenStyle.Proceed_to_buy_option}
                        android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                        onPress = {() => Procced_to_buy_option_handler()}>

                        <TextComponent
                            TextValue = "Procced to buy"
                            TextFamily = "Ubuntu"
                            TextSize = {19}
                            TextColor = "#ffffff"
                        />
                    </Pressable>

                </>}
            
            </>:<>
            
                <View style={CartScreenStyle.Loading_layout}>
                    <SkypeIndicator/>
                </View>
                    
            </>}

            


        </View>
    )
}

const CartScreenStyle = new StyleSheet.create({
    CartScreenLayout:{
        ...style.AuthenticationScreen_style, 
        paddingLeft: 0, 
        paddingRight: 0 ,
        paddingTop: 0 
    }, 

    BackOptionLayout:{
        ...style.Authentication_BackLayout, 
        backgroundColor: colorCode.Authentication_button_color
    }, 

    BackImageLayout : {
        ...style.Authentication_BackImage_layout
    },
    
    CartTotalValue:{
        width: "96%", 
        marginLeft:"auto",
        marginRight:"auto", 
        marginTop: 10, 

        backgroundColor: colorCode.Custom_cake_option_layout_bg_color, 
        
        paddingTop: 13,
        paddingBottom: 13,
        paddingLeft: 15, 
        paddingRight: 15,   
        
        elevation: 10, 
        shadowColor: '#bbbbbb', 
        borderRadius: 5, 
    }, 

    ProductmainLayout:{
        marginTop: 10, 
        marginBottom: 10, 

        elevation: 10, 
        shadowColor: "#3a3a3a"
    },

    ProductLayout:{
        display: 'flex', 
        flexDirection: 'row', 
        width: '100%', 
        marginLeft: 'auto', 
        marginRight: 'auto', 
        backgroundColor: colorCode.Authentication_input_color, 

        paddingTop: 10, 
        paddingBottom: 10, 
        paddingLeft: 8, 
        paddingRight: 8, 

        borderRadius: 5, 
        
    }, 

    ProductImage:{
        height: 150, 
        width: 100, 
        borderRadius: 5
    }, 

    ProductInformation:{
        paddingLeft: 10
    }, 

    ProductPrice:{
        display: 'flex', 
        flexDirection: 'row', 
        marginTop: 10
    }, 

    DeleteUpdateOption:{
        display: 'flex', 
        flexDirection: 'row', 
        backgroundColor: colorCode.Authentication_input_color, 
        paddingTop: 3 , 
        paddingBottom: 3,
        paddingLeft: 10, 
        paddingRight: 10, 
        borderTopColor: '#cccccc', 
        borderTopWidth: 1, 
        borderBottomLeftRadius: 5, 
        borderBottomRightRadius: 5
    }, 

    DeleteOptionImage:{
        height: 30 ,
        width: 30, 
    }, 

    Proceed_to_buy_option:{
        backgroundColor: colorCode.Authentication_button_color, 
        display: 'flex',
        alignItems: 'center', 
        
        width: '90%',
        borderRadius: 5, 
        
        paddingTop: 10, 
        paddingBottom: 10, 

        marginLeft:"auto", 
        marginRight:"auto", 
        marginBottom: 10
    }, 

    Loading_layout:{
        height: '100%'
    }
})
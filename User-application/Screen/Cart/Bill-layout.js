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

// ***** Import request URL **** // 
import * as URL from '../../URL/RequestURL' ; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SkypeIndicator } from "react-native-indicators";

export default function BillLayout({navigation}){
    
    // ---- Set NavigationBar color ---- //

    Navigationbar.setBackgroundColorAsync('#ffffff');

    const CommonPading = {
        paddingTop: 8, 
        paddingBottom: 8, 
        paddingLeft: 10 ,
        paddingRight: 10 
    } ; 

    // ---- Load Font ---- //

    const [loadFont, setLoadFont] = useState(false);

    const [addressData, setAddressData] = useState() ; 

    const [productData, setProductData] = useState([]) ; 

    const [cart_total, set_cart_total] = useState() ; 

    const [delivery_charge, set_delivery_charge] = useState() ; 

    const [Loading_layout, setLoading_layout] = useState(false) ; 

    useEffect(() => {
        
        // ==== Load font function ==== // 
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

        const InitalizeData = async () => {

            // 1. Fetch address data 

            let Address_data_value = await AsyncStorage.getItem("Address_details") ; 

            // 2. Fetch cart total value 

            let Cart_subtotal_value = await AsyncStorage.getItem("Product_total") ; 

            // 3. Fetch Product data value 

            let Product_data = await AsyncStorage.getItem("Product_data") ; 

            setAddressData(JSON.parse(Address_data_value)) ; 

            set_cart_total(Cart_subtotal_value) ; 

            setProductData(JSON.parse(Product_data)) ;

            // console.warn(productData);

            // ---- Calculate Delivery charge ---- // 

            let Cart_amount = parseInt(Cart_subtotal_value) ; 

            if (Cart_amount < 500){

                set_delivery_charge(100) ; 
            }else if (Cart_amount> 500 && Cart_amount < 999){

                set_delivery_charge(50) ; 
            }else{

                set_delivery_charge(0) ; 
            }

        }

        InitalizeData(); 


    }, []);

    // ===== Placed order function ===== // 

    const Placed_order_function = async () => {

        setLoading_layout(true) ; 
        
        try{
            let User_table = await AsyncStorage.getItem("Table") ; 

            let Mobile_number = await AsyncStorage.getItem("Mobilenumber") ; 

            let Request_url = URL.Authentication_request_url ; 
            
            let Request_data = {
                "Check_status": "Placed-order", 
                "Table_name" : User_table, 
                "Order_total": cart_total, 
                "Order_delivery_charge": delivery_charge, 
                "Mobile_number": Mobile_number, 
                "Order_address": addressData, 
                "Order_product_data": productData
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

            let Response_status = Response.Status; 

            if (Response_status == "Placed_order"){

                setLoading_layout(false) ; 

                ToastAndroid.show("Your order placed successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                
                navigation.navigate("Payment", {"Order_total": cart_total, "Order_id": Response.Order_id}) ; 
            }

        }catch{

            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }


    }

    if (loadFont){

        return(
            <View style={BillLayoutStyle.BillLayoutScreen}>
    
                {/* StatusBar component  */}
                <StatusbarComponent
                    color = {colorCode.Authentication_button_color}
                />
    
                {/* BackOption and Title Layout  */}
    
                <View style={BillLayoutStyle.BackOptionLayout}>
                    
                    {/* Back option  */}
    
                    <Pressable
                        android_ripple={{color:colorCode.Authentication_button_ripper_color}}
                        style = {BillLayoutStyle.BackImageLayout}
                        >
                        
                        <Image
                            style={style.Authentication_BackImage}
                            source={require("../../assets/Images/Other_back.png")}
                        />
    
                    </Pressable>
    
                    {/* Title layout  */}
    
                    <TextComponent
                        TextValue = "Bill Information"
                        TextSize = {20}
                        TextFamily = "Ubuntu"
                        TextColor = {"#ffffff"}
                        TextStyle = {{marginTop: "auto", marginBottom: 'auto', marginLeft: 4}}
                    />
    
                </View>

                {/* ====== Loading layout ======  */}

                {Loading_layout?<>

                    <View style={BillLayoutStyle.LoadingLayout}>
                        <SkypeIndicator></SkypeIndicator>
                    </View>

                </>:<></>}
    
                <ScrollView>

                    {addressData != undefined?<>
                    
                        <View style={BillLayoutStyle.UserData_layout}>
        
                            {/* Username information  */}
        
                            <View style={[BillLayoutStyle.UsernameInformation, {...CommonPading, paddingTop:12, paddingBottom: 12}]}>
                                
                                <TextComponent
                                    TextValue = "Shipping to :"
                                    TextFamily = "Ubuntu"
                                    TextColor = {colorCode.Authentication_title_color}
                                    TextSize = {18}
                                />      
        
                                <TextComponent
                                    TextValue = {addressData.Data1}
                                    TextFamily = "Sans"
                                    TextColor = "#393939"
                                    TextSize = {17}
                                    TextStyle = {{marginLeft: 6}}
                                />
                            
                            </View>
        
                            {/* Item count information  */}
        
                            <View>

                                {/* ===== Subtotal information ====  */}
        
                                <View style={[BillLayoutStyle.ItemPriceLayout, {...CommonPading}]}>
                                    
                                    <TextComponent
                                        TextValue = "Items"
                                        TextFamily = "Sans"
                                        TextSize = {18}
                                        TextColor = {colorCode.Authentication_title_color}
                                    />
                                    
                                
                                    <View style={{marginLeft:"auto"}}>
        
                                        <TextComponent
                                            TextValue = {"₹"+ cart_total + "/-"}
                                            TextFamily = "Ubuntu"
                                            TextSize = {18}
                                            TextColor = {colorCode.Authentication_title_color}
                                            
                                        />
        
                                    </View>
                                
                                </View>

                                {/* ===== Delivery charge information =====  */}
                                
                                <View style={[BillLayoutStyle.ItemPriceLayout, {...CommonPading}]}>
                                    
                                    <TextComponent
                                        TextValue = "Delivery"
                                        TextFamily = "Sans"
                                        TextSize = {18}
                                        TextColor = {colorCode.Authentication_title_color}
                                    />
                                    
                                
                                    <View style={{marginLeft:"auto"}}>
        
                                        <TextComponent
                                            TextValue = {"₹" + delivery_charge + "/-"}
                                            TextFamily = "Ubuntu"
                                            TextSize = {18}
                                            TextColor = {colorCode.Authentication_title_color}
                                            
                                        />
        
                                    </View>
                                
                                </View>

                                {/* ===== Total amount information =====  */}
                                
                                <View style={[BillLayoutStyle.ItemPriceLayout, {...CommonPading}]}>
                                    
                                    <TextComponent
                                        TextValue = "Order total"
                                        TextFamily = "Ubuntu"
                                        TextSize = {18}
                                        TextColor = {colorCode.Authentication_title_color}
                                    />
                                    
                                
                                    <View style={{marginLeft:"auto"}}>
        
                                        <TextComponent
                                            TextValue = {"₹"+ (parseInt(cart_total) + parseInt(delivery_charge)) +"/-"}
                                            TextFamily = "Ubuntu"
                                            TextSize = {18}
                                            TextColor = "#ff1c1c"
                                            
                                        />
        
                                    </View>
                                
                                </View>
        
                            </View>
        
                        </View>

                         {/* Delivery charge information  */}
                
                        <TextComponent
                            TextValue = "On below 499/- order delivery charge 100/-"
                            TextFamily = "Sans"
                            TextColor =  {colorCode.Authentication_title_color}
                            TextSize = {16}
                            TextStyle = {{marginLeft:"3%", marginRight:"auto", marginTop:5}}
                        />

                        <TextComponent
                            TextValue = "In between 499/- to 999/- order delivery charge 100/-"
                            TextFamily = "Sans"
                            TextColor =  {colorCode.Authentication_title_color}
                            TextSize = {16}
                            TextStyle = {{marginLeft:"3%", marginRight:"auto", marginTop:5}}
                        />
                        
                        <TextComponent
                            TextValue = "On above 999/- order we provide free delivery "
                            TextFamily = "Sans"
                            TextColor =  {colorCode.Authentication_title_color}
                            TextSize = {16}
                            TextStyle = {{marginLeft:"3%", marginRight:"auto", marginTop:5}}
                        />

                        {/* ===== Product data information =====  */}

                        <View style={BillLayoutStyle.UserData_layout}>

                            {/* Title  */}

                            <View style={[BillLayoutStyle.UsernameInformation, {...CommonPading, paddingTop:12, paddingBottom: 12}]}>
                                
                                <TextComponent
                                    TextValue = "Cake information"
                                    TextFamily = "Ubuntu"
                                    TextColor = {colorCode.Authentication_title_color}
                                    TextSize = {17}
                                />      
                        
                            </View>

                            {/* ===== Product information layout =====  */}

                            {productData.map((element, index) => {
                                return(

                                    <View style={BillLayoutStyle.CakeInformationLayout}
                                        key = {index}>


                                        {/* Product image  */}

                                        <Image
                                            style = {BillLayoutStyle.CakeImage}
                                            source={{uri:element.Product_image1}}
                                        />

                                        <View style={BillLayoutStyle.ProductInformation}>

                                            {/* Product information  */}

                                            <TextComponent
                                                TextValue = {element.Product_information}
                                                TextFamily = "Mukta"
                                                TextColor = {colorCode.Authentication_title_color}
                                                TextSize = {16}
                                            />

                                            {/* Product price  */}

                                            <View style={BillLayoutStyle.ProductPrice}>
                                                
                                                <TextComponent
                                                    TextValue = {"₹" + element.Product_discount_price}
                                                    TextFamily = "Sans"
                                                    TextColor = {colorCode.Authentication_title_color}
                                                    TextSize = {18}
                                                />
                                            
                                                <TextComponent
                                                    TextValue = {"₹" + element.Product_retail_price}
                                                    TextColor = {colorCode.Authentication_title_color}
                                                    TextSize = {18}
                                                    TextFamily = "Sans"
                                                    TextStyle = {{textDecorationLine: 'line-through', marginLeft: 10}}
                                                />
                                            
                                            </View>

                                            {/* Product weight information  */}

                                            <View style={BillLayoutStyle.ProductPrice}>
                                                
                                                <TextComponent
                                                    TextValue = "Weight"
                                                    TextFamily = "Ubuntu"
                                                    TextColor = {colorCode.Authentication_title_color}
                                                    TextSize = {16}
                                                    TextStyle = {{backgroundColor:colorCode.Authentication_input_color,
                                                        paddingTop: 5, 
                                                        paddingBottom: 5, 
                                                        paddingLeft: 7, 
                                                        paddingRight: 7}}
                                                />
                                            
                                                <TextComponent
                                                    TextValue = {element.Product_details[0]}
                                                    TextColor = {colorCode.Authentication_title_color}
                                                    TextSize = {16}
                                                    TextFamily = "Ubuntu"
                                                    TextStyle = {{marginLeft: 10, 
                                                        marginTop: 'auto', 
                                                        marginBottom: 'auto'}}
                                                />
                                            
                                            </View>

                                            {/* Name on cake information  */}

                                            <View style={BillLayoutStyle.ProductPrice}>
                                                
                                                <TextComponent
                                                    TextValue = "Name on cake"
                                                    TextFamily = "Ubuntu"
                                                    TextColor = {colorCode.Authentication_title_color}
                                                    TextSize = {16}
                                                    TextStyle = {{backgroundColor:colorCode.Authentication_input_color,
                                                        paddingTop: 5, 
                                                        paddingBottom: 5, 
                                                        paddingLeft: 7, 
                                                        paddingRight: 7}}
                                                />
                                            
                                                <TextComponent
                                                    TextValue = {element.Product_details[1]}
                                                    TextColor = {colorCode.Authentication_title_color}
                                                    TextSize = {16}
                                                    TextFamily = "Ubuntu"
                                                    TextStyle = {{marginLeft: 10, 
                                                        marginTop: 'auto', 
                                                        marginBottom: 'auto'}}
                                                />
                                            
                                            </View>
                                            
                                            {/* Cake flavour information  */}

                                            <View style={BillLayoutStyle.ProductPrice}>
                                                
                                                <TextComponent
                                                    TextValue = "Flavour"
                                                    TextFamily = "Ubuntu"
                                                    TextColor = {colorCode.Authentication_title_color}
                                                    TextSize = {16}
                                                    TextStyle = {{backgroundColor:colorCode.Authentication_input_color,
                                                        paddingTop: 5, 
                                                        paddingBottom: 5, 
                                                        paddingLeft: 7, 
                                                        paddingRight: 7}}
                                                />
                                            
                                                <TextComponent
                                                    TextValue = {element.Product_flavour}
                                                    TextColor = {colorCode.Authentication_title_color}
                                                    TextSize = {16}
                                                    TextFamily = "Ubuntu"
                                                    TextStyle = {{marginLeft: 10, 
                                                        marginTop: 'auto', 
                                                        marginBottom: 'auto'}}
                                                />
                                            
                                            </View>


                                        </View>

                                    </View>
                                )
                            })}


                        </View>

                        {/* ===== Cake delivery time information =====  */}

                        <View style={BillLayoutStyle.DeliveryTime_layout}>
                            <TextComponent
                                TextValue = "We will deliver order in 5 to 6 hours"
                                TextColor = {colorCode.Custom_cake_option_text_color}
                                TextFamily = "Ubuntu"
                                TextSize = {17}
                            />
                        </View>

                        {/* ===== Product address information =====  */}

                        <View style={BillLayoutStyle.UserData_layout}>

                            {/* Title  */}
                            
                            <View style={[BillLayoutStyle.UsernameInformation, {...CommonPading, paddingTop:12, paddingBottom: 12}]}>
                                
                                <TextComponent
                                    TextValue = "Address information"
                                    TextFamily = "Ubuntu"
                                    TextColor = {colorCode.Authentication_title_color}
                                    TextSize = {17}
                                />      
                        
                            </View>

                            {/* Street address information  */}

                            <View style={[BillLayoutStyle.ItemPriceLayout, {...CommonPading}]}>
                                    
                                <TextComponent
                                    TextValue = {addressData.Data2}
                                    TextFamily = "Sans"
                                    TextSize = {18}
                                    TextColor = {colorCode.Authentication_title_color}
                                />
                            
                            </View>
                            
                            {/* Area and Landmark information  */}

                            <View style={[BillLayoutStyle.ItemPriceLayout, {...CommonPading}]}>
                                    
                                <TextComponent
                                    TextValue = {addressData.Data3}
                                    TextFamily = "Sans"
                                    TextSize = {18}
                                    TextColor = {colorCode.Authentication_title_color}
                                />
                            
                            </View>

                            {/* City information  */}
                            
                            <View style={[BillLayoutStyle.ItemPriceLayout, {...CommonPading}]}>
                                    
                                <TextComponent
                                    TextValue = {addressData.Data4}
                                    TextFamily = "Sans"
                                    TextSize = {18}
                                    TextColor = {colorCode.Authentication_title_color}
                                />
                            
                            </View>
                            
                            {/* Pincode information  */}

                            <View style={[BillLayoutStyle.ItemPriceLayout, {...CommonPading}]}>
                                    
                                <TextComponent
                                    TextValue = {"Pincode " + addressData.Data5}
                                    TextFamily = "Sans"
                                    TextSize = {18}
                                    TextColor = {colorCode.Authentication_title_color}
                                />
                            
                            </View>
                                

                        </View>

                    </> :<></>}

    
                </ScrollView>

                {/* Placed order and make payment option  */}

                <Pressable style={BillLayoutStyle.PlacedOrderOption}
                    android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                    onPress = {() => Placed_order_function()}>

                    <TextComponent
                        TextValue = "Placed order and make payment"
                        TextFamily = "Ubuntu"
                        TextSize = {19}
                        TextColor = "#ffffff"
                    />
                </Pressable>

            
            </View>
        )
    }
}

const BillLayoutStyle = new StyleSheet.create({
    BillLayoutScreen:{
        ...style.AuthenticationScreen_style, 
        backgroundColor: colorCode.Authentication_input_color, 
        paddingLeft:0,
        paddingRight:0, 
        paddingTop: 0 
    }, 

    BackOptionLayout:{
        ...style.Authentication_BackLayout , 
        backgroundColor: colorCode.Authentication_button_color
    }, 

    BackImageLayout : {
        ...style.Authentication_BackImage_layout
    }, 

    UserData_layout:{
        backgroundColor: '#ffffff' ,
        width: '96%', 
        marginLeft: 'auto', 
        marginRight: 'auto', 
        borderRadius: 5, 
        marginTop: 10, 
        marginBottom: 10, 
        elevation: 10, 
        shadowColor: '#d6d6d6'
    }, 

    UsernameInformation:{
        display: 'flex', 
        flexDirection: 'row',  
        borderBottomColor: '#e4e4e4', 
        borderBottomWidth: 1
    }, 

    ItemPriceLayout:{
        display: 'flex', 
        flexDirection: 'row'
    }, 

    CakeInformationLayout:{
        display: 'flex', 
        flexDirection: 'row', 
        paddingTop: 10, 
        paddingBottom: 10, 
        paddingLeft: 8, 
        paddingRight: 8
    }, 

    CakeImage:{
        height: 100, 
        width: 100, 
        borderRadius: 5
    }, 

    ProductInformation:{
        paddingLeft: 10
    }, 

    ProductPrice:{
        display: 'flex', 
        flexDirection: 'row', 
        marginTop: 7
    }, 

    PlacedOrderOption:{
        backgroundColor: colorCode.Authentication_button_color, 
        display: 'flex',
        alignItems: 'center', 
        
        width: '90%',
        borderRadius: 5, 
        
        paddingTop: 12, 
        paddingBottom: 12, 

        marginLeft:"auto", 
        marginRight:"auto", 
        marginBottom: 10
    }, 

    DeliveryTime_layout:{
        backgroundColor: colorCode.Custom_cake_option_layout_bg_color, 
        width: '96%', 
        marginLeft:"auto", 
        marginRight:"auto", 
        justifyContent:"center", 
        alignItems: "center", 
        paddingTop: 12, 
        paddingBottom:12, 
        borderRadius: 5
    },

    LoadingLayout:{
        height: '100%', 
        width: '100%', 
        position: 'absolute', 
        zIndex: 10, 
        backgroundColor:"rgba(247, 247, 247, 0.686)"
    }
})
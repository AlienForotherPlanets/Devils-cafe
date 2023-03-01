import React, {useState, useEffect} from "react";
import { View, StyleSheet, ScrollView, TextInput, 
    Pressable,Alert, Image, Text, ToastAndroid } from "react-native";

// **** Colorcode and ScreenStyle **** // 
import * as colorCode from '../../Color-code/Color-codes' ;
import * as style from '../../Style/AuthenticationStyle' ; 
import * as URL from '../../URL/RequestURL' ; 

// **** Text and StatusBar component **** // 
import TextComponent from "../../Component/TextComp";
import StatusbarComponent from '../../Component/StatusbarComp' ; 

// **** Import require packages **** // 
import * as Navigationbar from 'expo-navigation-bar' ;
import * as Font from 'expo-font' ;  
import { useIsFocused } from "@react-navigation/native";
import { SkypeIndicator } from "react-native-indicators";

export default function SelectProduct({navigation, route}){

    const {data} = route.params ; 

    // ---- Set NavigationBar color ---- //
        
    Navigationbar.setBackgroundColorAsync("#ffffff");

    const isScreenFocus = useIsFocused() ; 

    // ---- Load Font ---- //

    const [loadFont, setLoadFont] = useState(false);

    const [categoryProductData, setCategoryProductData] = useState([]) ; 

    const [categoryProduct_layout, setCategoryProduct_layout] = useState(false) ; 

    const [recall_useEffect, setRecall_useEFfect] = useState(0) ; 


    useEffect(() => {

        // ===== Function 1 ---- Load font ====== // 

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
        
        // ======= Function 2 ---- Load category product information ======= //

        const Load_category_product = async () => {

            // ---- Password check request handler ---- // 

            setCategoryProduct_layout(false) ; 
                                    
            let Request_url = URL.Authentication_url ; 
                                    
            let Request_data = {
                "Check_status":"Fetch-product", 
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

            if (Response_status == "Fetch"){

                setCategoryProductData([...Response.ProductData]) ; 

                setCategoryProduct_layout(true) ; 

            }       

        } 

        Load_category_product() ; 

        if (isScreenFocus == true){
            Load_category_product() ; 
        }


    }, [isScreenFocus, recall_useEffect]);

    // ===== Delete product request ====== // 

    const Delete_product_request = async (category_id, product_id) => {

        try{

            // ==== Delete product request ===== // 

            let Request_url = URL.Authentication_url ; 
                            
            let Request_data = {
                "Check_status": "Delete-product", 
                "Category_id": category_id, 
                "Product_id": product_id
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

                setRecall_useEFfect(recall_useEffect + 1) ; 

                ToastAndroid.show("Delete product successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }else{

                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
        }catch{

        }
    }

    // ====== Delete product handler ====== // 

    const Delete_product_handler = (element) => {

        Alert.alert("Delete product", 

            'Are you sure you want to delete this ' + element.Product_information + ' with retail price '+ element.Product_retail_price +' and discount price ' +
            element.Product_discount_price +'? ',
            [ 
                {
                    text: "Yes", 
                    onPress: () => Delete_product_request(data.Category_data, element.Product_id)
                }, 
                {
                    text: "No"
                }
            ]
        )
    }

    // ===== Update product handler ===== // 

    const Update_product_handler = (element) => {

        navigation.navigate("UpdateProduct", {"data":element}) ; 
    }

    if (loadFont){

        return(
            <View>

                {/* StatusBar component  */}
    
                <StatusbarComponent
                    color={colorCode.Authentication_input_color}
                />

                {/* ===== Select product title =====  */}

                <TextComponent 
                    TextValue={"➕ Select product from " + data.Category_name} 
                    TextFamily = "Ubuntu"
                    TextSize = {20}
                    TextColor = {colorCode.Authentication_title_color}
                    TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop: 15, paddingBottom: 10}}
                />

                {categoryProductData.length == 0?<>
                    <TextComponent
                        TextValue = "Not found any Product"
                        TextFamily = "Ubuntu"
                        TextSize = {19}
                        TextColor = {colorCode.Authentication_subtitle_color}
                        TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop:20}}
                    />
                </>:<></>}

                {categoryProduct_layout?
                
                    <ScrollView style = {{height: '95%'}} showsHorizontalScrollIndicator={false}>

                        {categoryProductData.map((element, index) => {
                            return(

                                <View style={SelectProductStyle.ProductViewContainer} 
                                    key = {index}>

                                    <View style={SelectProductStyle.ProductImageInfoLayout}>

                                        {/* ==== Product image ====  */}

                                        <Image
                                            style={SelectProductStyle.ProductImage} 
                                            source={{uri:element.Product_image1}}
                                        />

                                        {/* ==== Product information ====  */}

                                        <View style={SelectProductStyle.ProductData}>
                                            
                                            {/* Product Information  */}

                                            <Text allowFontScaling={false} style={[SelectProductStyle.ProductInfo, {marginTop:0}]} >
                                                {element.Product_information}
                                            </Text>

                                            {/* Product discount price  */}

                                            <Text allowFontScaling={false} style={[SelectProductStyle.ProductInfo, 
                                                {fontFamily:"Sans", color:'#4a4a4a'}]} 
                                                    numberOfLines={1}>

                                                Discount price = {element.Product_discount_price}
                                            
                                            </Text>

                                            {/* Product retail price  */}
                                            
                                            <Text allowFontScaling={false} style={[SelectProductStyle.ProductInfo, 
                                                {fontFamily:"Sans", color:'#4a4a4a'}]}
                                                numberOfLines={1}>

                                                Retail price = {element.Product_retail_price}

                                            </Text>

                                            {/* Product flavour information  */}
                                            
                                            <Text allowFontScaling={false} style={[SelectProductStyle.ProductInfo, 
                                                {fontFamily:"Sans", color:'#4a4a4a'}]}
                                                numberOfLines={1}>

                                                Flavour = {element.Product_flavour}
                                            </Text>

                                            {/* Product bread type information  */}
                                            
                                            <Text allowFontScaling={false} style={[SelectProductStyle.ProductInfo, 
                                                {fontFamily:"Sans", color:'#4a4a4a'}]}
                                                numberOfLines={1}>

                                                Bread = {element.Product_bread}

                                            </Text>
                                            {/* Product cream type information  */}
                                            
                                            <Text allowFontScaling={false} style={[SelectProductStyle.ProductInfo, 
                                                {fontFamily:"Sans", color:'#4a4a4a'}]}
                                                numberOfLines={1}>

                                                Cream = {element.Product_cream}

                                            </Text>

                                        </View>

                                    </View>

                                    {/* ====== Delete and Update product option ======  */}

                                    <View style={SelectProductStyle.DeleteUpdateLayout}>

                                        {/* ===== Delete product option ====  */}

                                        <Pressable style={SelectProductStyle.DeleteButtonLayout}
                                            android_ripple={{color:'#ff2f37'}}
                                            onPress = {() => Delete_product_handler(element)}>
                                        
                                            <Text allowFontScaling={false} style={SelectProductStyle.DeleteButtonText}>
                                                Delete
                                            </Text>
                                        
                                        </Pressable>

                                        {/* ===== Update product option =====  */}
                                        
                                        <Pressable style={[SelectProductStyle.DeleteButtonLayout, SelectProductStyle.UpdateButtonLayout]}
                                            android_ripple={{color:colorCode.Authentication_button_ripper_color}}
                                            onPress = {() => Update_product_handler(element)}>
                                            
                                            <Text allowFontScaling={false} style={[SelectProductStyle.DeleteButtonText, {color:'white'}]}>
                                                Update
                                            </Text>
                                        
                                        </Pressable>

                                    </View>
                                    

                                </View>
                            )
                        })}

                    </ScrollView>
                :
                    <View style={SelectProductStyle.LoadingLayout}>
                        <SkypeIndicator/>    
                    </View>
                }


            </View>
        )
    }
}

const SelectProductStyle = new StyleSheet.create({
    ProductViewContainer:{
        width: '96%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight:10,
        paddingLeft: '3%', 
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 5, 
        elevation: 5, 
        shadowColor: '#ececec'
    }, 

    ProductImageInfoLayout:{
        display: "flex",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: '#ebebeb',
        paddingBottom: 15
    },

    ProductImage:{
        height: 180,
        width: 110, 
        resizeMode: 'contain',
        borderRadius: 5 
    }, 

    ProductData:{ 
        marginLeft: '3%',
        paddingLeft: '3%',
        borderLeftWidth: 1, 
        borderLeftColor: '#ebebeb'
    },

    ProductInfo:{
        fontFamily: "Ubuntu", 
        fontSize: 18, 
        marginTop: 6,
        marginBottom: 4
    }, 

    DeleteUpdateLayout:{
        display: "flex", 
        flexDirection: 'row',
        marginTop: 12,
        marginBottom: 8
    }, 

    DeleteButtonLayout:{
        width: "40%", 
        backgroundColor: '#ff6368', 
        display: "flex",
        alignItems:'center',
        paddingTop: 5,
        paddingBottom: 5, 
        marginLeft: '5%',
        marginRight: '5%', 
        borderRadius: 5
    },

    DeleteButtonText:{
        fontFamily:"Mukta",
        fontSize: 18,
        textAlign: 'center', 
        color: "white"
    },

    UpdateButtonLayout:{
        backgroundColor: colorCode.Authentication_button_color,
    }, 

    LoadingLayout:{
        height: '90%', 
        width: '100%'
    }
})
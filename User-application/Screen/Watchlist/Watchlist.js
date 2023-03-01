import React, {useState, useEffect} from "react";
import { View, StatusBar, StyleSheet, Image, 
    Pressable, ScrollView, Dimensions, ToastAndroid } from "react-native";

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

export default function Watchlist({navigation}){
    // ---- Set NavigationBar color ---- //

    Navigationbar.setBackgroundColorAsync('#ffffff');

    const ProductOption_imageWidth = (Dimensions.get('window').width*0.43) ; 

    // ----- Fetch user table name ---- // 

    const [user_table, set_user_table] = useState('') ; 

    // ---- Load Font ---- //

    const [loadFont, setLoadFont] = useState(false);

    const [watchlistProduct_data, setWatchlistProduct_data] = useState([]) ; 

    useEffect(() => {

        // ======= Function1 ---- Load font ======== // 
    
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

        // ====== Function2  ---- Fetch watchlist product ======= // 

        const Load_watchlist_product = async () => {

            let User_table = await AsyncStorage.getItem("Table") ; 
            set_user_table(User_table) ; 

            // ***** Request for fetch watchlist product ***** // 

            try{

                let Request_url = URL.Authentication_request_url ; 
                
                let Request_data = {
                    "Check_status":"Fetch-watchlist-product", 
                    "User_id" : User_table
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
                    setWatchlistProduct_data([...Response.Data]) ; 
                }
                

            }catch{

                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }

        }

        Load_watchlist_product() ; 

        
    }, []);

    if (loadFont){
        return(
            <View style={WatchlistStyle.WatchlistLayout}>

                <StatusbarComponent
                    color = {colorCode.Authentication_button_color}
                />

                {/* BackOption and Title Layout  */}

                <View style={WatchlistStyle.BackOptionLayout}>
                    
                    {/* Back option  */}

                    <Pressable
                        android_ripple={{color:colorCode.Authentication_button_ripper_color}}
                        style = {WatchlistStyle.BackImageLayout}
                        onPress = {() => navigation.goBack()}>
                        
                        <Image
                            style={style.Authentication_BackImage}
                            source={require("../../assets/Images/Other_back.png")}
                        />

                    </Pressable>

                    {/* Title layout  */}

                    <TextComponent
                        TextValue = "Watchlist"
                        TextSize = {20}
                        TextFamily = "Ubuntu"
                        TextColor = {'#ffffff'}
                        TextStyle = {{marginTop: "auto", marginBottom: 'auto', marginLeft: 4}}
                    />

                </View>


                {watchlistProduct_data.length == 0?<>
                    
                    <TextComponent
                        TextValue = "Your watchlist is empty"
                        TextSize = {20}
                        TextColor = {colorCode.Authentication_subtitle_color}
                        TextFamily = "Ubuntu"
                        TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop:20}}
                    />
                    
                </>
                :<>
                
                    {/* ====== All watchlist product ======  */}
                    
                    <ScrollView >

                        <View style = {[WatchlistStyle.AllImageLayout, watchlistProduct_data.length != 1?{justifyContent:"center"}:{}]}>

                            {watchlistProduct_data.map((element, index) => {
                                return(

                                    <Pressable style = {WatchlistStyle.ProductLayout} 
                                        key = {index}
                                        onPress = {() => navigation.navigate("ProductInformation", {"Category_id":element.Category_id, "Product_id":element.Product_id})}>

                                        <View >

                                            <Image
                                                style = {[WatchlistStyle.ProductImage, {width:ProductOption_imageWidth}]}
                                                source={{uri:element.Product_image1}}
                                            />

                                            <View style={[WatchlistStyle.ProductInformation, {width:ProductOption_imageWidth}]}>

                                            <TextComponent

                                                TextValue = {element.Product_information}
                                                TextFamily = "Mukta"
                                                TextColor = {colorCode.Cake_option_text_title_color}
                                                TextSize = {14}
                                                TextStyle = {{width:'100%'}}
                                            />

                                            <View style={WatchlistStyle.ProductPriceBuyNow_option}>

                                                <TextComponent

                                                    TextValue = {"₹"+ element.Product_discount_price +"/-"}
                                                    TextFamily = "Sans"
                                                    TextColor = {colorCode.Cake_option_price_text_color}
                                                    TextSize = {18}
                                                    TextStyle = {{marginTop:"auto", marginBottom:"auto"}}
                                                />

                                                <TextComponent

                                                    TextValue = {"₹"+ element.Product_retail_price +"/-"}
                                                    TextFamily = "Sans"
                                                    TextColor = {'#cc1919'}
                                                    TextSize = {18}
                                                    TextStyle = {{textDecorationLine:"line-through", marginLeft: 8, marginTop:"auto", marginBottom:"auto"}}
                                                />

                                                <Pressable style={WatchlistStyle.BuyNowOption}
                                                    android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                                                    onPress = {() => navigation.navigate("ProductInformation", {"Category_id":element.Category_id, "Product_id":element.Product_id})}>

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
                
                </>}

            </View>
        )
    }
}

const WatchlistStyle = new StyleSheet.create({
    WatchlistLayout:{
        ...style.AuthenticationScreen_style, 
        backgroundColor: colorCode.Authentication_input_color, 
        paddingLeft:0 , 
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

    AllImageLayout:{
        display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        marginLeft:"auto", 
        marginTop: 15, 
        textAlign: 'center', 
        width: Dimensions.get('window').width*0.98, 
    }, 

    ProductLayout:{
        width: Dimensions.get('window').width*0.48,
        marginBottom: 15 , 
        elevation: 10,
        shadowColor: '#252525'
    }, 

    ProductImage:{
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
        marginRight: 3, 
        paddingTop: 4, 
        paddingBottom: 4, 
        paddingLeft: 7,
        paddingRight: 7, 
        borderRadius: 5
    }
})
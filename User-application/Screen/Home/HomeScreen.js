import React, {useState, useEffect} from "react";
import { View,StyleSheet, Image, Pressable, ScrollView, ToastAndroid, 
    Linking, BackHandler, Alert } from "react-native";
import {Dimensions} from 'react-native';
import * as colorCode from '../../Color-code/Color-codes' ; 
import TextComponent from "../../Component/TextComp";
import StatusbarComponent from '../../Component/StatusbarComp' ; 
import * as Navigationbar from 'expo-navigation-bar' ;
import * as Font from 'expo-font' ;  
import {FlatListSlider} from 'react-native-flatlist-slider';
import * as URL from '../../URL/RequestURL' ; 
import HomePreview from '../Slider/HomeSlider' ; 
import AllCategory from "../Category/AllCategory";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SkypeIndicator } from 'react-native-indicators' ; 
import * as Notifications from 'expo-notifications';
 
Notifications.setNotificationHandler({

    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    })

});
  

export default function HomeScreen({navigation}) {

    // ---- Set NavigationBar color ---- //

    Navigationbar.setBackgroundColorAsync('#ffffff');

    // --- Cake option image width --- // 

    const CakeOption_imageWidth =  (Dimensions.get('window').width*0.45) ; 
    const ProductOption_imageWidth = (Dimensions.get('window').width*0.43) ; 
    const PosterImage_width = (Dimensions.get('window').width*0.47) ; 

    // ---- Load Font ---- //

    const [loadFont, setLoadFont] = useState(false);

    // ====== UseState Function require useState ======= // 

    // 1. Banner images
    const [Banner_data, setBanner_data] = useState([]) ; 

    // 2. Decoration banner images
    const [Decoration_banner_data, setDecoration_banner_data] = useState([]) ; 

    // 3. Category list 
    const [category_list_data, setCategory_list_data] = useState([]) ; 
    const [category_list_layout, setCategory_list_layout] = useState(false) ; 

    // 4. Watchlist count
    const [watchlist_count, set_watchlist_count] = useState(0) ; 
    
    // 5. Home category list
    const [home_category_list_data, setHome_Category_list_data] = useState([]) ; 
    const [home_category_list_layout, set_home_category_list_layout] = useState(false) ; 

    // 6. Home screen product list 
    const [home_product_list, setHome_product_list] = useState([]) ; 
    const [home_product_list_layout, setHome_product_list_layout] = useState(false) ; 

    useEffect(() => {
    
        // ====== Function 1 -- Load Font ====== // 

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

        // ======= Function 2 -- Load Banner ======= // 

        const Load_banner_images = async () => {

            set_home_category_list_layout(false) ; 

            // ---- Banner image fetch request ---- // 

            let Request_url = URL.Authentication_request_url ; 
                
            let Request_data = {
                "Check_status": "Fetch-banner"
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

                setBanner_data([...Response.Banner]) ; 

                setDecoration_banner_data([...Response.Decoration]) ; 

                setHome_Category_list_data([...Response.Category]) ;

                set_home_category_list_layout(true) ; 
 
            }
        }

        Load_banner_images() ; 

        // ====== Function 3 --- Fetch category ======= //

        const Load_category_data = async () => {

            setCategory_list_layout(false) ; 

            // ---- Request for fetch category list ---- // 

            let Request_url = URL.Authentication_request_url ; 
                
            let Request_data = {
                "Check_status": "Fetch-category"
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

                setCategory_list_data([...Response.Category]) ; 
                
            }
            
            
            setCategory_list_layout(true) ; 
        } 

        Load_category_data() ; 

        // ======= Function 4 --- Fetch watchlist product count request ======== // 

        const Fetch_watchlist_count = async () => {

            let User_table = await AsyncStorage.getItem("Table") ; 

            // ---- Request ----- // 

            let Request_url = URL.Authentication_request_url ; 
                
            let Request_data = {
                "Check_status": "Fetch-watchlist-product-count", 
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

                set_watchlist_count(Response.Count) ; 
            }

        }

        Fetch_watchlist_count() ; 

        // ======= Function  5 ---- Fetch randmo product data ===== // 

        const Fetch_random_product_data = async () => {

            try{

                setHome_product_list_layout(false) ; 

                // ---- Request ----- // 

                let Request_url = URL.Authentication_request_url ; 
                    
                let Request_data = {
                    "Check_status": "Fetch-random-products", 
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
                    setHome_product_list([...Response.Product]) ; 
                    
                    setHome_product_list_layout(true) ; 
                }


            }catch{

                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
        }

        Fetch_random_product_data() ; 

    }, []);

    // ====== Function Bottom Navigator option handler ====== // 

    const [homeOption, setHomeOption] = useState(true) ; 
    const [homeLayout, setHomeLayout] = useState(true) ; 

    const [listOption, setListOption] = useState(false) ;
    const [listOptionLayout, setListOptionLayout] = useState(false) ; 

    const [cartOption, setCartOption] = useState(false) ;

    const [userOption, setUserOption] = useState(false) ; 

    const Bottom_navigator_handler = (x) => {

        setHomeOption(false) ; 
        setListOption(false) ;
        setCartOption(false) ; 
        setUserOption(false) ; 
        
        if (x == 0 ){

            setHomeOption(true) ; 
            Bottom_navigator_home_option() ; 

        }else if (x == 1){
            
            setListOption(true) ; 
            setHomeLayout(false) ; 
            setListOptionLayout(true) ; 
        }
    }

    const Bottom_navigator_home_option = () => {

        setHomeLayout(true) ; 
        setListOptionLayout(false) ; 
    }

    
    // ===== Function View all category option handler ====== // 

    const View_all_category_option = () => {

        setHomeLayout(false) ; 
        setListOptionLayout(true) ; 

        Bottom_navigator_handler(1) ; 
    }

    // ====== Back Handler ======= // 

    const [back_press_value, setBack_press_value] = useState(0) ; 

    useEffect(() => {

        navigation.addListener('beforeRemove', (e) => {

            e.preventDefault();

            if (listOptionLayout == true){

                setListOptionLayout(false) ; 
                
                Bottom_navigator_handler(0) ; 

                setBack_press_value(0) ; 
            
            }else if (back_press_value == 0){

                setBack_press_value(1) ; 
            
            }else{

                setBack_press_value(0) ; 

                Alert.alert("Exit!!", "Are you sure you want to exit?", 
                [
                    {
                        text:"Yes",
                        onPress : () => BackHandler.exitApp() 
                    }, 
                    {
                        text: "No", 
                        onPress: () => null
                    }
                ])

            }
            
        });
    }, [listOptionLayout, back_press_value])

    if (loadFont){

        return(
            
            <View style = {HomeScreenStyle.HomeScreenLayout}>
                
                {/* Statusbar component  */}

                <StatusbarComponent
                    color = {colorCode.HomeScreen_statusbar_color}
                />

                {/* ===== Title Layout =====  */}

                <View style={HomeScreenStyle.TitleLayout}>

                    {/* Devils cafe title  */}

                    <TextComponent
                        TextValue = "Devils cafe"
                        TextFamily = "Mukta"
                        TextColor = {colorCode.HomeScreen_title_color}
                        TextSize = {21}
                        TextStyle = {{marginTop: "auto", marginBottom:"auto", marginLeft:15}}
                    />

                    {/* Watchlist and Shop location option layout  */}

                    <View style={HomeScreenStyle.OptionLayout}>

                        {/* Watchlist option  */}

                        <Pressable
                            style = {HomeScreenStyle.OptionImageLayout}
                            android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                            onPress = {() => navigation.navigate("Watchlist")}>

                            <Image
                                style = {{height:25, width:25}}
                                source={require('../../assets/Images/Watchlist.png')}
                            />
                        </Pressable>

                        <TextComponent
                            TextValue = {watchlist_count}
                            TextColor = 'white'
                            TextFamily = "Ubuntu"
                            TextSize = {17}
                            TextStyle = {{color:'#ffffff', padding:2, marginLeft:-12, backgroundColor:'#ff4545', borderRadius:5}}
                        />

                        <Pressable
                            style = {[HomeScreenStyle.OptionImageLayout, {marginLeft:6}]}
                            android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                            onPress = {() => navigation.navigate("Watchlist")}>

                            <Image
                                style = {{height:25, width:25}}
                                source={require('../../assets/Images/Shop-location.png')}
                            />
                        </Pressable>


                    </View>

                </View>

                {/* ========= Start Home Sceen layout ==========  */}

                {homeLayout?<>

                    <ScrollView showsVerticalScrollIndicator={false}
                        >

                        {/* ====== Option 1 Banner layout =======  */}

                        <View style={HomeScreenStyle.BannerImageLayout}>

                            {Banner_data.length > 0 ?<>
                            
                                <FlatListSlider 
                                    data={Banner_data} 
                                    component = {<HomePreview/>}
                                    autoscroll = {false}
                                    onPress = {(item) => Linking.openURL(item.image)}
                                />
                            </>:<></>}
                            

                        </View>

                        {/* ====== Option2 Category list layout ======  */}
                        
                        <View style={HomeScreenStyle.CommonOptionLayout}>

                            {/* Title  */}

                            <TextComponent
                                TextValue = "Discover by category"
                                TextFamily = "Rubik"
                                TextSize = {18}
                                TextColor = {colorCode.HomeScreen_information_title_color}
                                TextStyle = {{marginLeft: 10}}
                            />

                            {/* Category list layout  */}
                            
                            {category_list_layout?<>
                            
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                                    
                                    {category_list_data.map((element, index) => {

                                        return(
                                        
                                            <View style={{alignItems:'baseline'}}
                                                key = {index} >

                                                <Pressable style={HomeScreenStyle.CategoryOptionLayout}
                                                    android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                                                    onPress = {() => navigation.navigate("CategoryProduct", {"Category_data":element})}>

                                                    <Image
                                                        style = {HomeScreenStyle.CategoryImage}
                                                        source={{uri:element.Category_image}}
                                                    />

                                                    <TextComponent

                                                        TextValue = {element.Category_name}
                                                        TextColor = {colorCode.HomeScreen_category_title_color}
                                                        TextFamily = "Sans"
                                                        TextSize = {17}
                                                        TextStyle = {{marginTop:"auto", marginBottom:"auto", marginLeft:7}}
                                                    /> 
                                                    
                                                </Pressable>
                                            </View>
                                        
                                        )

                                    })}
                                    
                                
                                </ScrollView>
                            
                            </>:<>

                                <View style={[HomeScreenStyle.CategoryOptionLayout, {backgroundColor:"transparent"}]}>

                                    <SkypeIndicator/>
                                
                                </View>
                            
                            </>}


                        </View>

                        {/* ======= Option 3 Customized cake order place and Latest product option ========  */}

                        <View style={HomeScreenStyle.CommonOptionLayout}>

                            {/* ==== Option1  Customized cake order place option ====  */}

                            <Pressable style={HomeScreenStyle.CustomizedCakeOption}
                                android_ripple = {{color: colorCode.Custom_cake_option_layout_ripple_color}}
                                onPress = {() => navigation.navigate("CustomOrder")}>

                                <Image

                                    style = {{height: 40, width: 40, borderRadius: 30}}
                                    source={require('../../assets/Images/CustomizedCake.jpg')}
                                />

                                <TextComponent
                                    TextValue = "Placed customized cake order"
                                    TextFamily = "Ubuntu"
                                    TextColor = {colorCode.Custom_cake_option_text_color}
                                    TextSize = {17}
                                    TextStyle = {{marginTop: 'auto', marginBottom: 'auto', marginLeft: 15}}
                                />

                            </Pressable>

                            {/* ===== Option2 Latest product option =====  */}
                            
                            <Pressable style={HomeScreenStyle.NewArrivalsLayout}
                                onPress = {() => navigation.navigate("LatestProduct")}>

                                <Image  
                                    style = {HomeScreenStyle.NewArrivalsImage}
                                    source={require('../../assets/Images/New_arrivals.png')}
                                    />

                            </Pressable>

                        
                        </View>

                        {/* ======== Option 4 Home screen particular cake show list ========  */}

                        <View style={HomeScreenStyle.CommonOptionLayout}>

                            {/* ==== Title layout ====  */}

                            <View style={HomeScreenStyle.ViewAllOptionLayout}>

                                <TextComponent
                                    TextValue = "Yummy cakes"
                                    TextFamily = "Rubik"
                                    TextSize = {18}
                                    TextColor = {colorCode.HomeScreen_information_title_color}
                                    TextStyle = {{marginLeft: 10, marginTop: 'auto', marginBottom:"auto"}}
                                />
                                
                                {/* View all option  */}

                                <Pressable style={HomeScreenStyle.ViewAllOption}
                                    android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                                    onPress = {View_all_category_option}>

                                    <TextComponent
                                        TextValue = "View all"
                                        TextFamily = "Ubuntu"
                                        TextColor = "white"
                                        TextSize = {18}
                                    />

                                </Pressable>

                            </View>


                            {home_category_list_layout?
                                <>
                            
                                    <View style={HomeScreenStyle.YummycakeOptionLayout}>

                                        {/* ==== Cake option 1 ====  */}

                                        <Pressable style={[HomeScreenStyle.CakeOptionMainLayout, {marginRight: '3%'}]}
                                            onPress = {() => navigation.navigate("CategoryProduct", {"Category_data":home_category_list_data[0]})}>

                                            <Image
                                                
                                                style = {[HomeScreenStyle.CakeOptionImage, {width:CakeOption_imageWidth}]}
                                                source={{uri:home_category_list_data[0].Category_image}}
                                            />

                                            <View style={HomeScreenStyle.CakeOptionTextLayout}>

                                                <TextComponent
                                                    TextValue = {home_category_list_data[0].Category_name}
                                                    TextFamily = "Mukta"
                                                    TextColor = {colorCode.Cake_option_text_title_color}
                                                    TextSize = {15}
                                                />

                                                <TextComponent

                                                    TextValue = {home_category_list_data[0].Category_description}
                                                    TextFamily = "Sans"
                                                    TextColor = {colorCode.Cake_option_price_text_color}
                                                    TextSize = {15}
                                                    TextStyle = {{marginTop: 5}}
                                                />

                                            </View>
                                        </Pressable>

                                        {/* ===== Cake option 2 =====  */}

                                        <Pressable style={HomeScreenStyle.CakeOptionMainLayout}
                                            onPress = {() => navigation.navigate("CategoryProduct", {"Category_data":home_category_list_data[1]})}>

                                            <Image
                                                
                                                style = {[HomeScreenStyle.CakeOptionImage, {width:CakeOption_imageWidth}]}
                                                source={{uri:home_category_list_data[1].Category_image}}
                                            />

                                            <View style={HomeScreenStyle.CakeOptionTextLayout}>

                                                <TextComponent
                                                    TextValue = {home_category_list_data[1].Category_name}
                                                    TextFamily = "Mukta"
                                                    TextColor = {colorCode.Cake_option_text_title_color}
                                                    TextSize = {15}
                                                />

                                                <TextComponent

                                                    TextValue = {home_category_list_data[1].Category_description}
                                                    TextFamily = "Sans"
                                                    TextColor = {colorCode.Cake_option_price_text_color}
                                                    TextSize = {15}
                                                    TextStyle = {{marginTop: 5}}
                                                />

                                            </View>
                                        </Pressable>

                                    </View>

                                    <View style={HomeScreenStyle.YummycakeOptionLayout}>

                                        {/* ===== Cake option 3 ====  */}

                                        <Pressable style={[HomeScreenStyle.CakeOptionMainLayout, {marginRight: '3%'}]}
                                            onPress = {() => navigation.navigate("CategoryProduct", {"Category_data":home_category_list_data[2]})}>

                                            <Image
                                                
                                                style = {[HomeScreenStyle.CakeOptionImage, {width:CakeOption_imageWidth}]}
                                                source={{uri:home_category_list_data[2].Category_image}}
                                            />

                                            <View style={HomeScreenStyle.CakeOptionTextLayout}>

                                                <TextComponent
                                                    TextValue = {home_category_list_data[2].Category_name}
                                                    TextFamily = "Mukta"
                                                    TextColor = {colorCode.Cake_option_text_title_color}
                                                    TextSize = {15}
                                                />

                                                <TextComponent

                                                    TextValue = {home_category_list_data[2].Category_description}
                                                    TextFamily = "Sans"
                                                    TextColor = {colorCode.Cake_option_price_text_color}
                                                    TextSize = {15}
                                                    TextStyle = {{marginTop: 5}}
                                                />

                                            </View>
                                        </Pressable>

                                        {/* ===== Cake option 4 =====  */}

                                        <Pressable style={HomeScreenStyle.CakeOptionMainLayout}
                                            onPress = {() => navigation.navigate("CategoryProduct", {"Category_data":home_category_list_data[3]})}>

                                            <Image
                                                
                                                style = {[HomeScreenStyle.CakeOptionImage, {width:CakeOption_imageWidth}]}
                                                source={{uri:home_category_list_data[3].Category_image}}
                                            />

                                            <View style={HomeScreenStyle.CakeOptionTextLayout}>

                                                <TextComponent
                                                    TextValue = {home_category_list_data[3].Category_name}
                                                    TextFamily = "Mukta"
                                                    TextColor = {colorCode.Cake_option_text_title_color}
                                                    TextSize = {15}
                                                />

                                                <TextComponent

                                                    TextValue = {home_category_list_data[3].Category_description}
                                                    TextFamily = "Sans"
                                                    TextColor = {colorCode.Cake_option_price_text_color}
                                                    TextSize = {15}
                                                    TextStyle = {{marginTop: 5}}
                                                />

                                            </View>
                                        </Pressable>

                                    </View>

                                </>
                            :<> 

                                <View style={HomeScreenStyle.CategoryListLoad_layout}>

                                    <SkypeIndicator/>
                                
                                </View>
                            </>}



                        </View>

                        {/* ====  Option 5 Safe Hygenice and Purchase protection information layout ====  */}

                        <View style={HomeScreenStyle.PosteInformationLayout}>
                            
                            <Image
                                style = {HomeScreenStyle.Purchase_image}
                                source = {require('../../assets/Images/Hygenic.jpg')}
                            />
                        
                            <Image
                                style = {HomeScreenStyle.Purchase_image}
                                source = {require('../../assets/Images/Purchase-protection.jpg')}
                            />      
                        
                        </View>

                        {/* ======== Option 6 Top selling products =========  */}
                        
                        <View >

                            {/* Title  */}

                            <TextComponent
                                TextValue = "Our top selling product"
                                TextFamily = "Rubik"
                                TextSize = {18}
                                TextColor = {colorCode.HomeScreen_information_title_color}
                                TextStyle = {{marginLeft: 13, marginTop: 20}}
                            />

                            {/* ====== Product list layout ======  */}

                            {home_product_list_layout?<>
                            
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={HomeScreenStyle.AllProductOptionLayout} >

                                    {/* Product1  */}

                                    {home_product_list.map((element, index) => {
                                        return(

                                            <Pressable 
                                                onPress={() => navigation.navigate("ProductInformation", {"Category_id":element.Category_id, "Product_id":element.Product_id})}
                                                android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                                                key = {index}>

                                                <View style = {{marginLeft:10}}>

                                                    <Image
                                                        style = {[HomeScreenStyle.productImage, {width:ProductOption_imageWidth}]}
                                                        source={{uri:element.Product_image1}}
                                                    />

                                                    <View style={[HomeScreenStyle.ProductInformation, {width:ProductOption_imageWidth}]}>

                                                    <TextComponent

                                                        TextValue = {element.Product_information}
                                                        TextFamily = "Mukta"
                                                        TextColor = {colorCode.Cake_option_text_title_color}
                                                        TextSize = {14}
                                                        TextStyle = {{width:'100%'}}
                                                    />

                                                    <View style={HomeScreenStyle.ProductPriceBuyNow_option}>

                                                        <TextComponent

                                                            TextValue = {"₹" + element.Product_discount_price +"/-"}
                                                            TextFamily = "Sans"
                                                            TextColor = {colorCode.Cake_option_price_text_color}
                                                            TextSize = {18}
                                                        />

                                                        <Pressable style={HomeScreenStyle.BuyNowOption}
                                                            android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                                                            onPress={() => navigation.navigate("ProductInformation", {"Category_id":element.Category_id, "Product_id":element.Product_id})}>

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

                                    

                                </ScrollView>
                            
                            </>:<>

                                <View style={HomeScreenStyle.CategoryListLoad_layout}>

                                    <SkypeIndicator></SkypeIndicator>
                                
                                </View>
                            </>}
                            

                        </View>

                        {/* ======== Option 7 Posters  ========  */}

                        {/* Title  */}

                        <TextComponent
                            TextValue = "Specially for you"
                            TextFamily = "Rubik"
                            TextSize = {18}
                            TextColor = {colorCode.HomeScreen_information_title_color}
                            TextStyle = {{marginLeft: 13, marginTop: 20, marginLeft:"auto", marginRight:"auto"}}
                        />

                        <View style={HomeScreenStyle.MenuOptionLayout}>

                            {/* Brithday cake and Anniversary cake option layout  */}

                            <View style={HomeScreenStyle.PosterDataLayot}>

                                <Pressable>

                                    <Image
                                        style = {[HomeScreenStyle.PosterImage, {width:PosterImage_width, marginRight:'1%'}]}
                                        source= {require('../../assets/Products/Brithday.jpg') }
                                    />

                                </Pressable>

                                <Pressable>

                                    <Image
                                        style = {[HomeScreenStyle.PosterImage, {width:PosterImage_width, marginLeft: '1%'}]}
                                        source = {require('../../assets/Products/Anniversary.jpg')}
                                    />

                                </Pressable>

                            </View>

                            {/* Bestdeal and Bestseller information layout  */}

                            <View style={HomeScreenStyle.PosterDataLayot}>

                                <Pressable>

                                    <Image
                                        style = {[HomeScreenStyle.PosterImage, {width:PosterImage_width, marginRight:'1%'}]}
                                        source= {require('../../assets/Products/BestSeller.jpg') }
                                    />

                                </Pressable>

                                <Pressable>

                                    <Image
                                        style = {[HomeScreenStyle.PosterImage, {width:PosterImage_width, marginLeft: '1%'}]}
                                        source = {require('../../assets/Products/Bestdeal.jpg')}
                                    />

                                </Pressable>

                            </View>

                            
                        </View>

                        {/* ======= Option 8 Party decoration order option =======  */}

                        <View style={HomeScreenStyle.CommonOptionLayout}>
                            
                            {/* Title  */}

                            <TextComponent
                                TextValue = "We take party decoration order"
                                TextFamily = "Rubik"
                                TextSize = {18}
                                TextColor = {colorCode.HomeScreen_information_title_color}
                                TextStyle = {{marginLeft: 13}}
                            />
                            
                            {/* ==== Party decoration image slider ====  */}

                            <View style={[HomeScreenStyle.BannerImageLayout, {marginTop: 20}]}>
                                
                                {Decoration_banner_data.length > 0?<>
                                
                                    <FlatListSlider 
                                        data={Decoration_banner_data} 
                                        component = {<HomePreview/>}
                                        autoscroll = {false}
                                    />

                                </>:<></>}

                            </View>

                            {/* Book party decoration order  */}

                            <Pressable style={HomeScreenStyle.BookPartyOrder}
                                android_ripple = {{color: colorCode.Custom_cake_option_layout_ripple_color}}
                                onPress = {() => navigation.navigate("PartyDecoration")}>

                                <TextComponent
                                    TextValue = "📦 Book order"
                                    TextFamily = "Ubuntu"
                                    TextSize = {17}
                                    TextColor = {colorCode.Custom_cake_option_text_color}
                                    TextStyle = {{marginLeft: 'auto', marginRight: 'auto'}}
                                />

                            </Pressable>

                        </View>

                        {/* ====== Option 9 Contact number information =====  */}

                        <View style={[HomeScreenStyle.CommonOptionLayout, 
                            
                            {backgroundColor: '#ffffff', 
                            padding: 10, 
                            borderRadius: 10, 
                            marginBottom: 10, 
                            marginTop: 15}]}
                            >

                            {/* Contact number title  */}

                            <TextComponent
                                TextValue = "📝 Contact number"
                                TextColor = {colorCode.Cake_option_text_title_color}
                                TextFamily = "Ubuntu"
                                TextSize = {18}
                            />

                            {/* Contact number  */}

                            <TextComponent

                                TextValue = "+91-96385-39546"
                                TextFamily = "Sans" 
                                TextColor = {colorCode.Cake_option_price_text_color}
                                TextSize = {18}
                                TextStyle = {{marginTop: 10, marginLeft: 5}}
                            />
                        </View>

                        {/* ====== Option 10 Social handle information layout ====== */}

                        <View style={HomeScreenStyle.CommonOptionLayout}>

                            {/* Social handle information tile  */}

                            <TextComponent
                                TextValue = "Social handle"
                                TextColor = {colorCode.Cake_option_text_title_color}
                                TextFamily = "Ubuntu"
                                TextSize = {20}
                                TextStyle = {{marginLeft: 'auto', marginRight: 'auto'}}
                            />

                            <View style= {HomeScreenStyle.AllSocialHandle}>

                                <Pressable>
                                    
                                    <Image
                                        style = {[HomeScreenStyle.SocialHandleImage, {marginRight: 10}]}
                                        source={require('../../assets/SocialHandle/Facebook.png')}
                                    />
                                
                                </Pressable>

                                <Pressable>
                                    
                                    <Image
                                        style = {[HomeScreenStyle.SocialHandleImage, {marginLeft: 10}]}
                                        source = {require('../../assets/SocialHandle/Instagram.png')}
                                    />

                                </Pressable>
                            </View>

                        </View>


                    </ScrollView>
                
                </>:<></>}

                {/* ======== Stop Home Screen layout =========  */}
                
                {/* ======== Start category list layout ========  */}
                
                {listOptionLayout?<>
                    
                    <AllCategory/>

                </>:<></>}

                {/* ======= Stop category list layout =======  */}
                
                {/* ====== Bottom navigator =====  */}

                <View style={HomeScreenStyle.BottomNavigator}>
                    
                    {/* Option1 Home option  */}

                    <Pressable style={HomeScreenStyle.BottomNavigator_option_layout}
                        android_ripple = {{color: colorCode.Authentication_button_ripper_color}}
                        onPress = {() => Bottom_navigator_handler(0)}>

                        <Image
                            style = {HomeScreenStyle.BottomNavigatorOption_image}
                            source = {homeOption?require('../../assets/Bottom-navigator/Active-home.png'):require('../../assets/Bottom-navigator/Disable-home.png')}
                        />
                
                    </Pressable>
                    
                    {/* Option 2  = Category list  */}

                    <Pressable style={HomeScreenStyle.BottomNavigator_option_layout}
                        android_ripple = {{color: colorCode.Authentication_button_ripper_color}}
                        onPress = {() => navigation.navigate("Allcategory")}>

                        <Image
                            style = {HomeScreenStyle.BottomNavigatorOption_image}
                            source={listOption?require('../../assets/Bottom-navigator/Active-category.png'):require('../../assets/Bottom-navigator/Disable-category.png')}
                        />
                
                    </Pressable>

                    {/* Option 3 Cart option  */}

                    <Pressable style={HomeScreenStyle.BottomNavigator_option_layout}
                        android_ripple = {{color: colorCode.Authentication_button_ripper_color}}
                        onPress = {() => navigation.navigate("Cart")}>

                        <Image
                            style = {HomeScreenStyle.BottomNavigatorOption_image}
                            source={cartOption?require('../../assets/Bottom-navigator/Active-cart.png'):require('../../assets/Bottom-navigator/Disable-cart.png')}

                        />
                
                    </Pressable>
                    
                    {/* Option 4 User option  */}

                    <Pressable style={HomeScreenStyle.BottomNavigator_option_layout}
                        android_ripple = {{color: colorCode.Authentication_button_ripper_color}}
                        onPress = {() => navigation.navigate("UserInformation")}>

                        <Image
                            style = {HomeScreenStyle.BottomNavigatorOption_image}
                            source={userOption?require('../../assets/Bottom-navigator/Active-user.png'):require('../../assets/Bottom-navigator/Disable-user.png')}
                        />
                
                    </Pressable>
                
                </View>

            </View>
        )
    }
}

const HomeScreenStyle = new StyleSheet.create({
    HomeScreenLayout:{
        height: '100%', 
        width: '100%', 
        backgroundColor: colorCode.HomeScreen_bg_color
    }, 

    // Title option layout 

    TitleLayout:{
        backgroundColor: colorCode.HomeScreen_statusbar_color, 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'row', 
        paddingTop:8,
        paddingBottom:8
    }, 

    MenuOptionLayout:{
        paddingTop: 5, 
        paddingBottom:5, 
        paddingLeft: 10, 
        paddingRight: 10, 
        marginTop: 'auto', 
        marginBottom: 'auto'
    }, 

    MenuImage:{
        height: 40, 
        width:  30
    }, 

    OptionLayout:{
        display:'flex', 
        flexDirection: 'row', 
        marginLeft:'auto', 
        marginTop: 'auto', 
        marginBottom: 'auto', 
        marginRight: 15
    }, 

    OptionImageLayout:{
        padding: 7, 
        marginTop: 'auto', 
        marginBottom: 'auto'
    },

    // ---- Banner image division ---- // 

    BannerImageLayout:{
        marginTop: 8 
    }, 

    // ---- All category list layout ---- // 

    CommonOptionLayout:{
        width: '96%',
        marginTop: 10,
        marginLeft: 'auto', 
        marginRight: 'auto' 
    }, 

    CategoryOptionLayout:{
        display: 'flex', 
        flexDirection:'row', 
        backgroundColor: colorCode.HomeScreen_category_layout_bgColor, 
        paddingTop: 6, 
        paddingBottom: 6, 
        paddingLeft: 13, 
        paddingRight: 13, 
        borderRadius: 10, 
        marginTop: 10, 
        marginBottom: 5, 
        marginRight: 10
    }, 

    CategoryImage:{
        height:33, 
        width: 33, 
        borderRadius: 20
    }, 

    // ---- Placed custom cake order and latest product option layout ----- //

    PlacedCustomCakeOrderLayout:{
        width: '96%',
        marginTop: 8,
        marginLeft: 'auto', 
        marginRight: 'auto' 
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
        paddingBottom: 8 
    }, 

    NewArrivalsLayout:{
        marginTop: 15, 
        marginBottom: 15
    }, 

    NewArrivalsImage:{
        width: '100%',
        resizeMode: 'contain', 
        height: 60
    }, 

    // --- Option4 Yummy cake option layout --- // 

    YummycakeOptionLayout:{
        display: 'flex', 
        flexDirection: 'row', 
        marginTop: 15, 
        marginLeft: 'auto', 
        marginRight: 'auto', 
        
    }, 

    ViewAllOptionLayout:{
        display: 'flex', 
        flexDirection: 'row', 
    },

    ViewAllOption:{
        backgroundColor: colorCode.Authentication_button_color , 
        marginLeft:"auto", 
        marginRight: 10, 
        paddingTop: 7, 
        paddingBottom: 7, 
        paddingLeft: 10, 
        paddingRight: 10, 
        borderRadius: 10
    },

    CakeOptionMainLayout:{
        elevation: 20, 
        shadowColor: '#000000'
    }, 

    CakeOptionImage:{
        height: 170,
        resizeMode: 'contain', 
        borderTopLeftRadius: 5, 
        borderTopRightRadius: 5
    }, 

    CakeOptionTextLayout:{
        backgroundColor: '#ffffff', 
        borderBottomLeftRadius: 5, 
        borderBottomRightRadius: 5, 
        paddingTop: 5, 
        paddingLeft: 5, 
        paddingRight: 5, 
        paddingBottom: 8, 
    }, 

    // ---- Our top selling product otpion layout ---- // 

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

    // ---- Poster information layout ---- // 

    PosterDataLayot:{
        display: 'flex', 
        flexDirection: 'row'
    }, 

    PosterImage:{
        resizeMode: 'contain', 
        height: 150, 
    }, 

    // ---- Book party decoration order option ---- // 

    BookPartyOrder:{
        backgroundColor: colorCode.Custom_cake_option_layout_bg_color, 
        borderRadius: 10, 
        width: '100%', 
        textAlign: 'center', 
        marginTop: 15, 
        paddingTop: 15, 
        paddingBottom: 15
    }, 

    // ---- Social handle information layout ---- // 

    AllSocialHandle:{
        display: 'flex', 
        flexDirection: 'row', 
        marginLeft: 'auto', 
        marginRight: 'auto', 
        textAlign: 'center', 
        marginTop: 20, 
        marginBottom: 75
    },

    SocialHandleImage:{
        height: 50, 
        width: 50
    }, 

    // ---- Bottom navigator ---- // 

    BottomNavigator:{
        backgroundColor: colorCode.Authentication_button_color, 
        width: '85%', 

        position: 'absolute', 
        bottom: 0, 
        
        marginLeft: "7%",
        marginBottom: 15, 

        paddingTop: 4,
        paddingBottom: 4,  

        display: 'flex', 
        textAlign: 'center', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row' , 
        borderRadius: 30, 

        elevation: 20, 
        shadowColor: "#8ca9ff"
    }, 

    BottomNavigator_option_layout:{
        padding: 8, 
        marginLeft: 15, 
        marginRight: 15
    }, 

    BottomNavigatorOption_image:{
        height: 30, 
        width: 30, 
        resizeMode: 'cover'
    }, 

    PosteInformationLayout:{
        display: 'flex', 
        flexDirection:'row'
    }, 

    Purchase_image:{
        width: '48%', 
        resizeMode:'contain', 
        marginLeft: '1%'
    }, 

    CategoryListLoad_layout:{
        height:170,
        width: '100%' 
    }
})
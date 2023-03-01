import React, {useState, useEffect} from "react";
import { View, StyleSheet, ScrollView, Pressable, Image, Dimensions, Alert, ToastAndroid } from "react-native";

// **** Import colorCode file **** //
import * as colorCode from '../../Color-code/Color-codes'; 

// **** Import Text and Statusbar Component **** // 
import TextComponent from '../../Component/TextComp' ; 
import StatusbarComponent from '../../Component/StatusbarComp' ; 

// **** Import Font and Navigationbar libarary **** // 
import * as Font from 'expo-font'; 
import * as Navigationbar from 'expo-navigation-bar' ;
import * as URL from '../../URL/RequestURL' ; 

export default function HomeScreen({navigation}){

    // ---- Set NavigationBar color ---- //
    
    Navigationbar.setBackgroundColorAsync("#ffffff");

    // ---- Option layout width ---- // 

    const OptionLayout_width = (Dimensions.get('window').width*0.30)

    // ---- Load Font ---- //

    const [loadFont, setLoadFont] = useState(false);

    useEffect(() => {
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

    // ---- Activity Indicator ---- //

    const [indicatorValue, setIndicatorValue] = useState(false);

    // ===== Category option handler ===== // 

    const Create_category_option_handler = () => {

        navigation.navigate("CreateCategory") ; 
    }

    // ===== Delete status option handler ==== // 

    const Delete_status_request = async () => {

        try{

            let Request_url = URL.Authentication_url ; 
                    
            let Request_data = {
                "Check_status": "Delete-latest-product"
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

                ToastAndroid.show("Your today status delete successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }

        }catch{
            
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }

    const Delete_status_handler = () => {

        Alert.alert("Delete category", 
        'Are you sure you want to Delete status ?',
        [ 
            {
                text: "Yes", 
                onPress: () => Delete_status_request()
            }, 
            {
                text: "No"
            }
        ]
    )
    }

    if (loadFont){

        return(
            <View style={HomeScreenStyle.HomeScreenLayout}>

                {/* Statusbar component  */}

                <StatusbarComponent
                    color = {colorCode.HomeScreen_background_color}
                />

                {/* ====== Title option ======  */}
                
                <TextComponent
                    TextValue = "Admin Panel"
                    TextFamily = "Ubuntu"
                    TextColor = {colorCode.Authentication_title_color}
                    TextSize = {20}
                    TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop:10, marginBottom:10}}
                />

                <ScrollView style={HomeScreenStyle.AllOption_layout}>

                    {/* ====== Start category option ======  */}

                    <View style={HomeScreenStyle.OptionMainLayout}>

                        {/* Category option image and title */}

                        <Pressable 
                            style = {[HomeScreenStyle.HomeSceenOption_layout, {width:OptionLayout_width}]}
                            android_ripple = {{color:'#b4b4b4'}}
                            >

                            <Image
                                style = {HomeScreenStyle.HomeScreenOption_image}
                                source={require('../../assets/HomScreen/Category.jpg')}
                            />

                            <TextComponent
                                TextValue = "Category option"
                                TextFamily = "Ubuntu"
                                TextSize = {17}
                                TextColor = {colorCode.Authentication_subtitle_color}
                                TextStyle = {{marginLeft: "auto", marginRight:"auto", marginTop: 10, textAlign:"center"}}
                            />

                        </Pressable>
                        
                        <View style={HomeScreenStyle.AllOptionButton_layout}>

                            {/* ==== Option 1 --- Create category ====  */}

                            <Pressable style={HomeScreenStyle.OptionButtonLayout}
                                android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                                onPress = {Create_category_option_handler}>
                                
                                <TextComponent
                                    TextValue = "Create"
                                    TextFamily = "Ubuntu"
                                    TextColor = "#ffffff"
                                    TextSize = {18}
                                />
                                
                            </Pressable>

                            {/* ==== Option 2 --- Update category option ====  */}

                            <Pressable style={HomeScreenStyle.OptionButtonLayout}
                                android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                                onPress = {() => navigation.navigate("CategorySelection", {"SelectOption":"Update"})}>
                                
                                <TextComponent
                                    TextValue = "Update"
                                    TextFamily = "Ubuntu"
                                    TextColor = "#ffffff"
                                    TextSize = {18}
                                />

                            </Pressable>

                            {/* ===== Option 3 ---- Delete category option =====  */}

                            <Pressable style={HomeScreenStyle.OptionButtonLayout}
                                android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                                onPress = {() => navigation.navigate("CategorySelection", {"SelectOption": "Delete"})}>
                                
                                <TextComponent
                                    TextValue = "Delete"
                                    TextFamily = "Ubuntu"
                                    TextColor = "#ffffff"
                                    TextSize = {18}
                                />

                            </Pressable>

                        </View>
                    </View>

                    {/* ====== Stop category option ======  */}


                    {/* ====== Start product related option ======  */}

                    <View style={HomeScreenStyle.OptionMainLayout}>

                        {/* Product option image and title */}

                        <Pressable 
                            style = {[HomeScreenStyle.HomeSceenOption_layout, {width:OptionLayout_width}]}
                            android_ripple = {{color:'#b4b4b4'}}
                            >

                            <Image
                                style = {HomeScreenStyle.HomeScreenOption_image}
                                source={require('../../assets/HomScreen/Product.png')}
                            />

                            <TextComponent
                                TextValue = "Product option"
                                TextFamily = "Ubuntu"
                                TextSize = {17}
                                TextColor = {colorCode.Authentication_subtitle_color}
                                TextStyle = {{marginLeft: "auto", marginRight:"auto", marginTop: 10, textAlign:"center"}}
                            />

                        </Pressable>
                        
                        <View style={HomeScreenStyle.AllOptionButton_layout}>

                            {/* ==== Option 1 --- Upload product option ====  */}

                            <Pressable style={HomeScreenStyle.OptionButtonLayout}
                                android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                                onPress = {() => navigation.navigate("CategorySelection", {"SelectOption":"Upload Product"})}>
                                
                                <TextComponent
                                    TextValue = "Upload"
                                    TextFamily = "Ubuntu"
                                    TextColor = "#ffffff"
                                    TextSize = {18}
                                />
                                
                            </Pressable>

                            {/* ==== Option 2 --- Update product option  ====  */}

                            <Pressable style={HomeScreenStyle.OptionButtonLayout}
                                android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                                onPress = {() => navigation.navigate("CategorySelection", {"SelectOption":"Update product"})}>
                                
                                <TextComponent
                                    TextValue = "Update"
                                    TextFamily = "Ubuntu"
                                    TextColor = "#ffffff"
                                    TextSize = {18}
                                />

                            </Pressable>

                            {/* ===== Option 3 ---- Delete product option =====  */}

                            <Pressable style={HomeScreenStyle.OptionButtonLayout}
                                android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                                onPress = {() => navigation.navigate("CategorySelection", {"SelectOption": "Delete product"})}>
                                
                                <TextComponent
                                    TextValue = "Delete"
                                    TextFamily = "Ubuntu"
                                    TextColor = "#ffffff"
                                    TextSize = {18}
                                />

                            </Pressable>

                        </View>
                    </View>

                    {/* ====== Stop product related option ======  */}

                    {/* ===== Start delivery related option =====  */}

                    <View style={HomeScreenStyle.OptionMainLayout}>
                        
                        <View style={[HomeScreenStyle.HomeSceenOption_layout, {width:OptionLayout_width}]}>

                            <Image
                                style = {HomeScreenStyle.HomeScreenOption_image}
                                source = {require('../../assets/HomScreen/Delivery.png')}
                            />

                            <TextComponent
                                TextValue = "Delivery"
                                TextFamily = "Ubuntu"
                                TextSize = {17}
                                TextColor = {colorCode.Authentication_subtitle_color}
                                TextStyle = {{marginLeft: "auto", marginRight:"auto", 
                                            marginTop: 10, textAlign:"center", width:"90%"}}
                            />

                        </View>

                        {/* All option layout  */}

                        <View style={[HomeScreenStyle.AllOptionButton_layout, {marginTop:"auto", marginBottom:"auto"}]}>

                            <Pressable style={[HomeScreenStyle.OptionButtonLayout, {backgroundColor:"red"}]}
                                android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                                onPress = {() => navigation.navigate("Scanner")}>
                                
                                <TextComponent
                                    TextValue = "Deliver cake"
                                    TextFamily = "Ubuntu"
                                    TextColor = "#ffffff"
                                    TextSize = {17}
                                />
                                
                            </Pressable>

                            <Pressable style={[HomeScreenStyle.OptionButtonLayout, {backgroundColor:"red"}]}
                                android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                                onPress = {() => navigation.navigate("Custom_order_scanner")}>
                                
                                <TextComponent
                                    TextValue = "Deliver custom order"
                                    TextFamily = "Ubuntu"
                                    TextColor = "#ffffff"
                                    TextSize = {17}
                                />
                                
                            </Pressable>

                        </View>

                    </View>


                    {/* ===== Stop delivery related option =====  */}


                    {/* ===== Start banner option layout ====  */}

                    <View style={HomeScreenStyle.OptionMainLayout}>
                        
                        <View style={[HomeScreenStyle.HomeSceenOption_layout, {width:OptionLayout_width}]}>

                            <Image
                                style = {HomeScreenStyle.HomeScreenOption_image}
                                source = {require('../../assets/HomScreen/Banner.png')}
                            />

                            <TextComponent
                                TextValue = "Banner"
                                TextFamily = "Ubuntu"
                                TextSize = {17}
                                TextColor = {colorCode.Authentication_subtitle_color}
                                TextStyle = {{marginLeft: "auto", marginRight:"auto", 
                                            marginTop: 10, textAlign:"center", width:"90%"}}
                            />

                        </View>

                        {/* All option layout  */}

                        <View style={[HomeScreenStyle.AllOptionButton_layout, {marginTop:"auto", marginBottom:"auto"}]}>

                            {/* ==== Send notification option ====  */}

                            <Pressable style={HomeScreenStyle.OptionButtonLayout}
                                android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                                onPress = {() => navigation.navigate("UpdateBanner")}>
                                
                                <TextComponent
                                    TextValue = "Manage"
                                    TextFamily = "Ubuntu"
                                    TextColor = "#ffffff"
                                    TextSize = {18}
                                />
                                
                            </Pressable>

                        </View>

                    </View>
                    
                    {/* ===== Stop banner option layout =====  */}

                    {/* ==== Start latest product option ====  */}

                    <View style={HomeScreenStyle.OptionMainLayout}>
                        
                        <View style={[HomeScreenStyle.HomeSceenOption_layout, {width:OptionLayout_width}]}>

                            <Image
                                style = {HomeScreenStyle.HomeScreenOption_image}
                                source = {require('../../assets/HomScreen/Latest.png')}
                            />

                            <TextComponent
                                TextValue = "Latest product"
                                TextFamily = "Ubuntu"
                                TextSize = {17}
                                TextColor = {colorCode.Authentication_subtitle_color}
                                TextStyle = {{marginLeft: "auto", marginRight:"auto", 
                                            marginTop: 10, textAlign:"center", width:"90%"}}
                            />

                        </View>

                        {/* All option layout  */}

                        <View style={[HomeScreenStyle.AllOptionButton_layout, {marginTop:"auto", marginBottom:"auto"}]}>

                            {/* ====== Upload option ======  */}

                            <Pressable style={HomeScreenStyle.OptionButtonLayout}
                                android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                                onPress = {() => navigation.navigate("LatestProduct")}>
                                
                                <TextComponent
                                    TextValue = "Upload"
                                    TextFamily = "Ubuntu"
                                    TextColor = "#ffffff"
                                    TextSize = {18}
                                />
                                
                            </Pressable>

                            {/* ====== Delete option ======  */}

                            <Pressable style={HomeScreenStyle.OptionButtonLayout}
                                android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                                onPress = {() => Delete_status_handler()}>
                                
                                <TextComponent
                                    TextValue = "Delete"
                                    TextFamily = "Ubuntu"
                                    TextColor = "#ffffff"
                                    TextSize = {18}
                                />
                                
                            </Pressable>

                        </View>

                    </View>


                    {/* ===== Stop latest product option =====  */}


                    {/* ==== Start send notification option =====  */}

                    <View style={HomeScreenStyle.OptionMainLayout}>
                        
                        <View style={[HomeScreenStyle.HomeSceenOption_layout, {width:OptionLayout_width}]}>

                            <Image
                                style = {HomeScreenStyle.HomeScreenOption_image}
                                source = {require('../../assets/HomScreen/Notification.png')}
                            />

                            <TextComponent
                                TextValue = "Notifcation"
                                TextFamily = "Ubuntu"
                                TextSize = {17}
                                TextColor = {colorCode.Authentication_subtitle_color}
                                TextStyle = {{marginLeft: "auto", marginRight:"auto", 
                                            marginTop: 10, textAlign:"center", width:"90%"}}
                            />

                        </View>

                        {/* All option layout  */}

                        <View style={[HomeScreenStyle.AllOptionButton_layout, {marginTop:"auto", marginBottom:"auto"}]}>

                            {/* ==== Send notification option ====  */}

                            <Pressable style={HomeScreenStyle.OptionButtonLayout}
                                android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                                onPress = {() => navigation.navigate("SendNotification")}>
                                
                                <TextComponent
                                    TextValue = "Send"
                                    TextFamily = "Ubuntu"
                                    TextColor = "#ffffff"
                                    TextSize = {18}
                                />
                                
                            </Pressable>

                        </View>

                    </View>

                    {/* ===== Stop send notification option =====  */}
                

                    {/* ====== Start admin related option ======  */}

                    <View style={HomeScreenStyle.OptionMainLayout}>
                        
                        <View style={[HomeScreenStyle.HomeSceenOption_layout, {width:OptionLayout_width}]}>

                            <Image
                                style = {HomeScreenStyle.HomeScreenOption_image}
                                source = {require('../../assets/HomScreen/Admin.png')}
                            />

                            <TextComponent
                                TextValue = "Admin option"
                                TextFamily = "Ubuntu"
                                TextSize = {17}
                                TextColor = {colorCode.Authentication_subtitle_color}
                                TextStyle = {{marginLeft: "auto", marginRight:"auto", 
                                            marginTop: 10, textAlign:"center", width:"90%"}}
                            />

                        </View>

                        <View style={HomeScreenStyle.AllOptionButton_layout}>

                            {/* Update Password option  */}

                            <Pressable style={HomeScreenStyle.OptionButtonLayout}
                                android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                                onPress = {() => navigation.navigate("UpdatePassword")}>
                                
                                <TextComponent
                                    TextValue = "Update password"
                                    TextFamily = "Ubuntu"
                                    TextColor = "#ffffff"
                                    TextSize = {18}
                                />
                                
                            </Pressable>

                            {/* Register numbers option  */}
                            

                            <Pressable style={HomeScreenStyle.OptionButtonLayout}
                                android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                                onPress = {() => navigation.navigate("RegisterNumber")}>
                                
                                <TextComponent
                                    TextValue = "Register number"
                                    TextFamily = "Ubuntu"
                                    TextColor = "#ffffff"
                                    TextSize = {18}
                                />
                                
                            </Pressable>

                            {/* New number option  */}

                            <Pressable style={HomeScreenStyle.OptionButtonLayout}
                                android_ripple = {{color:colorCode.Authentication_button_ripper_color}}
                                onPress = {() => navigation.navigate("Register-new-number")}>
                                
                                <TextComponent
                                    TextValue = "New number"
                                    TextFamily = "Ubuntu"
                                    TextColor = "#ffffff"
                                    TextSize = {18}
                                />
                                
                            </Pressable>
                            
                            <Pressable style={HomeScreenStyle.OptionButtonLayout}
                                android_ripple = {{color:colorCode.Authentication_button_ripper_color}}>
                                
                                <TextComponent
                                    TextValue = "Logout"
                                    TextFamily = "Ubuntu"
                                    TextColor = "#ffffff"
                                    TextSize = {18}
                                />

                            </Pressable>

                        </View>

                    </View>

                    {/* ===== Stop admin related option ======  */}

                </ScrollView>
            </View>
        )
    }
}

const HomeScreenStyle = new StyleSheet.create({
    HomeScreenLayout: {
        backgroundColor: colorCode.HomeScreen_background_color, 
        height: '100%', 
        width: '100%'
    }, 

    AllOption_layout:{
        paddingTop: 20
    }, 

    OptionMainLayout:{
        display: 'flex', 
        textAlign: 'center', 
        flexDirection: 'row', 
        backgroundColor: '#ffffff', 
        marginBottom: 15, 
        width: '96%', 
        marginLeft: 'auto', 
        marginRight: 'auto', 
        paddingTop: 10, 
        paddingBottom: 10, 
        borderRadius: 5,
        elevation: 10, 
        shadowColor: "#6e6e6e"
    }, 

    HomeSceenOption_layout:{
        marginLeft: 15, 
        marginRight: 15, 
        paddingTop: 10,
        paddingBottom: 10, 
        borderRadius: 5, 
    }, 

    HomeScreenOption_image:{
        height: 50, 
        width: '96%', 
        resizeMode: 'contain'
    }, 

    AllOptionButton_layout:{
        paddingTop: 5, 
        paddingLeft: 10
    }, 

    OptionButtonLayout:{
        backgroundColor:colorCode.Authentication_button_color,
        borderRadius: 5, 

        paddingTop: 8,
        paddingBottom: 8, 
        paddingLeft: 15, 
        paddingRight: 15, 

        marginBottom: 10
    }
})
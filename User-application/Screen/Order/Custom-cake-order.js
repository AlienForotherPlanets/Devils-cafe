import React, {useState, useEffect} from "react";
import { View, StyleSheet, Image, Pressable, ScrollView, Text, ToastAndroid } from "react-native";

// **** Colorcode and ScreenStyle **** // 
import * as colorCode from '../../Color-code/Color-codes' ; 
import * as style from '../../Style/AuthenticationStyle' ; 

// **** Text and StatusBar component **** // 
import TextComponent from "../../Component/TextComp";
import StatusbarComponent from '../../Component/StatusbarComp' ; 

// **** Import require packages **** // 
import * as Navigationbar from 'expo-navigation-bar' ;
import * as Font from 'expo-font' ;  

// **** Import Device and Notification package **** // 
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

// **** Import Request URL **** // 
import * as URL from '../../URL/RequestURL' ; 
import { SkypeIndicator } from "react-native-indicators";

export default function Custom_cake_order_list({navigation}){

    // ---- Set NavigationBar color ---- //

    Navigationbar.setBackgroundColorAsync("#ffffff");

    // ---- Load Font ---- //

    const [loadFont, setLoadFont] = useState(false);

    const [order_data, set_order_data] = useState([]) ; 

    const [loading_layout, setLoading_layout] = useState(true) ; 

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

        // ====== Fetch pending order request ====== // 

        const Fetch_pending_order_request = async () => {

            setLoading_layout(true) ; 

            let User_table = await AsyncStorage.getItem("Table") ; 

            let Request_url = URL.Authentication_request_url ; 
            
            let Request_data = {
                "Check_status":"Fetch-custom-cake-order", 
                "Table_name": User_table
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

            if (Response_status == "Fetch"){

                set_order_data([...Response.Order].reverse()) ; 

                setLoading_layout(false) ; 

                Option_handler(0) ; 
            }

        }

        Fetch_pending_order_request() ; 

    }, []);

    // ===== Order option handler ====== // 

    const [option1, setOption1] = useState(false) ; 
    const [option2, setOption2] = useState(false) ; 
    const [option3, setOption3] = useState(false) ; 

    const Option_handler = (x) => {

        setOption1(false) ; 
        setOption2(false) ; 
        setOption3(false) ; 

        if (x == 0){

            setOption1(true) ; 

        }else if (x == 1){

            setOption2(true) ; 
        
        }else{

            setOption3(true) ; 

        }
    }

    // ===== Pending order option handler ===== // 

    const Pending_order_handler = () => {

        Option_handler(0) ; 
    }

    // ===== Complete order option handler ===== // 

    const Complete_order_handler = async () => {

        Option_handler(1) ; 

        setLoading_layout(true) ;
        
        try{

            let User_table = await AsyncStorage.getItem("Table") ; 

            let Request_url = URL.Authentication_request_url ; 
            
            let Request_data = {
                "Check_status":"Fetch-custom-cake-complete-order", 
                "Table_name": User_table
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

            if (Response_status == "Fetch"){

                set_order_data([...Response.Order].reverse()) ; 
            }

        }catch{

            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }

        setLoading_layout(false) ; 
    }

    // ===== Cancel order option handler ====== // 
    
    const Cancel_order_handler = () => {

        Option_handler(2) ; 
    }

    // ===== Qr code image layout ===== // 

    const [qr_code_layout, set_qr_code_layout] = useState(false) ; 

    const [qr_code_url, set_qr_code_url] = useState('') ; 

    const Set_qr_code_layout = async (Order_id) => {
        
        let User_table = await AsyncStorage.getItem("Table") ; 

        let Mobilenumber = await AsyncStorage.getItem("Mobilenumber") ; 

        let Qr_code_data = User_table + "**" + Mobilenumber + "**" + Order_id ; 

        let Qr_code_URL = "https://api.qrserver.com/v1/create-qr-code/?data=" + Qr_code_data ; 

        set_qr_code_url(Qr_code_URL) ; 

        set_qr_code_layout(true) ; 

    }

    if (loadFont){

        return(
            <View style={OrderlistStyle.OrderlistLayout}>

                {/* Statusbar component  */}
                <StatusbarComponent
                    color = {colorCode.Authentication_button_color}
                />

                {/* BackOption and Title Layout  */}

                <View style={OrderlistStyle.BackOptionLayout}>
                    
                    {/* Back option  */}

                    <Pressable
                        android_ripple={{color:colorCode.Authentication_button_ripper_color}}
                        style = {OrderlistStyle.BackImageLayout}
                        onPress = {() => navigation.goBack()}>
                        
                        <Image
                            style={style.Authentication_BackImage}
                            source={require("../../assets/Images/Other_back.png")}
                        />

                    </Pressable>

                    {/* Title layout  */}

                    <TextComponent
                        TextValue = "Custom cake order"
                        TextSize = {20}
                        TextFamily = "Ubuntu"
                        TextColor = {"#ffffff"}
                        TextStyle = {{marginTop: "auto", marginBottom: 'auto', marginLeft: 4}}
                    />

                </View>

                {/* ===== All order option layout ======  */}

                <View style={OrderlistStyle.OrderFetchOption}>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} >

                        {/* ====== Pending order option ======  */}

                        <Pressable style={[OrderlistStyle.ParticularFetchOption, option1?{backgroundColor:"#a3b1ff"}
                            :{backgroundColor:"#ffffff"}]}
                            onPress = {() => Pending_order_handler(0)}>

                            <TextComponent
                                TextValue = "Pending order"
                                TextFamily = "Mukta"
                                TextColor = {colorCode.Authentication_title_color}
                                TextSize = {17}
                            />

                        </Pressable>
                       
                        {/* ====== Complete order option  ======  */}

                        <Pressable style={[OrderlistStyle.ParticularFetchOption, option2?{backgroundColor:"#a3b1ff"}
                            :{backgroundColor:"#ffffff"}]}
                            onPress = {() => Complete_order_handler(1)}>

                            <TextComponent
                                TextValue = "Complete order"
                                TextFamily = "Mukta"
                                TextColor = {colorCode.Authentication_title_color}
                                TextSize = {17}
                            />

                        </Pressable>

                        {/* ====== Cancel order option ======  */}

                        <Pressable style={[OrderlistStyle.ParticularFetchOption, option3?{backgroundColor:"#a3b1ff"}
                            :{backgroundColor:"#ffffff"}]}
                            onPress = {() => Cancel_order_handler(2)}>

                            <TextComponent
                                TextValue = "Cancel order"
                                TextFamily = "Mukta"
                                TextColor = {colorCode.Authentication_title_color}
                                TextSize = {17}
                            />

                        </Pressable>
                        
                    </ScrollView>
                    

                </View>

                {/* ====== All order list ======  */}
                
                {loading_layout?<>
                    <SkypeIndicator></SkypeIndicator>
                </>:
                <>
                    <ScrollView>

                        {order_data.length == 0?<>
                            
                            <TextComponent
                                TextValue = "Not found any order information"
                                TextFamily = "Ubuntu"
                                TextSize = {20}
                                TextColor = {colorCode.Authentication_title_color}
                                TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop:30}}
                            />

                        </>:<>
                        
                            {/* ===== Order information layout ======  */}

                            {order_data.map((element, index) => {
                                
                                return(

                                    <View style={OrderlistStyle.OrderInformationLayout} 
                                        key = {index}>

                                        {/* Username information  */}
                                        
                                        <View style={[OrderlistStyle.UserInformationStyle, 
                                            {   backgroundColor: "#ffffff", 
                                                borderBottomColor:"#dfdfdf", 
                                                borderBottomWidth:1}]} >
                                            
                                            <TextComponent
                                                TextValue = "Username"
                                                TextFamily = "Mukta"
                                                TextSize = {16}
                                                TextColor = {colorCode.Authentication_title_color}
                                                TextStyle = {OrderlistStyle.OrderInformation_title}
                                            />

                                            <TextComponent
                                                TextValue = {element.Data11}
                                                TextFamily = "Ubuntu"
                                                TextSize = {16}
                                                TextColor = {colorCode.Authentication_title_color}
                                                TextStyle = {OrderlistStyle.OrderInformation_data}
                                            />
                                        
                                        </View>

                                        {/* ====== Order id information ======  */}
                                        
                                        <View style={[OrderlistStyle.UserInformationStyle, OrderlistStyle.OtherInformationLayout, {paddingTop: 6}]} >
                                            
                                            <TextComponent
                                                TextValue = "Order id"
                                                TextFamily = "Mukta"
                                                TextSize = {16}
                                                TextColor = {colorCode.Authentication_title_color}
                                                TextStyle = {OrderlistStyle.OrderInformation_title}
                                            />

                                            <TextComponent
                                                TextValue = {element.Data2}
                                                TextFamily = "Ubuntu"
                                                TextSize = {16}
                                                TextColor = {colorCode.Authentication_title_color}
                                                TextStyle = {OrderlistStyle.OrderInformation_data}
                                            />
                                        
                                        </View>

                                        {/* ======= Order date information =======  */}
                                        
                                        <View style={[OrderlistStyle.UserInformationStyle, OrderlistStyle.OtherInformationLayout]} >
                                            
                                            <TextComponent
                                                TextValue = "Order date"
                                                TextFamily = "Mukta"
                                                TextSize = {16}
                                                TextColor = {colorCode.Authentication_title_color}
                                                TextStyle = {OrderlistStyle.OrderInformation_title}
                                            />

                                            <TextComponent
                                                TextValue = {element.Data3}
                                                TextFamily = "Ubuntu"
                                                TextSize = {16}
                                                TextColor = {colorCode.Authentication_title_color}
                                                TextStyle = {OrderlistStyle.OrderInformation_data}
                                            />
                                        
                                        </View>

                                        {/* ======= Order deliver date information =======  */}

                                        {option2 == true ?<>
                                        
                                            <View style={[OrderlistStyle.UserInformationStyle, OrderlistStyle.OtherInformationLayout]} >
                                                
                                                <TextComponent
                                                    TextValue = "Order deliver date"
                                                    TextFamily = "Mukta"
                                                    TextSize = {16}
                                                    TextColor = {colorCode.Authentication_title_color}
                                                    TextStyle = {OrderlistStyle.OrderInformation_title}
                                                />

                                                <TextComponent
                                                    TextValue = {element.Data4}
                                                    TextFamily = "Ubuntu"
                                                    TextSize = {16}
                                                    TextColor = {colorCode.Authentication_title_color}
                                                    TextStyle = {OrderlistStyle.OrderInformation_data}
                                                />
                                            
                                            </View>

                                        </>:<></>}

                                        <View style={OrderlistStyle.CakeInformationLayout}
                                            key = {index}>

                                            {/* Product image  */}

                                            <Pressable>

                                                <Image
                                                    style = {OrderlistStyle.CakeImage}
                                                    source={{uri:element.Data6}}
                                                />

                                            </Pressable>


                                            <View style={OrderlistStyle.ProductInformation}>

                                                {/* Product information  */}

                                                <TextComponent
                                                    TextValue = {element.Data9}
                                                    TextFamily = "Mukta"
                                                    TextColor = {colorCode.Authentication_title_color}
                                                    TextSize = {16}
                                                />

                                                {/* Product weight information  */}

                                                <View style={OrderlistStyle.ProductPrice}>
                                                    
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
                                                        TextValue = {String(element.Data10).split("**")[0]}
                                                        TextColor = {colorCode.Authentication_title_color}
                                                        TextSize = {16}
                                                        TextFamily = "Ubuntu"
                                                        TextStyle = {{marginLeft: 10, 
                                                            marginTop: 'auto', 
                                                            marginBottom: 'auto'}}
                                                    />
                                                
                                                </View>

                                                {/* Product flavour option  */}
                                                
                                                <View style={OrderlistStyle.ProductPrice}>
                                                    
                                                    <TextComponent
                                                        TextValue = "Color option"
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
                                                        TextValue = {String(element.Data10).split("**")[1]}
                                                        TextColor = {colorCode.Authentication_title_color}
                                                        TextSize = {16}
                                                        TextFamily = "Ubuntu"
                                                        TextStyle = {{marginLeft: 10, 
                                                            marginTop: 'auto', 
                                                            marginBottom: 'auto'}}
                                                    />
                                                
                                                </View>

                                                {/* Name on cake information  */}

                                                <View style={OrderlistStyle.ProductPrice}>
                                                    
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
                                                        TextValue = {element.Data11}
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


                                        {/* ===== Product address information layout =====  */}

                                        {/* ==== Street address information ====  */}

                                        <View style={[OrderlistStyle.UserInformationStyle, OrderlistStyle.OtherInformationLayout, {borderTopColor:"#dfdfdf", 
                                                borderTopWidth:1}]} >
                                            
                                            <TextComponent
                                                TextValue = "Address"
                                                TextFamily = "Mukta"
                                                TextSize = {16}
                                                TextColor = {colorCode.Authentication_title_color}
                                                TextStyle = {{...OrderlistStyle.OrderInformation_title, marginTop: 8 }}
                                            />

                                            <TextComponent
                                                TextValue = {element.Data12}
                                                TextFamily = "Ubuntu"
                                                TextSize = {16}
                                                TextColor = {colorCode.Authentication_title_color}
                                                TextStyle = {OrderlistStyle.OrderInformation_data}
                                            />
                                        
                                        </View>

                                        {/* ==== Area information ====  */}

                                        <View style={[OrderlistStyle.UserInformationStyle, OrderlistStyle.OtherInformationLayout]} >
                                            
                                            <TextComponent
                                                TextValue = "Area"
                                                TextFamily = "Mukta"
                                                TextSize = {16}
                                                TextColor = {colorCode.Authentication_title_color}
                                                TextStyle = {OrderlistStyle.OrderInformation_title}
                                            />

                                            <TextComponent
                                                TextValue = {element.Data13}
                                                TextFamily = "Ubuntu"
                                                TextSize = {16}
                                                TextColor = {colorCode.Authentication_title_color}
                                                TextStyle = {OrderlistStyle.OrderInformation_data}
                                            />
                                        
                                        </View>

                                        {/* City information  */}

                                        <View style={[OrderlistStyle.UserInformationStyle, OrderlistStyle.OtherInformationLayout]} >
                                            
                                            <TextComponent
                                                TextValue = "City"
                                                TextFamily = "Mukta"
                                                TextSize = {16}
                                                TextColor = {colorCode.Authentication_title_color}
                                                TextStyle = {OrderlistStyle.OrderInformation_title}
                                            />

                                            <TextComponent
                                                TextValue = {element.Data14}
                                                TextFamily = "Ubuntu"
                                                TextSize = {16}
                                                TextColor = {colorCode.Authentication_title_color}
                                                TextStyle = {OrderlistStyle.OrderInformation_data}
                                            />
                                        
                                        </View>

                                        {/* ===== Pincode information =====  */}

                                        <View style={[OrderlistStyle.UserInformationStyle, OrderlistStyle.OtherInformationLayout, {borderBottomColor:"#dfdfdf", 
                                                borderBottomWidth:1}]} >
                                            
                                            <TextComponent
                                                TextValue = "Pincode"
                                                TextFamily = "Mukta"
                                                TextSize = {16}
                                                TextColor = {colorCode.Authentication_title_color}
                                                TextStyle = {OrderlistStyle.OrderInformation_title}
                                            />

                                            <TextComponent
                                                TextValue = {element.Data15}
                                                TextFamily = "Ubuntu"
                                                TextSize = {16}
                                                TextColor = {colorCode.Authentication_title_color}
                                                TextStyle = {OrderlistStyle.OrderInformation_data}
                                            />
                                        
                                        </View>

                                        {/* ====== Cancel order and Show Qr code option =======  */}

                                        <View style={OrderlistStyle.CancelQR_option}>

                                            <Pressable
                                                style = {OrderlistStyle.CancelOption}
                                                onPress = {()  => Set_qr_code_layout(element.Data1)}>

                                                <TextComponent
                                                    TextValue = "Show QR"
                                                    TextFamily = "Ubuntu"
                                                    TextColor = {colorCode.Custom_cake_option_text_color}
                                                    TextSize = {17}
                                                />
                                            </Pressable>



                                        </View>


                                    </View>
                                )
                            })}

                        </>}


                    </ScrollView>
                
                </>}


                {qr_code_layout?<>
                
                    <View style={OrderlistStyle.QRCodeImageLayout}>
                        
                        <Pressable 
                            style={{backgroundColor:"white", marginLeft: "auto", marginRight: "auto", width:"80%",
                                paddingTop:10, paddingBottom: 10, alignItems:"center", borderRadius: 8, marginTop: 25 }}
                                android_ripple={{color:"#a4a4a4"}}
                                onPress = {() => set_qr_code_layout(false)}>
                            
                            <Text allowFontScaling={false} style={OrderlistStyle.QRCodeText}>Close</Text>
                        
                        </Pressable>

                        <Image
                            source={{uri:qr_code_url}}
                            style={OrderlistStyle.QRCodeImage}
                        />

                    </View>

                </>:<></>}



            </View>

            
        )

    }
}

const OrderlistStyle = new StyleSheet.create({
    OrderlistLayout:{
        ...style.AuthenticationScreen_style, 
        backgroundColor: colorCode.Authentication_input_color, 
        paddingTop: 0 ,
        paddingLeft: 0 ,
        paddingRight: 0 
    }, 

    BackOptionLayout:{
        ...style.Authentication_BackLayout, 
        backgroundColor: colorCode.Authentication_button_color
    }, 

    BackImageLayout : {
        ...style.Authentication_BackImage_layout
    }, 

    OrderFetchOption:{
        display: 'flex', 
        flexDirection: "row", 
        paddingTop: 10, 
        paddingLeft: 10
    }, 

    ParticularFetchOption:{
        backgroundColor: "#ffffff", 
        
        paddingTop: 7,
        paddingBottom: 9, 
        paddingLeft: 13, 
        paddingRight: 13, 

        borderRadius: 5,
        elevation: 10, 
        shadowColor: "#6a6a6a", 

        marginRight: 10
    }, 

    OrderInformationLayout:{
        marginTop: 20  
    }, 

    UserInformationStyle:{
        display: "flex", 
        flexDirection: "row", 

        paddingLeft: 8, 
        paddingRight: 10, 
        paddingBottom: 8, 
        paddingTop: 13, 

        borderRadius: 8, 

        width: '96%', 
        marginLeft:"auto", 
        marginRight:"auto", 
        backgroundColor: "#ffffff"
    }, 

    UserInformationTitle:{
        fontFamily: "Ubuntu", 
        fontSize: 17
    }, 

    UserInformationData:{
        fontFamily: "Sans", 
        fontSize: 18, 
        marginLeft: 8
    }, 

    OrderInformation_title:{
        paddingTop: 5 ,
        paddingBottom: 5, 
        paddingLeft: 10, 
        paddingRight: 10, 
        backgroundColor: colorCode.Authentication_input_color, 
        borderRadius: 5,

        marginTop:"auto", 
        marginBottom:"auto"
    }, 

    OrderInformation_data:{
        marginTop:"auto", 
        marginBottom:"auto", 
        
        color: colorCode.Authentication_subtitle_color, 
        marginLeft: 10
    },

    OtherInformationLayout:{
        paddingTop: 0 , 
        paddingBottom: 10
    }, 

    CakeInformationLayout:{
        display: 'flex', 
        flexDirection: 'row', 
        paddingTop: 10, 
        paddingBottom: 10, 
        paddingLeft: 8, 
        paddingRight: 8, 
        backgroundColor: "#ffffff", 
        width: "96%", 
        marginLeft: "auto", 
        marginRight:"auto"
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

    CancelQR_option:{
        display: "flex", 
        flexDirection: "row", 
        justifyContent: 'center', 
      
        width: '96%', 
      
        marginLeft: "auto", 
        marginRight: "auto", 
      
        backgroundColor: '#ffffff', 
      
        paddingTop: 8, 
        paddingBottom: 8 
    }, 

    CancelOption:{
        backgroundColor: colorCode.Custom_cake_option_layout_bg_color, 
        width: '90%', 
        alignItems: 'center',
        
        paddingTop: 10, 
        paddingBottom: 10, 
        borderRadius: 5, 

        marginLeft: '5%', 
        marginRight: '5%'
    }, 

    QRCodeImageLayout:{
        height: "100%", 
        width: "100%", 
        position: "absolute", 
        zIndex: 10, 
        backgroundColor: "#54545480", 
        display: "flex", 
        textAlign: "center",
    }, 

    QRCodeImage:{
        height: "30%", 
        width:"70%",

        marginLeft: "auto", 
        marginRight: "auto", 
        marginTop: "auto", 
        marginBottom: "auto", 

        resizeMode: 'contain'
    },

    QRCodeText:{
        fontFamily: "Ubuntu", 
        fontSize: 18,
        zIndex: 12, 
    }
    
})
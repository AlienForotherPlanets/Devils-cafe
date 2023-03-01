import React, {useState, useEffect} from "react";
import { View, StyleSheet, Image, Pressable, ScrollView, ToastAndroid } from "react-native";

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
import { useIsFocused } from '@react-navigation/native';
import { SkypeIndicator } from "react-native-indicators";

export default function Select_cart_address({navigation, route}){

    const {Option} = route.params ; 

    // ---- Set NavigationBar color ---- // 

    Navigationbar.setBackgroundColorAsync('#ffffff') ; 

    const isFocused = useIsFocused();

    // ---- Load Font ---- // 

    const [loadFont, setLoadFont] = useState(false) ; 

    const [address_data, setAddress_data] = useState([]) ; 

    const [reLoad_value, setReload_value] = useState(0) ;

    useEffect(() => {

        // ===== Function 1 ---- Load font ======= // 

        const LoadFont = async () => {
        
            await Font.loadAsync({
                'Mukta': require("../../assets/Fonts/MerriweatherSans-Regular.ttf"), 
                'Sans': require("../../assets/Fonts/SourceSansPro-Regular.ttf"),
                'Ubuntu': require('../../assets/Fonts/Ubuntu-Medium.ttf'),
                'Roboto': require('../../assets/Fonts/Roboto-Medium.ttf')
            }) ; 

            setLoadFont(true) ; 
        }

        LoadFont() ; 

        // ====== Function 2 ---- Load user address list ====== // 

        const Load_user_address_list = async () => {

            let User_table_name =  await AsyncStorage.getItem("Table") ; 

            try{

                let Request_url = URL.Authentication_request_url ; 
                
                let Request_data = {
                    "Check_status": "Fetch_address",
                    "Table_name": User_table_name
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

                    setAddress_data([...Response.Address]) ; 
                }

            }catch{

                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }

        }

        Load_user_address_list() ; 

        if (isFocused == true){

            Load_user_address_list() ; 
        }

    }, [isFocused, reLoad_value]) ; 

    const [Loading_layout, setLoading_layout] = useState(false) ; 

    // ===== Address select handler ===== // 

    const Order_address_select_handler = async (element) => {
        
        await AsyncStorage.setItem("Address_details", JSON.stringify(element))

        if (Option == "Custom_order"){
            
            navigation.navigate("CustomOrderBill") ; 
        }else{

            navigation.navigate("Bill") ; 
        }
    }

    // ===== Delete address option handler ===== // 

    const Delete_address_handler = async (address_id) => {

        let User_table_name =  await AsyncStorage.getItem("Table") ; 

        setLoading_layout(true) ; 

        try{

            let Request_url = URL.Authentication_request_url ; 
                
            let Request_data = {
                "Check_status": "Delete_address",
                "Table_name": User_table_name, 
                "Delete_address_id": address_id
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

            if (Response_status == "Delete"){

                setLoading_layout(false) ; 

                setReload_value(reLoad_value + 1) ; 

                ToastAndroid.show("Delete address successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }


        }catch{

            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }

    if (loadFont){

        return(
            <View style={Cart_select_address.Cart_select_address_layout}>

                {/* Statusbar component  */}
                <StatusbarComponent
                    color = {colorCode.Authentication_button_color}
                />

                {/* BackOption and Title Layout  */}
                
                <View style={Cart_select_address.BackOptionLayout}>
                    
                    {/* Back option  */}
    
                    <Pressable
                        android_ripple={{color:colorCode.Authentication_button_ripper_color}}
                        style = {Cart_select_address.BackImageLayout}
                        onPress = {() => navigation.goBack()}>
                        
                        <Image
                            style={style.Authentication_BackImage}
                            source={require("../../assets/Images/Other_back.png")}
                        />
    
                    </Pressable>
    
                    {/* Title layout  */}
    
                    <TextComponent
                        TextValue = "Select address"
                        TextSize = {20}
                        TextFamily = "Ubuntu"
                        TextColor = {'#ffffff'}
                        TextStyle = {{marginTop: "auto", marginBottom: 'auto', marginLeft: 4}}
                    />
    
        
                </View>

                {/* ======= Loading layout =======  */}

                {/* ======= Loading layout =======  */}

                {Loading_layout?<>
                
                    <View style={Cart_select_address.LoadingLayout}>
                        <SkypeIndicator></SkypeIndicator>
                    </View>
            
                </>:<></>}

                {/* ====== Insert new address option layout =======  */}

                <Pressable style={Cart_select_address.InsertNewAddress}
                    android_ripple = {{color:"#e7e7e7"}}
                    onPress = {() => navigation.navigate("InsertAddress")}>

                    <TextComponent
                        TextValue = "Insert new address"
                        TextFamily = "Mukta"
                        TextColor = {colorCode.Authentication_title_color} 
                        TextSize = {18}
                    />

                </Pressable>

                {/* ===== All address option layout ======  */}

                {address_data.length == 0?<>
                    
                    <TextComponent
                        TextValue = "Not found any address"
                        TextFamily = "Ubuntu"
                        TextColor = {colorCode.Authentication_subtitle_color}
                        TextSize = {18}
                        TextStyle = {{marginLeft:"auto", marginRight:"auto", marginTop:20}}
                    />
                    
                </>:<>
                
                    <ScrollView>

                        {address_data.map((element, index) => {
                            return(

                                <Pressable style={Cart_select_address.AddressLayout}
                                    key = {index}
                                    onPress = {() => Order_address_select_handler(element)}>
                                    
                                    {/* ----- Username information -----  */}

                                    <TextComponent
                                        TextValue = {"Username = " + element.Data1}
                                        TextFamily = "Mukta"
                                        TextSize = {16}
                                        TextColor = {colorCode.Authentication_title_color}
                                        TextStyle = {{textAlign:"left",marginBottom: 3}}
                                    />
                                    
                                    {/* ---- Street address information ----  */}

                                    <TextComponent
                                        TextValue = {element.Data2}
                                        TextFamily = "Mukta"
                                        TextSize = {16}
                                        TextColor = {colorCode.Authentication_subtitle_color}
                                        TextStyle = {{textAlign:"left"}}
                                    />
                                    
                                    {/* ----- Area, Landmark information -----  */}

                                    <TextComponent
                                        TextValue = {element.Data3 }
                                        TextFamily = "Sans"
                                        TextSize = {18}
                                        TextColor = {colorCode.Authentication_subtitle_color}
                                        TextStyle = {{textAlign:"left", marginTop: 6, marginBottom: 6}}
                                    />

                                    {/* ----- City information -----  */}

                                    <TextComponent
                                        TextValue = {"City " + element.Data4}
                                        TextFamily = "Sans"
                                        TextSize = {18}
                                        TextColor = {colorCode.Authentication_subtitle_color}
                                        TextStyle = {{textAlign:"left", marginTop: 6, marginBottom: 6}}
                                    />
                                    
                                    {/* ----- Pincode information ----  */}

                                    <TextComponent
                                        TextValue = {"Pincode - " + element.Data5}
                                        TextFamily = "Sans"
                                        TextSize = {18}
                                        TextColor = {colorCode.Authentication_subtitle_color}
                                        TextStyle = {{textAlign:"left", marginBottom: 6}}
                                    />

                                    {/* ====== Update and Delete option layout ======  */}

                                    <View style={Cart_select_address.DeleteUpdateOption}>

                                        {/* ----- Update option -----  */}

                                        <Pressable style={Cart_select_address.UpdateAddressOption}
                                            android_ripple = {{color: '#d0d0d0'}}
                                            onPress = {() => navigation.navigate("UpdateAddress",{"data":element})}>
                                                
                                            <TextComponent
                                                TextValue = "Update"
                                                TextColor = {colorCode.Authentication_title_color}
                                                TextFamily = "Mukta"
                                                TextSize = {16}
                                                
                                            />
                                        </Pressable>

                                        {/* ----- Delete option ----  */}

                                        <Pressable style={[Cart_select_address.UpdateAddressOption, 
                                            {backgroundColor:'#ff4848', 
                                            marginLeft: 10}]}
                                            android_ripple = {{color: '#ffa7a7'}}
                                            onPress = {() => Delete_address_handler(element.Option)}>

                                            <TextComponent
                                                TextValue = "Delete"
                                                TextFamily = "Mukta"
                                                TextSize = {16}
                                                TextColor = {'#ffffff'}
                                            />

                                        </Pressable>

                                    </View>
                                    

                                </Pressable>
                            )
                        })}

                    </ScrollView>
                </>}

    
            </View>
        )
    }
}

const Cart_select_address = new StyleSheet.create({
    Cart_select_address_layout:{
        ...style.Authentication_inputWidget, 
        paddingLeft: 0 ,
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

    InsertNewAddress:{
        backgroundColor: '#ffffff', 
        paddingTop: 13, 
        paddingBottom: 13,
        paddingLeft: 10
    }, 

    AddressLayout:{
        marginLeft:"auto", 
        marginRight: 'auto',
        marginTop: 12, 
        marginBottom: 12 , 

        paddingTop: 8, 
        paddingBottom: 12 , 
        paddingLeft: 15, 
        paddingRight: 15, 
        
        width: '95%', 
        backgroundColor: '#ffffff', 
        borderRadius: 5, 

        elevation: 10 ,
        shadowColor: '#a8a8a8'
    }, 

    DeleteUpdateOption:{
        display: 'flex', 
        flexDirection: 'row', 
        marginTop: 10
    }, 

    UpdateAddressOption:{
        backgroundColor: colorCode.Authentication_input_color, 
        paddingTop: 5, 
        paddingBottom: 8, 
        paddingLeft: 13, 
        paddingRight: 13, 
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
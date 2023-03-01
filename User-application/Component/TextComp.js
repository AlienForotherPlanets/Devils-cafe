import React, {useState, useEffect} from "react";
import { View, Text } from "react-native";
import * as Font from 'expo-font' ;  

export default function TextComponent(props){

    const [loadFont, setLoadFont] = useState(false) ; 

    useEffect(() => {

        const LoadFont = async () => {
        
            await Font.loadAsync({
                'Mukta': require("../assets/Fonts/MerriweatherSans-Regular.ttf"), 
                'Sans': require("../assets/Fonts/SourceSansPro-Regular.ttf"),
                'Ubuntu': require('../assets/Fonts/Ubuntu-Medium.ttf'),
                'Roboto': require('../assets/Fonts/Roboto-Medium.ttf'), 
                'Rubik': require('../assets/Fonts/Rubik-Medium.ttf')
            }) ; 

            setLoadFont(true) ; 
        }

        LoadFont() ; 

    }, []) ; 

    if (loadFont){
        return(
            <View>
                <Text style = {[{fontFamily : props.TextFamily, 
                                fontSize    : props.TextSize, 
                                color       : props.TextColor},
                                {...props.TextStyle}]}
                    allowFontScaling = {false}>
                    {props.TextValue}
                </Text>
            </View>
        )
    }
}
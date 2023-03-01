import React from "react";
import {View, StatusBar} from 'react-native' ; 

export default function StatusbarComponent(props){
    return(
        <View>
            <StatusBar
                backgroundColor={props.color}>
            </StatusBar>
        </View>
    )
}
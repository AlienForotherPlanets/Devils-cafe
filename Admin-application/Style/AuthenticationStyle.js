// *** Import all colorCode **** // 
import * as colorCode from '../Color-code/Color-codes' ; 

// **** Authentication screen style **** //

let AuthenticationScreen_style = {
    height: '100%', 
    width: '100%', 
    backgroundColor: 'white', 
    paddingLeft: '4%', 
    paddingRight: '4%', 
    paddingTop: '2%'
}

let AuthenticationScreen_inputlayout = {
    marginTop: "5%"
}

let Authentication_inputWidget = {
    backgroundColor: colorCode.Authentication_input_color,
    fontFamily: "Sans",
    fontSize: 18,
    padding: 12,
    borderRadius: 5,
    marginBottom: 12, 
    borderColor: '#e0e0e0'
};

let Authentication_button = {
    backgroundColor: colorCode.Authentication_button_color,
    padding: 10,
    display: "flex",
    alignItems: "center",
    borderRadius: 5
};

let Authentication_BackLayout =  {
    display: "flex",
    flexDirection: "row",
};

let Authentication_BackImage_layout = {
    padding: 8 
}

let Authentication_BackImage = {
    height: 30, 
    width : 30
}

export {AuthenticationScreen_style, 
    AuthenticationScreen_inputlayout, 
    Authentication_inputWidget, 
    Authentication_button, 
    Authentication_BackLayout, 
    Authentication_BackImage_layout, 
    Authentication_BackImage} ; 
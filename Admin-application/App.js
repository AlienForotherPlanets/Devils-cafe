import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// **** Import SplashSCreen **** // 
import SplashScreen from "./Screen/SplashScreen/SplashScreen";

// **** Import Admin login screen **** // 
import Admin_login from "./Screen/Login/Admin-login";

// **** Import Update password screen **** // 
import Update_password from "./Screen/Login/Update-password";

// **** Import Update password mobile numver verification screen **** // 
import Update_password_verify from "./Screen/Login/Update-password-verify";

// **** Import New Password screen **** // 
import NewPassword from "./Screen/Login/New-password";

// **** Import create category screen **** // 
import CreateCategory from "./Screen/Category/Create-category";

// *** Import Update category option screen **** // 
import UpdateCategory from "./Screen/Category/Update-category";

// **** Import send Notification screen **** // 
import Send_notification from "./Screen/Notification/Notification";

// **** Import Update Banner screen **** // 
import UpdateBanner from "./Screen/Banner/Update-banner";

// **** Import Admin panel home screen **** // 
import HomeScreen from "./Screen/Home/HomeScreen";

// **** Import category selection screen **** // 
import CategorySelection from "./Screen/Category/Category-selection";

// **** Import upload product screen **** // 
import UploadProduct from "./Screen/Product/Upload-product";

// **** Import Select product screen **** // 
import SelectProduct from "./Screen/Product/Product-selection";

// **** Import update product screen **** // 
import UpdateProduct from "./Screen/Product/Update-product";

// **** Import Insert and Update banner screen **** // 
import InsertUpdate_banner from "./Screen/Banner/InsertUpdate-banner";

// **** Import latest product related screen **** // 
import LatestProduct from "./Screen/Latest/LatestProduct";

// **** Import scanner screen **** // 
import Scanner from "./Screen/BarcodeScanner/Scanner";

// **** Import register number list ***** // 
import RegisterNumber from "./Screen/Login/register-number";
import Admin_new_mobile from "./Screen/Login/New-contact";

// **** Import Custom order scanner **** // 
import Custom_order_scanner from "./Screen/BarcodeScanner/Custom-order-scanner";

export default function App() {

  // **** Create Navigation stack container **** // 

  const Stack = createNativeStackNavigator() ; 
  
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="AdminLogin" component={Admin_login} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="UpdatePassword" component={Update_password} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="UpdatePasswordVerify" component={Update_password_verify} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="NewPassword" component={NewPassword} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="CreateCategory" component={CreateCategory} options={{headerShown:false}} ></Stack.Screen>
          <Stack.Screen name="UpdateCategory" component={UpdateCategory} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="SendNotification" component={Send_notification} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="UpdateBanner" component={UpdateBanner} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="CategorySelection" component={CategorySelection} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="UploadProduct" component={UploadProduct} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="SelectProduct" component={SelectProduct} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="UpdateProduct" component={UpdateProduct} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="InsertUpdate_banner" component={InsertUpdate_banner} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="LatestProduct" component={LatestProduct} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="Scanner" component={Scanner} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="RegisterNumber" component={RegisterNumber} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="Register-new-number"component={Admin_new_mobile} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="Custom_order_scanner" component={Custom_order_scanner} options={{headerShown:false}}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

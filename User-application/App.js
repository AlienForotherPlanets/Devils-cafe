import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// **** Import Splash screen **** // 
import SplashScreen from './Screen/SplashScreen/SplashScreen';

// **** Import Signup screen **** // 
import Signup from './Screen/Authentication/Signup' ; 

// **** Import Signin screen **** // 
import Signin from './Screen/Authentication/Signin';

// **** Import Signup verification screen **** // 
import SignupVerification from './Screen/Authentication/Signup-verification';

// **** Import Forget-password screen **** // 
import ForgetPassword from './Screen/Authentication/ForgetPassword';

// **** Import Forget-password verification screen **** // 
import ForgetVerification from './Screen/Authentication/ForgetVerification';

// **** Import Update Password screen **** // 
import UpdatePassword from './Screen/Authentication/UpdatePassword';

// **** Import Insert Address screen **** // 
import InsertAddress from './Screen/Address/Insert-address';

// **** Import Update address screeen **** // 
import UpdateAddress from './Screen/Address/Update-address';

// **** Import HomeScreen **** // 
import HomeScreen from './Screen/Home/HomeScreen';

// **** Import Category Product screen **** // 
import CategoryPoroduct from './Screen/Category/CategoryProduct';

// **** Import Bill layout screeen **** // 
import BillLayout from './Screen/Cart/Bill-layout';

// **** Import Cart View layout **** // 
import CartLayout from './Screen/Cart/Cart-layout';

// **** Import user information screen layout **** // 
import User_information from './Screen/User/User-information';

// **** Import select address screen **** .. 
import Select_address from './Screen/Address/Select-address';

// **** Import Custom cake order screen **** // 
import Custom_cake_order from './Screen/Custom-cake/Custom-cake-order';

// **** Import latest product screen **** // 
import LatestPorudct from './Screen/LatestProduct/LatestProduct' ; 

// **** Import watchlist screen **** // 
import Watchlist from './Screen/Watchlist/Watchlist';

// **** Import PartyDecoration order screen **** // 
import PartyDeocration from './Screen/PartyDecoration/PartyDecoration';

// **** Import cart select address related screen **** // 

import Select_cart_address from './Screen/Address/Cart-select-address';

// **** Import custom order bill layout ***** // 
import CustomOrderBill from './Screen/Cart/Custom-order-bill';

// **** Import Payment Screen **** // 
import PaymentScreen from './Screen/Payment/PaymentScreen';

// **** Import Order list screen **** // 
import Order_list from './Screen/Order/Order-list';

// **** Import Product Information screen **** // 
import ProductInformation from './Screen/Category/ProductInformation';

// **** Import all category list layout ***** // 
import AllCategory from './Screen/Category/AllCategory';

// **** Import custom order list layout **** // 
import Custom_cake_order_list from './Screen/Order/Custom-cake-order';

export default function App() {

    // **** Create Navigation stack container **** // 

    let Stack = createNativeStackNavigator() ; 

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SplashScreen'>
                <Stack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='Signup' component={Signup} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='Signin' component={Signin} options= {{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='SignupVerification' component={SignupVerification} options = {{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='ForgetPassword' component={ForgetPassword} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='ForgetVerification' component={ForgetVerification} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='UpdatePassword' component={UpdatePassword} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='InsertAddress' component={InsertAddress} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='UpdateAddress' component={UpdateAddress} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='CategoryProduct' component={CategoryPoroduct} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='Bill' component={BillLayout} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='Cart' component={CartLayout} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='UserInformation' component={User_information} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='SelectAddress' component={Select_address} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='CustomOrder' component={Custom_cake_order} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='LatestProduct' component={LatestPorudct} options={{headerShown:false}}></Stack.Screen> 
                <Stack.Screen name='Watchlist' component={Watchlist} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='PartyDecoration' component={PartyDeocration} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='SelectCartAddress' component={Select_cart_address} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='CustomOrderBill' component={CustomOrderBill} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='Payment' component={PaymentScreen} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='Orderlist' component={Order_list} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='ProductInformation' component={ProductInformation} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='Allcategory' component={AllCategory} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name='Custom_order_list' component={Custom_cake_order_list} options={{headerShown:false}}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/**
 * @format
 */

import { AppRegistry, TouchableOpacity } from 'react-native';
import App from './App';
import CreateAccount from './src/pages/CreateAccount';
import { name as appName } from './app.json';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import * as React from 'react';
import { colors } from './src/constants';
import Splash from './src/pages/Splash';
import Login from './src/pages/Login';
import Declaration from './src/pages/Declaration';
import EmailAuth from './src/pages/EmailAuth';
import TwoFactorAuth from './src/pages/TwoFactorAuth';
import TwoFactorAuthQR from './src/pages/TwoFactorAuth/TwoFactorQr';
import TwoFactorOTP from './src/pages/TwoFactorAuth/TwoFactorOTP';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VerifyEmail from './src/pages/VerifyEmail';
import KYC from './src/pages/KYC';
import KYCwizard from './src/pages/KYC/KYCwizard';
import BankDetails from './src/pages/BankDetails';
import BankDetailsAlmostDone from './src/pages/BankDetails/BankDetailsAlmostDone';
import BankDetailsConfirm from './src/pages/BankDetails/BankDetailsConfirm';
import KYCSubmitted from './src/pages/KYC/KYCSubmitted';
import KYCAlready from './src/pages/KYC/KYCAlready';
import KYCUnable from './src/pages/KYC/KYCUnable';
import ContactUs from './src/pages/ContactUs';
import ForgotPassword from './src/pages/ForgotPassword';
import BottomNav from './src/pages/Navigations/BottomTab';
import FundPage from './src/pages/FundPage';
import ProfileSetting from './src/pages/Profile_Setting';
import AppNotifications from './src/pages/Notification'
import AuthContext from './src/Context/AuthContex';
import AccountSecurity from './src/pages/AccountSecurity';
import Document from './src/pages/Document';
import DetailsOfBank from './src/pages/DetailsOfBank'
import { useState } from 'react';
import CheckScroll from './src/checkApi';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    accent: colors.yellowDark,
  },
};
const Stack = createNativeStackNavigator();

export default function Main() {
  const [user, setUser] = useState(null)
  const setUserData = (data) => { setUser(data), console.log('first data', data) }
  return (
    <AuthContext.Provider value={{ user, setUserData }}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          {/* HomeScreen */}
          <Stack.Navigator initialRouteName='HomeScreen'>
            {/* <Stack.Screen name="CheckScroll" component={CheckScroll} options={{ headerShown: false }} /> */}
            <Stack.Screen
              name="Splash"
              component={Splash}
              // options={{ title: 'Welcome' }}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="HomeScreen" component={BottomNav} options={{ headerShown: false }} />
            <Stack.Screen name="FundPage" component={FundPage} options={{ headerShown: false }} />
            <Stack.Screen name="Document" component={Document} options={{ headerShown: false }} />
            <Stack.Screen name="DetailsOfBank" component={DetailsOfBank} options={{ headerShown: false }} />
            <Stack.Screen name="ProfileSetting" component={ProfileSetting} options={{ headerShown: false }} />
            <Stack.Screen name="AccountSecurity" component={AccountSecurity} options={{ headerShown: false }} />
            <Stack.Screen name="Notifications" component={AppNotifications} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPassword} options={{ headerShown: false }} />


            <Stack.Screen
              name="CreateAccount"
              component={CreateAccount}
              options={{
                title: 'Create an Account',
                headerStyle: {
                  backgroundColor: '#212121',
                  textAlign: 'center',
                },
                headerTitleStyle: { color: 'white' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="Declaration"
              component={Declaration}
              // options={{ title: 'Welcome' }}
              options={{
                title: 'Declaration',
                headerStyle: {
                  backgroundColor: '#212121',
                  textAlign: 'center',
                },
                headerTitleStyle: { color: 'white' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="ContactUs"
              component={ContactUs}
              options={{
                title: 'Contact Us',
                headerStyle: {
                  backgroundColor: '#212121',
                  textAlign: 'center',
                },
                headerTitleStyle: { color: 'white' },
                headerTitleAlign: 'center',
                headerTintColor: '#fff',
              }}
            />
            <Stack.Screen
              name="VerifyEmail"
              component={VerifyEmail}
              options={{
                title: 'Verify Email',
                headerStyle: {
                  backgroundColor: '#212121',
                  textAlign: 'center',
                },
                headerTitleStyle: { color: 'white' },
                headerTitleAlign: 'center',
                headerTintColor: '#fff',
              }}
            />
            <Stack.Screen
              name="BankDetails"
              component={BankDetails}
              options={{
                title: 'Complete your Bank Details',
                headerStyle: {
                  backgroundColor: '#212121',
                  textAlign: 'center',
                },
                headerTitleStyle: { color: 'white' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
              }}
            />

            <Stack.Screen
              name="BankDetailsConfirm"
              component={BankDetailsConfirm}
              options={{
                title: 'Confirm Details',
                headerStyle: {
                  backgroundColor: '#212121',
                  textAlign: 'center',
                },
                headerTitleStyle: { color: 'white' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="BankDetailsAlmostDone"
              component={BankDetailsAlmostDone}
              options={{
                title: 'Almost Done',
                headerStyle: {
                  backgroundColor: '#212121',
                  textAlign: 'center',
                },
                headerTitleStyle: { color: 'white' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
              }}
            />


            <Stack.Screen
              name="TwoFactorAuthQR"
              component={TwoFactorAuthQR}
              options={{
                title: '',
                headerStyle: {
                  // backgroundColor: '#212121',
                  textAlign: 'center',
                },
                headerTitleStyle: { color: 'white' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                headerTransparent: true,
              }}
            />

            <Stack.Screen
              name="TwoFactorOTP"
              component={TwoFactorOTP}
              options={{
                title: ' ',
                headerStyle: {
                  backgroundColor: 'transparent',
                  textAlign: 'center',
                },
                headerTitleStyle: { color: 'white' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                headerTransparent: true,
              }}
            />
            <Stack.Screen
              name="TwoFactorAuth"
              component={TwoFactorAuth}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="EmailAuth"
              component={EmailAuth}
              options={{
                title: 'Email Authentication',
                headerStyle: {
                  backgroundColor: '#212121',
                  textAlign: 'center',
                },
                headerTitleStyle: { color: 'white' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="KYCwizard"
              component={KYCwizard}
              // options={{ title: 'Welcome' }}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="KYC"
              component={KYC}
              // options={{ title: 'Welcome' }}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="KYCSubmitted"
              component={KYCSubmitted}
              options={{
                title: 'Verify KYC',
                headerStyle: {
                  backgroundColor: '#212121',
                  textAlign: 'center',
                },
                headerTitleStyle: { color: 'white' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="KYCAlready"
              component={KYCAlready}
              options={{
                title: 'Verify KYC',
                headerStyle: {
                  backgroundColor: '#212121',
                  textAlign: 'center',
                },
                headerTitleStyle: { color: 'white' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="KYCUnable"
              component={KYCUnable}
              options={{
                title: 'Verify KYC',
                headerStyle: {
                  backgroundColor: '#212121',
                  textAlign: 'center',
                },
                headerTitleStyle: { color: 'white' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>
  );
}
AppRegistry.registerComponent(appName, () => Main);

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import MarketIcon from "react-native-vector-icons/Entypo";
import TradeIcon from "react-native-vector-icons/Octicons";
import WalletIcon from "react-native-vector-icons/Ionicons";
import MenuIcon from "react-native-vector-icons/Octicons";
import Home from "../Home";
import FundPage from "../FundPage";
import TradeBottomTab from "./TradeBottomTab";
const Tab = createBottomTabNavigator();
const BottomNav = () => {

    const Market = () => {
        return (
            <View>
                <Text>Setting Screen</Text>
            </View>
        );
    };
    const Trade = () => {
        return (
            <View>
                <Text>Setting Screen</Text>
            </View>
        );
    };
    const Menu = () => {
        return (
            <View>
                <Text>Setting Screen</Text>
            </View>
        );
    };
    return (
        // <NavigationContainer>
        <Tab.Navigator
            screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: '#212121', height: 60, paddingBottom: 8 } }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon: ({ focused, size }) => (
                        <Icon
                            name="home"
                            size={focused ? 22 : 20}
                            style={[
                                styles.iconStyle,
                                {
                                    color: focused ? "#424141" : "#99A6AF",
                                    backgroundColor: focused ? "#FFB916" : null,
                                },
                            ]}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Market"
                component={Market}
                options={{
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon: ({ focused, size }) => (
                        <MarketIcon
                            name="bar-graph"
                            size={focused ? 22 : 20}
                            style={[
                                styles.iconStyle,
                                {
                                    color: focused ? "#424141" : "#99A6AF",
                                    backgroundColor: focused ? "#FFB916" : null,
                                },
                            ]}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Trade"
                component={TradeBottomTab}
                options={{
                    tabBarStyle: { display: "none" },
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon: ({ focused, size }) => (
                        <TradeIcon
                            name="graph"
                            size={focused ? 22 : 20}
                            style={[
                                styles.iconStyle,
                                {
                                    color: focused ? "#424141" : "#99A6AF",
                                    backgroundColor: focused ? "#FFB916" : null,
                                },
                            ]}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Wallet"
                component={FundPage}
                options={{
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon: ({ focused, size }) => (
                        <WalletIcon
                            name="md-wallet-outline"
                            size={focused ? 22 : 20}
                            style={[
                                styles.iconStyle,
                                {
                                    color: focused ? "#424141" : "#99A6AF",
                                    backgroundColor: focused ? "#FFB916" : null,
                                },
                            ]}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Menu"
                component={Menu}
                options={{
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon: ({ focused, size }) => (
                        <MenuIcon
                            name="note"
                            size={focused ? 18 : 20}
                            style={[
                                styles.iconStyle,
                                {
                                    color: focused ? "#424141" : "#99A6AF",
                                    backgroundColor: focused ? "#FFB916" : null,
                                },
                            ]}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
        // </NavigationContainer>
    );
};
const styles = StyleSheet.create({
    iconStyle: {
        borderRadius: 25,
        paddingVertical: 2,
        paddingHorizontal: 15,
    },
});
export default BottomNav;
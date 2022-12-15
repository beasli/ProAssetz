import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TradeIcon from "react-native-vector-icons/Octicons";
import ChartIcon from "react-native-vector-icons/FontAwesome";
import OrderIcon from "react-native-vector-icons/MaterialCommunityIcons";
import HistoryIcon from "react-native-vector-icons/MaterialIcons";
import BookIcon from "react-native-vector-icons/Feather";
import TradeScreen from "../../TradeScreen";
import OrderInfo from "../../OrderScreen";
import HistoryScreen from "../../HistoryScreen";
import Book from "../../BookScreen";
import ChartScreen from "../../ChartScreen";
const Tab = createBottomTabNavigator();
const TradeBottomTab = () => {

  return (
    <Tab.Navigator
      initialRouteName="TradeScreen"
      backBehavior="TradeScreen"
      screenOptions={{
        // tabBarOptions:{style:{el}},
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#212121",
          height: 60,
          paddingBottom: 8,
        },
      }}
    >
      <Tab.Screen
        name="Chart"
        component={ChartScreen}
        options={{
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused, size }) => (
            <ChartIcon
              name="bar-chart-o"
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
        name="Order"
        component={OrderInfo}
        options={{
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused, size }) => (
            <OrderIcon
              name="format-list-checks"
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
        name="TradeScreen"
        component={TradeScreen}
        options={{
          tabBarLabel: "Trade",
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
        name="Book"
        component={Book}
        options={{
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused, size }) => (
            <BookIcon
              name="book"
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
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused, size }) => (
            <HistoryIcon
              name="history-toggle-off"
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
  );
};
const styles = StyleSheet.create({
  iconStyle: {
    borderRadius: 25,
    paddingVertical: 2,
    paddingHorizontal: 15,
  },
});
export default TradeBottomTab;

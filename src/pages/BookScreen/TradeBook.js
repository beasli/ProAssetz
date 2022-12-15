import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { colors } from "../../constants";

const TradeBook = () => {
  const Data = [
    {
      bid: "6,414.16",
      price: "0.041835",
      ask: "166,938.50",
    },
    {
      bid: "6,414.16",
      price: "0.041835",
      ask: "166,938.50",
    },
    {
      bid: "6,414.16",
      price: "0.041835",
      ask: "166,938.50",
    },
    {
      bid: "6,414.16",
      price: "0.041835",
      ask: "166,938.50",
    },
    {
      bid: "6,414.16",
      price: "0.041835",
      ask: "166,938.50",
    },
    {
      bid: "6,414.16",
      price: "0.041835",
      ask: "166,938.50",
    },
    {
      bid: "6,414.16",
      price: "0.041835",
      ask: "166,938.50",
    },
    {
      bid: "6,414.16",
      price: "0.041835",
      ask: "166,938.50",
    },
    {
      bid: "6,414.16",
      price: "0.041835",
      ask: "166,938.50",
    },
    {
      bid: "6,414.16",
      price: "0.041835",
      ask: "166,938.50",
    },
    {
      bid: "6,414.16",
      price: "0.041835",
      ask: "166,938.50",
    },
    {
      bid: "6,414.16",
      price: "0.041835",
      ask: "166,938.50",
    },
    {
      bid: "6,414.16",
      price: "0.041835",
      ask: "166,938.50",
    },
    {
      bid: "6,414.16",
      price: "0.041835",
      ask: "166,938.50",
    },
    {
      bid: "6,414.16",
      price: "0.041835",
      ask: "166,938.50",
    },
  ];
  const ItemStyle = ({ item, index }) => (
    <View style={styles.listbox}>
      <Text style={styles.bid}>{item.bid}</Text>

      <Text
        style={[
          styles.price,
          { color: index % 2 == 0 ? "#38B781" : "#FF545E" },
        ]}
      >
        {item.price}
      </Text>

      <Text style={styles.bid}>{item.ask}</Text>
    </View>
  );
  return (
    <ScrollView>
      <FlatList data={Data} renderItem={ItemStyle} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bid: {
    fontSize: 12,
    fontFamily: "Nunito-SemiBold",
    color: colors.white,
    marginVertical: 7,
  },
  price: {
    fontSize: 12,
    fontFamily: "Nunito-SemiBold",
    marginVertical: 10,
  },
  listbox: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-between",
  },
});
export default TradeBook;

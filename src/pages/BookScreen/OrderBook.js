import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, } from "react-native";
import React from "react";
import { colors } from "../../constants";
import { useState } from "react";

const OrderBook = () => {

  const [val, setval] = useState(0);
  const [val2, setval2] = useState(1);

  const ItemStyle = ({ item, index }) => (
    <View style={styles.listbox}>
      <TouchableOpacity onPress={() => setval(index)} style={{ width: "49%", backgroundColor: val == index ? "rgba(56, 183, 129, 0.21)" : null, }} >
        <View style={styles.box}>
          <Text style={styles.bid}>{item.bid}</Text>
          <Text style={[styles.bid, { paddingRight: 7, color: colors.lightgreen }]} >
            {item.priceGreen}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setval2(index)} style={{ width: "49%", backgroundColor: val2 == index ? "rgba(255, 84, 94, 0.19)" : null }} >
        <View style={styles.box}>
          <Text style={[styles.bid, { paddingLeft: 7, color: colors.lightred }]} >
            {item.priceRed}
          </Text>
          <Text style={styles.bid}>{item.ask}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView>
      <FlatList data={Data} renderItem={ItemStyle} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listbox: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  box: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bid: {
    fontSize: 12,
    fontFamily: "Nunito-SemiBold",
    color: colors.white,
    marginVertical: 10,
  },
});

export default OrderBook;


const Data = [
  {
    bid: "6,414.16",
    priceGreen: "0.041835",
    priceRed: "0.058508",
    ask: "166,938.50",
  },
  {
    bid: "6,414.16",
    priceGreen: "0.041835",
    priceRed: "0.058508",
    ask: "166,938.50",
  },
  {
    bid: "6,414.16",
    priceGreen: "0.041835",
    priceRed: "0.058508",
    ask: "166,938.50",
  },
  {
    bid: "6,414.16",
    priceGreen: "0.041835",
    priceRed: "0.058508",
    ask: "166,938.50",
  },
  {
    bid: "6,414.16",
    priceGreen: "0.041835",
    priceRed: "0.058508",
    ask: "166,938.50",
  },
  {
    bid: "6,414.16",
    priceGreen: "0.041835",
    priceRed: "0.058508",
    ask: "166,938.50",
  },
  {
    bid: "6,414.16",
    priceGreen: "0.041835",
    priceRed: "0.058508",
    ask: "166,938.50",
  },
  {
    bid: "6,414.16",
    priceGreen: "0.041835",
    priceRed: "0.058508",
    ask: "166,938.50",
  },
  {
    bid: "6,414.16",
    priceGreen: "0.041835",
    priceRed: "0.058508",
    ask: "166,938.50",
  },
  {
    bid: "6,414.16",
    priceGreen: "0.041835",
    priceRed: "0.058508",
    ask: "166,938.50",
  },
  {
    bid: "6,414.16",
    priceGreen: "0.041835",
    priceRed: "0.058508",
    ask: "166,938.50",
  },
  {
    bid: "6,414.16",
    priceGreen: "0.041835",
    priceRed: "0.058508",
    ask: "166,938.50",
  },
];

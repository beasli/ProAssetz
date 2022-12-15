import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { colors } from "../../constants";

const Info = () => {
  const Data = [
    {
      type: "Rank",
      val: "No. 5",
    },
    {
      type: "MARKET Value",
      val: "$41,470,256,353",
    },
    {
      type: "Total Supply",
      val: "163,657,546",
    },
    {
      type: "Issue Price",
      val: "$ 0.15",
    },
    {
      type: "Total Supply",
      val: "163,657,546",
    },
  ];
  return (
    <ScrollView>
      <View style={{ width: "90%", alignSelf: "center" }}>
        <Text style={styles.btcTxt}>BTC / INR</Text>
        {Data.map((item) => (
          <View style={styles.txtBox}>
            <Text
              style={{
                width: "50%",
                fontFamily: "Nunito-SemiBold",
                fontSize: 12,
                color: colors.darkgreytxt,
              }}
            >
              {item.type}
            </Text>
            <Text style={styles.txtstyle}>{item.val}</Text>
          </View>
        ))}
        <View>
          <Text
            style={{ color: "#E29224", fontFamily: "Nunito-Bold", marginTop: 25 }}
          >
            Introduction
          </Text>
          <Text
            style={{
              color: colors.white,
              fontFamily: "Nunito-SemiBold",
              fontSize: 12,
              lineHeight: 26,
              marginTop: 8,
            }}
          >
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  txtstyle: {
    width: "50%",
    fontFamily: "Nunito-Regular",
    fontSize: 12,
    color: colors.white,
  },
  btcTxt: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
  },
  txtBox: {
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-between",
    marginVertical: 8,
  },
});

export default Info;

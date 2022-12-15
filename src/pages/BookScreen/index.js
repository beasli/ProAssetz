import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { colors } from "../../constants";
import TradeBook from "./TradeBook";
import OrderBook from "./OrderBook";
import DropDown from "../TradeScreen/DropDown";
import Ionicons from 'react-native-vector-icons/Ionicons'
import TradeCard from "../TradeScreen/TradeCard";
import Button from "../reuseableComponents/Button";

const Book = ({ navigation }) => {
  const Btns = [{ btn: "Order Book" }, { btn: "Trade Book" }];
  const [selectedBtn, setselectedBtn] = useState(0);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(1);
  const [items, setItems] = useState([
    { label: "BTC / INR", value: 1 }, { label: "BTC / USDT", value: 2 },
    { label: "BTC / ETH", value: 3 }]);

  const SelectCategory = (param) => {
    switch (param) {
      case 0:
        return <TradeBook />;
      case 1:
        return <OrderBook />;
      default: {
        break;
      }
    }
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.Header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name={'chevron-back'} size={24} color={'#B3B3B3'} />
        </TouchableOpacity>
        <DropDown
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      <Text style={{ marginTop: -4, fontSize: 12, fontFamily: 'Nunito-Bold', color: 'rgba(56, 183, 129, 1)', width: '70%', alignSelf: 'center' }}>+50.47%</Text>

      <View style={{ marginTop: 16 }}>
        <TradeCard />
      </View>
      <View style={styles.headerBox}>
        <View style={{ flexDirection: "row" }}>
          {Btns.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                setselectedBtn(index);
              }}
            >
              <Text
                style={[
                  styles.btn,
                  {
                    color:
                      selectedBtn == index ? colors.browntxt : colors.white,
                    borderBottomWidth: selectedBtn == index ? 4 : 0,
                  },
                ]}
              >
                {item.btn}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: "row", marginHorizontal: 3 }}>
          <Image
            source={require("../../../assets/redgreenCircle.png")}
            style={styles.img}
          />
          <Image
            source={require("../../../assets/greenCircle.png")}
            style={{ ...styles.img, marginHorizontal: 6, }}
          />
          <Image
            source={require("../../../assets/redCircle.png")}
            style={styles.img}
          />
        </View>
      </View>
      <View style={{ borderWidth: 0.3, borderColor: "#C4C4C4" }}></View>
      <View style={styles.categorybox}>
        <Text style={styles.categorytxt}>Bid</Text>
        <Text style={styles.categorytxt}>Price</Text>
        <Text style={styles.categorytxt}>Ask</Text>
      </View>
      {SelectCategory(selectedBtn)}
      <View style={styles.btnBox}>
        <TouchableOpacity style={{ width: "46%" }} onPress={() => { navigation.navigate('TradeScreen', { Type: 0 }) }}>
          <Button
            width={"100%"}
            text={"Buy"}
            backgroundColor={"#38B781"}
            color={colors.white}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ width: "46%" }} onPress={() => { navigation.navigate('TradeScreen', { Type: 1 }) }}>
          <Button
            width={"100%"}
            text={"Sell"}
            backgroundColor={"#FF545E"}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  btnBox: {
    width: "96%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  Header: {
    paddingHorizontal: '4%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  categorybox: {
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 12,
  },
  img: {
    height: 18,
    width: 18,
  },
  btn: {
    marginRight: 15,
    borderColor: colors.browntxt,
    paddingVertical: 5,
    fontSize: 14,
    fontFamily: "Nunito-Bold",
  },
  headerBox: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    alignItems: 'center'
  },
  categorytxt: {
    color: colors.darkgreytxt,
    fontFamily: "Nunito-SemiBold",
  },
});

export default Book;

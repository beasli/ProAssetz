import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import CrossIcon from "react-native-vector-icons/Entypo";
import OTPTextInput from "react-native-otp-textinput";
import Btn from "./Button";
import InfoIcon from "react-native-vector-icons/AntDesign";
const DepositModal = ({ close }) => {
  const Buttons = [
    { title: "IMPS" },
    { title: "NEFT" },
    { title: "RTGS" },
    { title: "UPI" },
  ];
  const [selection, setselection] = useState(0);
  return (
    <View style={{ backgroundColor: "#111111", borderTopLeftRadius: 26, borderTopRightRadius: 26 }}>
      <View style={styles.headerBox}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              marginRight: 10,
              color: "#B3B3B3",
              fontFamily: "Nunito-Medium",
            }}
          >
            Deposite INR
          </Text>
          <InfoIcon size={20} name="infocirlceo" color={"#E29125"} />
        </View>
        <CrossIcon name="cross" size={25} color={"#B3B3B3"} onPress={close} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 25,
        }}
      >
        {Buttons.map((item, index) => (
          <View>
            <TouchableOpacity
              onPress={() => setselection(index)}
              style={{
                backgroundColor: selection == index ? "#B97518" : "#3B3B3B",
                borderColor: selection == index ? "#8C5912" : "#212121",
                borderWidth: 1,
                width: 70,
                alignItems: "center",
                borderRadius: 25,
                paddingVertical: 2,
              }}
            >
              <Text style={{ color: "#B3B3B3" }}>{item.title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.ListBox}>
        <View style={styles.InfoBox}>
          <Text style={styles.head}>NAME :</Text>
          <Text style={styles.Txt}>Suraj Hazra</Text>
        </View>
        <View style={styles.InfoBox}>
          <Text style={styles.head}>BANK NAME :</Text>
          <Text style={styles.Txt}>State Bank OF India</Text>
        </View>
        <View style={styles.InfoBox}>
          <Text style={styles.head}>A/C NO :</Text>
          <Text style={styles.Txt}>9678583483483</Text>
        </View>
        <View style={styles.InfoBox}>
          <Text style={styles.head}>IFSC CODE :</Text>
          <Text style={styles.Txt}>SBI75783</Text>
        </View>
        <View style={styles.InfoBox}>
          <Text style={styles.head}>Branch :</Text>
          <Text style={styles.Txt}>Saltlake</Text>
        </View>
        <View style={styles.InfoBox}>
          <Text style={styles.head}>Account type :</Text>
          <Text style={styles.Txt}>Savings</Text>
        </View>
      </View>
      <View style={styles.refBox}>
        <Text style={styles.refTxt}>Refrence No</Text>
        <InfoIcon size={20} name="infocirlceo" color={"#E29125"} />
      </View>
      <View>
        <TextInput
          style={{
            backgroundColor: "#424141",
            width: "85%",
            alignSelf: "center",
            borderRadius: 7,
          }}
        />
      </View>
      <Text style={styles.WithTxt}>Amount</Text>
      <View style={styles.InputView}>
        <TextInput style={{ width: "70%", color: "#FFF6E0" }} />
        <Text style={{ borderWidth: 0.3, borderColor: "#878787" }}></Text>
        <TouchableOpacity
          style={{
            width: "30%",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#878787", fontFamily: "Nunito-Bold" }}>
            INR
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 15 }}>
        <TouchableOpacity>
          <Btn
            text={"Deposite"}
            backgroundColor={"#FFB916"}
            width={"85%"}
            color={"#473200"}
            fontFamily={"Nunito-Bold"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputbox: {
    marginHorizontal: 20,
  },
  input: {
    backgroundColor: "#3B3B3B",
    height: 55,
    width: 50,
    borderRadius: 7,
    fontSize: 30,
    color: "#FFF6E0",
  },
  InfoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    paddingVertical: 7,
  },
  Txt: { width: "50%", color: "#878787", fontFamily: "Nunito-Medium" },
  head: { color: "#545454", fontFamily: "Nunito-Medium" },
  headerBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "7%",
    marginVertical: 20,
  },
  ListBox: {
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: "#878787",
    borderStyle: "dashed",
    alignSelf: "center",
    width: "85%",
    paddingVertical: 10,
  },
  WithTxt: {
    width: "85%",
    alignSelf: "center",
    marginVertical: 10,
    color: "#878787",
    fontFamily: "Nunito-Medium",
  },
  InputView: {
    flexDirection: "row",
    backgroundColor: "#424141",
    alignItems: "center",
    width: "85%",
    alignSelf: "center",
    borderRadius: 6,
  },
  refBox: {
    flexDirection: "row",
    width: "85%",
    alignSelf: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  refTxt: {
    color: "#878787",
    fontFamily: "Nunito-Medium",
    marginRight: 10,
  },
});

export default DepositModal;

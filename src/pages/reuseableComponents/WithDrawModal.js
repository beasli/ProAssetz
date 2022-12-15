import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import CrossIcon from "react-native-vector-icons/Entypo";
import OTPTextInput from "react-native-otp-textinput";
import Btn from "./Button";
import InfoIcon from "react-native-vector-icons/AntDesign";
const WithDrawModal = () => {
  return (
    <View style={{ backgroundColor: "#111111" }}>
      <View style={styles.headerBox}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              marginRight: 10,
              color: "#B3B3B3",
              fontFamily: "Nunito-Medium",
            }}
          >
            Withdraw INR
          </Text>
          <InfoIcon size={20} name="infocirlceo" color={"#E29125"} />
        </View>
        <CrossIcon name="cross" size={25} color={"#B3B3B3"} />
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
      <Text style={styles.WithTxt}>Withdraw INR</Text>
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
            Amount
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.TypeOtpBox}>
        <Text style={styles.optTxt}>Type Your OTP</Text>
        <InfoIcon size={20} name="infocirlceo" color={"#E29125"} />
      </View>
      <View style={{ alignItems: "center" }}>
        <OTPTextInput
          inputCount={6}
          inputCellLength={1}
          containerStyle={styles.inputbox}
          textInputStyle={styles.input}
          tintColor="#3B3B3B"
          offTintColor="#3B3B3B"
        />
      </View>
      <View style={{ marginVertical: 15 }}>
        <TouchableOpacity>
          <Btn
            title={"Withdraw"}
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
  TypeOtpBox: {
    flexDirection: "row",
    width: "85%",
    alignSelf: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  optTxt: {
    color: "#878787",
    fontFamily: "Nunito-Medium",
    marginRight: 10,
  },
});

export default WithDrawModal;

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import React, { useState } from "react";
import CrossIcon from "react-native-vector-icons/AntDesign";
import Btn from "./Button";
import InfoIcon from "react-native-vector-icons/AntDesign";
import ScanIcon from "react-native-vector-icons/MaterialCommunityIcons";
import QRScaner from "./QRScaner";
const BtcModal = ({ close }) => {
  const ButtonPercentage = [
    { id: 1, text: '25%' }, { id: 2, text: '50%' }, { id: 3, text: '75%' }, { id: 4, text: '100%' }
  ]
  const [percentSelected, setpercentSelected] = useState(0)
  const [qrModelVisible, setqrModelVisible] = useState(false)
  return (
    <View style={{ backgroundColor: "#111111", borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
      <View style={styles.headerBox}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              color: "#B3B3B3",
              fontFamily: "Nunito-Medium",
              fontWeight: '600',
              fontSize: 14
            }}
          >
            Send BTC
          </Text>
        </View>
        <TouchableOpacity onPress={close}>
          <CrossIcon name="close" size={22} color={"#B3B3B3"} />
        </TouchableOpacity>
      </View>
      <Text style={styles.WithTxt}>Receipent Address</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "space-between",
          width: "85%",
        }}
      >
        <View style={styles.AdressInputView}>
          <TextInput style={{ width: "74%", color: "#FFF6E0" }} />
          <View style={{ borderWidth: 0.3, borderColor: "#878787", height: 26 }} />
          <TouchableOpacity
            activeOpacity={1}
            style={{
              width: "26%",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#878787",
                fontFamily: "Nunito-Bold",
                fontSize: 12
              }}
            >
              Address
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "20%",
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity>
            <ScanIcon
              name="qrcode-scan"
              size={28}
              color={"#3B3B3B"}
              style={{
                backgroundColor: "#FFB916",
                padding: 6,
                borderRadius: 7,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.refBox}>
        <Text style={styles.refTxt}>Refrence No</Text>
        <InfoIcon size={12} name="infocirlceo" color={"#E29125"} />
      </View>
      <View style={styles.InputView}>
        <TextInput style={{ width: "74%", color: "#FFF6E0" }} />
        <View style={{ borderWidth: 0.3, borderColor: "#878787", height: 20 }} />
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: "26%",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#878787", fontFamily: "Nunito-Bold", fontSize: 12, fontWeight: '600' }}>
            Copy Tag
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.WithTxt}>Amount</Text>
      <View style={styles.InputView}>
        <TextInput style={{ width: "74%", color: "#FFF6E0" }} />
        <View style={{ borderWidth: 0.3, borderColor: "#878787", height: 20 }} />
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: "26%",
            alignItems: "center",

          }}
        >
          <Text style={{ color: "#878787", fontFamily: "Nunito-Bold", fontSize: 12, fontWeight: '600' }}>
            BTC
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginHorizontal: '8%', marginTop: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 12, fontWeight: '600', fontFamily: 'Nunito-Medium', color: '#FFA629' }}>Fees :<Text style={{ fontSize: 12, fontWeight: '800', fontFamily: 'Nunito-Medium', color: '#FFA629' }}> 0.00</Text></Text>

        <Text style={{ fontSize: 12, fontWeight: '600', fontFamily: 'Nunito-Medium', color: '#FFA629' }}>Total Amount :<Text style={{ fontSize: 12, fontWeight: '800', fontFamily: 'Nunito-Medium', color: '#FFA629' }}> 0.00</Text></Text>
      </View>
      <View style={{ marginHorizontal: '7.5%' }}>
        <View style={{ marginVertical: 8 }}>
          <View style={{ flexDirection: 'row', marginHorizontal: 8, alignItems: 'center', justifyContent: 'space-between', marginTop: 16, height: 1, backgroundColor: '#FFA629' }}>
            {ButtonPercentage.map((item, index) => (
              <TouchableOpacity style={[{ width: 12, height: 12, backgroundColor: '#FFA629', borderRadius: 8, }, percentSelected == index && { width: 16, height: 16, borderRadius: 8, backgroundColor: '#FFF6E0', alignItems: 'center', justifyContent: 'center' }]} activeOpacity={0.6} onPress={() => { setpercentSelected(index) }}>
                <View style={{ backgroundColor: '#FFA629', borderRadius: 6, width: 10, height: 10 }} />
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ flexDirection: 'row', marginHorizontal: 8, alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
            <View>
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#878787', fontFamily: 'Nunito-Medium' }}>25%</Text>
            </View>
            <View>
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#878787', fontFamily: 'Nunito-Medium' }}>50%</Text>
            </View>
            <View>
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#878787', fontFamily: 'Nunito-Medium' }}>75%</Text>
            </View>
            <View>
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#878787', fontFamily: 'Nunito-Medium' }}>100%</Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.WithTxt}>Remarks</Text>
        <TextInput
          style={{
            backgroundColor: "#424141",
            width: "85%",
            alignSelf: "center",
            borderRadius: 7,
            height: 40,
            color: "#FFF6E0"
          }}
        />
      </View>
      <View style={{ marginVertical: 25 }}>
        <TouchableOpacity>
          <Btn
            text={"Send"}
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
    alignItems: 'center'
  },
  WithTxt: {
    width: "85%",
    alignSelf: "center",
    marginVertical: 10,
    color: "#878787",
    fontSize: 12,
    fontFamily: "Nunito-Medium",
  },
  InputView: {
    flexDirection: "row",
    backgroundColor: "#424141",
    alignItems: "center",
    width: "85%",
    alignSelf: "center",
    borderRadius: 6,
    height: 40
  },
  AdressInputView: {
    flexDirection: "row",
    backgroundColor: "#424141",
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    borderRadius: 6,
    height: 40,
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
    fontSize: 12
  },
});

export default BtcModal;

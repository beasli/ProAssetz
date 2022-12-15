import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, } from "react-native";
import React, { useState } from "react";
import SendIcon from "react-native-vector-icons/Ionicons";
import PlusIcon from "react-native-vector-icons/AntDesign";
import DownIcon from "react-native-vector-icons/AntDesign";
import QRScaner from "./QRScaner";
import BtcModal from "./BtcModal";
import Modal from 'react-native-modal'
const ReuseCard = () => {
  const whiteTxt = "#FFF6E0";
  const greyTxt = "#B3B3B3";
  const [val, setval] = useState(false);
  const [openView, setopenView] = useState(null)
  const [qrModelVisible, setqrModelVisible] = useState(false)
  const [sendModelVisible, setsendModelVisible] = useState(false)
  const Data = [
    { id: 1, img: require("../../../assets/btcCoin.png"), Currency: 'BTC', Invested: '0.00000', Qty: '0.000160', Interest: '32,543' },
    { id: 2, img: require("../../../assets/Ether.png"), Currency: 'ETH', Invested: '0.00000', Qty: '0.000160', Interest: '32,543' },
    { id: 3, img: require("../../../assets/Ether.png"), Currency: 'ETH', Invested: '0.00000', Qty: '0.000160', Interest: '32,543' },
    { id: 4, img: require("../../../assets/Ether.png"), Currency: 'ETH', Invested: '0.00000', Qty: '0.000160', Interest: '32,543' },
  ]
  return (
    <View >
      {Data.map((item, index) => (<>
        <ImageBackground
          source={require("../../../assets/cardBg.png")}
          resizeMode="stretch"
          style={{
            flexDirection: "row",
            justifyContent: 'space-evenly',
            alignItems: "center",
            height: 110,
            zIndex: 2,
            elevation: Platform.OS === "android" ? 50 : 0,
            // width: "94%",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              source={item.img}
              style={{ height: 50, width: 50 }}
            />
            <Text style={{ color: whiteTxt, fontFamily: "Nunito-Medium", bottom: 6 }}>
              {item.Currency}
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: greyTxt,
                fontFamily: "Nunito-Medium",
                fontSize: 16,
              }}
            >
              Invested
            </Text>
            <Text
              style={{
                color: whiteTxt,
                fontFamily: "Nunito-Medium",
                fontSize: 17,
              }}
            >
              ₹ {item.Invested}
            </Text>
          </View>
          <Text style={{ borderWidth: 0.3, borderColor: greyTxt }}></Text>
          <View>
            <Text
              style={{
                color: greyTxt,
                fontSize: 16,
                fontFamily: "Nunito-Medium",
              }}
            >
              Qty : {item.Qty}
            </Text>
            <Text
              style={{
                color: greyTxt,
                fontSize: 16,
                fontFamily: "Nunito-Medium",
              }}
            >
              Interest : ₹ {item.Interest}
            </Text>
          </View>
          <View
            style={{
              height: 90,
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity activeOpacity={0.6} onPress={() => { setqrModelVisible(true) }}>
              <SendIcon
                name="send-sharp"
                size={18}
                color={"#3B3B3B"}
                style={{
                  backgroundColor: "#FFF6E0",
                  borderTopRightRadius: 9,
                  borderBottomLeftRadius: 9,
                  borderBottomRightRadius: 9,
                  padding: 6,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={() => { setsendModelVisible(true) }}>
              <PlusIcon
                name="plus"
                size={18}
                color={"#3B3B3B"}
                style={{
                  backgroundColor: "#FFB916",
                  padding: 6,
                  borderTopLeftRadius: 9,
                  borderTopRightRadius: 9,
                  borderBottomRightRadius: 9,
                }}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        {openView == index ? (
          <View style={{ bottom: 40 }}>
            <View
              style={{
                backgroundColor: "#111111",
                width: "97.5%",
                alignSelf: "center",
                zIndex: 1,
                elevation: Platform.OS === "android" ? 40 : 0,
                paddingTop: 45,
                paddingBottom: 20,
              }}
            >
              <View style={styles.hiddenBox}>
                <Text style={{ color: greyTxt }}>LTP :</Text>
                <View>
                  <Text style={{ color: whiteTxt }}>₹ 32,543</Text>
                  <Text style={{ color: whiteTxt }}>(+32,543%)</Text>
                </View>
                <Text style={{ borderWidth: 0.3, borderColor: greyTxt }}></Text>
                <Text style={{ color: greyTxt }}>Current Value :</Text>
                <View>
                  <Text style={{ color: whiteTxt }}>₹ 32,543</Text>
                  <Text style={{ color: whiteTxt }}>(+32,543%)</Text>
                </View>
              </View>
            </View>
            <View style={{ width: "100%", alignSelf: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  setopenView(null);
                }}
                activeOpacity={0.8}
                style={{ width: "100%", alignSelf: "center" }}
              >
                <ImageBackground
                  source={require("../../../assets/cardBtm.png")}
                  resizeMode="stretch"
                  style={{
                    justifyContent: "flex-end",
                    height: 60,
                    width: "100%",
                    bottom: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      bottom: 15,
                    }}
                  >
                    <Text style={{ marginHorizontal: 5, color: greyTxt }}>
                      Less
                    </Text>
                    <DownIcon name="caretup" size={12} color={greyTxt} style={{ marginTop: 4 }} />
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>

        ) : (
          <TouchableOpacity activeOpacity={0.8} onPress={() => { setopenView(index) }}>
            <ImageBackground
              source={require("../../../assets/cardBtm.png")}
              resizeMode="stretch"
              style={{
                height: 75,
                bottom: 45,
                justifyContent: "flex-end",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  bottom: 15,
                }}
              >
                <Text style={{ marginHorizontal: 5, color: greyTxt }}>More</Text>
                <DownIcon name="caretdown" size={12} color={greyTxt} />
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
      </>))}

      <Modal visible={qrModelVisible}
        coverScreen={true}
        onBackdropPress={() => setqrModelVisible(false)}
        onRequestClose={() => {
          setqrModelVisible(false);
        }}
        transparent={true} animationType={'slide'}>
        <View style={{ flex: 1, justifyContent: 'flex-end', }}>
          <View style={{ justifyContent: 'flex-end', marginHorizontal: 2, zIndex: 1 }}>
            <QRScaner close={() => setqrModelVisible(false)} />
          </View>
        </View>
      </Modal>
      <Modal visible={sendModelVisible}
        coverScreen={true}
        onRequestClose={() => {
          setsendModelVisible(false);
        }}
        onBackdropPress={() => setsendModelVisible(false)}
        transparent={true} animationType={'slide'}>
        <View style={{ flex: 1, justifyContent: 'flex-end', }}>
          <View style={{ justifyContent: 'flex-end', marginHorizontal: 2, zIndex: 1 }}>
            <BtcModal close={() => setsendModelVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  hiddenBox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#B3B3B3",
    borderStyle: "dashed",
    width: "90%",
    alignSelf: "center",
    paddingVertical: 10,
    borderRadius: 9,
  },
});

export default ReuseCard;

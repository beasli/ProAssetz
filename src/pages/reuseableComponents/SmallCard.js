import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, } from "react-native";
import React, { useState } from "react";
import SendIcon from "react-native-vector-icons/Ionicons";
import PlusIcon from "react-native-vector-icons/AntDesign";
import DownIcon from "react-native-vector-icons/AntDesign";
import DepositModal from "./DepositModal";
import BtcModal from "./BtcModal";
import Modal from "react-native-modal";
const SmallCard = (props) => {
  const whiteTxt = "#FFF6E0";
  const greyTxt = "#B3B3B3";
  const [val, setval] = useState(false);
  const [modelVisible, setModelVisible] = useState(false)
  const [sendModelVisible, setsendModelVisible] = useState(false)
  return (
    <View>
      <View style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: props.CardHeight ? props.CardHeight : 90,
        zIndex: 2,
        elevation: Platform.OS === "android" ? 50 : 0,
        width: "95%",
        backgroundColor: props.backgroundColor ? props.backgroundColor : '#2C2B2B',
        borderRadius: 16,
        alignSelf: 'center',
        shadowColor: "#FFF6E0",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={props.source}
            style={{ height: 40, width: 40 }}
            resizeMode={'contain'}
          />
          <Text style={{ color: whiteTxt, fontFamily: "Nunito-Medium", }}>
            {props.Name}
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: props.TextColor ? props.TextColor : greyTxt,
              fontFamily: "Nunito-Medium",
              fontSize: 16,
            }}
          >
            {props.Invested}
          </Text>
          <Text
            style={{
              color: whiteTxt,
              fontFamily: "Nunito-Medium",
              fontSize: 17,
            }}
          >
            {props.Price}
          </Text>
        </View>
        <View style={{ borderWidth: 0.3, borderColor: greyTxt, height: 50 }} />
        {props.AvilableBalance == true ?
          <View>
            <Text
              style={{
                color: greyTxt,
                fontSize: 16,
                fontFamily: "Nunito-Medium",
              }}
            >
              Avilable Balance
            </Text>
            <Text
              style={{
                color: greyTxt,
                fontSize: 16,
                fontFamily: "Nunito-Medium",
                textAlign: 'center'
              }}
            >
              {props.Balance}
            </Text>
          </View>
          : <View>
            <Text
              style={{
                color: greyTxt,
                fontSize: 16,
                fontFamily: "Nunito-Medium",
              }}
            >
              Qty : {props.Qty}
            </Text>
            <Text
              style={{
                color: greyTxt,
                fontSize: 16,
                fontFamily: "Nunito-Medium",
              }}
            >
              Interest : {props.Interest}
            </Text>
          </View>}
        <View
          style={{
            height: 90,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={() => setsendModelVisible(true)}>
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
          <TouchableOpacity onPress={() => setModelVisible(true)}>
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
      </View>
      {props.Show == true ? <>
        {val == false ? (
          <TouchableOpacity activeOpacity={0.8} onPress={() => setval(true)}>
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
        ) : (
          <View style={{ bottom: 40 }}>
            <View
              style={{
                backgroundColor: "#111111",
                width: "95%",
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
                  setval(false);
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
                    <DownIcon name="caretdown" size={12} color={greyTxt} />
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </> : null}
      {/* <TouchableWithoutFeedback style={[StyleSheet.absoluteFill, { zIndex: 1 }]} onPress={() => { setModelVisible(false) }}> */}
      <Modal visible={modelVisible}
        coverScreen={true}
        onBackdropPress={() => setModelVisible(false)}
        onRequestClose={() => {
          setModelVisible(false);
        }}
        transparent={true} animationType={'slide'}>
        <View style={{ flex: 1, justifyContent: 'flex-end', }}>
          <View style={{ justifyContent: 'flex-end', marginHorizontal: 2, zIndex: 1 }}>
            <DepositModal close={() => setModelVisible(false)} />
          </View>
        </View>
      </Modal>
      {/* </TouchableWithoutFeedback> */}
      <Modal visible={sendModelVisible}
        coverScreen={true}
        onBackdropPress={() => setsendModelVisible(false)}
        onRequestClose={() => {
          setsendModelVisible(false);
        }}
        transparent={true} animationType={'slide'}>
        <View style={{ flex: 1, justifyContent: 'flex-end', }}>
          <View style={{ justifyContent: 'flex-end', zIndex: 1 }}>
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

export default SmallCard;

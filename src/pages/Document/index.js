import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import UploadComponent from "./UploadComponent";
import ImageCropPicker from "react-native-image-crop-picker";
import Modal from "react-native-modal";
import { colors } from "../../constants";
import CheckBox from '@react-native-community/checkbox'

const Document = ({ navigation }) => {
  const whitetxt = "#FFF6E0";
  const greytxt = "#686868";
  const [selfie, setselfie] = useState("");
  const [docFront, setdocFront] = useState("");
  const [docBack, setdocBack] = useState("");
  const [docSelfie, setdocSelfie] = useState("");
  const [pan, setpan] = useState("");
  const [copy, setcopy] = useState("");
  const [index, setindex] = useState();
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [toggleCheckBoxTwo, setToggleCheckBoxTwo] = useState(false)
  const [modalVisible, setmodalVisible] = useState(false);
  const isTermChecked = (item) => {
    if (item == false) {
      setToggleCheckBox(false)
    }
    setToggleCheckBox(true)
  }
  const isTermCheckedTwo = (item) => {
    if (item == false) {
      setToggleCheckBoxTwo(false)
    }
    setToggleCheckBoxTwo(true)
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name={"chevron-back"} size={27} color={greytxt} />
        </TouchableOpacity>
        <Text style={styles.txtStyle}>My Documents</Text>
        <Text style={{ width: "5%" }}></Text>
      </View>

      <View>
        <View style={{ marginTop: 25 }}>
          <UploadComponent
            txt={"Upload Selfie"}
            borderRadius={25}
            source={
              selfie != ""
                ? { uri: selfie }
                : require("../../../assets/man.png")
            }
            onPress={() => {
              setmodalVisible(true), setindex(1);
            }}
          />
        </View>
        <View style={{ flexDirection: 'row', marginHorizontal: '8%', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              tintColors={{ true: colors.yellowLg, false: colors.greytxt }}
              onValueChange={(newValue) => {
                isTermChecked(newValue)
                setToggleCheckBox(newValue)
              }}
            />
            <Text style={{ color: colors.greytxt, fontSize: 18, fontFamily: 'Nunito-Medium' }}>Passport</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckBox
              disabled={false}
              value={toggleCheckBoxTwo}
              tintColors={{ true: colors.yellowLg, false: colors.greytxt }}
              onValueChange={(newValue) => {
                isTermCheckedTwo(newValue)
                setToggleCheckBoxTwo(newValue)
              }}
            />
            <Text style={{ color: colors.greytxt, fontSize: 18, fontFamily: 'Nunito-Medium' }}>Aadhar Card</Text>
          </View>
        </View>
        <View>
          <UploadComponent
            txt={"Upload Document Front"}
            borderRadius={docFront != '' ? 25 : 0}
            source={
              docFront != ""
                ? { uri: docFront }
                : require("../../../assets/adhaar.png")
            }
            onPress={() => {
              setmodalVisible(true), setindex(2);
            }}
          />
        </View>
        <View>
          <UploadComponent
            txt={"Upload Document Back"}
            borderRadius={docBack != '' ? 25 : 0}
            source={
              docBack != ""
                ? { uri: docBack }
                : require("../../../assets/adhaar.png")
            }
            onPress={() => {
              setmodalVisible(true), setindex(3);
            }}
          />
        </View>
        <View>
          <Text style={styles.Heading}>Selfie with Document</Text>
          <View>
            <UploadComponent
              borderRadius={25}
              txt={"Upload Selfie with Document"}
              source={
                docSelfie != ""
                  ? { uri: docSelfie }
                  : require("../../../assets/man2.png")
              }
              onPress={() => {
                setmodalVisible(true), setindex(4);
              }}
            />
          </View>
        </View>
        <View>
          <Text style={styles.Heading}>Your Pan Card</Text>
          <View>
            <UploadComponent
              borderRadius={pan != '' ? 25 : 0}
              txt={"Upload Document Front"}
              source={
                pan != "" ? { uri: pan } : require("../../../assets/adhaar.png")
              }
              onPress={() => {
                setmodalVisible(true), setindex(5);
              }}
            />
          </View>
        </View>
        <View>
          <Text style={styles.Heading}>copy of a Cancel Cheque</Text>
          <View>
            <UploadComponent
              txt={"Upload Selfie with Document"}
              borderRadius={copy != '' ? 25 : 0}
              source={
                copy != ""
                  ? { uri: copy }
                  : require("../../../assets/adhaar.png")
              }
              onPress={() => {
                setmodalVisible(true), setindex(6);
              }}
            />
          </View>
        </View>
      </View>
      <Modal
        visible={modalVisible}
        animationType="none"
        onBackdropPress={() => setmodalVisible(false)}
        coverScreen={true}
        transparent={true}
        onRequestClose={() => {
          setmodalVisible(false);
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            height: 135,
            justifyContent: "space-between",
            width: "90%",
            alignSelf: "center",
          }}
        >
          <View>
            <Text
              style={{
                color: "black",
                fontFamily: "Nunito-ExtraBold",
                fontSize: 22,
                marginVertical: 10,
                paddingHorizontal: 10,
              }}
            >
              Mode
            </Text>
            <Text
              style={{
                fontFamily: "Nunito-Bold",
                color: colors.greytxt,
                paddingHorizontal: 10,
              }}
            >
              Select an option
            </Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity
              onPress={() => {
                ImageCropPicker.openPicker({
                  cropping: true,
                  freeStyleCropEnabled: true,
                }).then((image) => {
                  setmodalVisible(false);
                  if (index === 1) {
                    index === 1 ? setselfie(image.path) : null;
                  } else if (index === 2) {
                    index === 2 ? setdocFront(image.path) : null;
                  } else if (index === 3) {
                    index === 3 ? setdocBack(image.path) : null;
                  } else if (index === 4) {
                    index === 4 ? setdocSelfie(image.path) : null;
                  } else if (index === 5) {
                    index === 5 ? setpan(image.path) : null;
                  } else {
                    index === 6 ? setcopy(image.path) : null;
                  }
                });
              }}
            >
              <Text
                style={{
                  marginHorizontal: 10,
                  fontFamily: "Nunito-Bold",
                  fontSize: 16,
                  color: "black",
                  paddingVertical: 5,
                }}
              >
                Gallery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                ImageCropPicker.openCamera({
                  cropping: true,
                  freeStyleCropEnabled: true,
                }).then((image) => {
                  setmodalVisible(false);
                  if (index === 1) {
                    index === 1 ? setselfie(image.path) : null;
                  } else if (index === 2) {
                    index === 2 ? setdocFront(image.path) : null;
                  } else if (index === 3) {
                    index === 3 ? setdocBack(image.path) : null;
                  } else if (index === 4) {
                    index === 4 ? setdocSelfie(image.path) : null;
                  } else if (index === 5) {
                    index === 5 ? setpan(image.path) : null;
                  } else {
                    index === 6 ? setcopy(image.path) : null;
                  }
                });
              }}
            >
              <Text
                style={{
                  marginHorizontal: 10,
                  fontFamily: "Nunito-Bold",
                  fontSize: 16,
                  color: "black",
                  paddingVertical: 5,
                }}
              >
                Camera
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
  },
  headerBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingHorizontal: 5,
  },
  txtStyle: {
    fontFamily: "Montserrat-SemiBold",
    color: "#FFF6E0",
    fontSize: 19,
  },
  Heading: {
    width: "90%",
    alignSelf: "center",
    color: colors.white,
    fontFamily: "Montserrat-Bold",
    fontSize: 17,
    marginVertical: 11,
  },
});

export default Document;

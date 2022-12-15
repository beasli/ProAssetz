import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../constants";
import InputStyle from "./InputStyle";
const DetailsOfBank = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name={"chevron-back"} size={23} color={colors.greytxt} />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "Montserrat-SemiBold",
            color: colors.white,
            fontSize: 18,
          }}
        >
          Confirm your Bank Details
        </Text>
        <Text style={{ width: "5%" }}></Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <View style={styles.twoinput}>
          <InputStyle
            width={"42%"}
            smalltxt={"IFSC Code"}
            largetxt={"UYR6347"}
          />
          <InputStyle width={"42%"} smalltxt={"Bank Name"} largetxt={"SBI"} />
        </View>
        <View style={styles.oneinput}>
          <InputStyle
            width={"90%"}
            smalltxt={"Bank Account No"}
            largetxt={"00000438348393"}
          />
        </View>
        <View style={styles.twoinput}>
          <InputStyle
            width={"42%"}
            smalltxt={"Branch Name"}
            largetxt={"81009964644"}
          />
          <InputStyle
            width={"42%"}
            smalltxt={"Account Type"}
            largetxt={"81009964644"}
          />
        </View>
        <View style={styles.oneinput}>
          <InputStyle
            width={"90%"}
            smalltxt={"Mobile No"}
            largetxt={"81009964644"}
          />
        </View>
        <View style={styles.oneinput}>
          <InputStyle
            width={"90%"}
            smalltxt={"Name as on Bank Account"}
            largetxt={"Sample Roy"}
          />
        </View>
        <View style={styles.oneinput}>
          <InputStyle
            width={"90%"}
            smalltxt={"UPI Address with Bank"}
            largetxt={"Input"}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  headerBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 18,
    paddingHorizontal: 5,
  },
  twoinput: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 25,
  },
  oneinput: {
    marginTop: 25,
    alignItems: "center",
  },
});

export default DetailsOfBank;

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import BasicForm from "./BasicForm";
import { useNavigation } from "@react-navigation/native";
function AccountSecurity({ navigation }) {
  // const navigation = useNavigation();
  // const [disabled, setDisabled] = useState(false);
  const greytxt = "#686868";
  const whitetxt = "#FFF6E0";

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name={"chevron-back"} size={27} color={greytxt} />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Account & Security</Text>
        <Text style={{ width: "5%" }} />
      </View>
      <View>
        <Text style={styles.Txt}>Your Google 2FA ID</Text>
        <TextInput value="Karanladia@gmail.com" style={styles.inputEmail} />
      </View>
      <Text style={[styles.Txt, { marginTop: 25, marginBottom: 10 }]}>
        Change Your Password
      </Text>
      <BasicForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
    flex: 1,
  },
  headerTxt: {
    fontFamily: "Montserrat-SemiBold",
    color: "#FFF6E0",
    fontSize: 19,
  },
  headerBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  inputEmail: {
    backgroundColor: "#424141",
    width: "90%",
    alignSelf: "center",
    marginTop: 25,
    borderBottomWidth: 1,
    borderColor: "#686868",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingLeft: 15,
    color: "#FFB916",
    fontFamily: "Montserrat-Medium",
    height: 55,
  },
  Txt: {
    color: "#FFF6E0",
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
    width: "90%",
    alignSelf: "center",
    marginTop: 15,
  },
});
export default AccountSecurity;

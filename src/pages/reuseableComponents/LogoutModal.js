import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import React, { useState } from "react";
const LogoutModal = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={styles.container}>
        <Text style={styles.suretxt}>Are You Sure to want to Logout</Text>
        <View style={styles.btnBox}>
          <TouchableOpacity style={styles.cancelbox} onPress={props.onPress}>
            <Text style={styles.txtStyle}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutbox}>
            <Text style={styles.txtStyle}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#292929",
    width: "85%",
    height: 150,
    borderRadius: 5,
    alignSelf: "center",
    borderWidth: 0.7,
    borderColor: "#686868",
  },
  btnBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 30,
    alignItems: "center",
  },
  logoutbox: {
    width: "50.5%",
    alignItems: "center",
    backgroundColor: "red",
    height: 30,
    justifyContent: "center",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  cancelbox: {
    width: "50.5%",
    alignItems: "center",
  },
  suretxt: {
    textAlign: "center",
    height: 120,
    textAlignVertical: "center",
    top: 5,
    color: "#686868",
    fontSize: 14,
    fontFamily: "Montserrat-Bold",
  },
  txtStyle: {
    fontFamily: "Montserrat-SemiBold",
    color: "#FFF6E0",
    fontSize: 13,
  },
});
export default LogoutModal;

import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../constants";
const UploadComponent = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.container}>
        <Image resizeMode='contain' source={props.source} style={[styles.img, { borderRadius: props.borderRadius }]} />
        <Text style={styles.txt}>{props.txt}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.input,
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    height: 55,
    marginVertical: 15,
  },
  img: {
    height: 45,
    width: 45,
    marginHorizontal: 12,

  },
  txt: {
    color: colors.grayDark,
    fontFamily: "Nunito-Medium",
    fontSize: 16,
  },
});

export default UploadComponent;

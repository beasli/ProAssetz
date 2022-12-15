import { View, Text } from "react-native";
import React from "react";
import { colors } from "../../constants";
const InputStyle = (props) => {
  return (
    <View
      style={{
        backgroundColor: colors.input,
        paddingVertical: 10,
        width: props.width,
        paddingLeft: 25,
        borderRadius: 5,
        elevation: 5,
      }}
    >
      <Text
        style={{ color: "#6E6E6E", fontSize: 15, fontFamily: "Nunito-Medium" }}
      >
        {props.smalltxt}
      </Text>
      <Text
        style={{
          color: colors.white,
          fontSize: 16,
          fontFamily: "Nunito-Medium",
        }}
      >
        {props.largetxt}
      </Text>
    </View>
  );
};

export default InputStyle;

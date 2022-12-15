import { View, Text, TextInput } from "react-native";
import React, { useRef } from "react";
import { colors } from "../../constants";

const Input = (props) => {
  const userRef = useRef()
  // console.log("****************userRef", userRef)
  return (
    <View
      style={{ width: "100%", flexDirection: "row", alignItems: "center", borderWidth: .5, borderColor: "#99A6AF", alignSelf: "center", borderRadius: 5, height: 45, }}>
      <TextInput style={{ width: "80%", color: colors.white, paddingLeft: 15, fontFamily: "Nunito-SemiBold" }}
        // ref={userRef}
        defaultValue={props.value}
        value={props.valueFixied}
        // editable={props.editable}
        onChangeText={props.onChangeText}
        onChange={props.onChange}
        keyboardType={"decimal-pad"}
      />
      <Text style={{ textAlign: "center", width: "20%", color: "#99A6AF" }}>
        {props.Btn}
      </Text>
    </View>
  );
};

export default Input;

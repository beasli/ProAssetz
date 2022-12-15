import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import DownIcon from "react-native-vector-icons/AntDesign";
import { colors } from "../../constants";
import { Dropdown } from "react-native-material-dropdown-v2";
const BtcInput = (props) => {
    const TxtColor = "#878787";
    return (
        <View
            style={{
                flexDirection: "row",
                backgroundColor: "#424141",
                alignItems: "center",
                height: 53,
                width: "98%",
                borderRadius: 5,
                justifyContent: "space-between",
                paddingHorizontal: 6,
                alignSelf: "center",
            }}
        >
            <View
                style={{
                    alignItems: "center",
                    flexDirection: "row",

                    width: "80%",
                }}
            >
                <Image
                    source={require("../../../assets/btcCoin.png")}
                    style={{ height: 35, width: 35, top: 4, marginHorizontal: 2 }}
                />
                <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                >
                    <Text style={{ color: TxtColor, paddingHorizontal: 3 }}>
                        {props.txt}
                    </Text>
                    <DownIcon name="caretdown" size={12} color={TxtColor} />
                </TouchableOpacity>
                <Text
                    style={{ borderWidth: 1, marginLeft: 12, borderColor: TxtColor }}
                ></Text>
                <TextInput style={{ width: "72%", color: colors.white }} keyboardType='decimal-pad' />
            </View>
            <TouchableOpacity style={{ width: "20%" }}>
                <Text style={{ color: TxtColor }}>Send BTC</Text>
            </TouchableOpacity>
        </View>
    );
};

export default BtcInput;

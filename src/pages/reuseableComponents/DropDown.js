import { View, Text } from "react-native";
import React from "react";
import DropDownPicker from "react-native-dropdown-picker";
import DownIcon from "react-native-vector-icons/AntDesign";
const DropDown = (props) => {
    return (
        <DropDownPicker
            open={props.open}
            value={props.value}
            items={props.items}
            setOpen={props.setOpen}
            setValue={props.setValue}
            setItems={props.setItems}
            placeholder="Watchlist"
            placeholderStyle={{ color: "#B3B3B3" }}
            containerStyle={{
                width: "45%",
            }}
            ArrowDownIconComponent={({ style }) => (
                <DownIcon name="caretdown" size={12} color={"#B3B3B3"} />
            )}
            ArrowUpIconComponent={({ style }) => (
                <DownIcon name="caretup" size={12} color={"#B3B3B3"} />
            )}
            style={{
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                borderColor: "#FFB916",
                backgroundColor: "#2C2B2B",
                borderRadius: 5,
            }}
            selectedItemLabelStyle={{
                color: "#FFB916",
            }}
            labelStyle={{
                color: "#B3B3B3",
                fontFamily: 'Nunito-Medium'
            }}
            showTickIcon={false}
            dropDownContainerStyle={{
                backgroundColor: "#212121",
                borderWidth: 0,
                zIndex: 1,
                elevation: Platform.OS === "android" ? 50 : 0,
            }}
            listItemLabelStyle={{
                color: "#B3B3B3",
                fontFamily: 'Nunito-Medium',
            }}

        />
    );
};

export default DropDown;
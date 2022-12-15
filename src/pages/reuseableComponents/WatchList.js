import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Btn from "./Button";
import DropDown from "./DropDown";
const WatchList = () => {
    const Data = [
        {
            img: require("../../../assets/btcCoin.png"),
            txt: "Bitcoin",
            txt1: "BTC/INR",
            amount: "₹31,977,55,00",
            per: "+10%",
        },
        {
            img: require("../../../assets/btcCoin.png"),
            txt: "Bitcoin",
            txt1: "BTC/INR",
            amount: "₹31,977,55,00",
            per: "+10%",
        },
        {
            img: require("../../../assets/btcCoin.png"),
            txt: "Bitcoin",
            txt1: "BTC/INR",
            amount: "₹31,977,55,00",
            per: "+10%",
        },
        {
            img: require("../../../assets/btcCoin.png"),
            txt: "Bitcoin",
            txt1: "BTC/INR",
            amount: "₹31,977,55,00",
            per: "+10%",
        },
        {
            img: require("../../../assets/btcCoin.png"),
            txt: "Bitcoin",
            txt1: "BTC/INR",
            amount: "₹31,977,55,00",
            per: "+10%",
        },
        {
            img: require("../../../assets/btcCoin.png"),
            txt: "Bitcoin",
            txt1: "BTC/INR",
            amount: "₹31,977,55,00",
            per: "+10%",
        },
    ];
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(1);
    const [items, setItems] = useState([
        { label: "Watchlist 1", value: 1 },
        { label: "Watchlist 2", value: 2 },
        { label: "Watchlist 3", value: 3 },
        { label: "Watchlist 4", value: 4 },
    ]);

    const TxtColor = "#FFF6E0";
    const ItemStyle = (props) => (
        <View style={styles.flatBox}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={props.item.img} style={{ top: "5%" }} />
                <View style={{ paddingHorizontal: "5%" }}>
                    <Text style={{ fontFamily: "Nunito-Bold", color: TxtColor }}>
                        {props.item.txt}
                    </Text>
                    <Text style={{ fontFamily: "Nunito-Bold", color: "#A9A9A9" }}>
                        {props.item.txt1}
                    </Text>
                </View>
            </View>
            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <Text style={{ fontFamily: "Nunito-Bold", color: TxtColor }}>
                    {props.item.amount}
                </Text>
                <Text style={{ fontFamily: "Nunito-Light", color: "#05976A" }}>
                    {props.item.per}
                </Text>
            </View>
        </View>
    );
    return (
        <View style={styles.container}>
            <View style={styles.WatchBox}>
                <Text style={{ color: TxtColor, fontSize: 22, fontWeight: "500" }}>
                    Watchlist
                </Text>
                <DropDown
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                />
            </View>
            <FlatList data={Data} renderItem={ItemStyle} />
            <TouchableOpacity style={{ marginVertical: "7%" }} activeOpacity={0.6}>
                <Btn
                    width={"45%"}
                    backgroundColor={"#FFA629"}
                    color={"white"}
                    text={"More"}
                />
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2C2B2B",
        width: "96%",
        alignSelf: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#464646",
    },
    flatBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: "10%",
        paddingLeft: "5%",
        alignItems: "center",
        paddingVertical: "1%",
    },
    WatchBox: {
        paddingVertical: "7%",
        paddingHorizontal: "5%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
});
export default WatchList;
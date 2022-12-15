import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import React from "react";
import DownIcon from "react-native-vector-icons/AntDesign";
import UpIcon from "react-native-vector-icons/AntDesign";
const CollapseList = (props) => {
    const TxtColor = "#FFF6E0";
    const Data = [
        {
            img: require("../../../assets/btcCoin.png"),
            txt: "BitCoin (BTC)",
            no: "0.000000001",
            per: "-10%",
        },
        {
            img: require("../../../assets/Ether.png"),
            txt: "Etehrum (ETH)",
            no: "0.000000001",
            per: "-10%",
        },
        {
            img: require("../../../assets/dogecoin.png"),
            txt: "BitCoin (BTC)",
            no: "0.000000001",
            per: "-10%",
        },
        {
            img: require("../../../assets/btcCoin.png"),
            txt: "BitCoin (BTC)",
            no: "0.000000001",
            per: "-10%",
        },
        {
            img: require("../../../assets/btcCoin.png"),
            txt: "BitCoin (BTC)",
            no: "0.000000001",
            per: "-10%",
        },
    ];
    const ItemStyle = (props) => (
        <View style={styles.flatBox}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Image
                    source={props.item.img}
                    style={{ height: 40, width: 40, top: "5%" }}
                    resizeMode="contain"
                />
                <Text style={{ color: TxtColor }}>{props.item.txt}</Text>
            </View>

            <Text style={{ color: TxtColor }}>{props.item.no}</Text>
            <View style={styles.rowStyle}>
                <UpIcon name="caretup" size={12} color={"#14AE5C"} />
                <Text style={{ color: "#14AE5C", paddingHorizontal: "1%" }}>
                    {props.item.per}
                </Text>
            </View>
        </View>
    );
    return (
        <View style={styles.container}>
            <FlatList data={Data} renderItem={ItemStyle} />
            <View style={styles.ViewMoreBox}>
                <TouchableOpacity style={styles.rowStyle} onPress={props.Show} >
                    <Text style={{ paddingHorizontal: "1.5%", color: TxtColor }}>
                        View More
                    </Text>
                    <DownIcon name="caretup" size={12} style={{ color: TxtColor, marginTop: 4, marginLeft: 3 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    rowStyle: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    flatBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: "3%",
        alignItems: "center",
        paddingVertical: "0.5%",
        marginBottom: 6
    },
    container: {
        backgroundColor: "#212121",
        width: "98%",
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        alignSelf: "center",
    },
    ViewMoreBox: {
        backgroundColor: "#3B3B3B",
        paddingVertical: 12,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
});
export default CollapseList;
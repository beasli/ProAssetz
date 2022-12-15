import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
const AppNotifications = ({ navigation }) => {
    const greytxt = "#686868";
    const whitetxt = "#FFF6E0";
    const Data = [
        {
            header: "Sell Trade - Successful",
            para: "Sell Order XLM/INR (33.0000000 XLM @ 24.980000) completed. 824.34000000 INR credited to INR wallet",
            date: "10-05-2022",
            time: "12: 40",
        },
        {
            header: "Sell Trade - Successful",
            para: "Sell Order XLM/INR (33.0000000 XLM @ 24.980000) completed. 824.34000000 INR credited to INR wallet",
            date: "10-05-2022",
            time: "12: 40",
        },
        {
            header: "Sell Trade - Successful",
            para: "Sell Order XLM/INR (33.0000000 XLM @ 24.980000) completed. 824.34000000 INR credited to INR wallet",
            date: "10-05-2022",
            time: "12: 40",
        },
        {
            header: "Sell Trade - Successful",
            para: "Sell Order XLM/INR (33.0000000 XLM @ 24.980000) completed. 824.34000000 INR credited to INR wallet",
            date: "10-05-2022",
            time: "12: 40",
        },
        {
            header: "Sell Trade - Successful",
            para: "Sell Order XLM/INR (33.0000000 XLM @ 24.980000) completed. 824.34000000 INR credited to INR wallet",
            date: "10-05-2022",
            time: "12: 40",
        },
        {
            header: "Sell Trade - Successful",
            para: "Sell Order XLM/INR (33.0000000 XLM @ 24.980000) completed. 824.34000000 INR credited to INR wallet",
            date: "10-05-2022",
            time: "12: 40",
        },
        {
            header: "Sell Trade - Successful",
            para: "Sell Order XLM/INR (33.0000000 XLM @ 24.980000) completed. 824.34000000 INR credited to INR wallet",
            date: "10-05-2022",
            time: "12: 40",
        },
    ];
    const ItemStyle = (props) => (
        <View
            style={{
                borderBottomWidth: 0.5,
                borderBottomColor: greytxt,
                paddingVertical: 10,
                marginBottom: 10,
            }}
        >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.Dotstyle}></View>
                <Text
                    style={{ color: whitetxt, fontSize: 16, fontFamily: "Nunito-Bold" }}
                >
                    {props.item.header}
                </Text>
            </View>
            <View>
                <Text
                    style={{
                        color: greytxt,
                        fontFamily: "Nunito-Medium",
                        textAlign: "center",
                        marginVertical: 10,
                    }}
                >
                    {props.item.para}
                </Text>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "90%",
                    alignSelf: "center",
                }}
            >
                <View style={{ flexDirection: "row" }}>
                    <Text
                        style={{
                            color: greytxt,
                            fontSize: 14,
                            fontFamily: "Nunito-Medium",
                        }}
                    >
                        Date
                    </Text>
                    <Text
                        style={{
                            color: "#E29224",
                            fontSize: 14,
                            fontFamily: "Nunito-Medium",
                            paddingHorizontal: 5,
                        }}
                    >
                        {props.item.date}
                    </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text
                        style={{
                            color: greytxt,
                            fontSize: 14,
                            fontFamily: "Nunito-Medium",
                            paddingHorizontal: 5,
                        }}
                    >
                        Time
                    </Text>
                    <Text
                        style={{
                            color: "#E29224",
                            fontSize: 14,
                            fontFamily: "Nunito-Medium",
                        }}
                    >
                        {props.item.time}
                    </Text>
                </View>
            </View>
        </View>
    );
    return (
        <View style={styles.container}>
            <View style={styles.headerbox}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name={"chevron-back"} size={27} color={greytxt} />
                    </TouchableOpacity>
                    <Text
                        style={{
                            color: whitetxt,
                            fontSize: 18,
                            paddingHorizontal: 7,
                            fontFamily: "Montserrat-Medium",
                        }}
                    >
                        Notifications
                    </Text>
                </View>
                <View>
                    <TouchableOpacity>
                        <Image
                            source={require("../../../assets/notify.png")}
                            style={{ height: 25, width: 25 }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <FlatList data={Data} renderItem={ItemStyle} />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#202020",
    },
    headerbox: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: "center",
        borderBottomWidth: 0.3,
        borderBottomColor: "#686868",
        paddingVertical: 18,
    },
    Dotstyle: {
        height: 12,
        width: 12,
        borderRadius: 12,
        backgroundColor: "#E29224",
        marginHorizontal: 12,
    },
});

export default AppNotifications;

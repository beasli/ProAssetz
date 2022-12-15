import {
    View,
    Text,
    Image,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import React from "react";
import DownIcon from "react-native-vector-icons/AntDesign";
const CardMain = (props) => {
    const TxtColor = "#EDEDED";
    return (
        <View style={{ width: '100%', marginTop: 26 }}>

            <ImageBackground
                source={require("../../../assets/card.png")}
                style={styles.Bg}
                resizeMode={'stretch'}
            >
                <Image
                    source={require("../../../assets/coinWallet.png")}
                    style={styles.img}
                />
                <View style={{ alignItems: "center", marginTop: 16 }}>
                    <Text style={{ color: TxtColor, fontSize: 12, fontWeight: '600', fontFamily: 'Montserrat-Medium' }}>
                        Total Assets Value
                    </Text>
                </View>
                <View style={styles.mainPriceBox}>
                    <Text style={styles.priceTxt}>$ 31,77,9051</Text>
                </View>
                <View style={styles.TxtBox}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.Txt}>Total Interest Earned</Text>
                        <Text style={styles.price}>$32,543</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.Txt}>Fix Deposite Earned</Text>
                        <Text style={styles.price}>$31,775</Text>
                    </View>
                </View>
            </ImageBackground>

            {props.visible == true ? <TouchableOpacity style={{ zIndex: -1 }} activeOpacity={0.9} onPress={props.Show}>
                <ImageBackground
                    source={require("../../../assets/border.png")}
                    style={styles.Bg1}
                    resizeMode={'stretch'}
                >
                    <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center" }}
                        onPress={props.Show}
                    >
                        <View style={{ marginTop: '8%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: TxtColor, marginHorizontal: 5 }}>
                                Crypto Funds
                            </Text>
                            <DownIcon
                                name="caretdown"
                                size={12}
                                color={TxtColor}
                            />
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
            </TouchableOpacity> : null}

        </View>
    );
};

const styles = StyleSheet.create({
    Txt: { color: "#EDEDED", fontSize: 12, fontWeight: "600", fontFamily: 'Nunito-Medium' },
    price: { color: "#EDEDED", fontWeight: "800", fontSize: 12, fontFamily: 'Nunito-Bold' },
    TxtBox: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginVertical: 20,
        marginHorizontal: 20
    },
    img: {
        height: 40,
        width: 40,
        position: "absolute",
        top: 7,
        right: 5,
    },
    mainPriceBox: {
        alignItems: "center",
        borderBottomWidth: 1.5,
        width: "90%",
        alignSelf: "center",
        borderColor: "#B3B3B338",
        marginTop: 16
    },
    priceTxt: {
        fontSize: 27,
        color: "#EDEDED",
        fontWeight: "800",
        paddingVertical: 5,
        fontFamily: 'Nunito-Bold'
    },
    Bg1: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        width: '100%',
        // top: 240,
        height: 60,
        marginTop: '-7%',
        zIndex: -1,
        // borderBottomLeftRadius: 25,
        // borderBottomRightRadius: 25,
        // borderRadius: 80
    },
    Bg: {
        height: 180,
        width: '100%',
        // borderRadius: 5,
        alignSelf: 'center',
        // alignItems: 'center',
    },
});

export default CardMain;
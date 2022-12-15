import { View, Text, StyleSheet, TouchableOpacity, ScrollView, } from "react-native";
import React, { useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons'
import ReuseCard from "./ReuseCard";
import Info from "./Info";
import { colors } from "../../constants";
import Button from '../reuseableComponents/Button';
import TradeCard from "../TradeScreen/TradeCard";
import DropDown from "../TradeScreen/DropDown";
import CheckBox from '@react-native-community/checkbox'


const OrderInfo = ({ navigation }) => {
    const Btns = [{ btn: "Open Order" }, { btn: "Info" }];
    const [selectedBtn, setselectedBtn] = useState(0);
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(1);
    const [items, setItems] = useState([
        { label: "BTC / INR", value: 1 }, { label: "BTC / USDT", value: 2 },
        { label: "BTC / ETH", value: 3 }]);

    const isTermChecked = (item) => {
        if (item == false) {
            setToggleCheckBox(false)
        }
        setToggleCheckBox(true)
    }
    const SelectCategory = (param) => {
        switch (param) {
            case 0:
                return ReuseCardFunc();
            case 1:
                return <Info />;
            default: {
                break;
            }
        }
    };

    const ReuseCardFunc = () => {
        return (
            <ScrollView>
                <View>
                    <View style={styles.cancelbox}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <CheckBox
                                disabled={false}
                                value={toggleCheckBox}
                                tintColors={{ true: colors.yellowLg, false: colors.greytxt }}
                                onValueChange={(newValue) => {
                                    isTermChecked(newValue)
                                    setToggleCheckBox(newValue)
                                }}
                            />
                            <Text style={styles.currenttxt}>Only Current Pairs</Text>
                        </View>
                        <Text style={styles.canceltxt}>Cancel All</Text>
                    </View>
                    <ReuseCard />
                </View>
            </ScrollView>
        );
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.Header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name={'chevron-back'} size={24} color={'#B3B3B3'} />
                </TouchableOpacity>
                <DropDown
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                />
            </View>
            <Text style={{ marginTop: -4, fontSize: 12, fontFamily: 'Nunito-Bold', color: 'rgba(56, 183, 129, 1)', width: '70%', alignSelf: 'center' }}>+50.47%</Text>
            <View style={{ marginTop: 16 }}>
                <TradeCard />
            </View>
            <View style={{ flexDirection: "row", marginTop: 12 }}>
                {Btns.map((item, index) => (
                    <TouchableOpacity onPress={() => setselectedBtn(index)} activeOpacity={0.6}>
                        <Text
                            style={{
                                marginHorizontal: 10,
                                color: selectedBtn == index ? "#E29224" : colors.white,
                                borderBottomWidth: selectedBtn == index ? 2 : 0,
                                borderColor: "#E29224",
                                paddingVertical: 8,
                                paddingHorizontal: 10,
                                textAlign: 'center'
                            }}
                        >
                            {item.btn}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={{ borderWidth: 0.3, borderColor: "#C4C4C4" }}></View>

            {SelectCategory(selectedBtn)}
            <View style={styles.btnBox}>
                <TouchableOpacity style={{ width: "46%" }} onPress={() => { navigation.navigate('TradeScreen', { Type: 0 }) }}>
                    <Button
                        width={"100%"}
                        text={"Buy"}
                        backgroundColor={"#38B781"}
                        color={colors.white}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{ width: "46%" }} onPress={() => { navigation.navigate('TradeScreen', { Type: 1 }) }}>
                    <Button
                        width={"100%"}
                        text={"Sell"}
                        backgroundColor={"#FF545E"}
                        color={colors.white}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.bgColor,
    },
    Header: {
        paddingHorizontal: '4%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnBox: {
        width: "90%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    cancelbox: {
        width: "90%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12,
    },
    currenttxt: {
        color: colors.darkgreytxt,
        fontSize: 12,
        fontFamily: "Nunito-Regular",
        marginLeft: 1,
    },
    canceltxt: {
        color: colors.browntxt,
        fontSize: 12,
        fontFamily: "Nunito-Regular",
    },
});
export default OrderInfo;

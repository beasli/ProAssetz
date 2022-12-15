import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DropDown from '../TradeScreen/DropDown'
import TradeCard from '../TradeScreen/TradeCard'
import { colors } from '../../constants'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Button from '../reuseableComponents/Button'


const HistoryScreen = ({ navigation }) => {
    const Btns = [{ btn: "Trade History" }, { btn: "Technical" }];
    const [selectedBtn, setselectedBtn] = useState(0);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(1);
    const [items, setItems] = useState([
        { label: "BTC / INR", value: 1 }, { label: "BTC / USDT", value: 2 },
        { label: "BTC / ETH", value: 3 }]);


    const HistoryCard = () => (
        <>
            {HistoryCardData.map((item, index) => (
                <View key={index} style={{
                    width: '96%', alignSelf: 'center', borderRadius: 5, paddingVertical: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', shadowColor: colors.white, borderColor: colors.white, borderWidth: .2, marginVertical: 10
                }}>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: colors.white, fontSize: 14, fontFamily: 'Nunito-Bold' }}>ETH / BTC</Text>
                            <Text style={{ color: 'rgba(226, 146, 36, 1)', fontSize: 14, fontFamily: 'Nunito-Bold', marginLeft: 10 }}>Limit</Text>
                            <Text style={{ color: item.limitType == 'Buy' ? colors.green : colors.redColor, fontSize: 14, fontFamily: 'Nunito-Bold', marginLeft: 10 }}>{item.limitType}</Text>
                        </View>
                        <View style={{ paddingTop: 4 }}>
                            <Text style={{ color: colors.ligBlack, fontSize: 14, fontFamily: 'Nunito-Bold' }}>10.05.2022  at 12: 40</Text>
                        </View>
                    </View>
                    <View style={{ borderWidth: 0.5, borderColor: "#3B3B3B", height: "86%" }} />
                    <View>
                        <Text style={styles.cardTextStyle}>Price :   <Text style={styles.cardTextNumber}>{item.price}</Text></Text>
                        <View style={{ paddingVertical: 4 }}>
                            <Text style={styles.cardTextStyle}>Quintity : <Text style={{ ...styles.cardTextNumber, color: colors.white }}>{item.Quintity}</Text></Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.cardTextStyle}>Fees :  <Text style={{ ...styles.cardTextNumber, color: colors.lightOrange }}>{item.fees}</Text></Text>
                            <Feather name='help-circle' size={10} style={{ paddingLeft: 4, color: colors.darkOrange }} />
                        </View>
                    </View>
                    <AntDesign name={item.limitType == 'Buy' ? 'checkcircleo' : 'clockcircleo'} size={16} color={item.limitType == 'Buy' ? colors.darkOrange : colors.lightDark} />
                </View>))}
        </>
    )

    const SelectCategory = (param) => {
        switch (param) {
            case 0:
                return <HistoryCard />;
            case 1:
                return <Text />;
            default: {
                break;
            }
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#202020' }}>
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
                    <TouchableOpacity onPress={() => setselectedBtn(index)} activeOpacity={0.8}>
                        <Text
                            style={{
                                marginHorizontal: 10,
                                color: selectedBtn == index ? "#E29224" : colors.white,
                                borderBottomWidth: selectedBtn == index ? 2 : 0,
                                borderColor: "#E29224",
                                paddingVertical: 8,
                                textAlign: 'center'
                            }}
                        >
                            {item.btn}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={{ borderWidth: 0.3, borderColor: "#C4C4C4", zIndex: -1 }} />

            <ScrollView>
                {SelectCategory(selectedBtn)}
            </ScrollView>
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
    )
}

const styles = StyleSheet.create({
    Header: {
        paddingHorizontal: '4%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnBox: {
        width: "96%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    cardTextStyle: { fontSize: 14, color: colors.ligBlack, fontFamily: 'Nunito-Medium' },
    cardTextNumber: { fontSize: 14, color: colors.green, fontFamily: 'Nunito-Medium' }
})
export default HistoryScreen

const HistoryCardData = [
    { id: 1, limitType: 'Buy', price: '0.65748982', Quintity: '45,620.00', fees: '5,908.000' },
    { id: 2, limitType: 'Sell', price: '0.65748982', Quintity: '45,620.00', fees: '5,908.000' },
    { id: 3, limitType: 'Buy', price: '0.65748982', Quintity: '45,620.00', fees: '5,908.000' },
    { id: 4, limitType: 'Sell', price: '0.65748982', Quintity: '45,620.00', fees: '5,908.000' },
    { id: 5, limitType: 'Buy', price: '0.65748982', Quintity: '45,620.00', fees: '5,908.000' },
]
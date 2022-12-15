import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import DropDown from '../TradeScreen/DropDown'
import TradeCard from '../TradeScreen/TradeCard'
import Ionicons from 'react-native-vector-icons/Ionicons'
// import { createChart, CrosshairMode } from "lightweight-charts";
// import LineChart from 'react-native-responsive-linechart'

import { priceData } from './priceData'
import { volumeData } from './volumeData'


const ChartScreen = ({ navigation }) => {
    //Chart Data States 

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(1);
    const [items, setItems] = useState([
        { label: "BTC / INR", value: 1 }, { label: "BTC / USDT", value: 2 },
        { label: "BTC / ETH", value: 3 }]);
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

            <View style={{ height: 300 }} >
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
})

export default ChartScreen
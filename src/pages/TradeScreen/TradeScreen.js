import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useState, useCallback } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import TradeCard from './TradeCard'
import { colors } from '../../constants'
import Input from './Input'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import ReuseButton from '../reuseableComponents/Button'
import DropDown from './DropDown'
import { useFocusEffect } from '@react-navigation/native'
import { useEffect } from 'react'
import { availablePair, orderPlace, userToken } from '../../Apis'

const TradeScreen = ({ navigation, route }) => {
    const Btns = [{ btn: "Buy", clr: '#38B781' }, { btn: "Sell", clr: '#FF545E' }];
    const [selectedBtn, setSelectedBtn] = useState(0);
    const BuySell = [{ btn: "Limit" }, { btn: "Market" }, { btn: "Stop Loss" }, { btn: "IOC" }];
    const [checkBuySell, setcheckBuySell] = useState(0);
    const percentageBtn = [{ btn: "20%" }, { btn: "50%" }, { btn: "75%" }, { btn: "100%" }];
    const [percentage, setpercentage] = useState(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(1);
    const [items, setItems] = useState([{ label: "BTC / INR", value: 1 }, { label: "BTC / USDT", value: 2 }, { label: "BTC / ETH", value: 3 }, { label: "BTC / PROFY", value: 4 }]);
    const [apiResponse, setapiResponse] = useState([])
    const [pairSlected, setpairSlected] = useState('INR')
    const [userBalance, setuserBalance] = useState(10)
    const [userWalletAmount, setuserWalletAmount] = useState('')
    const [feeCalculation, setfeeCalculation] = useState([])
    const [amountCalculation, setamountCalculation] = useState(0)
    const [userAmount, setuserAmount] = useState("")
    const [fees, setfees] = useState()
    const [coinVolume, setcoinVolume] = useState("20")
    const currentCoinPrice = 2
    let BuySellFee = {}
    for (let index = 0; index < feeCalculation.length; index++) {
        const element = {
            BuyFess: feeCalculation[index].buy_fees,
            SellFess: feeCalculation[index].sell_fees
        };
        BuySellFee = element
    }
    useFocusEffect(
        useCallback(() => { route.params ? setSelectedBtn(route.params.Type) : setSelectedBtn(0) }, [])
    );
    useEffect(() => { getUserData(), getFees(), getUserWlletBalance() }, [])
    const priceFunction = (val) => {
        setuserAmount(val)
    }
    const ValueCoinPair = value == 1 ? 'INR' : value == 2 ? 'USDT' : value == 3 ? 'ETH' : value == 4 ? 'PROFY' : 'INR';

    const getUserData = async () => {
        setpairSlected(ValueCoinPair)
        try {
            let result = await fetch(availablePair + pairSlected, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${userToken}`,
                },
            });
            result = await result.json()
            setapiResponse(result.data.coins_list)
            // console.log('****************************', result.data.coins_list)
        } catch (error) {
            console.log('error', error)
        }
    }
    const getUserWlletBalance = async () => {
        try {
            let result = await fetch("https://www.proassetz.com/api/v1/public-market-data/BTC_INR/", {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            });
            result = await result.json()
            setuserWalletAmount(result.data)
            // console.log('**************************** setuserWalletAmount', result.data)
        } catch (error) {
            console.log('error', error)
        }
    }
    const getFees = async () => {
        try {
            let result = await fetch("https://www.proassetz.com/api/v1/wallet-fees/BTC", {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${userToken}`,
                },
            });
            result = await result.json()
            setfeeCalculation(result.results)
            // console.log('****************************Fees Api', result.results)
        } catch (error) {
            console.log('error', error)
        }
    }
    const sendUserData = async (sendData) => {
        console.log('************************selectedTYPE', sendData)
        // try {
        //     let result = await fetch(orderPlace, {
        //         method: 'POST',
        //         headers: {
        //             Accept: 'application/json',
        //             Authorization: `Bearer ${userToken}`,
        //         },
        //         body: JSON.stringify(sendData)
        //     })
        //     result = await result.json()
        //     console.log('******************PostData', result)
        // } catch (error) {
        //     console.log('error send Data', error)
        // }
    }

    const PercentageBar = () => (
        <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
            {percentageBtn.map((item, index) => (
                <TouchableOpacity key={index} style={{ backgroundColor: "rgba(44, 43, 43, 1)", width: 60, paddingVertical: 4, borderRadius: 4, alignSelf: 'center', borderColor: percentage == index ? '#E29224' : null, borderWidth: percentage == index ? .6 : 0 }} onPress={() => setpercentage(index)}>
                    <Text style={{ fontFamily: '600', fontSize: 14, fontFamily: 'Nunito-Medium', color: 'rgba(153, 166, 175, 0.5)', textAlign: 'center' }}>{item.btn}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )

    // console.log('useramount', userAmount)
    // percentage == 0 ? 20 : percentage == 1 ? 50 : percentage == 2 ? 75 : percentage == 3 ? 100 : percentage == null ? 0 : 20
    // console.log('****************************Fees', (500 / currentCoinPrice) * 20 / 100)
    const FeesBox = () => (
        <>
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%', alignSelf: 'center' }}>
                <Text style={{ fontWeight: '600', fontSize: 14, fontFamily: 'Nunito-Medium', color: 'rgba(153, 166, 175, 0.5)' }}>Available</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontFamily: '700', fontSize: 12, fontFamily: 'Nunito-Bold', color: 'rgba(247, 247, 247, 1)', marginRight: 10 }}>{userBalance} USDT</Text>
                    <AntDesign name='pluscircleo' size={12} color={'rgba(69, 152, 211, 1)'} />
                </View>
            </View>

            <View style={{ marginTop: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%', alignSelf: 'center' }}>
                <Text style={{ fontWeight: '600', fontSize: 14, fontFamily: 'Nunito-Medium', color: 'rgba(153, 166, 175, 0.5)' }}>Fees</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontFamily: '700', fontSize: 12, fontFamily: 'Nunito-Bold', color: 'rgba(92, 99, 104, 1)', marginRight: 10 }}>{BuySellFee.BuyFess}</Text>
                    <Feather name='help-circle' size={12} color={'rgba(226, 145, 37, 1)'} />
                </View>
            </View>
        </>
    )

    // const Limit = () => {
    //     let sendData = { order_type: selectedBtn == 0 ? 'BUY' : "SELL", order_category: "LIMIT", price: 0.001, amount: 10.02, trade_coin: pairSlected, pair_coin: "BTC" }
    //     return (<>
    //         <View style={{ width: '90%', alignSelf: "center", marginTop: 10 }}>
    //             <Text style={{ fontFamily: '600', fontSize: 16, marginLeft: 10, fontFamily: 'Nunito-Medium', color: 'rgba(153, 166, 175, 0.5)' }}>Volume</Text>
    //             <View style={{ marginTop: 6 }}>
    //                 <Input value={coinVolume} onChangeText={(e) => setcoinVolume(e)} Btn={"KLV"} />
    //             </View>
    //         </View>
    //         <View style={{ width: '90%', alignSelf: "center", marginTop: 10 }}>
    //             <Text style={{ fontFamily: '600', fontSize: 16, marginLeft: 10, fontFamily: 'Nunito-Medium', color: 'rgba(153, 166, 175, 0.5)' }}>Price</Text>
    //             <View style={{ marginTop: 6 }}>
    //                 <Input value={"0"} Btn={"USDT"} />
    //             </View>
    //         </View>
    //         <View style={{ width: '90%', alignSelf: "center", marginTop: 10 }}>
    //             <Text style={{ fontFamily: '600', fontSize: 16, marginLeft: 10, fontFamily: 'Nunito-Medium', color: 'rgba(153, 166, 175, 0.5)' }}>Currency</Text>
    //             <View style={{ marginTop: 6 }}>
    //                 <View
    //                     style={{ width: "100%", flexDirection: "row", alignItems: "center", borderWidth: .5, borderColor: "#99A6AF", alignSelf: "center", borderRadius: 5, height: 45, }}>
    //                     <TextInput style={{ width: "80%", color: colors.white, paddingLeft: 15, fontFamily: "Nunito-SemiBold" }}
    //                         // defaultValue={userAmount}
    //                         onChangeText={(val) => priceFunction(val)}
    //                     />
    //                     <Text style={{ textAlign: "center", width: "20%", color: "#99A6AF" }}>%</Text>
    //                 </View>
    //                 {/* <Input value={userAmount} Btn={"%"} onChangeText={(val) => priceFunction(val)} /> */}
    //                 {/* percentage == null ? "0.00" : percentage == 0 ? "20.00" : percentage == 1 ? "50.00" : percentage == 2 ? "75.00" : percentage == 3 ? "100.00"  */}
    //             </View>
    //         </View>
    //         <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
    //         {percentageBtn.map((item, index) => (
    //             <TouchableOpacity key={index} style={{ backgroundColor: "rgba(44, 43, 43, 1)", width: 60, paddingVertical: 4, borderRadius: 4, alignSelf: 'center', borderColor: percentage == index ? '#E29224' : null, borderWidth: percentage == index ? .6 : 0 }} onPress={() => setpercentage(index)}>
    //                 <Text style={{ fontFamily: '600', fontSize: 14, fontFamily: 'Nunito-Medium', color: 'rgba(153, 166, 175, 0.5)', textAlign: 'center' }}>{item.btn}</Text>
    //             </TouchableOpacity>
    //         ))}
    //     </View>
    //         {/* <FeesBox /> */}
    //         <TouchableOpacity style={{ marginTop: 26 }} activeOpacity={0.6} onPress={() => sendUserData(sendData)}>
    //             <ReuseButton text={selectedBtn == 0 ? 'BUY' : 'Sell'} width={'90%'} color={'rgba(255, 255, 255, 1)'} backgroundColor={selectedBtn == 0 ? 'rgba(56, 183, 129, 1)' : 'rgba(255, 84, 94, 1)'} />
    //         </TouchableOpacity>
    //     </>
    //     )
    // }



    // const Market = () => {
    //     let sendData = { order_type: selectedBtn == 0 ? 'BUY' : "SELL", order_category: "MARKET", price: 0.001, amount: 10.02, trade_coin: pairSlected, pair_coin: "BTC" }
    //     return (
    //         <View>
    //             <View style={{ width: '90%', alignSelf: "center", marginTop: 10 }}>
    //                 <Text style={{ fontFamily: '600', fontSize: 16, marginLeft: 10, fontFamily: 'Nunito-Medium', color: 'rgba(153, 166, 175, 0.5)' }}>Price</Text>
    //                 <View style={{ marginTop: 6 }}>
    //                     <Input />
    //                 </View>
    //             </View>
    //             <View style={{ width: '90%', alignSelf: "center", marginTop: 10 }}>
    //                 <Text style={{ fontFamily: '600', fontSize: 16, marginLeft: 10, fontFamily: 'Nunito-Medium', color: 'rgba(153, 166, 175, 0.5)' }}>Amount</Text>
    //                 <View style={{ marginTop: 6 }}>
    //                     <Input />
    //                 </View>
    //             </View>
    //             <PercentageBar />
    //             <FeesBox />
    //             <TouchableOpacity style={{ marginTop: 60 }} activeOpacity={0.6} onPress={() => sendUserData(sendData)}>
    //                 <ReuseButton text={selectedBtn == 0 ? 'BUY' : 'Sell'} width={'90%'} color={'rgba(255, 255, 255, 1)'} backgroundColor={selectedBtn == 0 ? 'rgba(56, 183, 129, 1)' : 'rgba(255, 84, 94, 1)'} />
    //             </TouchableOpacity>
    //         </View>
    //     )
    // }

    // const Stop_Loss = () => {
    //     let sendData = { order_type: selectedBtn == 0 ? 'BUY' : "SELL", order_category: "STOP_LOSS", price: 0.001, amount: 10.02, trade_coin: pairSlected, pair_coin: "BTC", stop_price: '0.10101' }
    //     return (<>
    //         <View style={{ width: '90%', alignSelf: "center", marginTop: 10 }}>
    //             <Text style={{ fontFamily: '600', fontSize: 16, marginLeft: 10, fontFamily: 'Nunito-Medium', color: 'rgba(153, 166, 175, 0.5)' }}>Volume</Text>
    //             <View style={{ marginTop: 6 }}>
    //                 <Input value={"65.56"} Btn={"KLV"} />
    //             </View>
    //         </View>
    //         <View style={{ width: '90%', alignSelf: "center", marginTop: 10 }}>
    //             <Text style={{ fontFamily: '600', fontSize: 16, marginLeft: 10, fontFamily: 'Nunito-Medium', color: 'rgba(153, 166, 175, 0.5)' }}>Price</Text>
    //             <View style={{ marginTop: 6 }}>
    //                 <Input value={"0"} Btn={"USDT"} />
    //             </View>
    //         </View>
    //         <View style={{ width: '90%', alignSelf: "center", marginTop: 10 }}>
    //             <Text style={{ fontFamily: '600', fontSize: 16, marginLeft: 10, fontFamily: 'Nunito-Medium', color: 'rgba(153, 166, 175, 0.5)' }}>Currency</Text>
    //             <View style={{ marginTop: 6 }}>
    //                 <Input value={percentage == 0 ? "20.00" : percentage == 1 ? "50.00" : percentage == 2 ? "75.00" : percentage == 3 ? "100.00" : "0.00"} Btn={"%"} />
    //             </View>
    //         </View>
    //         <PercentageBar />
    //         <FeesBox />
    //         <TouchableOpacity style={{ marginTop: 26 }} activeOpacity={0.6} onPress={() => sendUserData(sendData)}>
    //             <ReuseButton text={selectedBtn == 0 ? 'BUY' : 'Sell'} width={'90%'} color={'rgba(255, 255, 255, 1)'} backgroundColor={selectedBtn == 0 ? 'rgba(56, 183, 129, 1)' : 'rgba(255, 84, 94, 1)'} />
    //         </TouchableOpacity>
    //     </>
    //     )
    // }

    // const IOC = () => {
    //     let sendData = { order_type: selectedBtn == 0 ? 'BUY' : "SELL", order_category: "IOC", price: 0.001, amount: 10.02, trade_coin: pairSlected, pair_coin: "BTC" }
    //     return (
    //         <>
    //             <View style={{
    //                 flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'center', width
    //                     : '86%', marginTop: 16
    //             }}>
    //                 <View>
    //                     <Text style={{ fontWeight: '600', fontSize: 16, fontFamily: 'Nunito-Medium', color: 'rgba(153, 166, 175, 0.5)' }}>Ask</Text>
    //                     <Text style={{ fontWeight: '700', fontSize: 14, fontFamily: 'Nuntio-Bold', color: 'rgba(255, 84, 94, 1)' }}>24,674.00</Text>
    //                 </View>
    //                 <View>
    //                     <Text style={{ fontWeight: '600', fontSize: 16, fontFamily: 'Nunito-Medium', color: 'rgba(153, 166, 175, 0.5)' }}>Bid</Text>
    //                     <Text style={{ fontWeight: '700', fontSize: 14, fontFamily: 'Nuntio-Bold', color: 'rgba(56, 183, 129, 1)' }}>34,567.00</Text>
    //                 </View>
    //             </View>
    //             <View style={{ width: '90%', alignSelf: "center", marginTop: 10 }}>
    //                 <Text style={{ fontFamily: '600', fontSize: 16, marginLeft: 10, fontFamily: 'Nunito-Medium', color: 'rgba(153, 166, 175, 0.5)' }}>Price</Text>
    //                 <View style={{ marginTop: 6 }}>
    //                     <Input value={"0"} Btn={"USDT"} />
    //                 </View>
    //             </View>
    //             <View style={{ width: '90%', alignSelf: "center", marginTop: 10 }}>
    //                 <Text style={{ fontFamily: '600', fontSize: 16, marginLeft: 10, fontFamily: 'Nunito-Medium', color: 'rgba(153, 166, 175, 0.5)' }}>Currency</Text>
    //                 <View style={{ marginTop: 6 }}>
    //                     <Input value={percentage == 0 ? "20.00" : percentage == 1 ? "50.00" : percentage == 2 ? "75.00" : percentage == 3 ? "100.00" : "0.00"} Btn={"%"} />
    //                 </View>
    //             </View>
    //             <PercentageBar />
    //             <FeesBox />
    //             <TouchableOpacity style={{ marginTop: 26 }} activeOpacity={0.6} onPress={() => sendUserData(sendData)}>
    //                 <ReuseButton text={selectedBtn == 0 ? 'BUY' : 'Sell'} width={'90%'} color={'rgba(255, 255, 255, 1)'} backgroundColor={selectedBtn == 0 ? 'rgba(56, 183, 129, 1)' : 'rgba(255, 84, 94, 1)'} />
    //             </TouchableOpacity>
    //         </>
    //     )
    // }

    const SelectCategory = (param) => {
        switch (param) {
            case 0:
                return (
                    <>
                        <View style={{ width: '90%', alignSelf: "center", marginTop: 10 }}>
                            <Text style={{ fontFamily: '600', fontSize: 16, marginLeft: 10, fontFamily: 'Nunito-Medium', color: 'rgba(153, 166, 175, 0.5)' }}>Volume</Text>
                            <View style={{ marginTop: 6 }}>
                                <Input value={coinVolume} onChangeText={(e) => setcoinVolume(e)} Btn={"KLV"} />
                            </View>
                        </View>
                        <View style={{ width: '90%', alignSelf: "center", marginTop: 10 }}>
                            <Text style={{ fontFamily: '600', fontSize: 16, marginLeft: 10, fontFamily: 'Nunito-Medium', color: 'rgba(153, 166, 175, 0.5)' }}>Price</Text>
                            <View style={{ marginTop: 6 }}>
                                <Input value={"0"} Btn={"USDT"} />
                            </View>
                        </View>
                        <View style={{ width: '90%', alignSelf: "center", marginTop: 10 }}>
                            <Text style={{ fontFamily: '600', fontSize: 16, marginLeft: 10, fontFamily: 'Nunito-Medium', color: 'rgba(153, 166, 175, 0.5)' }}>Currency</Text>
                            <View style={{ marginTop: 6 }}>
                                <Input value={percentage == null ? "0.00" : percentage == 0 ? "20.00" : percentage == 1 ? "50.00" : percentage == 2 ? "75.00" : percentage == 3 ? "100.00" : userAmount} Btn={"%"} onChangeText={(val) => priceFunction(val)} />
                            </View>
                        </View>
                        <PercentageBar />
                        <FeesBox />
                        <TouchableOpacity style={{ marginTop: 26 }} activeOpacity={0.6} onPress={() => sendUserData(sendData)}>
                            <ReuseButton text={selectedBtn == 0 ? 'BUY' : 'Sell'} width={'90%'} color={'rgba(255, 255, 255, 1)'} backgroundColor={selectedBtn == 0 ? 'rgba(56, 183, 129, 1)' : 'rgba(255, 84, 94, 1)'} />
                        </TouchableOpacity>
                    </>
                )
            // case 1:
            //     return (
            //         <Market />
            //     )
            // case 2:
            //     return (
            //         <Stop_Loss />
            //     )
            // case 3:
            //     return (
            //         <IOC />
            //     )
            default:
                {
                    break;
                }
        }
    }

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
                    onChangeValue={() => { getUserData() }}
                />
            </View>
            {/* ************************percentChange**************************** */}
            <Text style={{ marginTop: -4, fontSize: 12, fontFamily: 'Nunito-Bold', color: 'rgba(56, 183, 129, 1)', width: '70%', alignSelf: 'center' }}>{userWalletAmount.percentChange}</Text>
            <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>

                <View style={{ marginTop: 15 }}>
                    {apiResponse.map((item) => (<>
                        {item.trade_coin == pairSlected && (<TradeCard change_amount={item.trade_data.ltp} ltp_in_usd={userWalletAmount.ltp_in_usd} high24hr={item.trade_data.high24hr} low24hr={item.trade_data.low24hr} total24hrVolume={item.trade_data.total24hrVolume} Change24hr={item.trade_data.percentChange24hours} />)}
                    </>))}
                </View>
                <View style={styles.btnContainer}>
                    {Btns.map((item, index) => (
                        <TouchableOpacity key={index} activeOpacity={0} style={{ width: "50%" }} onPress={() => setSelectedBtn(index)} >
                            <View style={[styles.btnbox, { backgroundColor: selectedBtn == index ? item.clr : '#2C2B2B', }]} >
                                <Text style={styles.btntxt}>{item.btn}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={{ flexDirection: 'row', width: '86%', alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                    {BuySell.map((item, index) => (
                        <TouchableOpacity key={index} activeOpacity={0.6} onPress={() => { setcheckBuySell(index) }} >
                            <Text style={[{ color: colors.white, fontSize: 14, fontWeight: '600', fontFamily: 'Nunito-Medium', paddingHorizontal: 5, paddingBottom: 4 }, checkBuySell == index && { borderBottomColor: '#E29224', borderBottomWidth: 1.5, borderRadius: 1, }]}>{item.btn}</Text>
                        </TouchableOpacity>))}
                </View>
                {SelectCategory(checkBuySell)}
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    Header: {
        paddingHorizontal: '4%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    mainContainer: { backgroundColor: colors.bgColor, flex: 1 },
    btnContainer: {
        flexDirection: "row",
        width: "90%",
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: '#2C2B2B',
        // backgroundColor: colors.lightgrey,
        borderRadius: 5,
        marginTop: 16,
    },
    btntxt: {
        fontFamily: "Nunito-Bold",
        fontSize: 14,
        color: colors.white,
    },
    btnbox: {
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 5,
    },

})
export default TradeScreen
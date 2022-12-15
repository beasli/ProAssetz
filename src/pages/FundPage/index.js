import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React from 'react'
import SmallCard from '../reuseableComponents/SmallCard'
import ReuseCard from '../reuseableComponents/ReuseCard'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { colors } from '../../constants'

const FundPage = ({ navigation }) => {

    return (
        <View style={{ flex: 1, backgroundColor: '#212121' }}>
            {/* <View style={{ flexDirection: 'row', paddingVertical: 10, paddingHorizontal: '2%' }}>
                <TouchableOpacity style={{ width: '10%' }} onPress={() => navigation.goBack()}>
                    <Ionicons name={'chevron-back'} size={23} color={'#B3B3B3'} />
                </TouchableOpacity>
                <Text style={styles.Header}>Our Portfolio</Text>
            </View> */}
            <View style={styles.headerBox}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name={"chevron-back"} size={23} color={colors.greytxt} />
                </TouchableOpacity>
                <Text
                    style={{
                        fontFamily: "Montserrat-SemiBold",
                        color: "#B3B3B3",
                        fontSize: 17,
                    }}
                >
                    Our Portfolio
                </Text>
                <Text style={{ width: "10%" }}></Text>
            </View>


            <View style={{ marginVertical: 10, alignSelf: 'center' }}>
                <Text style={{ fontSize: 14, fontWeight: '600', fontFamily: 'Nunito-Bold', color: '#FFF6E0', textAlign: 'center' }}>Invested Value</Text>
                <Text style={{ fontSize: 24, fontWeight: '800', fontFamily: 'Nunito-Bold', color: '#FFF6E0' }}>₹ 31,77,9051</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: '4%', marginTop: 10 }}>
                <View style={{
                    backgroundColor: '#0B0B0B', borderRadius: 6, width: 140, height: 65, paddingTop: 10, shadowColor: "#B3B3B3",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.23,
                    shadowRadius: 2.62,
                    elevation: 4,
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#878787', fontSize: 14, fontWeight: '600', fontFamily: 'Nunito-Medium' }}>Current Value</Text>
                        <Feather name='help-circle' size={12} color={'#E29125'} style={{ marginLeft: 2 }} />
                    </View>
                    <Text style={{ color: '#FFE6AD', fontSize: 16, fontWeight: '600', textAlign: 'center', marginTop: 4 }}>₹ 31,77,9051</Text>
                </View>


                <View style={{
                    backgroundColor: '#0B0B0B', borderRadius: 6, width: 140, height: 65, paddingTop: 10, shadowColor: "#B3B3B3",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.23,
                    shadowRadius: 2.62,
                    elevation: 4,
                }}>
                    <Text style={{ color: '#878787', fontSize: 14, fontWeight: '600', fontFamily: 'Nunito-Medium', textAlign: 'center' }}>Profit & Loss</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <AntDesign name='caretup' size={16} color={'#38C976'} style={{ marginTop: 8, marginRight: 2 }} />
                        <Text style={{ color: '#FFE6AD', fontSize: 16, fontWeight: '600', textAlign: 'center', marginTop: 4 }}>100%</Text>
                    </View>
                </View>
            </View>

            <View style={{ width: '96%', alignSelf: 'center', marginTop: 20 }}>
                <SmallCard source={require("../../../assets/IndRup.png")} Name={'INR'} Invested={'Invested'} Price={'₹ 0.00000'} AvilableBalance={true} Balance={'$ 32,543'} Qty={'0.000160'} TextColor={'#FFFFFF'} Interest={'₹ 32,543'} Show={false} CardHeight={110} />
            </View>

            <View style={{ marginVertical: 14 }}>
                <Text style={{ fontSize: 20, fontWeight: '600', fontFamily: 'Montserrat-Medium', color: '#FFF6E0', textAlign: 'center' }}>Crypto Assets</Text>
            </View>

            <ScrollView contentContainerStyle={{ marginHorizontal: '2%', paddingTop: 4 }} showsVerticalScrollIndicator={false}>
                <ReuseCard />
            </ScrollView>
        </View >
    )
}
const styles = StyleSheet.create({

    headerBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 18,
        paddingHorizontal: 5,
    },
})

export default FundPage
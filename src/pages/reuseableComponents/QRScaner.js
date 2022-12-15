import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import CrossIcon from "react-native-vector-icons/AntDesign";
import ReuseButton from './Button';


const QRScaner = ({ close }) => {
    return (
        <View style={{ backgroundColor: '#111111', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingBottom: 20 }}>
            <View style={{ flexDirection: "row", marginTop: 16, alignItems: "center", justifyContent: 'space-between', marginHorizontal: '7%' }}>
                <Text style={{
                    color: "#B3B3B3",
                    fontFamily: "Nunito-Medium",
                    fontWeight: '600',
                    fontSize: 14
                }} >Deposite BTC</Text>
                <TouchableOpacity onPress={close}>
                    <CrossIcon name="close" size={22} color={"#B3B3B3"} />
                </TouchableOpacity>
            </View>
            <Image source={require('../../../assets/QrCode.png')} style={{ width: '70%', height: 120, marginVertical: 20, alignSelf: 'center' }} resizeMode={'contain'} />
            <View>
                <Text style={{
                    width: "85%",
                    alignSelf: "center",
                    color: "#878787",
                    fontSize: 12,
                    fontFamily: "Nunito-Medium",
                }}>Wallet Address</Text>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 6, alignItems: 'center', justifyContent: 'space-between', marginHorizontal: '8%', paddingBottom: 16 }}>
                <View style={{ backgroundColor: '#424141', height: 40, width: '80%', paddingHorizontal: 14, borderRadius: 2, justifyContent: 'space-between', alignContent: 'center', flexDirection: 'row', alignSelf: 'center' }}>
                    <View style={{ width: '60%', height: 40, justifyContent: 'center' }}>
                        {/* <Text style={{ fontSize: 14, fontWeight: '600', fontFamily: 'Nunito-Bold', color: '#FFF6E0' }}>7HFJHIO</Text> */}
                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.6} style={{ height: 40, backgroundColor: '#FFB916', paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                    <Image source={require('../../../assets/copyIcon.png')} style={{ width: 20, height: 20 }} resizeMode={'contain'} />
                </TouchableOpacity>
            </View>
            <View style={{ marginVertical: 16 }}>
                <ReuseButton text={'Send'} backgroundColor={'#FFB916'} width={'84%'} color={'#473200'} />
            </View>
        </View>
    )
}

export default QRScaner
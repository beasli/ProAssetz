import { View, Text, Image, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { colors } from '../../constants'
const TopGainerCard = (props) => {
    // const DataTransfer = [
    //     { id: 1, img: require('../../../assets/Ether.png'), name: 'BTC', subName: 'Bitcoin', coinAmount: '31,977,55,00', coinPercent: '10' },
    //     { id: 2, img: require('../../../assets/Ether.png'), name: 'BTC', subName: 'Bitcoin', coinAmount: '31,977,55,00', coinPercent: '10' },
    //     { id: 3, img: require('../../../assets/Ether.png'), name: 'BTC', subName: 'Bitcoin', coinAmount: '31,977,55,00', coinPercent: '10' },
    //     { id: 4, img: require('../../../assets/Ether.png'), name: 'BTC', subName: 'Bitcoin', coinAmount: '31,977,55,00', coinPercent: '10' }
    // ]
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.ScrollView}>
            {props.DataTransfer.map((item, index) => (
                <View key={index} style={[styles.mainBox, { borderColor: props.type == 'high' ? '#38C976' : '#FF2626' }]} >
                    <View style={styles.ImgSection}>
                        <Image source={item.img} resizeMode={'contain'} style={styles.ImgStyle} />
                        <View style={{ marginLeft: 3 }}>
                            <Text style={styles.coinTitle}>{item.name}</Text>
                            <Text style={styles.coinSubTitle}>{item.subName}</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: 6 }}>
                        <Text style={styles.coinAmount}>{item.coinAmount}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center' }}>
                            <AntDesign name={props.type == 'high' ? 'caretup' : 'caretdown'} size={10} style={{ color: props.type == 'high' ? '#38C976' : '#FF2626' }} />
                            <Text style={[styles.coinPercentage, { color: props.type == 'high' ? '#38C976' : '#FF2626' }]}>{item.coinPercent}%</Text>
                        </View>
                    </View>
                </View>))}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    ScrollView: { height: 120, alignItems: 'center' },
    mainBox: { borderWidth: 1, borderRadius: 6, width: 120, height: 110, backgroundColor: '#3B3B3B', paddingTop: 20, marginRight: 10, marginLeft: 4, zIndex: 1, elevation: 4, },
    ImgSection: { flexDirection: 'row', marginLeft: 4 },
    ImgStyle: { width: 40, height: 40 },
    coinTitle: { color: colors.lightWhitre, fontFamily: 'Nunito-Bold', fontWeight: '800', fontSize: 12 },
    coinSubTitle: { color: colors.lightWhitre, fontFamily: 'Nunito-Regular' },
    coinAmount: { color: colors.lightWhitre, fontFamily: 'Nunito-Medium', fontWeight: '800', fontSize: 12, },
    coinPercentage: { fontFamily: 'Nunito-Medium', fontWeight: '600', fontSize: 10, marginLeft: '4%' }
})
export default TopGainerCard



// import { View, Text, Image, ScrollView, FlatList } from 'react-native'
// import React from 'react'
// import AntDesign from 'react-native-vector-icons/AntDesign'
// import { colors } from '../../constants'

// const TopGainerCard = () => {
//     const DataTransfer = [
//         { id: 1, img: require('../../../assets/Ether.png'), name: 'BTC', subName: 'Bitcoin', coinAmount: '31,977,55,00', coinPercent: '10' },
//         { id: 2, img: require('../../../assets/Ether.png'), name: 'BTC', subName: 'Bitcoin', coinAmount: '31,977,55,00', coinPercent: '10' },
//         { id: 3, img: require('../../../assets/Ether.png'), name: 'BTC', subName: 'Bitcoin', coinAmount: '31,977,55,00', coinPercent: '10' },
//         { id: 4, img: require('../../../assets/Ether.png'), name: 'BTC', subName: 'Bitcoin', coinAmount: '31,977,55,00', coinPercent: '10' }
//     ]
//     return (
//         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ height: 120, alignItems: 'center' }}>
//             {props.DataTransfer.map((item, index) => (
//                 <View key={index} style={{ borderColor: 'green', borderWidth: 1.6, borderRadius: 6, width: 130, height: 110, backgroundColor: '#3B3B3B', paddingTop: 20, marginRight: 10, marginLeft: 4, zIndex: 1, elevation: 2 }} >
//                     <View style={{ flexDirection: 'row', marginLeft: 4 }}>
//                         <Image source={item.img} resizeMode={'contain'} style={{ width: 40, height: 40 }} />
//                         <View style={{ marginLeft: 4 }}>
//                             <Text style={{ color: colors.lightWhitre, fontFamily: 'Nunito-Bold', fontWeight: '800', fontSize: 12 }}>{item.name}</Text>
//                             <Text style={{ color: colors.lightWhitre, fontFamily: 'Nunito-Regular' }}>{item.subName}</Text>
//                         </View>
//                     </View>
//                     <View style={{ marginLeft: 6 }}>
//                         <Text style={{ color: colors.lightWhitre, fontFamily: 'Nunito-Medium', fontWeight: '800', fontSize: 12, }}>{item.coinAmount}</Text>
//                         <View style={{ flexDirection: 'row', marginTop: '1.5%', alignItems: 'center' }}>
//                             <AntDesign name='caretup' size={10} style={{ color: '#38C976' }} />
//                             <Text style={{ color: '#38C976', fontFamily: 'Nunito-Medium', fontWeight: '600', fontSize: 10, marginLeft: '4%' }}>{item.coinPercent}%</Text>
//                         </View>
//                     </View>
//                 </View>))}
//         </ScrollView>
//     )
// }

// export default TopGainerCard
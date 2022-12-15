import { View, Text, TouchableOpacity, Dimensions, Image, ScrollView, Share, StatusBar, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React from 'react'
import TopGainerCard from '../reuseableComponents/TopGainerCard'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ReuseButton from '../reuseableComponents/Button'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import CardMain from '../reuseableComponents/CardMain'
import BtcInput from '../reuseableComponents/BtcInput'
import { useState } from 'react'
import CollapseList from '../reuseableComponents/CollapseList'
import Clipboard from '@react-native-clipboard/clipboard';
import WatchList from '../reuseableComponents/WatchList'
import RecentInsights from '../reuseableComponents/RecentInsights'
import Modal from 'react-native-modal'
import LogoutModal from '../reuseableComponents/LogoutModal'

const Home = ({ navigation }) => {
    const DataTransfer = [
        { id: 1, img: require('../../../assets/Ether.png'), name: 'BTC', subName: 'Bitcoin', coinAmount: '31,977,55,00', coinPercent: '10' },
        { id: 2, img: require('../../../assets/dogecoin.png'), name: 'BTC', subName: 'Bitcoin', coinAmount: '31,977,55,00', coinPercent: '10' },
        { id: 3, img: require('../../../assets/Ether.png'), name: 'BTC', subName: 'Bitcoin', coinAmount: '31,977,55,00', coinPercent: '10' },
        { id: 4, img: require('../../../assets/dogecoin.png'), name: 'BTC', subName: 'Bitcoin', coinAmount: '31,977,55,00', coinPercent: '10' }
    ]
    const DataList = [
        { id: 1, img: require('../../../assets/Rectangle.png'), },
        { id: 2, img: require('../../../assets/Rectangle.png'), },
        { id: 3, img: require('../../../assets/Rectangle.png'), },
    ];
    const ButtonPercentage = [
        { id: 1, text: '25%' }, { id: 2, text: '50%' }, { id: 3, text: '75%' }, { id: 4, text: '100%' }
    ]
    const [percentSelected, setpercentSelected] = useState(0)
    const [showCrypto, setshowCrypto] = useState(true)
    const [modalVisible, setmodalVisible] = useState(false);
    const [visible, setvisible] = useState(true)
    const [profileBox, setprofileBox] = useState(false)
    const copyToClipboard = () => {
        Clipboard.setString('7HFJHIO');
        alert('Copy text: 7HFJHIOs')
    };

    const { width, height } = Dimensions.get("window");
    const DataStyle = ({ item }) => (
        <View style={{ width: width, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={item.img} resizeMode={"contain"} style={{ width: '100%', height: "100%", alignSelf: 'center' }} />
        </View>

    )
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    '7HFJHIO',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={{ backgroundColor: '#212121', flex: 1, padding: 8 }}>
            <StatusBar barStyle={'light-content'} backgroundColor={'#212121'} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#3A9DF8', height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 16, fontWeight: '900', color: '#FFFFFF', fontFamily: 'Nunito-Bold' }}>K</Text></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: '700', fontFamily: 'Montserrat-Bold', color: '#FFF6E0', marginLeft: 10 }}>Hello,</Text>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => setprofileBox(true)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: '700', fontFamily: 'Montserrat-Bold', color: '#FFB916', marginLeft: 8 }}>Karan</Text>
                            <AntDesign name='caretdown' size={15} color={'#FFB916'} style={{ marginLeft: 8 }} />
                        </TouchableOpacity>
                    </View>


                    {/* Drop Down Profile or LogOut */}
                    {profileBox == true ?
                        <Modal transparent={true} visible={profileBox} coverScreen={true} onBackdropPress={() => setprofileBox(false)}>
                            {/* <TouchableWithoutFeedback style={[StyleSheet.absoluteFill, { zIndex: 1 }]} onPress={() => { setprofileBox(false) }}> */}
                            <View style={{ flex: 1 }}>
                                <View style={{ backgroundColor: '#111111', width: 120, height: 90, borderRadius: 5, marginLeft: '22%', marginTop: '10%', zIndex: 1, justifyContent: 'center', borderColor: '#fff6E0', borderWidth: .5 }} >
                                    <TouchableOpacity style={{ marginVertical: 2, paddingVertical: 6, paddingHorizontal: 10 }} onPress={() => { navigation.navigate('ProfileSetting'), setprofileBox(false) }}>
                                        <Text style={{ color: '#fff6E0', fontSize: 12, fontWeight: '600', fontFamily: 'Nunito-Bold' }}>Profile Setting</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginVertical: 2, paddingVertical: 6, paddingHorizontal: 10 }} onPress={() => setmodalVisible(true)}>
                                        <Text style={{ color: '#fff6E0', fontSize: 12, fontWeight: '600', fontFamily: 'Nunito-Bold' }}>Log Out</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/* </TouchableWithoutFeedback> */}
                        </Modal>
                        : null}
                </View>

                <View style={{
                    marginHorizontal: '4%', marginTop: 30, borderRadius: 6, borderColor: '#545454', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 10
                }}>
                    <Text style={{ fontSize: 20, fontWeight: '600', color: '#FFF6E0', fontFamily: 'Nunito-Regular' }}>you are ready to add your funds</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#878787', fontFamily: 'Nunito-Regular', marginTop: 2 }}>Do your </Text>
                    <View style={{ marginTop: 24 }}>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate('FundPage') }}>
                            <ReuseButton text={'Add Funds'} color={'#473200'} backgroundColor={'#FFB916'} width={'66%'} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginTop: 30, height: 140, alignItems: 'center', justifyContent: 'center' }}>
                    <SwiperFlatList
                        // autoplay
                        style={{ width: width }}
                        // autoplayLoop
                        data={DataList}
                        renderItem={DataStyle}
                        showPagination
                        paginationActiveColor={'#FFA629'}
                        paginationStyleItemActive={{ width: 6, height: 6 }}
                        paginationStyleItemInactive={{ width: 6, height: 6, color: "#473200" }}
                        paginationStyleItem={{ marginHorizontal: "1%" }}
                    />
                </View>


                {/* <View style={{}}> */}
                <CardMain Show={() => { setvisible(false), setshowCrypto(false) }} visible={visible} />
                {showCrypto == false ? <CollapseList Show={() => { setvisible(true), setshowCrypto(true) }} /> : null}


                <View style={{ marginTop: 30 }}>
                    <WatchList />
                </View>

                {/* </View> */}
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: '600', color: '#FFF6E0', fontFamily: 'Montserrat-Bold' }}>Swap Crypto</Text>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 12, fontWeight: '600', fontFamily: 'Nunito-Regular', color: '#878787' }}>I have BTC</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <BtcInput txt={'BTC'} />
                    </View>
                    <View style={{ marginHorizontal: 8, marginTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 12, fontWeight: '600', fontFamily: 'Nunito-Bold', color: '#878787' }}>Fees :<Text style={{ fontSize: 12, fontWeight: '800', fontFamily: 'Nunito-Bold', color: '#FFA629' }}> 0.00</Text></Text>

                        <Text style={{ fontSize: 12, fontWeight: '600', fontFamily: 'Nunito-Bold', color: '#878787' }}>Total Amount :<Text style={{ fontSize: 12, fontWeight: '800', fontFamily: 'Nunito-Bold', color: '#FFA629' }}> 0.00</Text></Text>
                    </View>

                    <View>
                        <View style={{ marginVertical: 10 }}>
                            <View style={{ flexDirection: 'row', marginHorizontal: 8, alignItems: 'center', justifyContent: 'space-between', marginTop: 16, height: 1, backgroundColor: '#FFA629' }}>
                                {ButtonPercentage.map((item, index) => (
                                    <TouchableOpacity style={[{ width: 16, height: 16, backgroundColor: '#FFA629', borderRadius: 8, }, percentSelected == index && { width: 16, height: 16, borderRadius: 8, backgroundColor: '#FFF6E0', alignItems: 'center', justifyContent: 'center' }]} activeOpacity={0.6} onPress={() => { setpercentSelected(index) }}>
                                        <View style={{ backgroundColor: '#FFA629', borderRadius: 6, width: 12, height: 12 }} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={{ flexDirection: 'row', marginHorizontal: 8, alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
                                <View>
                                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#878787', fontFamily: 'Nunito-Medium' }}>25%</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#878787', fontFamily: 'Nunito-Medium' }}>50%</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#878787', fontFamily: 'Nunito-Medium' }}>75%</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#878787', fontFamily: 'Nunito-Medium' }}>100%</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 16 }}>
                            <Text style={{ fontSize: 14, fontWeight: '600', fontFamily: 'Nunito-Bold', color: '#FFF6E0' }}>1 BTC : <Text style={{ fontSize: 14, fontWeight: '800', fontFamily: 'Nunito-Bold', color: '#FFA629' }}>37,4567.00</Text></Text>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <BtcInput txt={'ETH'} />
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <TouchableOpacity>
                                <ReuseButton text={'Swap'} color={'#473200'} backgroundColor={'#FFB916'} width={'97%'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ marginVertical: 30 }}>
                    <Text style={{ fontSize: 20, fontWeight: '600', fontFamily: 'Montserrat-Bold', color: '#FFF6E0' }}>Top Gainer</Text>
                </View>
                <TopGainerCard DataTransfer={DataTransfer} img={DataTransfer.img} type={'high'} />

                <View style={{ marginVertical: 30 }}>
                    <Text style={{ fontSize: 20, fontWeight: '600', fontFamily: 'Montserrat-Bold', color: '#FFF6E0' }}>Top Loser</Text>
                </View>
                <TopGainerCard DataTransfer={DataTransfer} img={DataTransfer.img} />

                <View style={{
                    marginHorizontal: '4%', marginTop: 30, borderRadius: 6, borderColor: '#545454', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 10, marginBottom: 10
                }}>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFF6E0', fontFamily: 'Montserrat-Medium' }}>Invite Friends & <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFB916', fontFamily: 'Montserrat-Medium' }}>Start Earning</Text></Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#878787', fontFamily: 'Nunito-Regular', marginTop: 2 }}>invite a frind to Proassetz and enjoy a lifetime of{'\n'}earnings from their activity. Copy <Text style={{ fontSize: 14, fontWeight: '800', color: '#FFFFFF', fontFamily: 'Nunito-Bold', marginTop: 2 }}>reff code</Text> from{'\n'}below or share directly.<View></View> </Text>
                        <View style={{ marginTop: 24 }}>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#424141', height: 40, width: '80%', marginBottom: 10, paddingHorizontal: 14, borderRadius: 2, justifyContent: 'center', alignContent: 'center', flexDirection: 'row' }}>
                        <View style={{ width: '60%', height: 40, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 14, fontWeight: '600', fontFamily: 'Nunito-Bold', color: '#FFF6E0' }}>7HFJHIO</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', width: 36, }}>
                            <TouchableOpacity activeOpacity={0.6} style={{ alignSelf: 'center' }} onPress={() => { copyToClipboard() }}>
                                <AntDesign name='copy1' size={20} color={'#878787'} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.6} style={{ alignSelf: 'center', marginLeft: 8 }} onPress={() => { onShare() }}>
                                <AntDesign name='sharealt' size={20} color={'#878787'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ marginVertical: 30 }}>
                    <Text style={{ fontSize: 20, fontWeight: '600', fontFamily: 'Montserrat-Bold', color: '#FFF6E0' }}>Recent Insights</Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <RecentInsights />
                </View>

            </ScrollView>
            <Modal
                visible={modalVisible}
                animationType="none"
                onBackdropPress={() => setmodalVisible(false)}
                coverScreen={true}
                transparent={true}
                onRequestClose={() => {
                    setmodalVisible(false);
                }}
            >
                <LogoutModal onPress={() => setmodalVisible(false)} />
            </Modal>
        </View>
    )
}

export default Home
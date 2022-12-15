import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'

const RecentInsights = () => {
    const DataInsights = [
        { id: 1, img: require('../../../assets/RectangleBlog.png') },
        { id: 2, img: require('../../../assets/RectangleBlog.png') },
        { id: 3, img: require('../../../assets/RectangleBlog.png') },
    ]
    return (
        <View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ height: 330, alignItems: 'center' }}>
                {DataInsights.map(() => (
                    <View style={{ backgroundColor: '#212121', borderWidth: .2, borderColor: 'white', borderRadius: 4, width: 220, height: 320, marginRight: 20 }}>
                        <Image source={require('../../../assets/RectangleBlog.png')} style={{ width: 220, height: 140 }} resizeMode={'contain'} />
                        <View style={{ paddingLeft: 10, marginTop: 16 }}>
                            <Text style={{ color: '#FFF6E0', fontSize: 16, fontWeight: '800', fontFamily: 'Nunito-Bold' }}>What is Crypto ?</Text>
                        </View>
                        <View style={{ paddingLeft: 10, marginTop: 14 }}>
                            <Text style={{ color: '#878787', fontSize: 12, fontWeight: '600', fontFamily: 'Nunito-Medium' }}>Letraset sheets containing Lorem{'\n'}Ipsum passages,passages .</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end', marginBottom: 10, marginRight: 10 }}>
                            <Text style={{ color: '#878787', fontSize: 16, fontWeight: '800', fontFamily: 'Nunito-Bold' }}>Read More  {'>'}</Text>
                        </View>
                    </View>))}
            </ScrollView>
        </View>
    )
}

export default RecentInsights
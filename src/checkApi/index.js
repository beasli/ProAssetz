// import { View, Text, TouchableOpacity } from 'react-native'
// import React from 'react'
// import { useState } from 'react'
// import { useEffect } from 'react'
// import TradeCard from '../pages/TradeScreen/TradeCard'

// const CheckApi = () => {
//     const [value, setValue] = useState('')
//     const [apiResponse, setapiResponse] = useState([])
//     var userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbmlnb3N3YW1pMTMzQGdtYWlsLmNvbSIsImV4cCI6MTY3MjQ3OTA3MSwib3JpZ19pYXQiOjE2Njk4OTkwNzEsImVtYWlsIjoiU2hpdmFuaWdvc3dhbWkxMzNAZ21haWwuY29tIiwidXNlcl9pZCI6MTIxNn0.0KDoGdFH0ZBJeWhZsyJFU3oyi179AUrbYH_fjqJIWdM"


//     const getUserData = async () => {
//         try {
//             let result = await fetch("https://www.proassetz.com/api/v1/view-available-pair/" + value, {
//                 method: 'GET',
//                 headers: {
//                     Accept: 'application/json',
//                     Authorization: `Bearer ${userToken}`,
//                 },
//             });
//             result = await result.json()
//             setapiResponse(result.data.coins_list)
//             console.log('**************************', result.data.coins_list)
//         } catch (error) {
//             console.log('error', error)
//         }
//     }
//     return (
//         <View>
//             <Text>Select Pair</Text>
//             <TouchableOpacity onPress={() => setValue('INR') + getUserData()} style={{ marginLeft: 10, marginVertical: 10 }}><Text>INR</Text></TouchableOpacity>
//             <TouchableOpacity onPress={() => setValue('USDT') + getUserData()} style={{ marginLeft: 10, marginVertical: 10 }}><Text>USDT</Text></TouchableOpacity>
//             <TouchableOpacity onPress={() => setValue('ETH') + getUserData()} style={{ marginLeft: 10, marginVertical: 10 }}><Text>ETH</Text></TouchableOpacity>
//             <TouchableOpacity onPress={() => setValue('PROFY') + getUserData()} style={{ marginLeft: 10, marginVertical: 10 }}><Text>PROFY</Text></TouchableOpacity>
//             <View style={{ marginTop: 30 }}>
//                 {apiResponse.map((item, index) =>
//                 (<>
//                     <View><Text>{item.trade_coin == value && item.trade_coin}</Text></View>
//                 </>)
//                 )}
//             </View>
//         </View>
//     )
// }

// export default CheckApi

import { View, Text, ScrollView, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const CheckScroll = () => {
    const [percentage, setpercentage] = useState(null);
    const [userAmount, setuserAmount] = useState("0.00")

    // console.log("val", val)
    const percentageBtn = [{ btn: "20%" }, { btn: "50%" }, { btn: "75%" }, { btn: "100%" }];

    const PercentageBar = () => (
        <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
            {percentageBtn.map((item, index) => (
                <TouchableOpacity key={index} style={{ backgroundColor: "rgba(44, 43, 43, 1)", width: 60, paddingVertical: 4, borderRadius: 4, alignSelf: 'center', borderColor: percentage == index ? '#E29224' : null, borderWidth: percentage == index ? .6 : 0 }} onPress={() => setpercentage(index)}>
                    <Text style={{ fontFamily: '600', fontSize: 14, fontFamily: 'Nunito-Medium', color: 'rgba(153, 166, 175, 0.5)', textAlign: 'center' }}>{item.btn}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
    return (
        // <ScrollView style={{ flex: 1, backgroundColor: 'red', }}>
        //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'orange', height: Dimensions.get("window").height }}>
        //         <Text>Cenetr</Text>
        //     </View>
        // </ScrollView>
        <View>
            <PercentageBar />
            {/* <TouchableOpacity onPress={() => setnum(0)}><Text>Set Value 10</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setnum(1)}><Text>Set Value 20</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setnum(2)}><Text>Set Value 30</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setnum(3)}><Text>Set Value 40</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setnum(4)}><Text>Set Value 50</Text></TouchableOpacity> */}

            <TextInput defaultValue={percentage == 0 ? "20" : percentage == 1 ? "50" : percentage == 2 ? "75" : percentage == 3 ? "100" : userAmount} onChangeText={(txt) => setuserAmount(txt)} style={{ width: '80%', backgroundColor: 'red', color: 'black', alignSelf: 'center' }} />
        </View>

    )
}

export default CheckScroll
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { colors } from "../../constants";
import AntDesign from 'react-native-vector-icons/AntDesign'

const ReuseCard = () => {

  return (
    <ScrollView>
      {OpenOrderData.map((item, index) => (<View style={{ width: '94%', alignSelf: 'center', backgroundColor: '#202020', borderColor: colors.white, borderStyle: 'dashed', borderWidth: .5, borderRadius: 5, marginVertical: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ ...styles.CardTextStyle, color: colors.white }}>ETH / BTC</Text>
            <Text style={{ ...styles.CardTextStyle, color: item.Limit == 'Buy' ? colors.green : colors.redColor, marginLeft: 6 }}>Limit , {item.Limit}</Text>
          </View>
          <View >
            <Text style={{ ...styles.CardTextStyle, color: colors.darkOrange }}>Excuted : <Text style={{ ...styles.CardTextStyle, color: colors.white }}>15,000.00</Text></Text>
          </View>
          <TouchableOpacity>
            <AntDesign name="closecircleo" size={18} color={colors.darkOrange} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '4%', marginTop: 8 }}>
          <Text style={{ ...styles.CardTextStyle, color: colors.lightDark }}>10.05.2022  at 12: 40</Text>
          <Text style={{ ...styles.CardTextStyle, color: colors.darkOrange, marginLeft: '9%' }}>Panding : <Text style={{ ...styles.CardTextStyle, color: colors.white }}>30,000.00</Text></Text>
        </View>
        <View style={{ marginTop: 26, backgroundColor: 'rgba(20, 20, 20, 1)', alignSelf: 'center', width: '99.5%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: 10, marginBottom: 1 }}>
          <Text style={{ ...styles.CardTextStyle, color: colors.lightDark, fontSize: 12 }}>Price : <Text style={{ ...styles.CardTextStyle, color: colors.green, fontSize: 12, }}>0.65748982</Text></Text>
          <Text style={{ ...styles.CardTextStyle, color: colors.lightDark, fontSize: 12 }}>Amount : <Text style={{ ...styles.CardTextStyle, color: colors.white, fontSize: 12 }}>45,620.00</Text></Text>
          <Text style={{ ...styles.CardTextStyle, color: colors.lightDark, fontSize: 12 }}>Total : <Text style={{ ...styles.CardTextStyle, color: colors.white, fontSize: 12 }}>45,620.00</Text></Text>
        </View>
      </View>))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  CardTextStyle: { fontSize: 14, fontFamily: 'Nunito-Bold' },
});

export default ReuseCard;

const OpenOrderData = [
  { Limit: 'Buy' }, { Limit: 'Sell' }, { Limit: 'Buy' }, { Limit: 'Buy' }, { Limit: 'Buy' }
]
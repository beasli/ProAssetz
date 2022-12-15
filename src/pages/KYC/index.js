import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import * as Progress from 'react-native-progress';
import { ProgressBar, Colors, Button } from 'react-native-paper';
import { ProgressView } from '@react-native-community/progress-view';
import { colors } from '../../constants';
import { useNavigation } from '@react-navigation/native';

export default function KYC() {
  const navigation = useNavigation();
  useEffect(()=>{
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
      return () => backHandler.remove()
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* <Image source={require('../../../assets/rupee.png')} /> */}
        <>
          <Text style={styles.regularHeading}>
            Complete Your{'\n'}
            {/* <Text style={styles.regularHeading2}> Your</Text> */}
            <Text style={styles.boldHeading}>KYC</Text>
          </Text>
          <View style={{ position:'relative',top:30 }}>
            <Text style={styles.regularHeading4}>You are few steps away{'\n'}from trading...</Text>
          </View>
        </>
        <Pressable style={styles.button} onPress={() => navigation.navigate('KYCwizard')}>
          <Text
            style={{
              textAlign: 'center',
              color: '#473200',
              fontFamily: 'Montserrat-Medium',
              fontSize: 20,
              fontWeight: '500',
            }}>
            Complete KYC
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
    flex: 1,
    justifyContent: 'space-between',
    // paddingTop: 150
  },
  innerContainer: {
    padding: 40,
    flex: 2,
    justifyContent: 'center',
  },
  indicatorContainer: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    marginHorizontal: 40,
    marginVertical: 50,
    width: 200,
  },
  rupee: {},
  boldHeading: {
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 50,
    color: colors.yellowDark,
    fontWeight: '900',
    // letterSpacing: 1,
  },
  regularHeading: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 32,
    color: 'white',
  },
  regularHeading2: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 32,
    color: 'white',
  },
  regularHeading4: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    color: 'white',
  },
  button: {
    width: 250,
    backgroundColor: `${colors.yellowLg}`,
    paddingVertical: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 20,
    borderRadius: 10,
    marginTop: 150,
    position: 'relative',
    top: 30
  },
});

/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';
import { ProgressBar, Colors, Button } from 'react-native-paper';
import { ProgressView } from '@react-native-community/progress-view';
import { colors } from '../../constants';
import { useNavigation } from '@react-navigation/native';
// import { Container } from './styles';

const KYCSubmitted = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* <Image source={require('../../../assets/rupee.png')} /> */}
        <Text style={styles.regularHeading}>
          You are done. {'\n'}
          {/* <Text style={styles.regularHeading2}>Your</Text> */}
          <Text style={styles.boldHeading}>
            KYC
            <Text style={styles.regularHeading}> documents have been submit </Text>
          </Text>
          <Text style={{ fontFamily: 'Monstserrat-Regular', fontSize: 18, color: '#6E6E6E' }}>
            {'\n'} {'\n'}While your KYC Documents are under process, you can explore the app{' '}
          </Text>
        </Text>
        {/* <TouchableOpacity onPress={() => moveStep(1)}>
          <View style={{ alignItems: 'center' }}>
            <Image source={require('../../../assets/next.png')} style={{ height: 70, width: 70 }} />
          </View>
        </TouchableOpacity> */}
      </View>
      <Pressable style={styles.button} onPress={() => alert('go to dashboard')}>
        <Text style={{ textAlign: 'center' }}>Continue</Text>
      </Pressable>
    </View>
  );
};

export default KYCSubmitted;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
    flex: 1,
    justifyContent: 'space-between',
  },
  innerContainer: {
    padding: 40,
    flex: 2,
    justifyContent: 'flex-start',
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
    fontSize: 55,
    color: '#38C976',
    fontWeight: '900',
    // letterSpacing: 1,
  },
  regularHeading: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 33,
    color: 'white',
  },
  regularHeading2: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 32,
    color: 'white',
  },
  button: {
    width: '80%',
    backgroundColor: `${colors.yellowLg}`,
    paddingVertical: 18,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 20,
    borderRadius: 10,
  },
});

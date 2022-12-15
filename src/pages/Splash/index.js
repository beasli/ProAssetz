/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, Dimensions } from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import { ProgressBar, Colors, Button } from 'react-native-paper';
import { ProgressView } from '@react-native-community/progress-view';
import { colors } from '../../constants';
import { useNavigation } from '@react-navigation/native';

export default function Splash(props) {
  const [currStep, setCurrStep] = React.useState(0);

  React.useEffect(() => {
    renderStep(currStep);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currStep]);
  const goToLogin = () => {
    props.navigation.navigate('Login');
  };
  const { nav } = props.navigation.navigate;
  const renderStep = (index) => {
    switch (index) {
      case 0:
        return <Step1 moveStep={setCurrStep} />;
      case 1:
        return <Step2 moveStep={setCurrStep} />;
      case 2:
        return <Step3 moveStep={setCurrStep} />;
      default:
        return <Step3 moveStep={setCurrStep} nav={() => goToLogin} />;
    }
  };
  return (
    <View style={styles.container}>
      <Logo />
      {renderStep(currStep)}
      <StepsIndicator index={currStep} />
    </View>
  );
}
function Dots({ index }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 50 }}>
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 100,
          backgroundColor: index === 0 ? '#E29224' : '#473200',
        }}
      />
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 100,
          backgroundColor: index === 1 ? '#E29224' : '#473200',
        }}
      />
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 100,
          backgroundColor: index === 2 ? '#E29224' : '#473200',
        }}
      />
    </View>
  );
}
function StepsIndicator({ index }) {
  const navigation2 = useNavigation();

  return (
    <View style={styles.indicatorContainer}>
      <View>
        <Dots index={index} />
        {/* <Text style={{ color: 'white' }}>{index}</Text> */}
      </View>
      {index < 2 ? (
        <TouchableOpacity onPress={() => navigation2.navigate('Login')}>
          <Text
            style={{
              color: '#6E6E6E',
              fontFamily: 'Monstserrat-Bold',
              fontSize: 20,
              letterSpacing: 1,
            }}>
            SKIP{' >>'}
          </Text>
        </TouchableOpacity>
      ) : (
        <>
          <Text> </Text>
        </>
      )}
    </View>
  );
}
function Step1({ moveStep }) {
  const {width, height} = Dimensions.get('window')
  return (
    <View style={styles.innerContainer}>
      <Image style={{width: '30%', height: '30%'}} resizeMode='contain' source={require('../../../assets/rupee.png')} />
      <Text style={{ ...styles.regularHeading, position: 'relative', top: '-2%' }}>
        Complete {'\n'}
        <Text style={styles.regularHeading2}>Your</Text>
        <Text style={styles.boldHeading}>
          {' '}
          KYC{'\n'}
          <Text style={styles.regularHeading2}>In </Text>2 Mins
        </Text>
      </Text>
      <TouchableOpacity onPress={() => moveStep(1)}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../../../assets/next.png')} style={{ height: 70, width: 70 }} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
function Step2({ moveStep }) {
  return (
    <View style={styles.innerContainer}>
      <View>
        <Image style={{width: '60%', height: '60%'}} resizeMode='contain' source={require('../../../assets/rupee.png')} />
      </View>
      <Text style={{ ...styles.regularHeading, position: 'relative', top: -55 }}>
        Deposit
        <Text style={styles.boldHeading}> INR{'\n'}Proassetz</Text>
      </Text>
      <TouchableOpacity onPress={() => moveStep(2)}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../../../assets/next.png')} style={{ height: 70, width: 70 }} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
function Step3(props) {
  const navigation = useNavigation();

  return (
    <View style={styles.innerContainer}>
      <Image style={{width: '30%', height: '30%'}} resizeMode='contain' source={require('../../../assets/rupee.png')} />
      <Text style={styles.boldHeading}>
        Buy{' '}
        <Text style={{ ...styles.regularHeading, fontSize: 50, fontFamily: 'Monstserrat-Light' }}>
          &
        </Text>{' '}
        Sell{'\n'}
        <Text style={styles.regularHeading}>Crypto assets</Text>
      </Text>

      <Pressable style={styles.button} onPress={() => navigation.navigate('CreateAccount')}>
        <Text
          style={{
            textAlign: 'center',
            color: '#473200',
            fontFamily: 'Montserrat-Medium',
            fontSize: 20,
            fontWeight: '500',
          }}>
          Get Started
        </Text>
      </Pressable>
      <Text
        style={{
          color: 'white',
          textAlign: 'center',
          fontFamily: 'Nunito-SemiBold',
          fontWeight: '600',
          fontSize: 20,
        }}>
        Already have an account ?
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text
          style={{
            color: colors.yellowDark,
            textAlign: 'center',
            fontFamily: 'Nunito-ExtraBold',
            fontWeight: '600',
            fontSize: 16,
          }}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}
function Logo() {
  return (
    <View>
      <Image source={require('../../../assets/logo.png')} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    padding: 40,
    flex: 2,
    justifyContent: 'space-evenly',
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
    width: 180,
  },
  rupee: {},
  boldHeading: {
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 50,
    color: colors.yellowDark,
    fontStyle: 'normal',
    fontWeight: '900',
    // letterSpacing: 1,
  },
  regularHeading: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 32,
    color: 'white',
    // fontWeight: '500'
  },
  regularHeading2: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 32,
    color: 'white',
  },
  button: {
    width: 150,
    backgroundColor: `${colors.yellowLg}`,
    paddingVertical: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    marginBottom: 10,
    borderRadius: 10,
  },
});

/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import { colors } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
  MaskSymbol,
  isLastFilledCell,
} from 'react-native-confirmation-code-field';
const CELL_COUNT = 6;

export default function EmailAuth(props) {
  const [value, setValue] = React.useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props2, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const otpInput = React.useRef(null);
  const navigation = useNavigation();
  const [timerCount, setTimer] = React.useState(60);
  const [otpDone, setOtpDone] = React.useState(false);
  const handleVerifyOtp = (otp) => {
    let reqBody = {
      ...props?.route?.params?.formData,
      email_otp: otp,
    };
    console.log('make req with', reqBody);
    axios
      .post('https://www.proassetz.com/api/v1/user-login/', reqBody)
      .then(function (response) {
        console.log(response);
        if (response.data.otp_type === 'google') {
          let qrData = { ...response.data, ...reqBody };
          navigation.navigate('TwoFactorAuth', { qrData });
        }
      })
      .catch(function (error) {
        alert(error.response.data.message, 'Verify email if not verified');
        console.log(error);
      });
  };

  const renderCell = ({ index, symbol, isFocused }) => {
    let textChild = null;

    if (symbol) {
      textChild = <Text isLastFilledCell={isLastFilledCell({ index, value })}>{symbol}</Text>;
      if (index === 5 && symbol !== '') {
        setOtpDone(true);
      }
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <Text
        key={index}
        style={[styles.cell, isFocused && styles.focusCell]}
        onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </Text>
    );
  };
  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={{ color: 'white', textAlign: 'center', marginTop: 100 }}>
        An OTP has been sent to {'\n'} your email
      </Text>
      <Text style={{ color: '#6E6E6E', textAlign: 'center', marginTop: 50 }}>Type your OTP</Text>
      <CodeField
        ref={ref}
        {...props2}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />
      <Text style={{ color: '#E29224', textAlign: 'center' }}>
        0.{timerCount} <Text style={{ color: '#6E6E6E' }}>min</Text>
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          if (otpDone) {
            // navigation.navigate('TwoFactorAuth');
            // alert(value)
            handleVerifyOtp(value);
          } else {
            alert('OTP invalid');
          }
        }}>
        <Text style={{ color: 'black', textAlign: 'center' }}>Verify</Text>
      </Pressable>

      <Text style={{ color: '#E29224', textAlign: 'center' }}>Resend</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { padding: 20, minHeight: 300 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginVertical: 20 },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 45,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    borderWidth: 0,
    color: 'white',
    borderRadius: 5,
    borderColor: 'transparent',
    backgroundColor: '#3B3B3B',
    textAlign: 'center',
    margin: 5,
  },
  focusCell: {
    borderColor: '#000',
  },
  container: {
    backgroundColor: colors.bgColor,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  rowcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  innerContainer: {
    padding: 40,
    flex: 2,
    justifyContent: 'space-evenly',
  },
  input: {
    backgroundColor: '#424040',
    color: '#fff',
    borderRadius: 5,
    height: 55,
    marginHorizontal: 15,
  },
  inputWrapper: {
    backgroundColor: 'transparent',
    marginTop: 10,
    padding: 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
  },
  alignment: { textAlign: 'left' },
  indicatorContainer: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    marginHorizontal: 0,
    marginVertical: 20,
    // width: 200,
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
    textAlign: 'left',
    width: '100%',
    marginLeft: 40,
  },
  regularHeading2: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 32,
    color: 'white',
  },
  button: {
    width: 150,
    backgroundColor: `${colors.yellowLg}`,
    paddingVertical: 18,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 20,
    borderRadius: 10,
  },
});

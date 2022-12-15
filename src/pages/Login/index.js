/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import { colors } from '../../constants';
import { TextInput, Checkbox, Button, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import AuthContext from '../../Context/AuthContex';
import AsyncStorage from '@react-native-async-storage/async-storage'

// import { Container } from './styles';
function StyledText({ labelText }) {
  return <Text style={{ color: '#6E6E6E', fontWeight: 'bold' }}>{labelText}</Text>;
}
const formSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = () => {
  const [snackMssg, setSnackMssg] = React.useState('');
  const [visibleS, setVisibleS] = React.useState(false);
  const onToggleSnackBar = () => setVisibleS(!visibleS);
  const onDismissSnackBar = () => setVisibleS(false);
  const navigation = useNavigation();
  const [val1, setval1] = React.useState('');
  const [val2, setval2] = React.useState('');
  const [email, setemail] = React.useState('')
  const [pass, setpass] = React.useState('')
  const [biometryType, setBiometryType] = React.useState(null);
  const { setUserData } = useContext(AuthContext)
  const user = {
    email: email,
    password: pass,
  }
  const storeData = () => {
    try {
      AsyncStorage.setItem('Key', JSON.stringify(user))
    }
    catch (e) {
      console.log('Async error', e)
    }
  }
  const handleLogin = (formData) => {
    console.log('first formData', formData.email, formData.password)
    axios
      .post('https://www.proassetz.com/api/v1/user-login/', formData)
      .then(function (response) {
        console.log('response ==>', response.data);
        // alert(response)

        if (response?.data?.otp_type == 'google') {

          user.email = formData.email
          user.password = formData.password
          navigation.navigate('TwoFactorOTP', { formData, response });
          setUserData({ email: formData.email, password: formData.password })
          storeData();
          // alert(response.data.message);
          // alert();
          // navigation.navigate('EmailAuth', { formData, response });
          // navigation.navigate('VerifyEmail', { formData, response });
        } else if (response.data.otp_type == 'email') {
          navigation.navigate('EmailAuth', { formData, response });
        }
      })
      .catch(function (error) {
        // alert(error)
        const { message } = error.response.data;
        let errm;
        if (message.english) {
          errm = JSON.stringify(message.english);
        } else {
          errm = JSON.stringify(message);
        }
        console.log(errm);
        // alert(error.response.data.message, 'Verify email if not verified');
        setSnackMssg(`${errm}`);
        onToggleSnackBar();
        console.log(error);
      });
  };
  const handleFingerPrint = () => {
    if (biometryType === null) {
      alert('Authentication could not start because Fingerprint Scanner has no enrolled fingers.')
    } else {
      showAuthenticationDialog()
    }
  }

  useEffect(() => {
    FingerprintScanner.isSensorAvailable()
      .then((biometryType) => {
        console.log('biometryType', biometryType)
        setBiometryType(biometryType);
      })
      .catch((error) => console.log('isSensorAvailable error => ', error.message));
  }, [])

  const getMessage = () => {
    if (biometryType == 'Face ID') {
      return 'Scan your Face on the device to continue'
    }
    else {
      return 'Scan your Fingerprint on the device scanner to continue'
    }
  }
  const showAuthenticationDialog = () => {

    if (biometryType !== null && biometryType !== undefined) {
      FingerprintScanner.authenticate({
        description: getMessage()
      })
        .then(async () => {
          const auth = await AsyncStorage.getItem("auth")
          if (auth) {
            console.log("bbbb", auth)
            navigation.navigate("KYC")
          }
          else {
            alert("Please try email login at first time to complete Two Factor Authentication")
          }
          //you can write your logic here to what will happen on successful authentication
        })
        .catch((error) => {
          console.log('Authentication error is => ', error);
        });
    }
    else {
      console.log('biometric authentication is not available');
    }
  };

  return (
    // <AuthContext.Provider value={{ user }}>
    <>
      <ScrollView style={{ backgroundColor: colors.bgColor, }}>
        <View style={styles.container}>
          <Snackbar
            wrapperStyle={{ elevation: 3, zIndex: 3 }}
            style={{ elevation: 3, zIndex: 3 }}
            visible={visibleS}
            onDismiss={onDismissSnackBar}
            action={{
              label: 'Close',
              onPress: () => {
                // Do something
              },
            }}>
            {snackMssg}
          </Snackbar>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../../assets/logoBig.png')} style={styles.logo} />
          </View>
          <Text style={styles.regularHeading}>Login</Text>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={formSchema}
            onSubmit={(values) => {
              console.log('login values', values);
              setemail(values.email);
              setpass(values.pass);
              handleLogin(values);
            }}>
            {({ handleChange, handleBlur, handleSubmit, values, touched, errors, setFieldValue }) => (
              <>
                <View style={[styles.inputWrapper]}>
                  <TextInput
                    mode="flat"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    style={[styles.input, touched.email && errors.email ? { borderWidth: 1, borderColor: '#DC3030' } : {}]}
                    color="#fff"
                    value={values.email}
                    onChangeText={(val) => setFieldValue('email', val.trim())}
                    onBlur={handleBlur('email')}
                    label={<StyledText labelText="Email ID" />}
                    theme={{ colors: { text: '#fff' } }}
                  // onChange={(val) => setval1(val)}
                  />
                </View>
                <Text style={{ color: '#DC3030', textAlign: 'left', marginLeft: 20, }}>{touched.email && errors.email}</Text>

                <View
                  style={{ ...styles.rowcon, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                  <View style={styles.inputWrapper2}>
                    <TextInput
                      mode="flat"
                      underlineColor="transparent"
                      activeUnderlineColor="transparent"
                      style={[styles.input2, touched.password && errors.password ? { borderWidth: 1, borderColor: '#DC3030' } : {}]}
                      color="#fff"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      label={<StyledText labelText="Password" />}
                      theme={{ colors: { text: '#fff' } }}
                      onChange={(val) => setval2(val)}
                    />
                  </View>
                  <Button
                    onPress={handleFingerPrint}
                    icon="fingerprint"
                    labelStyle={{
                      fontSize: 35,
                      textAlign: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 'auto',
                    }}
                    style={{
                      borderRadius: 5,
                      backgroundColor: '#3B3B3B',
                      width: '20%',
                      marginTop: 3,
                      // padding: 3,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 51,
                    }}
                    color="#6E6E6E"
                  />
                </View>
                <Text style={{ color: '#DC3030', textAlign: 'left', marginLeft: 20, }}>{touched.password && errors.password}</Text>
                <View style={styles.rowcon}>
                  <TouchableOpacity onPress={() => { navigation.navigate('ForgotPasswordScreen'); }}>
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        fontFamily: 'Nunito-SemiBold',
                        fontWeight: '600',
                        fontSize: 16,
                      }}>
                      Forgot Password ?
                    </Text>
                  </TouchableOpacity>
                  <View style={{ width: '50%' }}>
                    <Pressable style={styles.button} onPress={handleSubmit}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#473200',
                          fontFamily: 'Montserrat-Medium',
                          fontSize: 20,
                          fontWeight: '500',
                        }}>
                        Login
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </>
            )}
          </Formik>

          <View style={{ flex: 2, justifyContent: 'center' }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontFamily: 'Nunito-SemiBold',
                fontWeight: '600',
                fontSize: 20,
              }}>
              Don't have an account ?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
              <Text
                style={{
                  color: colors.yellowDark,
                  textAlign: 'center',
                  fontFamily: 'Nunito-SemiBold',
                  fontWeight: '600',
                  fontSize: 16,
                }}>
                Create an Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
    // </AuthContext.Provider>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
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
    // justifyContent: 'space-evenly',
  },
  input: {
    backgroundColor: '#424040',
    color: '#fff',
    borderRadius: 5,
    height: 50,
    marginHorizontal: 10,
  },
  input2: {
    backgroundColor: '#424040',
    color: '#fff',
    borderRadius: 5,
    height: 50,
    // marginHorizontal: 15,
    width: '100%',
  },
  inputWrapper: {
    backgroundColor: 'transparent',
    marginTop: 10,
    padding: 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
  },
  inputWrapper2: {
    backgroundColor: 'transparent',
    // marginTop: 10,
    padding: 3,
    paddingLeft: 0,
    // marginLeft: 'auto',
    // marginRight: 10,
    width: '80%',
    // flex: 1,
    // alignSelf:,
    position: 'relative',
    left: -6,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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
    marginVertical: 10,
    // width: 200,
  },
  rupee: {},
  boldHeading: {
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 50,
    color: colors.yellowDark,
    fontWeight: '900',
    marginBottom: 10,
    // letterSpacing: 1,
  },
  regularHeading: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 32,
    color: 'white',
    textAlign: 'left',
    width: '100%',
    marginLeft: 15,
  },
  regularHeading2: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 32,
    color: 'white',
  },
  button: {
    width: '100%',
    backgroundColor: `${colors.yellowLg}`,
    paddingVertical: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 20,
    borderRadius: 10,
  },
  errorWrapper: {
    backgroundColor: 'transparent',
    // marginVertical: 15,
    // padding: 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    borderColor: '#DC3030',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,

  },
});
export default Login;

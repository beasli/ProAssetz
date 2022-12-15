/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, ScrollView, Dimensions, Keyboard } from 'react-native';
import { colors } from '../../constants';
import { TextInput, Checkbox, Button, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

// import { Container } from './styles';
function StyledText({ labelText }) {
  return <Text style={{ color: '#6E6E6E', fontWeight: 'bold' }}>{labelText}</Text>;
}
const formSchema = yup.object({
  email: yup.string().email().required(),
  // password: yup.string().required(),
  otp: yup.string()
});
const ForgotPassword = () => {
  const [snackMssg, setSnackMssg] = React.useState('');

  const [visibleS, setVisibleS] = React.useState(false);
  const onToggleSnackBar = () => setVisibleS(!visibleS);

  const [otpShow, setOtpShow] = React.useState(false);


  const onDismissSnackBar = () => setVisibleS(false);
  const navigation = useNavigation();
  const [val1, setval1] = React.useState('');
  const [val2, setval2] = React.useState('');
  const handleLogin = (formData) => {
    axios
      .post('https://www.proassetz.com/api/v1/user-reset-password/', formData)
      .then(function (response) {
        console.log('response ==>', response.data);
        // alert(response)
        const data = response.data;
        // if(data.status){
        //   setSnackMssg(`An OTP has been sent to your registered email`);
        //   onToggleSnackBar();
        //   navigation.navigate('Login');
        // }else{
        //   setSnackMssg(`${data.message}`);
        //   onToggleSnackBar();
        // }
        setSnackMssg(`${data.message}`);
          onToggleSnackBar();

        setOtpShow(true)
      })
      .catch(function (error) {
        // alert(error)
        const { message } = error.response.data;
        let errm;
        if (message.english) {
           errm = JSON.stringify(message.english);
        }
        else if(message.english?.email){
          errm = JSON.stringify(message.english?.email);
        }
        else if(message.email){
          errm = JSON.stringify(message.email);
        }
         else {
           errm = JSON.stringify(message);
        }
        console.log(message);
        // alert(error.response.data.message, 'Verify email if not verified');
        setSnackMssg(`${errm}`);
        onToggleSnackBar();
        // console.log(error);
      });
  };
  const handleOtpLogin = (formData) => {
    console.log('formData', formData)
    axios
      .post('https://www.proassetz.com/api/v1/user-reset-password/', formData)
      .then(function (response) {
        console.log('response ==>', response.data);
        // alert(response)
        const data = response.data;
        // if (response?.data?.otp_type == 'google') {
        //   navigation.navigate('TwoFactorOTP', { formData });
        //   // alert(response.data.message);
        //   // alert();
        //   // navigation.navigate('EmailAuth', { formData, response });
        //   // navigation.navigate('VerifyEmail', { formData, response });
        // } else if (response.data.otp_type == 'email') {
        //   navigation.navigate('EmailAuth', { formData, response });
        // }
        if(data.status){
          setSnackMssg(`An OTP has been sent to your registered email`);
          onToggleSnackBar();
          setTimeout(() => {
            navigation.navigate('Login');
          }, 3000);
        }else{
          setSnackMssg(`${data.message}`);
          onToggleSnackBar();
        }
      })
      .catch(function (error) {
        // alert(error)
        // const { message } = error.response.data;
        // let errm;
        // if (message.english) {
        //    errm = JSON.stringify(message.english);
        // }
        // else if(message.english?.email){
        //   errm = JSON.stringify(message.english?.email);
        // }
        // else if(message.email){
        //   errm = JSON.stringify(message.email);
        // }
        //  else {
        //    errm = JSON.stringify(message);
        // }
        // console.log(message);
        // // alert(error.response.data.message, 'Verify email if not verified');
        // setSnackMssg(`${errm}`);
        // onToggleSnackBar();
        console.log('error', JSON.stringify(error));
      });
  };
  return (
    <ScrollView style={{flex: 1, height: '100%'}}>
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
      <View>
        <Image source={require('../../../assets/logoBig.png')} style={styles.logo} />
      </View>
      <Text style={styles.regularHeading}>Forgot Password</Text>
      <Formik
        initialValues={{
          email: ''
        }}
        validationSchema={formSchema}
        onSubmit={(values) => {
          console.log('login values', values);
          handleLogin(values);
          handleOtpLogin(values);
        }}>
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors, setFieldValue }) => (
          <>
            <View style={styles.inputWrapper}>
              <TextInput
                mode="flat"
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                style={[styles.input, touched.email && errors.email ? {borderWidth: 1, borderColor: '#DC3030'} : {}]}
                color="#fff"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                label={<StyledText labelText="Email ID" />}
                theme={{ colors: { text: '#fff' } }}
                onChange={(val) => setval1(val)}
                keyboardType='email-address'
                onSubmitEditing={()=>{Keyboard.dismiss()}}
              />
            </View>
            <Text style={{ color: 'pink' }}>{touched.email && errors.email}</Text>
          {otpShow &&
            <View
              style={{ ...styles.rowcon, justifyContent: 'center', alignItems: 'center' }}>
              <View style={styles.inputWrapper2}>
                <TextInput
                  mode="flat"
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  style={styles.input2}
                  color="#fff"
                  onChangeText={handleChange('otp')}
                  onBlur={handleBlur('OTP')}
                  label={<StyledText labelText="OTP" />}
                  theme={{ colors: { text: '#fff' } }}
                  onChange={(val) => setval2(val)}
                  keyboardType='number-pad'
                  textAlign='center'
                />
              </View>
             
            </View>
          }

            <Text style={{ color: 'pink' }}>{touched.password && errors.password}</Text>
            <View style={styles.rowcon}>
              <TouchableOpacity onPress={()=> { navigation.navigate('Login');}}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontFamily: 'Nunito-SemiBold',
                    fontWeight: '600',
                    fontSize: 16,
                  }}>
                  Remember ? Login
                </Text>
              </TouchableOpacity>
              <View style={{ width: '50%' }}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#473200',
                      fontFamily: 'Montserrat-Medium',
                      fontSize: 20,
                      fontWeight: '500',
                    }}>
                    {otpShow ? 'Forgot Now' : 'Get OTP'}
                  </Text>
                </TouchableOpacity>
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
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: Dimensions.get('window').height
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
    textAlign: 'center'
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
    marginLeft: 40,
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
});
export default ForgotPassword;

/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { colors } from '../../constants';
import { TextInput, Checkbox, Button, Card, IconButton, Snackbar } from 'react-native-paper';
import { Formik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import { values } from 'lodash';
function StyledText({ labelText }) {
  return <Text style={{ color: '#6E6E6E', fontWeight: 'bold' }}>{labelText}</Text>;
}
function StyledTextMultiline({ labelText }) {
  return (
    <Text style={{ color: 'red', fontWeight: 'bold' }}>{labelText}</Text>
    // <Text style={{ position: 'absolute', top: 0, borderWidth: 3,borderColor:'red' }}>
    // </Text>
  );
}
export default function ContactUs() {
  const [snackMssg, setSnackMssg] = React.useState('');

  const [visibleS, setVisibleS] = React.useState(false);
  const onToggleSnackBar = () => setVisibleS(!visibleS);

  const onDismissSnackBar = () => setVisibleS(false);
  const formSchema = yup.object({
    // company: yup.string().required('company name is required'),
    name: yup.string('name is required').required(),
    email: yup.string().email().required(),
    // phone_number: yup
    //   .string()
    //   .required()
    //   .matches(/^[0-9]+$/, 'Must be only digits')
    //   .min(10, 'Must be 10 digits')
    //   .max(10, 'Must be 10 digits'),
    message: yup.string('message is required').required(),
    // message: yup
    //   .string()
    //   .test('mssg-check', 'message is required', (mssg) => mssg === 'You Text Here'),
  });
  //   const ref_input = React.useRef();
  const sendContactForm = (formData) => {
    const payload = {
      email: formData.email,
      name: formData.name,
      Company: '',
      phone_number: '',
      message: formData.message,
    };
    console.log(payload, 'payload');
    axios
      .post('https://www.proassetz.com/api/v1/contact-us/', payload)
      .then((res) => {
        console.log(res, 'succ');
        // alert('siic',JSON.stringify(res.response))
        // console.log('res**', res.data.message.english);
        setSnackMssg(`Success : ${res.data.message.english}`);
        onToggleSnackBar();
        // navigation.navigate('BankDetailsAlmostDone', { token });
      })
      .catch(({ response }) => {
        console.log(response, 'fail');
        // alert('siic',JSON.stringify(res.response))

        setSnackMssg(`fail :${JSON.stringify(response.data.message)}`);
        onToggleSnackBar();

        // let e = Object.values(err?.response?.data?.message)[0][0];
        // setSnackMssg(`Error : ${err}`);
        // onToggleSnackBar();
      });
  };
  return (
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
        <Formik
          initialValues={{
            email: '',
            name: '',
            // company: '',
            // phone_number: '',
            message: '',
          }}
          validationSchema={formSchema}
          onSubmit={(values) => {
            console.log('sub', values);
            sendContactForm(values);
          }}>
          {({ handleChange, handleBlur, handleSubmit, values, touched, errors, setFieldValue }) => (
            <View style={styles.innerContainer}>
              <ScrollView style={{ marginTop: 10 }}>
                <View
                  style={
                    touched.email && errors.email
                      ? { ...styles.errorWrapper }
                      : { ...styles.inputWrapper }
                  }>
                  <TextInput
                    mode="flat"
                    underlineColor="#424040"
                    activeUnderlineColor="#424040"
                    style={styles.input}
                    color="#fff"
                    onChangeText={(val) => setFieldValue('email', val.trim())}
                    onBlur={handleBlur('email')}
                    label={<StyledText labelText="Email" />}
                    theme={{ colors: { text: '#fff' } }}
                  />
                </View>
                <Text style={{ color: '#DC3030' }}>{touched.email && errors.email}</Text>
                <View
                  style={
                    touched.name && errors.name
                      ? { ...styles.errorWrapper }
                      : { ...styles.inputWrapper }
                  }>
                  <TextInput
                    mode="flat"
                    underlineColor="#424040"
                    activeUnderlineColor="#424040"
                    style={styles.input}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    color="#fff"
                    label={<StyledText labelText="Your Name" />}
                    theme={{ colors: { text: '#fff' } }}
                  />
                </View>
                <Text style={{ color: '#DC3030' }}>{touched.name && errors.name}</Text>
                <View
                  style={
                    touched.message && errors.message
                      ? {
                          ...styles.errorWrapper,
                          height: values.message === '' ? 200 : undefined,
                          backgroundColor: '#424040',
                          borderRadius: 5,
                        }
                      : {
                          ...styles.inputWrapper,
                          height: values.message === '' ? 200 : undefined,
                          backgroundColor: '#424040',
                          borderRadius: 5,
                        }
                  }>
                  <TextInput
                    mode="flat"
                    underlineColor="#424040"
                    activeUnderlineColor="#424040"
                    style={{
                      ...styles.input,
                      //   flexDirection:'row',
                      //   justifyContent: 'flex-end',
                      // alignItems: 'flex-start',
                      textAlignVertical: 'top',
                      height: values.message !== '' ? 200 : undefined,
                      // alignContent:'center'
                      // position: 'relative',
                    }}
                    label={<StyledText labelText="Your Text" />}
                    theme={{ colors: { text: '#fff' } }}
                    color="#fff"
                    multiline
                    numberOfLines={5}
                    value={values.message}
                    // onFocus={() => setFieldValue('message', '')}
                    onChangeText={handleChange('message')}
                    onBlur={handleBlur('message')}
                    // placeholder="Your Text Here"
                    // label={
                    //   values.message !== 'Your Text Here' ? (
                    //     <StyledText labelText="Your Text Here" />
                    //   ) : (
                    //     <Text>" "</Text>
                    //   )
                    // }
                    //   labelStyle={}}
                    // theme={{
                    //   colors: { text: values.message === 'Your Text Here' ? '#6E6E6E' : '#fff' },
                    // }}
                  />
                </View>
                <Text style={{ color: '#DC3030' }}>{touched.message && errors.message}</Text>
              </ScrollView>
              {/* <KeyboardAvoidingView style={styles.botCon} keyboardVerticalOffset={-550}> */}
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Button
                  disabled={false}
                  dark={false}
                  style={styles.button}
                  onPress={handleSubmit}
                  compact={false}
                  contentStyle={{
                    alignSelf: 'stretch',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: 0,
                    margin: 0,
                  }}
                  mode="contained">
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: 'Nunito-SemiBold',
                      textAlign: 'center',
                      textTransform: 'capitalize',
                      color: '#473200',
                    }}>
                    Send
                  </Text>
                </Button>
              </View>
              {/* </KeyboardAvoidingView> */}
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
    justifyContent: 'center',
    paddingVertical: 50,
    paddingTop: 100,
    paddingHorizontal: 15,
    // height: '100%',
  },
  disabledButton: {
    width: '100%',
    backgroundColor: 'white',
    padding: 0,
    height: 46,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    borderRadius: 10,
    alignSelf: 'stretch',
  },
  button: {
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: `${colors.yellowLg}`,
    padding: 0,
    height: 46,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#424040',
    color: '#fff',
    borderRadius: 5,
    height: 50,
  },
  inputWrapper: {
    backgroundColor: 'transparent',
    // marginVertical: 15,
    // padding: 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    marginTop: 10,

    // borderRadius: 5,
    // borderColor:'crimson',
    // borderWidth: 1
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

  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  innerContainer: {
    height: '100%',
    width: '100%',
    // marginTop: 50,
    paddingTop: 20,

    justifyContent: 'flex-end',
    // alignItems:'center',
  },
  botCon: {
    // marginBottom: 40,
    // marginTop: 40,
    // alignSelf:'flex-end'
  },
});

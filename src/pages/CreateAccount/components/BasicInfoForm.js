/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { colors } from '../../../constants';
import { TextInput, Checkbox, Button, Card, IconButton } from 'react-native-paper';
import { Formik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';

const formSchema = yup.object({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string('Last name is required').required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

function StyledText({ labelText }) {
  return <Text style={{ color: '#6E6E6E', fontWeight: 'bold' }}>{labelText}</Text>;
}
const PasswordValidator = ({ text }) => {
  const [specialCheck, setSpecialCheck] = React.useState(false);
  const [specialCheck2, setSpecialCheck2] = React.useState(false);
  const [specialCheck3, setSpecialCheck3] = React.useState(false);
  const [specialCheck4, setSpecialCheck4] = React.useState(false);
  // const [passCheck, setPassCheck] = React.useState({
  //   spChar: false,
  //   upperChar: false,
  //   num: false,
  //   length: false,
  // });
  const checkFlags = (text) => {
    let p = /(?=.*[!@#\$%\^&\*])/;
    let x = text.match(p);
    setSpecialCheck(x);
    let p2 = /(?=.*[A-Z])/;
    let x2 = text.match(p2);
    setSpecialCheck2(x2);
    let p3 = /(?=.*[0-9])/;
    let x3 = text.match(p3);
    setSpecialCheck3(x3);
    let p4 = /(?=.{8,})/;
    let x4 = text.match(p4);
    setSpecialCheck4(x4);
  };
  React.useEffect(() => {
    checkFlags(text);
  }, [text]);
  return (
    <Card
      style={{ width: '100%', backgroundColor: '#363434', marginVertical: 5 }}
      elevation={10}
      mode="elevated">
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <View
          style={{
            margin: 10,
            height: 18,
            width: 18,
            borderWidth: specialCheck ? 0 : 1,
            borderColor: specialCheck ? '#079640' : `${colors.yellowLg}`,
            borderRadius: 100,
            borderStyle: specialCheck ? 'solid' : 'dashed',
            backgroundColor: specialCheck ? '#079640' : 'transparent',
          }}
        />
        <Text style={{ color: 'white', fontSize: 12 }}>
          Contains 1 Special Character ('!@#$%^&*')
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <View
          style={{
            margin: 10,
            height: 18,
            width: 18,
            borderWidth: specialCheck2 ? 0 : 1,
            borderColor: specialCheck2 ? '#079640' : `${colors.yellowLg}`,
            borderRadius: 100,
            borderStyle: specialCheck2 ? 'solid' : 'dashed',
            backgroundColor: specialCheck2 ? '#079640' : 'transparent',
          }}
        />
        <View>
          <Text style={{ color: 'white', fontSize: 12 }}> Contains 1 Uppercase letter</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
        <View
          style={{
            margin: 10,
            height: 18,
            width: 18,
            borderWidth: specialCheck3 ? 0 : 1,
            borderColor: specialCheck3 ? '#079640' : `${colors.yellowLg}`,
            borderRadius: 100,
            borderStyle: specialCheck3 ? 'solid' : 'dashed',
            backgroundColor: specialCheck3 ? '#079640' : 'transparent',
          }}
        />
        <Text style={{ color: 'white', fontSize: 12 }}> Contains 1 Number </Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
        <View
          style={{
            margin: 10,
            height: 18,
            width: 18,
            borderWidth: specialCheck4 ? 0 : 1,
            borderColor: specialCheck4 ? '#079640' : `${colors.yellowLg}`,
            borderRadius: 100,
            borderStyle: specialCheck4 ? 'solid' : 'dashed',
            backgroundColor: specialCheck4 ? '#079640' : 'transparent',
          }}
        />

        <Text style={{ color: 'white', fontSize: 12 }}>
          Minimum 8 Charaters with lowercase included
        </Text>
      </View>
    </Card>
  );
};
function BasicInfoForm() {
  const navigation = useNavigation();

  React.useEffect(() => {
    // console.log(colors);
  }, []);
  const [checked, setChecked] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [pass1, setpass1] = React.useState(true);
  const [pass2, setpass2] = React.useState(true);
  const handleCreateAccount = (formData) => {
    // console.log(first)
    navigation.navigate('Declaration', { formData });
  };

  return (
    <View style={styles.container}>
      <View>
        <Formik
          initialValues={{
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            confirm_password: '',
            refferal_code: '',
          }}
          validationSchema={formSchema}
          onSubmit={(values) => {
            console.log('sub', values);
            handleCreateAccount(values);
          }}>
          {({ handleChange, handleBlur, handleSubmit, values, touched, errors, setFieldValue }) => (
            <View style={styles.innerContainer}>
              <ScrollView style={{ marginTop: 0 }}>
                <View
                  style={
                    touched.first_name && errors.first_name
                      ? { ...styles.errorWrapper }
                      : { ...styles.inputWrapper }
                  }>
                  <TextInput
                    mode="flat"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    style={styles.input}
                    color="#fff"
                    onChangeText={handleChange('first_name')}
                    onBlur={handleBlur('first_name')}
                    label={<StyledText labelText="First Name" />}
                    theme={{ colors: { text: '#fff' } }}
                  />
                </View>
                <Text style={{ color: '#DC3030' }}>{touched.first_name && errors.first_name}</Text>
                <View
                  style={
                    touched.last_name && errors.last_name
                      ? { ...styles.errorWrapper }
                      : { ...styles.inputWrapper }
                  }>
                  <TextInput
                    mode="flat"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    style={styles.input}
                    onChangeText={handleChange('last_name')}
                    onBlur={handleBlur('last_name')}
                    color="#fff"
                    label={<StyledText labelText="Last Name" />}
                    theme={{ colors: { text: '#fff' } }}
                  />
                </View>
                <Text style={{ color: '#DC3030' }}>{touched.last_name && errors.last_name}</Text>
                <View
                  style={
                    touched.email && errors.email
                      ? { ...styles.errorWrapper }
                      : { ...styles.inputWrapper }
                  }>
                  <TextInput
                    mode="flat"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    style={styles.input}
                    color="#fff"
                    value={values.email}
                    onChangeText={(val) => setFieldValue('email', val.trim())}
                    onBlur={handleBlur('email')}
                    label={<StyledText labelText="Email ID" />}
                    theme={{ colors: { text: '#fff' } }}
                  />
                </View>
                <Text style={{ color: '#DC3030' }}>{touched.email && errors.email}</Text>
                <View
                  style={
                    touched.password && errors.password
                      ? { ...styles.errorWrapper }
                      : { ...styles.inputWrapper }
                  }>
                  <TextInput
                    mode="flat"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    style={styles.input}
                    color="#fff"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    secureTextEntry={pass1 ? true : false}
                    right={
                      pass1 ? (
                        <TextInput.Icon
                          name="eye"
                          color={colors.grayMed}
                          onPress={() => setpass1(!pass1)}
                        />
                      ) : (
                        <TextInput.Icon
                          name="eye-off"
                          color={colors.grayMed}
                          onPress={() => setpass1(!pass1)}
                        />
                      )
                    }
                    label={<StyledText labelText="Password" />}
                    theme={{ colors: { text: '#fff' } }}
                  />
                </View>
                {/* <Text style={{ color: '#DC3030' }}>{touched.password && errors.password}</Text> */}
                {touched.password && errors.password && (
                  <PasswordValidator text={values.password} />
                )}
                <View
                  style={
                    touched.confirm_password && errors.confirm_password
                      ? { ...styles.errorWrapper, marginTop: 30 }
                      : { ...styles.inputWrapper, marginTop: 30 }
                  }>
                  <TextInput
                    mode="flat"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    style={styles.input}
                    color="#fff"
                    onChangeText={handleChange('confirm_password')}
                    onBlur={handleBlur('confirm_password')}
                    label={<StyledText labelText="Confirm Password" />}
                    secureTextEntry={pass2 ? true : false}
                    right={
                      pass2 ? (
                        <TextInput.Icon
                          name="eye"
                          color={colors.grayMed}
                          onPress={() => setpass2(!pass2)}
                        />
                      ) : (
                        <TextInput.Icon
                          name="eye-off"
                          color={colors.grayMed}
                          onPress={() => setpass2(!pass2)}
                        />
                      )
                    }
                    theme={{ colors: { text: '#fff' } }}
                  />
                </View>
                <Text style={{ color: '#DC3030' }}>
                  {touched.confirm_password && errors.confirm_password}
                </Text>
                <View style={[styles.inputWrapper, styles.mb2]}>
                  <TextInput
                    mode="flat"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    style={styles.input}
                    color="#fff"
                    onChangeText={handleChange('referral_code')}
                    onBlur={handleBlur('referral_code')}
                    label={<StyledText labelText="Refferal Code" />}
                    theme={{ colors: { text: '#fff' } }}
                  />
                </View>
              </ScrollView>
              <KeyboardAvoidingView style={styles.botCon} keyboardVerticalOffset={-550}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
                  <View style={{ backgroundColor: 'transparent', position: 'relative' }}>
                    <View
                      style={{
                        backgroundColor: checked ? 'transparent' : colors.grayMed,
                        height: 16,
                        width: 16,
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        borderRadius: 2
                        // transform: [{ translateX: 24 },{translateY: 24}]
                      }}
                    />
                    <Checkbox
                      status={checked ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setChecked(!checked);
                        setDisabled(!disabled);
                      }}
                      style={{ lineHeight: 1, fontSize: 30 }}
                      uncheckedColor={colors.grayMed}
                    />
                  </View>
                  <Text
                    style={{
                      color: '#fff',
                      marginLeft: 4,
                      fontSize: 16,
                      fontFamily: 'Nunito-SemiBold',
                    }}>
                    I agree to Proassetz’s{' '}
                    <Text
                      style={{
                        color: `${colors.yellowDark}`,
                        fontFamily: 'Nunito-ExtraBold',
                        fontSize: 16,
                      }}>
                      Terms of Use
                    </Text>
                  </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Button
                    disabled={disabled}
                    dark={false}
                    style={disabled ? styles.disabledButton : styles.button}
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
                      style={
                        disabled
                          ? {
                            fontSize: 20,
                            fontFamily: 'Nunito-SemiBold',
                            textAlign: 'center',
                            color: 'lightgray',
                            textTransform: 'capitalize',
                          }
                          : {
                            fontSize: 20,
                            fontFamily: 'Nunito-SemiBold',
                            textAlign: 'center',
                            textTransform: 'capitalize',
                            color: '#473200',
                          }
                      }>
                      Create Account
                    </Text>
                  </Button>
                </View>
              </KeyboardAvoidingView>
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
    justifyContent: 'space-between',
    paddingVertical: 50,
    paddingTop: 30,
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
  mb2: {
    marginBottom: 10,
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
    // paddingTop: 30,

    justifyContent: 'space-between',
    // alignItems:'center',
  },
  botCon: {
    // marginBottom: 40,
    // marginTop: 40,
    // alignSelf:'flex-end'
  },
});
export default BasicInfoForm;

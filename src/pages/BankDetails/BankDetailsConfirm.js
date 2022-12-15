/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, ScrollView, Image, AsyncStorage } from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import {
  Button,
  Subheading,
  Caption,
  TextInput,
  Menu,
  Divider,
  Checkbox,
  Dialog,
  Snackbar,
} from 'react-native-paper';
import { colors } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import _ from 'lodash';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
const formSchema = yup.object({
  bank_name: yup.string().required('Bank name is required'),
  bank_account_number: yup.string('bank account number is required').required(),
  confirm_bank: yup.string().oneOf([yup.ref('bank_account_number'), null], 'account no must match'),
  account_type: yup.string('account type').required(),
  mobile_number: yup.string().min(10, '10 Digits Required').max(10, '10 Digits Required').required('mobile no is required'),
  branch_name: yup.string().required('branch name is required'),
  upi_address: yup.string().required('upi is required'),
  ifsc_code: yup.string().required('IFSC is required'),
  // name: yup.string().required('First name is required'),
  // pan_number: yup.string().required('National ID is required'),
  // pan_image: yup.string().required('Pin code is required'),
  // cancel_cheque: yup.string().required('Pin code is required'),
});
const ImageThumbnail = ({ src }) => {
  return (
    <View
      style={{
        borderRadius: 100,
        width: 50,
        height: 50,
        borderWidth: 2,
        borderColor: 'red',
      }}>
      <Image source={{ uri: src }} style={{ width: 50, height: 50, resizeMode: 'cover' }} />
    </View>
  );
};
function StyledText({ labelText }) {
  return <Text style={{ color: '#6E6E6E', }}>{labelText}</Text>;
}
export default function BankDetailsConfirm(props) {
  const prevFormvalues = _.cloneDeep(props?.route?.params?.values);
  const [visible, setVisible] = React.useState(false);
  const [snackMssg, setSnackMssg] = React.useState('');
  const [token, setToken] = React.useState('');
  const [visibleS, setVisibleS] = React.useState(false);
  const onToggleSnackBar = () => setVisibleS(!visibleS);

  const onDismissSnackBar = () => setVisibleS(false);
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const navigation = useNavigation();
  const getAuthState = async () => {
    console.log('getAIthAStatge');
    try {
      const authDataString = await AsyncStorage.getItem('auth');
      const authData = JSON.parse(authDataString || {});
      console.log(authData);
      setToken(authData.token);
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    console.log(prevFormvalues, '*********pREV**********');
    getAuthState();
  }, []);
  const sendBankForm = (formData) => {
    axios
      .post('https://www.proassetz.com/api/api/v1/user-fiat-request/INR/', formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // alert('siic',JSON.stringify(res.response))
        // console.log('res**', res.data.message.english);
        setSnackMssg(`Success : ${333}`);
        onToggleSnackBar();
        navigation.navigate('BankDetailsAlmostDone', { token });
      })
      .catch((err) => {
        // let e = Object.values(err?.response?.data?.message)[0][0];
        setSnackMssg(`Error : ${err}`);
        onToggleSnackBar();
      });
    console.log(formData, 'payload');
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
      <Formik
        enableReinitialize={true}
        initialValues={prevFormvalues}
        validationSchema={formSchema}
        onSubmit={(values) => {
          console.log('bank form before seding', values);
          // sendBankForm(values);
          navigation.navigate('BankDetailsAlmostDone',{ token })
        }}>
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
          <View style={styles.container}>
            <ScrollView style={{ marginTop: 10 }}>
              {/* <Text style={{ color: 'crimson' }}>selected: {converDate(date)}</Text> */}
              <View style={styles.inputWrapper}>
                <View style={styles.rowCon}>
                  <View
                    style={{
                      width: '48%',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                    }}>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        mode="flat"
                        underlineColor="#424040"
                        activeUnderlineColor="#424040"
                        style={styles.input}
                        color="#fff"
                        onChangeText={handleChange('ifsc_code')}
                        value={values.ifsc_code}
                        onBlur={handleBlur('ifsc_code')}
                        label={<StyledText labelText="IFSC Code" />}
                        theme={{ colors: { text: '#fff' } }}
                      />
                      <Text style={{ color: 'crimson' }}>
                        {touched.ifsc_code && errors.ifsc_code}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '48%',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        mode="flat"
                        underlineColor="#424040"
                        activeUnderlineColor="#424040"
                        style={styles.input}
                        color="#fff"
                        onChangeText={handleChange('bank_name')}
                        onBlur={handleBlur('bank_name')}
                        value={values.bank_name}
                        label={<StyledText labelText="Bank Name" />}
                        theme={{ colors: { text: '#fff' } }}
                      />
                      <Text style={{ color: 'crimson' }}>
                        {touched.bank_name && errors.bank_name}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    mode="flat"
                    underlineColor="#424040"
                    activeUnderlineColor="#424040"
                    style={styles.input}
                    color="#fff"
                    onChangeText={handleChange('bank_account_number')}
                    value={values.bank_account_number}
                    onBlur={handleBlur('bank_account_number')}
                    label={<StyledText labelText="Bank Account No" />}
                    theme={{ colors: { text: '#fff' } }}
                  />
                </View>
              </View>
              <Text style={{ color: 'crimson' }}>
                {touched.bank_account_number && errors.bank_account_number}
              </Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  mode="flat"
                  underlineColor="#424040"
                  activeUnderlineColor="#424040"
                  style={styles.input}
                  color="#fff"
                  value={values.confirm_bank}
                  onChangeText={handleChange('confirm_bank')}
                  onBlur={handleBlur('confirm_bank')}
                  label={<StyledText labelText="Confirm Bank Account" />}
                  theme={{ colors: { text: '#fff' } }}
                />
              </View>
              <Text style={{ color: 'crimson' }}>
                {touched.confirm_bank && errors.confirm_bank}
              </Text>
              <View style={styles.rowCon}>
                <View
                  style={{
                    width: '48%',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      mode="flat"
                      underlineColor="#424040"
                      activeUnderlineColor="#424040"
                      style={styles.input}
                      color="#fff"
                      onChangeText={handleChange('branch_name')}
                      value={values.branch_name}
                      onBlur={handleBlur('branch_name')}
                      label={<StyledText labelText="Branch Name" />}
                      theme={{ colors: { text: '#fff' } }}
                    />
                    <Text style={{ color: 'crimson' }}>
                      {touched.branch_name && errors.branch_name}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: '48%',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                  }}>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      mode="flat"
                      underlineColor="#424040"
                      activeUnderlineColor="#424040"
                      style={styles.input}
                      color="#fff"
                      onChangeText={handleChange('account_type')}
                      onBlur={handleBlur('account_type')}
                      label={<StyledText labelText="Account Type" />}
                      value={values.account_type}
                      theme={{ colors: { text: '#fff' } }}
                    />
                    <Text style={{ color: 'crimson' }}>
                      {touched.account_type && errors.account_type}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  mode="flat"
                  underlineColor="#424040"
                  activeUnderlineColor="#424040"
                  style={styles.input}
                  keyboardType='phone-pad'
                  color="#fff"
                  onChangeText={handleChange('mobile_number')}
                  onBlur={handleBlur('mobile_number')}
                  value={values.mobile_number}
                  label={<StyledText labelText="Mobile No" />}
                  theme={{ colors: { text: '#fff' } }}
                />
              </View>
              <Text style={{ color: 'crimson' }}>
                {touched.mobile_number && errors.mobile_number}
              </Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  mode="flat"
                  underlineColor="#424040"
                  activeUnderlineColor="#424040"
                  style={styles.input}
                  color="#fff"
                  onChangeText={handleChange('bank_name')}
                  onBlur={handleBlur('bank_name')}
                  value={values.bank_name}
                  label={<StyledText labelText="Name as on Bank Account" />}
                  theme={{ colors: { text: '#fff' } }}
                />
              </View>
              <Text style={{ color: 'crimson' }}>{touched.bank_name && errors.bank_name}</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  mode="flat"
                  underlineColor="#424040"
                  activeUnderlineColor="#424040"
                  style={styles.input}
                  color="#fff"
                  onChangeText={handleChange('upi_address')}
                  value={values.upi_address}
                  onBlur={handleBlur('upi_address')}
                  label={<StyledText labelText="UPI Address with Bank" />}
                  theme={{ colors: { text: '#fff' } }}
                />
              </View>
              <Text style={{ color: 'crimson' }}>{touched.upi_address && errors.upi_address}</Text>
            </ScrollView>
            <Button
              style={styles.button}
              contentStyle={{ paddingVertical: 10 }}
              color={colors.yellowLg}
              onPress={handleSubmit}
              // onPress={() => navigation.navigate('BankDetailsAlmostDone')}
              mode="contained">
              Next
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  formContainer: {
    padding: 10,
  },
  rowCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 15,
  },
  headerContainer: {
    padding: 20,
  },
  sub: {
    fontFamily: 'Monstserrat-Regular',
    color: 'white',
    // fontStyle: 'bold',
    fontWeight: '700',
    fontSize: 16,
  },
  caption: {
    fontFamily: 'Monstserrat-Regular',
    color: '#6E6E6E',
    fontSize: 13,
    margin: 0,
  },
  stepCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
  stepLine: {
    height: 4,
    width: '110%',
    backgroundColor: '#424141',
    position: 'absolute',
    top: '17%',
    left: '60%',
  },
  stepLineActive: {
    height: 4,
    width: '110%',
    backgroundColor: '#E29224',
    position: 'absolute',
    top: '17%',
    left: '60%',
  },
  stepLine2: {
    height: 4,
    width: '150%',
    backgroundColor: '#424141',
    position: 'absolute',
    top: '17%',
    left: '60%',
  },
  stepLine2Active: {
    height: 4,
    width: '150%',
    backgroundColor: '#E29224',
    position: 'absolute',
    top: '17%',
    left: '60%',
  },
  stepWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  roundShape: {
    height: 20,
    width: 20,
    borderRadius: 100,
    backgroundColor: '#424141',
    marginBottom: 8,
  },
  roundShapeActive: {
    height: 20,
    width: 20,
    borderRadius: 100,
    backgroundColor: '#E29224',
    marginBottom: 8,
  },
  stepText: {
    textAlign: 'center',
    color: '#424141',
  },
  stepTextActive: {
    textAlign: 'center',
    color: '#E29224',
  },
  button: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 20,
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#424040',
    color: '#fff',
    borderRadius: 5,
    height: 55,
  },
  inputWrapper: {
    backgroundColor: 'transparent',
    // marginVertical: 15,
    padding: 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
  },
  errorWrapper: {
    backgroundColor: 'transparent',
    // marginVertical: 15,
    padding: 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    borderColor: 'red',
    borderWidth: 0,
    borderRadius: 5,
  },
});

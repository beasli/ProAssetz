/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
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
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
const formSchema = yup.object({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string('Last name is required').required(),
  email: yup.string().email().required(),
  proassetz_id: yup.string().required('Proassetz ID is required'),
  date: yup.string().required('Date of birth is required'),
  phone: yup.string().required('Phone no is required'),
  address: yup.string().required('Address is required'),
  national_id: yup.string().required('National ID is required'),
  pincode: yup.string().required('Pin code is required'),
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
  return <Text style={{ color: '#6E6E6E', fontWeight: 'bold' }}>{labelText}</Text>;
}
export default function BankDetailsAlmostDone(props) {
  const token = props?.route?.params;
  console.log('TOOOOOOKKKKKEEN', token);
  const [currDoc, setCurrDoc] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const [panCard, setPanCard] = React.useState('');
  const [cancelCheque, setCancelCheque] = React.useState('');
  const showDialog = () => setVisible(true);
  const navigation = useNavigation();

  const hideDialog = () => setVisible(false);

  const openDialog = (location) => {
    showDialog();
    setCurrDoc(location);
  };
  const takepicnow = (type, location) => {
    if (type === 'camera') {
      ImagePicker.openCamera({
        cropping: true,
        freeStyleCropEnabled: true,
      }).then((image) => {
        console.log(image);
        switch (location) {
          case 'panCard':
            setPanCard(image.path);
            break;
          case 'cancelCheque':
            setCancelCheque(image.path);
            break;
        }
        hideDialog();
      });
    }
    if (type === 'gallery') {
      ImagePicker.openPicker({
        cropping: true,
        freeStyleCropEnabled: true,
      }).then((image) => {
        console.log(image);
        switch (location) {
          case 'panCard':
            setPanCard(image.path);
            break;
          case 'cancelCheque':
            setCancelCheque(image.path);
            break;
        }
        hideDialog();
      });
    }
  };
  const checkStatusMove = () => {
    axios
      .get('https://www.proassetz.com/api/v1/kyc-submission-status/', {
        headers: { Authorization: `Bearer ${props?.route?.params?.token}` },
      })
      .then(function (response) {
        console.log('status check', response);
        // setSnackMssg(`Success: ${response.data.message}`);
        // onToggleSnackBar();
        if (response.data.message == 'SUBMITTED') {
          navigation.navigate('KYCSubmitted');
        } else if (
          response.data.message !== 'NOT SUBMITTED' ||
          response.data.message !== 'NOTSUBMITTED' ||
          response.data.message !== 'ALREADY SUBMITTED'
        ) {
          navigation.navigate('KYCUnable');
        } else {
          navigation.navigate('KYCAlready');
        }
      })
      .catch(function (error) {
        // setSnackMssg('eerr', error);
        // onToggleSnackBar();
        console.log(error);
      });
  };
  const submitImgForm = () => {
    // https://www.proassetz.com/api/v1/kyc-status-check/
    if (panCard == '' || cancelCheque == '') {
      // if (false) {
      setSnackMssg('Upload Images first');
      onToggleSnackBar();
    } else {
      axios
        .get('https://www.proassetz.com/api/v1/kyc-status-check/', {
          headers: { Authorization: `Bearer ${props?.route?.params?.token}` },
        })
        .then(function (response) {
          console.log('SUBMIT', response);
          // setInitForm(response.data.data);
          setSnackMssg(`Success: ${response.data.message.english}`);
          onToggleSnackBar();
          // check status here
          setTimeout(() => {
            checkStatusMove();
          }, 100);
        })
        .catch(function (error) {
          setSnackMssg('cant sub', error);
          onToggleSnackBar();
          console.log(error);
        });
    }
  };
  const [snackMssg, setSnackMssg] = React.useState('');

  const [visibleS, setVisibleS] = React.useState(false);
  const onToggleSnackBar = () => setVisibleS(!visibleS);

  const onDismissSnackBar = () => setVisibleS(false);
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
        initialValues={{
          email: '',
          first_name: '',
          last_name: '',
          proassetz_id: '',
          date: new Date(),
          phone: '',
          address: '',
          national_id: '',
        }}
        validationSchema={formSchema}
        onSubmit={(values) => {
          console.log('sub', values);
        }}>
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
          <>
            <ScrollView style={{ marginTop: 10 }}>
              <Subheading style={styles.sub}>Upload Your Pan Card</Subheading>
              <Caption style={styles.caption}>Upload clear JPG/PNG Files upto 5MB</Caption>
              <View style={styles.inputWrapper}>
                <TextInput
                  mode="flat"
                  underlineColor="#424040"
                  activeUnderlineColor="#424040"
                  style={styles.input}
                  onChangeText={handleChange('pancard')}
                  onBlur={handleBlur('pancard')}
                  onFocus={() => openDialog('panCard')}
                  showSoftInputOnFocus={false}
                  color="#fff"
                  right={<TextInput.Icon name="checkbox-blank-circle" color={panCard !== '' ? 'green' : '#6E6E6E'} />}
                  left={
                    panCard !== '' ? (
                      <TextInput.Icon
                        name={() => <ImageThumbnail src={panCard} />}
                        color={'#6E6E6E'}
                      />
                    ) : (
                      <TextInput.Icon name="card-account-details" color={'#6E6E6E'} />
                    )
                  }
                  label={<StyledText labelText="Upload Document Front" />}
                  theme={{ colors: { text: '#fff' } }}
                />
              </View>
              <Text style={{ color: 'pink' }}>{touched.pancard && errors.pancard}</Text>
              <Subheading style={styles.sub}>Upload a copy of a Cancel Cheque</Subheading>
              <Caption style={styles.caption}>Upload clear JPG/PNG Files upto 5MB</Caption>
              <View style={styles.inputWrapper}>
                <TextInput
                  mode="flat"
                  underlineColor="#424040"
                  activeUnderlineColor="#424040"
                  style={styles.input}
                  onChangeText={handleChange('cancel_cheque')}
                  onBlur={handleBlur('cancel_cheque')}
                  onFocus={() => openDialog('cancelCheque')}
                  showSoftInputOnFocus={false}
                  color="#fff"
                  right={<TextInput.Icon name="checkbox-blank-circle" color={cancelCheque !== '' ? 'green' : '#6E6E6E'} />}
                  left={
                    cancelCheque !== '' ? (
                      <TextInput.Icon
                        name={() => <ImageThumbnail src={cancelCheque} />}
                        color={'#6E6E6E'}
                      />
                    ) : (
                      <TextInput.Icon name="card-account-details" color={'#6E6E6E'} />
                    )
                  }
                  label={<StyledText labelText="Upload Document Back" />}
                  theme={{ colors: { text: '#fff' } }}
                />
              </View>
              <Text style={{ color: 'pink' }}>{touched.cancel_cheque && errors.cancel_cheque}</Text>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Mode</Dialog.Title>
                <Dialog.Content>
                  <Text>Select an option</Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => takepicnow('gallery', currDoc)}>Gallery</Button>
                  <Button onPress={() => takepicnow('camera', currDoc)}>Camera</Button>
                </Dialog.Actions>
              </Dialog>
            </ScrollView>
            <Button
              style={styles.button}
              contentStyle={{ paddingVertical: 10 }}
              color={colors.yellowLg}
              onPress={submitImgForm}
              mode="contained">
              Next
            </Button>
          </>
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
    marginVertical: 15,
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

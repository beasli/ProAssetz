/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, ScrollView, Image, AsyncStorage, FlatList } from 'react-native';
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
import { Formik, useFormikContext } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import _ from 'lodash';
import FormData from 'form-data';
const formSchema = yup.object({
  // first_name: yup.string().required('First name is required'),
  // last_name: yup.string('Last name is required').required(),
  // email: yup.string().email().required(),
  // proassetz_id: yup.string().required('Proassetz ID is required'),
  date: yup.string().required('Date of birth is required'),
  phone: yup.string().min(10, '10 Digits Required').max(10, '10 Digits Required').required('Phone no is required'),
  address: yup.string().required('Address is required'),
  national_id: yup.string().required('National ID is required'),
  pincode: yup.string().required('Pin code is required'),
  city: yup.string().required('City is required'),
  state: yup.string(),
  country: yup.string().required('country is required'),
});
function StyledText({ labelText }) {
  return <Text style={{ color: '#6E6E6E', fontWeight: 'bold' }}>{labelText}</Text>;
}
function Header({ index }) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.stepCon}>
        <View style={styles.stepWrapper}>
          <View style={index !== 0 ? styles.stepLineActive : styles.stepLine} />
          <View style={styles.roundShapeActive} />
          <Text style={styles.stepTextActive}>Personal Details</Text>
        </View>
        <View style={styles.stepWrapper}>
          <View style={index === 2 ? styles.stepLine2Active : styles.stepLine2} />
          <View style={index === 1 || index === 2 ? styles.roundShapeActive : styles.roundShape} />
          <Text style={index === 1 || index === 2 ? styles.stepTextActive : styles.stepText}>
            KYC Details
          </Text>
        </View>
        <View style={styles.stepWrapper}>
          <View style={index === 2 ? styles.roundShapeActive : styles.roundShape} />
          <Text style={index === 2 ? styles.stepTextActive : styles.stepText}>KYC Documents</Text>
        </View>
      </View>
    </View>
  );
}
function BottomButton({
  title,
  setStepIndex,
  index,
  handleSubmit,
  allDocsUploaded,
  setSnackMssg,
  onToggleSnackBar,
}) {
  const navigation = useNavigation();
  const { submitForm } = useFormikContext();
  const handleSubmitx = () => {
    submitForm();
  };
  return (
    <Button
      style={styles.button}
      // contentStyle={{ paddingVertical: 10 }}
      color={colors.yellowLg}
      mode="contained"
      labelStyle={{
        // ...styles.button,
        textAlign: 'center',
        color: '#473200',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
        fontWeight: '600',
        paddingVertical: 5,
        textTransform: 'none',
      }}
      onPress={() => {
        // handleSubmitForm1();
        if (index === 1) {
          // alert('sub now');
          submitForm();
        }
        if (index === 2) {
          if (!allDocsUploaded) {
            setSnackMssg('Upload all documents before proceeding');
            onToggleSnackBar();
          } else {
            navigation.navigate('BankDetails');
          }
        } else {
          if (index !== 1) {
            // alert('1 now');
            setStepIndex(index + 1);
          }
        }
      }}>
      {index === 2 ? 'Submit' : title}
    </Button>
  );
}
function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
}
export default function KYCwizard() {
  const [stepIndex, setStepIndex] = React.useState(0);
  const [token, setToken] = React.useState('');
  const [initForm, setInitForm] = React.useState('');
  const [snackMssg, setSnackMssg] = React.useState('');
  const [visibleS, setVisibleS] = React.useState(false);
  const onToggleSnackBar = () => setVisibleS(!visibleS);

  const onDismissSnackBar = () => setVisibleS(false);
  const getAuthState = async () => {
    console.log('getAIthAStatge');
    try {
      const authDataString = await AsyncStorage.getItem('auth');
      const authData = JSON.parse(authDataString || {});
      console.log(authData);
      getFormData(authData.token);
      setToken(authData.token);
      // Configure axios headers
      // configureAxiosHeaders(authData.token, authData.phone);
      // setAuthState(authData);
    } catch (err) {
      console.log(err);
      // setToken({});
    }
  };
  const getFormData = (token) => {
    axios
      .get('https://www.proassetz.com/api/v1/update-kyc-details/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        // console.log('FORM_DATA(((', response.data.data);
        setInitForm(response.data.data);
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  };
  React.useEffect(() => {
    getAuthState();
  }, []);

  const sendBasicForm = (formData) => {
    let date = formatDate(formData.date);
    const payload = {
      address: formData.address,
      city: formData.city,
      country: formData.country,
      country_code: '+91',
      dob: date,
      id_number: formData.national_id,
      phone_number: formData.phone,
      postal_code: formData.pincode,
      state: formData.state,
    };
    axios
      .post('https://www.proassetz.com/api/v1/update-kyc-details/', payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // alert('siic',JSON.stringify(res.response))
        console.log('res**', res.data.message.english);
        // console.log('res33333', res._response);
        // let e = Object.values(res.data.message)[0][0];
        // console.log(e, 'form basic');
        setSnackMssg(`Success : ${res.data.message.english}`);
        onToggleSnackBar();
        setStepIndex(stepIndex + 1);
      })
      .catch((err) => {
        // console.log(err.response.data.message);
        // console.log( err.response.data.data.message);
        let e = Object.values(err?.response?.data?.message)[0][0];
        // console.log(e,'ee')
        setSnackMssg(`Error : ${e}`);
        onToggleSnackBar();
      });
    console.log(payload, 'payload');
  };
  const [allDocsUploaded, setAllDocsUploaded] = React.useState(false);

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
        // innerRef={ref}
        enableReintialize={true}
        initialValues={{
          date: new Date(),
          phone: '',
          address: '',
          national_id: '',
          pincode: '',
          city: '',
          state: '',
          country: '',
        }}
        validationSchema={formSchema}
        onSubmit={(values) => {
          console.log('sub', values);
          sendBasicForm(values);
        }}>
        {({ setValues, handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
          <>
            <ScrollView style={styles.wizardWrapper}>
              <Header index={stepIndex} />
              <KYCForm
                index={stepIndex}
                initFormData={initForm}
                handleBlur={handleBlur}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                values={values}
                touched={touched}
                errors={errors}
                setValues={setValues}
                token={token}
                allDocsUploaded={allDocsUploaded}
                setAllDocsUploaded={setAllDocsUploaded}
                onToggleSnackBar={onToggleSnackBar}
                setSnackMssg={setSnackMssg}
              />
            </ScrollView>
            <BottomButton
              title={'Next'}
              index={stepIndex}
              setStepIndex={setStepIndex}
              handleSubmit={handleSubmit}
              allDocsUploaded={allDocsUploaded}
              onToggleSnackBar={onToggleSnackBar}
              setSnackMssg={setSnackMssg}
            />
          </>
        )}
      </Formik>
    </View>
  );
}

function KYCForm({
  index,
  initFormData,
  handleChange,
  handleBlur,
  handleSubmit,
  values,
  touched,
  errors,
  setValues,
  token,
  allDocsUploaded,
  setAllDocsUploaded,
  setSnackMssg,
  onToggleSnackBar,
}) {
  const [initialValues, setInitialValues] = React.useState(_.cloneDeep(initFormData));

  React.useEffect(() => {
    // console.log(initFormData, 'initFOrm');
    if (initFormData !== '') {
      let x = _.cloneDeep(initFormData);
      let temp = {
        email: x.email,
        first_name: x.first_name,
        last_name: x.last_name,
        proassetz_id: x.custom_user_id,
        date: new Date(),
        phone: '',
        address: '',
        national_id: '',
      };
      console.log(temp, 'tmep');
      setInitialValues(temp);
      // Formik.resetForm()
    }
  }, [initFormData]);
  return (
    //    Personal info form
    <ScrollView style={styles.formContainer}>
      <Subheading style={styles.sub}>
        {index === 0 || index === 1 ? 'Basic information' : 'Upload Document'}
      </Subheading>
      <Caption style={styles.caption}>
        {index === 0 || index === 1
          ? 'Verify Your details as per your document'
          : 'Upload clear JPG/PNG Files upto 5MB'}
      </Caption>
      {index === 0 && <PersonalForm data={initFormData} />}
      <ScrollView style={styles.innerContainer}>
        {index === 1 && (
          <KYCDetailsForm
            handleBlur={handleBlur}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            touched={touched}
            errors={errors}
            setValues={setValues}
          />
        )}
        {index === 2 && (
          <UploadDocumentsForm
            handleBlur={handleBlur}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            touched={touched}
            errors={errors}
            token={token}
            allDocsUploaded={allDocsUploaded}
            setAllDocsUploaded={setAllDocsUploaded}
            setSnackMssg={setSnackMssg}
            onToggleSnackBar={onToggleSnackBar}
          />
        )}
      </ScrollView>
    </ScrollView>
  );
}
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
const UploadDocumentsForm = ({
  handleChange,
  handleBlur,
  handleSubmit,
  values,
  touched,
  errors,
  token,
  allDocsUploaded,
  setAllDocsUploaded,
  setSnackMssg,
  onToggleSnackBar,
}) => {
  const [checked, setChecked] = React.useState(true);
  const [checked2, setChecked2] = React.useState(false);
  const [selfie, setSelfie] = React.useState('');
  const [docFront, setdocFront] = React.useState('');
  const [docBack, setdocBack] = React.useState('');
  const [docAndSelfie, setdocAndSelfie] = React.useState('');
  const [currDoc, setCurrDoc] = React.useState(null);
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const openDialog = (location) => {
    showDialog();
    setCurrDoc(location);
  };
  const areDocumentsUploaded = () => {
    if (
      selfie !== '' &&
      docFront !== '' &&
      docBack !== '' &&
      docBack !== '' &&
      docAndSelfie !== ''
    ) {
      setTimeout(() => {
        setAllDocsUploaded(!allDocsUploaded);
        setSnackMssg('All documents successfully uploaded');
        onToggleSnackBar();
      }, 100);
    } else {
      // setAllDocsUploaded(false);
    }
  };
  React.useEffect(() => {
    if (selfie !== '') {
      postPic('user_profile_image', selfie);
    }
  }, [selfie]);
  React.useEffect(() => {
    if (docBack !== '') {
      let docBName = checked2 ? 'driving_license_back_image' : 'passport_back_image';
      postPic(docBName, docBack);
    }
  }, [docBack]);
  React.useEffect(() => {
    if (docFront !== '') {
      let docFName = checked2 ? 'driving_license_front_image' : 'passport_front_image';
      postPic(docFName, docFront);
      postPic('user_profile_image', docFront);
    }
  }, [docFront]);
  React.useEffect(() => {
    if (docAndSelfie !== '') {
      postPic('person_holding_passport_front', docAndSelfie);
    }
  }, [docAndSelfie]);
  const postPic = (name, file) => {
    console.log({ name, file }, 'payload');
    //create object with uri, type, image name
    let fileName = file.split('/').pop();
    var photo = {
      uri: file,
      type: 'image/jpeg',
      name: fileName,
    };
    //use formdata
    var formData = new FormData();
    //append created photo{} to formdata
    formData.append(name, photo);
    axios({
      method: 'POST',
      url: 'https://www.proassetz.com/api/v1/update-kyc-documents/',
      data: formData,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: (data, headers) => {
        // !!! override data to return formData
        // since axios converts that to string
        return formData;
      },
    })
      .then(function (response) {
        console.log(response, 'pppp');
        areDocumentsUploaded();
      })
      .catch(function (error) {
        console.log(error.response);
        areDocumentsUploaded();
      });

    areDocumentsUploaded();
  };
  const takepicnow = (type, location) => {
    if (type === 'camera') {
      ImagePicker.openCamera({
        cropping: true,
        freeStyleCropEnabled: true,
      }).then((image) => {
        console.log(image);
        switch (location) {
          case 's':
            setSelfie(image.path);
            break;
          case 'df':
            setdocFront(image.path);
            break;
          case 'db':
            setdocBack(image.path);
            break;
          case 'ds':
            setdocAndSelfie(image.path);
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
          case 's':
            setSelfie(image.path);
            break;
          case 'df':
            setdocFront(image.path);
            break;
          case 'db':
            setdocBack(image.path);
            break;
          case 'ds':
            setdocAndSelfie(image.path);
            break;
        }
        hideDialog();
      });
    }
  };
  /** TODO:
   * 1. Img thumbnail component
   * 2. Camera or Gallery Dialog
   * 3. Remaining form
   * 4. KYC status screens
   * 5. Two Factor Auth.
   * 6. OTP login.
   */
  return (
    <ScrollView style={{ marginTop: 10 }}>
      <View style={{ ...styles.inputWrapper, justifyContent: 'space-between' }}>
        <TextInput
          mode="flat"
          underlineColor="#424040"
          activeUnderlineColor="#424040"
          style={{ ...styles.input, marginVertical: 5 }}
          color="#fff"
          onChangeText={handleChange('selfie')}
          onBlur={handleBlur('selfie')}
          showSoftInputOnFocus={false}
          right={
            <TextInput.Icon
              name="checkbox-blank-circle"
              color={selfie !== '' ? 'green' : '#6E6E6E'}
            />
          }
          left={
            selfie !== '' ? (
              <TextInput.Icon name={() => <ImageThumbnail src={selfie} />} color={'#6E6E6E'} />
            ) : (
              <TextInput.Icon name="account" color={'#6E6E6E'} />
            )
          }
          onFocus={() => openDialog('s')}
          label={<StyledText labelText="Upload Selfie" />}
          theme={{ colors: { text: '#fff' } }}
        />
      </View>
      <Text style={{ color: 'pink' }}>{touched.selfie && errors.selfie}</Text>
      <Caption style={styles.caption}>Select Document Type to upload</Caption>
      <View style={styles.rowCon}>
        <View
          style={{
            width: '50%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Checkbox
            uncheckedColor="#6E6E6E"
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
              setChecked2(!checked2);
            }}
          />
          <Text style={{ color: '#6E6E6E', marginLeft: 4 }}>Passport</Text>
        </View>
        <View
          style={{
            width: '50%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Checkbox
            uncheckedColor="#6E6E6E"
            status={checked2 ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked2(!checked2);
              setChecked(!checked);
            }}
          />
          <Text style={{ color: '#6E6E6E', marginLeft: 4 }}>Aadhar Card</Text>
        </View>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          mode="flat"
          underlineColor="#424040"
          activeUnderlineColor="#424040"
          style={styles.input}
          onChangeText={handleChange('doc_front')}
          onBlur={handleBlur('doc_front')}
          onFocus={() => openDialog('df')}
          showSoftInputOnFocus={false}
          color="#fff"
          right={
            <TextInput.Icon
              name="checkbox-blank-circle"
              color={docFront !== '' ? 'green' : '#6E6E6E'}
            />
          }
          //   left={<TextInput.Icon name="card-account-details" color={'#6E6E6E'} />}
          left={
            docFront !== '' ? (
              <TextInput.Icon name={() => <ImageThumbnail src={docFront} />} color={'#6E6E6E'} />
            ) : (
              <TextInput.Icon name="card-account-details" color={'#6E6E6E'} />
            )
          }
          label={<StyledText labelText="Upload Document Front" />}
          theme={{ colors: { text: '#fff' } }}
        />
      </View>
      <Text style={{ color: 'pink' }}>{touched.doc_front && errors.doc_front}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          mode="flat"
          underlineColor="#424040"
          activeUnderlineColor="#424040"
          style={styles.input}
          onChangeText={handleChange('doc_back')}
          onBlur={handleBlur('doc_back')}
          onFocus={() => openDialog('db')}
          showSoftInputOnFocus={false}
          color="#fff"
          right={
            <TextInput.Icon
              name="checkbox-blank-circle"
              color={docBack !== '' ? 'green' : '#6E6E6E'}
            />
          }
          left={
            docBack !== '' ? (
              <TextInput.Icon name={() => <ImageThumbnail src={docBack} />} color={'#6E6E6E'} />
            ) : (
              <TextInput.Icon name="card-account-details" color={'#6E6E6E'} />
            )
          }
          label={<StyledText labelText="Upload Document Back" />}
          theme={{ colors: { text: '#fff' } }}
        />
      </View>
      <Text style={{ color: 'pink' }}>{touched.doc_back && errors.doc_back}</Text>
      <Subheading style={styles.sub}>Upload Document</Subheading>
      <Caption style={styles.caption}>Your details as it appears on your documents</Caption>
      <View style={styles.inputWrapper}>
        <TextInput
          mode="flat"
          underlineColor="#424040"
          activeUnderlineColor="#424040"
          style={{ ...styles.input, marginTop: 10 }}
          onChangeText={handleChange('selfie_doc')}
          onBlur={handleBlur('selfie_doc')}
          onFocus={() => openDialog('ds')}
          showSoftInputOnFocus={false}
          color="#fff"
          right={
            <TextInput.Icon
              name="checkbox-blank-circle"
              color={docAndSelfie !== '' ? 'green' : '#6E6E6E'}
            />
          }
          left={
            docAndSelfie !== '' ? (
              <TextInput.Icon
                name={() => <ImageThumbnail src={docAndSelfie} />}
                color={'#6E6E6E'}
              />
            ) : (
              <TextInput.Icon name="card-account-details" color={'#6E6E6E'} />
            )
          }
          label={<StyledText labelText="Upload Selfie with Document" />}
          theme={{ colors: { text: '#fff' } }}
        />
      </View>
      <Text style={{ color: 'pink' }}>{touched.selfie_doc && errors.selfie_doc}</Text>
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
  );
};
const KYCDetailsForm = ({
  setValues,
  handleChange,
  handleBlur,
  handleSubmit,
  values,
  touched,
  errors,
}) => {
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);
  const [cons, setCons] = React.useState([]);
  // let x = new Date()
  // let formattedDate = formatDate('Sun May 11,2014');
  const [date, setDate] = React.useState(new Date());
  React.useEffect(() => {
    axios
      .get('https://www.proassetz.com/api/v1/country-list/')
      .then(function (response) {
        let temp = response.data.map((el) => {
          return el.name;
        });
        setCons(temp);
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  }, []);
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    // alert(formatDate(currentDate))
    setDate(currentDate);
    setValues({ ...values, date: currentDate });
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const [conSelected, setconSelected] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const [visible1, setVisible1] = React.useState(false);

  const openMenu1 = () => setVisible1(true);

  const closeMenu1 = (c) => {
    setVisible1(false);
    setValues({ ...values, country: c });
    handleChange('country')(c);
    handleBlur('country');
  };
  return (
    <ScrollView>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          dateFormat="day month year"
          onChange={onChangeDate}
        />
      )}
      <View style={styles.inputWrapper}>
        <TextInput
          mode="flat"
          underlineColor="#424040"
          activeUnderlineColor="#424040"
          style={styles.input}
          color="#fff"
          value={formatDate(date)}
          onChangeText={handleChange('date')}
          onBlur={handleBlur('date')}
          label={<StyledText labelText="Date Of Birth" />}
          theme={{ colors: { text: '#fff' } }}
          right={
            <TextInput.Icon
              name="calendar-blank-outline"
              color={colors.grayMed}
              onPress={showDatepicker}
            />
          }
        />
      </View>
      {/* <Text style={{ color: 'crimson' }}>selected: {converDate(date)}</Text> */}
      <Text style={{ color: 'crimson' }}>{touched.date && errors.date}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          mode="flat"
          underlineColor="#424040"
          activeUnderlineColor="#424040"
          style={styles.input}
          color="#fff"
          onChangeText={handleChange('national_id')}
          onBlur={handleBlur('national_id')}
          label={<StyledText labelText="Enter National ID No" />}
          theme={{ colors: { text: '#fff' } }}
        />
      </View>
      <Text style={{ color: 'crimson' }}>{touched.national_id && errors.national_id}</Text>
      <View style={styles.rowCon}>
        <View
          style={{
            width: '49%',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <Menu
            visible={visible1}
            onDismiss={closeMenu1}
            anchor={
              <Button
                labelStyle={{ color: '#6E6E6E' }}
                onPress={openMenu1}
                icon={'menu-down'}
                contentStyle={{
                  width: '100%',
                  // paddingVertical: 9,
                  flexDirection: 'row-reverse',
                  height: 50,
                  color: 'red',
                }}
                style={{
                  backgroundColor: '#424141',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}>
                {conSelected === '' ? 'Select Country' : conSelected}
              </Button>
            }>
            <Menu.Item
              onPress={() => {
                setconSelected('India');
                closeMenu1('India');
                // setTimeout(() => {
                //   // closeMenu1('India');
                // }, 10);
              }}
              title="India"
            />
          </Menu>
          <Text style={{ color: 'crimson' }}>{touched.country && errors.country}</Text>
        </View>
        <View
          style={{
            width: '50%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View style={styles.inputWrapper}>
            <TextInput
              mode="flat"
              underlineColor="#424040"
              activeUnderlineColor="#424040"
              style={{ ...styles.input, top: 3 }}
              color="#fff"
              onChangeText={handleChange('state')}
              onBlur={handleBlur('state')}
              label={<StyledText labelText="Enter state" />}
              theme={{ colors: { text: '#fff' } }}
            />
            <Text style={{ color: 'crimson' }}>{touched.state && errors.state}</Text>
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
          onChangeText={handleChange('address')}
          onBlur={handleBlur('address')}
          label={<StyledText labelText="Enter Your Address" />}
          theme={{ colors: { text: '#fff' } }}
        />
        <Text style={{ color: 'crimson' }}>{touched.address && errors.address}</Text>
      </View>
      <View style={styles.rowCon}>
        <View
          style={{
            width: '50%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View style={styles.inputWrapper}>
            <TextInput
              mode="flat"
              underlineColor="#424040"
              activeUnderlineColor="#424040"
              style={styles.input}
              color="#fff"
              onChangeText={handleChange('city')}
              onBlur={handleBlur('city')}
              label={<StyledText labelText="Enter City" />}
              theme={{ colors: { text: '#fff' } }}
            />
            <Text style={{ color: 'crimson' }}>{touched.city && errors.city}</Text>
          </View>
        </View>
        <View
          style={{
            width: '50%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View style={styles.inputWrapper}>
            <TextInput
              mode="flat"
              underlineColor="#424040"
              activeUnderlineColor="#424040"
              style={styles.input}
              color="#fff"
              keyboardType='phone-pad'
              onChangeText={handleChange('pincode')}
              onBlur={handleBlur('pincode')}
              label={<StyledText labelText="Enter Pin Code" />}
              theme={{ colors: { text: '#fff' } }}
            />
            <Text style={{ color: 'crimson' }}>{touched.pincode && errors.pincode}</Text>
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
          onChangeText={handleChange('phone')}
          onBlur={handleBlur('phone')}
          keyboardType='phone-pad'
          label={<StyledText labelText="Enter Phone No" />}
          theme={{ colors: { text: '#fff' } }}
        />
      </View>
      <Text style={{ color: 'crimson' }}>{touched.phone && errors.phone}</Text>
    </ScrollView>
  );
};

const PersonalForm = ({ data }) => {
  return (
    <ScrollView style={{ marginTop: 10 }}>
      <View style={styles.inputWrapper}>
        <TextInput
          mode="flat"
          underlineColor="#424040"
          activeUnderlineColor="#424040"
          style={styles.input}
          value={data.first_name}
          color="#fff"
          label={<StyledText labelText="First Name" />}
          theme={{ colors: { text: '#fff' } }}
          disabled
        />
        <Text />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          mode="flat"
          underlineColor="#424040"
          activeUnderlineColor="#424040"
          style={styles.input}
          value={data.last_name}
          color="#fff"
          label={<StyledText labelText="Last Name" />}
          theme={{ colors: { text: '#fff' } }}
          disabled
        />
        <Text />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          mode="flat"
          underlineColor="#424040"
          activeUnderlineColor="#424040"
          style={styles.input}
          value={data.email}
          keyboardType='email-address'
          color="#fff"
          label={<StyledText labelText="Email ID" />}
          theme={{ colors: { text: '#fff' } }}
          disabled
        />
        <Text />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          mode="flat"
          underlineColor="#424040"
          activeUnderlineColor="#424040"
          style={styles.input}
          value={data.custom_user_id}
          disabled
          color="#fff"
          label={<StyledText labelText="Proassetz ID" />}
          theme={{ colors: { text: '#fff' } }}
        />
        <Text />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
    flex: 1,
    justifyContent: 'space-between',
  },
  formContainer: {
    padding: 10,
  },
  rowCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
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
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 20,
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
    padding: 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    marginTop: 8,
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
    marginTop: 8,
  },
});

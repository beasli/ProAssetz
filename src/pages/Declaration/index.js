/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Checkbox, Button, Snackbar } from 'react-native-paper';
import { colors } from '../../constants';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

// import { Container } from './styles';

const Declaration = (props) => {
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  const [checked4, setChecked4] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);

  const [snackMssg, setSnackMssg] = React.useState('');
  const [visibleS, setVisibleS] = React.useState(false);
  const onToggleSnackBar = () => setVisibleS(!visibleS);
  const onDismissSnackBar = () => setVisibleS(false);

  const navigation = useNavigation();

  const scrollView = React.useRef();
  React.useEffect(() => {
    if (checked1 && checked2 && checked3 && checked4) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [checked1, checked2, checked3, checked4]);

  const handleAccept = async() => {
    createAcc(props.route.params.formData);
  };
  const createAcc = async(formData) => {
    console.log('fd afte ec', formData);
    await axios
      .post(`https://www.proassetz.com/api/v1/user-registration/?referral_code=${formData.refferal_code}`, {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        terms_and_condition: 1,
      })
      .then(function (response) {
        console.log(response);
        // alert(response)
        navigation.navigate('VerifyEmail', { formData });
      })
      .catch(function (error) {
        // alert(error)
        console.log('====>', error.response.data);
        // alert(JSON.stringify(error.response?.data?.message))
        
        if(error.response?.data?.message?.email){
          // alert(JSON.stringify(error.response?.data?.message?.email[0]))
          setSnackMssg(JSON.stringify(error.response?.data?.message?.email[0]))
          onToggleSnackBar();
        }else{
          // alert(JSON.stringify(error.response?.data));
          setSnackMssg("Somethings went wrong....")
          onToggleSnackBar();
        }
      });
  };
  return (
    <>
    <View style={styles.container}>
     
      <ScrollView ref={scrollView} style={styles.scrollContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            justifyContent: 'space-around'
          }}>
          {/* <View style={{ padding: 0, marginRight: 10 }}> */}
          <Checkbox
            status={checked1 ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked1(!checked1);
            }}
            uncheckedColor={colors.yellowDark}
          />
          {/* </View> */}

         <View style={{paddingHorizontal: 10, marginHorizontal: 15}}>
         <Text
            style={{ color: '#fff', fontSize: 16, fontFamily: 'Nunito-SemiBold', textAlign: 'left', }}>
            I declare that I became acquainted  with{' '}
            <Text
              style={{
                color: colors.yellowDark,
                textAlign: 'center',
                fontFamily: 'Nunito-ExtraBold',
                fontWeight: '600',
                fontSize: 16,
              }}>
              Privacy policy
            </Text>{' '}
            for Indian users,
            <Text
              style={{
                color: colors.yellowDark,
                textAlign: 'center',
                fontFamily: 'Nunito-ExtraBold',
                fontWeight: '600',
                fontSize: 16,
              }}>{' '}
              Terms of use
            </Text>{' '}
            and{' '}
            <Text
              style={{
                color: colors.yellowDark,
                textAlign: 'center',
                fontFamily: 'Nunito-ExtraBold',
                fontWeight: '600',
                fontSize: 16,
              }}>{' '}
              Terms of condition
            </Text>{' '}
            for Indian users.
          </Text>
        
         </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            justifyContent: 'space-around'
          }}>
          <Checkbox
            status={checked2 ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked2(!checked2);
            }}
            theme={{ colors: { disabled: '#fff' } }}
            uncheckedColor={colors.yellowDark}
          />
          <View style={{paddingHorizontal: 10, marginHorizontal: 20}}>
          <Text
            style={{ color: '#fff', marginLeft: 4, fontSize: 16, fontFamily: 'Nunito-SemiBold', textAlign: 'left' }}>
            I consent to the processing of my personal data provided by me during 
            registration and collected during the  use of{' '}
            <Text
              style={{
                color: colors.yellowDark,
                textAlign: 'center',
                fontFamily: 'Nunito-ExtraBold',
                fontWeight: '600',
                fontSize: 16,
              }}>
              proassetz.com
            </Text>
            , collected in
             order to provide services offered on  the Website, in particular the sale{' '}
             and purchase of Crypto Assets.
          </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            justifyContent: 'space-around'
          }}>
          <Checkbox
            status={checked3 ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked3(!checked3);
              scrollView.current.scrollToEnd();
            }}
            uncheckedColor={colors.yellowDark}
          />
          <View style={{paddingHorizontal: 10, marginHorizontal: 20}}>
          <Text
            style={{ color: '#fff', marginLeft: 4, fontSize: 16, fontFamily: 'Nunito-SemiBold', textAlign: 'left' }}>
             I consent to the processing of my personal data in order to provide me with information on the operation of 
            the platform, new functionalities of
             the website, amendments to the  regulations and other documents, i.e {" "}
            <Text
              style={{
                color: colors.yellowDark,
                textAlign: 'center',
                fontFamily: 'Nunito-ExtraBold',
                fontWeight: '600',
                fontSize: 16,
              }}>
              Privacy Policy
            </Text>{' '}
            or AML
          </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            justifyContent: 'space-around'
          }}>
          <Checkbox
            status={checked4 ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked4(!checked4);
            }}
            uncheckedColor={colors.yellowDark}
          />
          <View style={{paddingHorizontal: 10, marginHorizontal: 20}}>
          <Text
            style={{ color: '#fff', marginLeft: 4, fontSize: 16, fontFamily: 'Nunito-SemiBold' , textAlign: 'left'}}>
            I consent to the processing of my personal data provided by me during 
            registration and collected during the  use of{' '}
            <Text
              style={{
                color: colors.yellowDark,
                textAlign: 'center',
                fontFamily: 'Nunito-ExtraBold',
                fontWeight: '600',
                fontSize: 16,
              }}>
              proassetz.com 
            </Text>
            , collected in
             order to provide services offered on  the Website, in particular the sale{' '}
             and purchase of Crypto Assets.
          </Text>
          </View>
        </View>
      </ScrollView>
      <Button
        disabled={disabled}
        dark={false}
        style={disabled ? styles.disabledButton : styles.button}
        onPress={handleAccept}
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
          Accept
        </Text>
      </Button>
    </View>
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
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: `${colors.yellowLg}`,
    paddingVertical: 8,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 20,
    borderRadius: 10,
  },
  container: {
    backgroundColor: colors.bgColor,
    // height: '100%',
    justifyContent: 'center',
    flex: 1,
    padding: 20,
    paddingBottom: 0,
  },
  scrollContainer: {
    // height: '100%',
    // flex:2,
    // backgroundColor:'red'
  },
  disabledButton: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 8,
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
});
export default Declaration;

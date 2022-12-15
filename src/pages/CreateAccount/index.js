/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../../constants';
import BasicInfoForm from './components/BasicInfoForm';
import { TextInput, Checkbox, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
function CreateAccount() {
  const navigation = useNavigation();
  const [disabled, setDisabled] = useState(false);

  return (
    <View style={styles.container}>
      <BasicInfoForm />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: `${colors.yellowLg}`,
    paddingVertical: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 20,
    borderRadius: 10,
  },
  disabledButton: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 20,
    borderRadius: 10,
  },
  container: {
    // marginTop: 32,
    paddingHorizontal: 24,
    backgroundColor: colors.bgColor,
    justifyContent: 'center',
    flex: 1,
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
  inputU: {
    color: '#000',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    padding: 0,
  },
});
export default CreateAccount;

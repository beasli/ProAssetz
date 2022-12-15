/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../constants";
import { TextInput, Card } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import Btn from "../reuseableComponents/Button";
import { useState } from "react";

const formSchema = yup.object({
  oldpass: yup.string().required("Old password is required"),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

function StyledText({ labelText }) {
  return (
    <Text style={{ color: "#6E6E6E", fontFamily: "Nunito-Bold" }}>
      {labelText}
    </Text>
  );
}
const PasswordValidator = ({ text }) => {
  const [specialCheck, setSpecialCheck] = React.useState(false);
  const [specialCheck2, setSpecialCheck2] = React.useState(false);
  const [specialCheck3, setSpecialCheck3] = React.useState(false);
  const [specialCheck4, setSpecialCheck4] = React.useState(false);
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
      style={{
        width: "90%",
        backgroundColor: "#363434",
        marginVertical: 5,
        alignSelf: "center",
      }}
      elevation={10}
      mode="elevated"
    >
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <View
          style={{
            margin: 10,
            height: 18,
            width: 18,
            borderWidth: specialCheck ? 0 : 1,
            borderColor: specialCheck ? "#079640" : `${colors.yellowLg}`,
            borderRadius: 100,
            borderStyle: specialCheck ? "solid" : "dashed",
            backgroundColor: specialCheck ? "#079640" : "transparent",
          }}
        />
        <Text style={{ color: "white", fontSize: 12 }}>
          Contains 1 Special Character ('!@#$%^&*')
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <View
          style={{
            margin: 10,
            height: 18,
            width: 18,
            borderWidth: specialCheck2 ? 0 : 1,
            borderColor: specialCheck2 ? "#079640" : `${colors.yellowLg}`,
            borderRadius: 100,
            borderStyle: specialCheck2 ? "solid" : "dashed",
            backgroundColor: specialCheck2 ? "#079640" : "transparent",
          }}
        />
        <View>
          <Text style={{ color: "white", fontSize: 12 }}>
            {" "}
            Contains 1 Uppercase letter
          </Text>
        </View>
      </View>
      <View
        style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center" }}
      >
        <View
          style={{
            margin: 10,
            height: 18,
            width: 18,
            borderWidth: specialCheck3 ? 0 : 1,
            borderColor: specialCheck3 ? "#079640" : `${colors.yellowLg}`,
            borderRadius: 100,
            borderStyle: specialCheck3 ? "solid" : "dashed",
            backgroundColor: specialCheck3 ? "#079640" : "transparent",
          }}
        />
        <Text style={{ color: "white", fontSize: 12 }}>
          {" "}
          Contains 1 Number{" "}
        </Text>
      </View>
      <View
        style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center" }}
      >
        <View
          style={{
            margin: 10,
            height: 18,
            width: 18,
            borderWidth: specialCheck4 ? 0 : 1,
            borderColor: specialCheck4 ? "#079640" : `${colors.yellowLg}`,
            borderRadius: 100,
            borderStyle: specialCheck4 ? "solid" : "dashed",
            backgroundColor: specialCheck4 ? "#079640" : "transparent",
          }}
        />

        <Text style={{ color: "white", fontSize: 12 }}>
          Minimum 8 Charaters with lowercase included
        </Text>
      </View>
    </Card>
  );
};
function BasicForm() {
  const navigation = useNavigation();
  const [oldpass, setoldpass] = useState("");

  React.useEffect(() => { }, []);
  const [pass1, setpass1] = React.useState(true);
  const [pass2, setpass2] = React.useState(true);
  // const handleCreateAccount = (formData) => {
  //   navigation.navigate("Declaration", { formData });
  // };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          oldpass: "",
          password: "",
          confirm_password: "",
        }}
        validationSchema={formSchema}
        onSubmit={(values) => {
          console.log("sub", values);
          handleCreateAccount(values);
        }}
      >
        {({ handleChange, handleBlur, values, touched, errors }) => (
          <View>
            <ScrollView style={{ marginTop: 0 }}>
              <View>
                <TextInput
                  mode="flat"
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  style={[
                    styles.input,
                    {
                      width: "90%",
                      borderWidth: touched.oldpass && errors.oldpass ? 1 : 0,
                      borderColor:
                        touched.oldpass && errors.oldpass ? "red" : "grey",
                    },
                  ]}
                  color="#fff"
                  onChangeText={handleChange("oldpass")}
                  onBlur={handleBlur("oldpass")}
                  label={<StyledText labelText="Old Password" />}
                  theme={{ colors: { text: "#fff" } }}
                />
              </View>
              <Text
                style={{ color: "#DC3030", width: "90%", alignSelf: "center" }}
              >
                {touched.oldpass && errors.oldpass}
              </Text>
              <View>
                <TextInput
                  mode="flat"
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  style={[
                    styles.input,
                    {
                      width: "90%",
                      borderWidth: touched.password && errors.password ? 1 : 0,
                      borderColor:
                        touched.password && errors.password ? "red" : "grey",
                      marginTop: 2,
                    },
                  ]}
                  color="#fff"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  secureTextEntry={pass1 ? true : false}
                  label={<StyledText labelText="New Password" />}
                  theme={{ colors: { text: "#fff" } }}
                />
              </View>
              {touched.password && errors.password && (
                <PasswordValidator text={values.password} />
              )}
              <View>
                <TextInput
                  mode="flat"
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  style={[
                    styles.input,
                    {
                      width: "90%",
                      borderWidth: touched.password && errors.password ? 1 : 0,
                      borderColor:
                        touched.password && errors.password ? "red" : "grey",
                    },
                  ]}
                  color="#fff"
                  onChangeText={handleChange("confirm_password")}
                  onBlur={handleBlur("confirm_password")}
                  label={<StyledText labelText="Confirm New Password" />}
                  secureTextEntry={pass2 ? true : false}
                  theme={{ colors: { text: "#fff" } }}
                />
              </View>
              <Text
                style={{ color: "#DC3030", width: "90%", alignSelf: "center" }}
              >
                {touched.confirm_password && errors.confirm_password}
              </Text>
              <View style={{ marginVertical: 25 }}>
                <TouchableOpacity>
                  <Btn
                    text={"Next"}
                    backgroundColor={"#FFB916"}
                    color={"#473200"}
                    width={"90%"}
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>
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
  },
  input: {
    backgroundColor: "#424141",
    color: "#fff",
    height: 55,
    alignSelf: "center",
    borderBottomWidth: 1,
    borderColor: "#686868",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingLeft: 10,
    marginTop: 20,
  },
  inputWrapper: {
    backgroundColor: "transparent",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    marginTop: 10,
  },
  mb2: {
    marginBottom: 10,
  },
  errorWrapper: {
    backgroundColor: "transparent",
    alignSelf: "center",
    width: "90%",
    borderColor: "#DC3030",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
});
export default BasicForm;

import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Step from "../components/Auth/Step";
import Title from "../components/Auth/Title";
import Input from "../components/Core/Input";

const Register = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();
  const handleNextStep = () => {
    if (step === 1) {
      phoneNumber && setStep(step + 1);
      // send OTP to phone number
    } else if (step === 2) {
      // verify OTP
      otp && setStep(step + 1);
    } else {
      // submit form data
      if (name) {
        AsyncStorage.setItem("name", name);
        navigation.navigate("Main");
      }
    }
  };

  return (
    <SafeAreaView className="mt-5">
      {step === 1 && (
        <Step next={handleNextStep} step={1}>
          <Title>Enter your phone number</Title>
          <Input
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </Step>
      )}
      {step === 2 && (
        <Step next={handleNextStep} step={2}>
          <Title>Enter the OTP</Title>
          <Input
            placeholder="OTP"
            value={otp}
            onChangeText={(text) => setOtp(text)}
          />
        </Step>
      )}
      {step === 3 && (
        <Step next={handleNextStep} step={3}>
          <Title>Enter your name</Title>
          <Input
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </Step>
      )}
    </SafeAreaView>
  );
};

export default Register;

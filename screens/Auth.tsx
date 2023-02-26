import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";

import One from "../components/Auth/Steps/One";
import { Context } from "../context/auth/AuthContext";
import Two from "../components/Auth/Steps/Two";
import Three from "../components/Auth/Steps/Three";

const Register = () => {
  const { step } = useContext(Context);
  return (
    <SafeAreaView className="mt-5">
      {step === 1 && <One />}
      {step === 2 && <Two />}
      {step === 3 && <Three />}
    </SafeAreaView>
  );
};

export default Register;

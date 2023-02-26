import { View, Text } from "react-native";
import React, { useContext } from "react";
import Step from "../Step";
import Title from "../Title";
import { Context } from "../../../context/auth/AuthContext";
import Input from "../../Core/Input";

const Two = () => {
  const {
    handleNextStep,
    riderDetails: { otp },
    setRiderDetails,
  } = useContext(Context);
  return (
    <Step next={handleNextStep} step={2}>
      <Title>Enter the OTP</Title>
      <Input
        placeholder="OTP"
        value={otp}
        onChangeText={(text) =>
          setRiderDetails((prevState) => ({ ...prevState, otp: text }))
        }
      />
    </Step>
  );
};

export default Two;

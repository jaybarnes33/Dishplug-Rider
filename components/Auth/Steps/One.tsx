import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Context } from "../../../context/auth/AuthContext";
import Step from "../Step";
import Title from "../Title";
import Input from "../../Core/Input";

const One = () => {
  const {
    riderDetails: { phoneNumber },
    handleNextStep,
    setRiderDetails,
  } = useContext(Context);
  return (
    <Step next={handleNextStep} step={1}>
      <Title>Enter your phone number</Title>
      <Input
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) =>
          setRiderDetails((prevState) => ({ ...prevState, phoneNumber: text }))
        }
      />
    </Step>
  );
};

export default One;

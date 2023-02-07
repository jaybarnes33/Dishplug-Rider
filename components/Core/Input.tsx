import {
  View,
  Text,
  TextInput,
  TextInputComponent,
  TextInputChangeEventData,
} from "react-native";
import React, { ChangeEvent } from "react";
import { placeholder } from "@babel/types";

interface IInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}
const Input = ({ placeholder, value, onChangeText }: IInputProps) => {
  return (
    <TextInput
      className="bg-neutral-200 p-3 rounded-full"
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default Input;

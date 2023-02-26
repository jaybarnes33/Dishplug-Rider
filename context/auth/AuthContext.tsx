import { View, Text } from "react-native";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RiderDetails {
  name: string;
  phoneNumber: string;
  vehicleNumber: string;
  avatar: string;
  otp: string;
}
interface AuthContextProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  setRiderDetails: Dispatch<SetStateAction<RiderDetails>>;
  riderDetails: RiderDetails;
  handleNextStep: () => void;
}

//@ts-ignore
export const Context = createContext<AuthContextProps>({});
const AuthContext = ({ children }: { children: ReactNode }) => {
  const [riderDetails, setRiderDetails] = useState({
    name: "",
    phoneNumber: "",
    vehicleNumber: "",
    avatar: "",
    otp: "",
  });
  const [step, setStep] = useState(1);
  const { name, phoneNumber, vehicleNumber, avatar, otp } = riderDetails;
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
        AsyncStorage.setItem("avatar", avatar);
        AsyncStorage.setItem("vehicle", vehicleNumber);
        navigation.navigate("Main");
      }
    }
  };

  return (
    <Context.Provider
      value={{
        step,
        setStep,
        setRiderDetails,
        handleNextStep,
        riderDetails,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AuthContext;

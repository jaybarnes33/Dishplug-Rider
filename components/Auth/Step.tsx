import { View, Text, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";

const Step = ({
  children,
  next,
  step,
}: {
  children: ReactNode;
  next: () => void;
  step: number;
}) => {
  return (
    <View className="px-4">
      {children}
      <TouchableOpacity
        onPress={next}
        className="mt-2 bg-green-500 py-2 px-5 rounded-full flex mx-auto"
      >
        <Text className="text-white text-lg font-semibold">
          {step !== 3 ? "Next" : "Submit"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Step;

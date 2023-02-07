import { View, Text } from "react-native";
import React from "react";

const Title = ({ children }: { children: string }) => {
  return <Text className="text-2xl font-bold mb-2">{children}</Text>;
};

export default Title;

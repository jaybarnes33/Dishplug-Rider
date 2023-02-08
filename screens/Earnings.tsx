import { View, Text, SafeAreaView } from "react-native";
import React from "react";

const Earnings = () => {
  const earnings = [
    {
      label: "Earnings in the past year",
      value: 300,
    },
    {
      label: "Earnings in the past month",
      value: 300,
    },
    {
      label: "Earnings in the past week",
      value: 300,
    },
    {
      label: "Earnings Yesterday",
      value: 300,
    },
  ];
  return (
    <SafeAreaView>
      <View className="px-2">
        <Text className="font-bold text-lg">Earnings</Text>
      </View>
      <View>
        <View className="flex flex-row gap-3 flex-wrap justify-center my-3">
          {earnings.map((earning) => (
            <View key={earning.label}>
              <Text className="text-xs text-neutral-400 font-semibold">
                {earning.label}
              </Text>
              <Text className="text-center font-bold text-neutral-600">
                {earning.value}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Earnings;

import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import Input from "../components/Core/Input";

const Settings = () => {
  return (
    <SafeAreaView>
      <View className="px-2">
        <Text className="text-lg font-bold">Profile</Text>
        <View className="mt-2 px-2">
          <Text className="my-2">Name</Text>
          <Input
            placeholder="Name"
            value="Barnes"
            onChangeText={(text) => console.log("text")}
          />
        </View>
        <View className="mt-2 px-2">
          <Text className="my-2">Vehicle No.</Text>
          <Input
            placeholder="Name"
            value="GH-2312-12"
            onChangeText={(text) => console.log("text")}
          />
        </View>
        <View className="mt-2 px-2">
          <Text className="my-2">Phone</Text>
          <Input
            placeholder="Name"
            value="0543288549"
            onChangeText={(text) => console.log("text")}
          />
        </View>
        <TouchableOpacity className="mt-2 bg-green-500 py-2 px-5 rounded-full flex mx-auto">
          <Text className="text-white text-lg font-semibold">Update</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

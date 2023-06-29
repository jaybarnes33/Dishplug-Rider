import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import Input from "../components/Core/Input";
import { Context } from "../context/auth/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const { riderDetails, setRiderDetails } = useContext(Context);
  const [form, setForm] = useState(riderDetails);

  const handleSubmit = () => {
    setRiderDetails(form);
  };
  return (
    <SafeAreaView>
      <View className="px-2">
        <Text className="text-lg font-bold">Profile</Text>
        <View className="mt-2 px-2">
          <Text className="my-2">Name</Text>
          <Input
            placeholder="Name"
            value={form.name}
            onChangeText={(text) =>
              setForm((prevState) => ({ ...prevState, name: text }))
            }
          />
        </View>
        <View className="mt-2 px-2">
          <Text className="my-2">Vehicle No.</Text>
          <Input
            placeholder="Vehicle Number"
            value={form.vehicleNumber}
            onChangeText={(text) =>
              setForm((prevState) => ({ ...prevState, vehicleNumber: text }))
            }
          />
        </View>
        <View className="mt-2 px-2">
          <Text className="my-2">Phone</Text>
          <Input
            placeholder="Phone"
            value={form.phoneNumber}
            onChangeText={(text) =>
              setForm((prevState) => ({ ...prevState, phoneNumber: text }))
            }
          />
        </View>
        <TouchableOpacity
          className="mt-2 bg-green-500 py-2 px-5 rounded-full flex mx-auto"
          onPress={handleSubmit}
        >
          <Text className="text-white text-lg font-semibold">Update</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

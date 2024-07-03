import { View, Text, Touchable, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import Step from "../Step";
import Title from "../Title";
import Input from "../../Core/Input";
import { Context } from "../../../context/auth/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { PhotoIcon } from "react-native-heroicons/solid";
const Three = () => {
  const {
    handleNextStep,
    riderDetails: { name, vehicleNumber, avatar },
    setRiderDetails,
  } = useContext(Context);

  const formData = new FormData();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      quality: 1,
    });

    if (!result.canceled) {
      setRiderDetails((prevState) => ({
        ...prevState,
        avatar: result.assets![0]?.uri,
      }));
    }
  };
  return (
    <Step next={handleNextStep} step={3}>
      <Title>Rider Details</Title>
      <Text>
        We are done setting your account up, please provide your details to
        start picking orders
      </Text>
      <View className="my-2">
        <Text className="mb-1">Enter your name</Text>
        <Input
          placeholder="Name"
          value={name}
          onChangeText={(text) =>
            setRiderDetails((prevState) => ({ ...prevState, name: text }))
          }
        />
      </View>
      <View className="my-2">
        <Text className="mb-1">Upload avatar</Text>
        <View className="flex-row gap-3">
          <TouchableOpacity onPress={pickImage}>
            <PhotoIcon size={30} color="#1a1a1a" />
          </TouchableOpacity>
          {avatar && (
            <Image
              source={{ uri: avatar }}
              className="h-10 w-10 rounded-full"
            />
          )}
        </View>
      </View>
      <View className="my-2">
        <Text className="mb-1">Enter your vehicle no.</Text>
        <Input
          placeholder="Enter vehicle number"
          value={vehicleNumber}
          onChangeText={(text) =>
            setRiderDetails((prevState) => ({
              ...prevState,
              vehicleNumber: text,
            }))
          }
        />
      </View>
    </Step>
  );
};

export default Three;

import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Geolocation from "expo-location";
import { View, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  UserIcon,
  BellIcon,
  CogIcon,
  Cog8ToothIcon,
  Cog6ToothIcon,
} from "react-native-heroicons/solid";
import { useLocation } from "../context/Location";
import { SafeAreaView } from "react-native-safe-area-context";
const Map = () => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [rider, setRider] = useState({
    name: "",
    avatar: "",
    vehicleNumber: "",
  });

  const { location } = useLocation();
  useEffect(() => {
    (async () => {
      setRider({
        name: (await AsyncStorage.getItem("name")) || "",
        vehicleNumber: (await AsyncStorage.getItem("vehicleNumber")) || "",
        avatar: (await AsyncStorage.getItem("avatar")) || "",
      });
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 mt-7 border-neutral-300">
      <View className="flex-row px-4 pb-2 gap-4 items-center bg-white">
        <Image
          source={{ uri: rider.avatar }}
          className="h-10 w-10 rounded-full"
        />
        <View className=" pb-2 flex-1">
          <Text className="text-gray-800">
            Welcome <Text className="font-bold">{rider.name},</Text>
          </Text>
          <Text>Let's deliver happiness</Text>
        </View>
        <BellIcon color="black" />
      </View>

      <MapView
        className="flex-1 h-full "
        zoomControlEnabled={true}
        region={{ ...location, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
        onMarkerDragEnd={(e) =>
          setCurrentLocation({
            longitude: e.nativeEvent.coordinate.longitude,
            latitude: e.nativeEvent.coordinate.latitude,
            longitudeDelta: e.nativeEvent.coordinate.longitude,
            latitudeDelta: e.nativeEvent.coordinate.latitude,
          })
        }
      >
        <Marker coordinate={location} />
      </MapView>
    </SafeAreaView>
  );
};

export default Map;

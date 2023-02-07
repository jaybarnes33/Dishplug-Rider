import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Geolocation from "expo-location";
import { SafeAreaView, View, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  UserIcon,
  BellIcon,
  CogIcon,
  Cog8ToothIcon,
  Cog6ToothIcon,
} from "react-native-heroicons/solid";
const Map = () => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [name, setName] = useState<string | null>();

  useEffect(() => {
    (async () => {
      setName(await AsyncStorage.getItem("name"));
      let { status } = await Geolocation.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Geolocation.getCurrentPositionAsync({
          accuracy: 6,
        });
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    })();
  }, []);

  return (
    <View className="flex-1 pt-12 border border-solid border-neutral-300">
      <View className="flex-row px-4 pb-2 gap-4 items-center">
        <Image
          source={require("../assets/images/me.png")}
          className="h-10 w-10 rounded-full"
        />
        <View className=" pb-2 flex-1">
          <Text className="text-gray-800">
            Welcome <Text className="font-bold">{name},</Text>
          </Text>
          <Text>Let's deliver happiness</Text>
        </View>
        <BellIcon color="black" />
      </View>

      <MapView
        className="flex-1 h-full "
        zoomControlEnabled={true}
        initialRegion={currentLocation}
        showsUserLocation={true}
        onMarkerDrag={(e) =>
          setCurrentLocation({
            longitude: e.nativeEvent.coordinate.longitude,
            latitude: e.nativeEvent.coordinate.latitude,
            longitudeDelta: e.nativeEvent.coordinate.longitude,
            latitudeDelta: e.nativeEvent.coordinate.latitude,
          })
        }
      >
        <Marker coordinate={currentLocation} />
      </MapView>
    </View>
  );
};

export default Map;

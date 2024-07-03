import React, { useState, useEffect } from "react";
import MapView, { LatLng, Marker, Polyline } from "react-native-maps";
import * as Geolocation from "expo-location";
import { View, Text, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  UserIcon,
  BellIcon,
  CogIcon,
  Cog8ToothIcon,
  Cog6ToothIcon,
  MapPinIcon,
} from "react-native-heroicons/solid";
import { useLocation } from "../context/Location";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWebSocket } from "../socket/SocketContext";
import PackageModal from "../components/Modals/PackageModal";
import { Package } from "../types/app";
import { makeSecuredRequest } from "../utils/makeSecuredRequest";

import { getPath } from "../utils/getDistance";

const Map = () => {
  const [rider, setRider] = useState({
    name: "",
    avatar: "",
    vehicleNumber: "",
  });

  const { location, setLocation } = useLocation();
  const [polyline2, setPolyline2] = useState<LatLng[]>([]);
  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem("user");
      user && setRider(JSON.parse(user));
    })();
  }, []);

  const [visible, setVisible] = useState(false);
  const { webSocketManager } = useWebSocket();
  const [packageData, setPackageData] = useState<Package | null>();
  useEffect(() => {
    webSocketManager.getSocket()?.on("packageEvent", (ev) => {
      setPackageData(ev);
      console.log("Received Package", ev);
    });
    setVisible(true);
  }, []);

  const handleRide = async () => {
    const data = await makeSecuredRequest(
      `/api/packages/assign/${packageData?._id}/`
    );
    if (data) {
      const paths = await getPath(
        `${location.latitude},${location.longitude}`,
        data.item.pickup.latLng
      );
      console.log({ paths });
      paths?.coordinates && setPolyline(paths?.coordinates);
    }

    setVisible(false);
  };

  useEffect(() => {
    webSocketManager.getSocket()?.on("path", (ev) => {
      setPolyline2(ev);
      console.log("Received Path", ev);
    });
  }, []);

  const [polyline, setPolyline] = useState<LatLng[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [coords, setCoords] = useState<LatLng[]>([]);
  useEffect(() => {
    setCoords([...polyline, ...polyline2]);
    const interval = setInterval(() => {
      if (currentIndex < coords.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setLocation(coords[currentIndex + 1]);
      } else {
        clearInterval(interval);
      }
    }, 1000); // Adjust the interval duration (in milliseconds)

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, polyline, polyline2]);
  return (
    <SafeAreaView className="flex-1 mt-7 border-neutral-300">
      <View className="flex-row px-4 pb-2 gap-4 items-center bg-white">
        {/* <Image
          source={{ uri: rider.avatar }}
          className="h-10 w-10 rounded-full"
        /> */}
        <View className=" pb-2 flex-1">
          <Text className="text-gray-800">
            Welcome <Text className="font-bold">{rider.name},</Text>
          </Text>
          <Text>Let's deliver happiness</Text>
        </View>
        <BellIcon color="black" />
      </View>

      <MapView
        className="flex-1 h-screen "
        zoomControlEnabled={true}
        region={{ ...location, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
      >
        <Marker coordinate={location}>
          <Image
            className="w-7 h-7 rounded-full "
            source={require("../assets/images/rider.jpeg")}
          />
        </Marker>
        {packageData && (
          <>
            <Marker
              coordinate={{
                latitude: Number(packageData.pickup.latLng.split(",")[0]),
                longitude: Number(packageData.pickup.latLng.split(",")[1]),
              }}
              title={packageData.pickup.name}
            >
              <Image
                className="h-7 w-7"
                source={require("../assets/images/package.png")}
              />
            </Marker>
            <Marker
              title={packageData.dropoff.name}
              coordinate={{
                latitude: Number(packageData.dropoff.latLng.split(",")[0]),
                longitude: Number(packageData.dropoff.latLng.split(",")[1]),
              }}
            >
              <Image
                className="w-7 h-7"
                source={require("../assets/images/clearance.png")}
              />
            </Marker>

            <Polyline coordinates={polyline} />
            <Polyline coordinates={polyline2} />
          </>
        )}
      </MapView>
      {packageData && (
        <PackageModal
          packageData={packageData}
          isVisible={visible}
          onAccept={() => {
            handleRide();
          }}
          onClose={() => {
            setVisible(false);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default Map;

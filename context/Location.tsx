import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import * as Geolocation from "expo-location";
import { LatLng } from "react-native-maps";
import { useWebSocket } from "../socket/SocketContext";
import { Context, useAuth } from "./auth/AuthContext";
import useUser from "../hooks/useUser";

interface contextProps {
  location: LatLng;
  setLocation: Dispatch<SetStateAction<LatLng>>;
}
const LocationContext = createContext<contextProps | null>(null);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });

  const { user } = useUser();
  const { webSocketManager } = useWebSocket();
  useEffect(() => {
    (async () => {
      let { status } = await Geolocation.requestForegroundPermissionsAsync();

      if (status === "granted") {
        let { status: bg } =
          await Geolocation.requestBackgroundPermissionsAsync();
        if (bg === "granted") {
          await Geolocation.watchPositionAsync(
            {
              accuracy: 6,
            },
            (location) => {
              setLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              });
              webSocketManager
                .getSocket()
                ?.emit("locationUpdate", { ...location, id: user?._id });
            }
          );
        }
      }
    })();
  }, [user]);
  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);

  if (!context) {
    throw Error("useLocation was called without a provider");
  }
  return context;
};

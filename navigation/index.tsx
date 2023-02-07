/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BlurView } from "expo-blur";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import {
  CogIcon,
  CurrencyPoundIcon,
  HomeIcon,
  ListBulletIcon,
} from "react-native-heroicons/outline";

import {
  CogIcon as CogSolid,
  CurrencyPoundIcon as CurrencySolid,
  HomeIcon as HomeSolid,
  ListBulletIcon as ListSolid,
} from "react-native-heroicons/solid";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import Register from "../screens/Auth";
import Earnings from "../screens/Earnings";
import Map from "../screens/Main";
import Orders from "../screens/Orders";
import Settings from "../screens/Settings";

import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
//  */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: "white",
        tabBarActiveTintColor: "grey",
        tabBarStyle: {
          paddingBottom: 5,
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Map}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          title: "Home",
          tabBarIcon: ({ focused }) =>
            !focused ? <HomeIcon color="grey" /> : <HomeSolid color="grey" />,
        })}
      />
      <BottomTab.Screen
        name="Orders"
        component={Orders}
        options={({ navigation }: RootTabScreenProps<"Orders">) => ({
          title: "Orders",
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <ListBulletIcon color="grey" />
            ) : (
              <ListSolid color="grey" />
            ),
        })}
      />
      <BottomTab.Screen
        name="Earnings"
        component={Earnings}
        options={({ navigation }: RootTabScreenProps<"Earnings">) => ({
          title: "Earnings",
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <CurrencyPoundIcon color="grey" />
            ) : (
              <CurrencySolid color="grey" />
            ),
        })}
      />
      <BottomTab.Screen
        name="Settings"
        component={Settings}
        options={({ navigation }: RootTabScreenProps<"Settings">) => ({
          title: "Settings",
          tabBarIcon: ({ focused }) =>
            !focused ? <CogIcon color="grey" /> : <CogSolid color="grey" />,
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

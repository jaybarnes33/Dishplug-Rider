import { View, Text } from "react-native";
import React from "react";
import { CheckCircleIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

const Orders = () => {
  const orders = [
    {
      description: "Order from Yaa at PC",
      price: 10,
      status: "delivered",
    },
    {
      description: "Order from Ama at PC",
      price: 10,
      status: "delivered",
    },
    {
      description: "Order from Yaa at PC",
      price: 10,
      status: "delivered",
    },
    {
      description: "Order from Yaa at PC",
      price: 10,
      status: "delivered",
    },
  ];
  return (
    <SafeAreaView>
      <View className="px-2">
        <Text className="font-bold text-lg">Orders</Text>
        {orders.map((order, index) => (
          <View
            className="bg-white my-2 px-2 flex-row justify-between shadow-lg py-3 items-center rounded-sm border border-gray-300"
            key={index}
          >
            <Text className="font-semibold">{order.description}</Text>
            <Text>{order.price}</Text>
            {order.status === "delivered" && <CheckCircleIcon />}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Orders;

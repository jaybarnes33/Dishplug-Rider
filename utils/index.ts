import * as SecureStore from "expo-secure-store";

export const storeTokens = async (data: {
  accessToken: string;
  refreshToken: string;
}) => {
  try {
    await SecureStore.setItemAsync("accessToken", data.accessToken);
    await SecureStore.setItemAsync("refreshToken", data.refreshToken);
    console.log("Tokens stored successfully");
  } catch (error) {
    console.error("Error storing tokens:", error);
  }
};

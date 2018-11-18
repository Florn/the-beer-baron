import { AsyncStorage } from "react-native";

export const storeItem = async (key, item) => {
  try {
    const jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
    return jsonOfItem;
  } catch (error) {
    console.log(error.message);
  }
};

export const retrieveItem = async key => {
  try {
    const retrievedItem = await AsyncStorage.getItem(key);
    return retrievedItem;
  } catch (error) {
    console.log(error.message);
  }
  return;
};

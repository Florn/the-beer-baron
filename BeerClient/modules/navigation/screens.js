import { Navigation } from "react-native-navigation";
import Profile from "../profile/Profile";
import Registration from "../signup/Registration";

export function registerScreens() {
  Navigation.registerComponent(
    "Registration",
    () => require("../signup/Registration").default
  );
  Navigation.registerComponent(
    "Profile",
    () => require("../profile/Profile").default
  );
}

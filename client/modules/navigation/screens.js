import { Navigation } from "react-native-navigation";
import Profile from "../profile/Profile";
import Registration from "../signup/Registration";
import { withProvider } from "../provider/withProvider";

export function registerScreens() {
  Navigation.registerComponent("Registration", () =>
    withProvider(Registration)
  );
  Navigation.registerComponent("Profile", () => withProvider(Profile));
}

import { Navigation } from "react-native-navigation";

export const goHome = () =>
  Navigation.setRoot({
    root: {
      component: {
        name: "Profile"
      }
    }
  });

export const goToMap = () =>
  Navigation.setRoot({
    root: {
      component: {
        name: "Map"
      }
    }
  });

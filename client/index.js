/** @format */

import React from "react";
import { Navigation } from "react-native-navigation";
import App from "./App";
import { registerScreens } from "./modules/navigation/screens";
import { withProvider } from "./modules/provider/withProvider";

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "Registration"
      }
    }
  });
});

import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screen/LoginScreen";

const Stack = createNativeStackNavigator();

const LoginStackScreen = <Stack.Screen
  name="Login"
  component={LoginScreen}
  options={{ title: "Login Aplikasi Inventori Distro" }}
/>;

export default LoginStackScreen;
import * as React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegisterScreen from "../screen/RegisterScreen";

const Stack = createNativeStackNavigator();

const RegisterStackScreen = <Stack.Screen
  name="Register"
  component={RegisterScreen}
  initialParams={{ pesan: null }}
  options={ function({ navigation }) { 
    return ({
      title: "Register Akun Admin",
      headerBackVisible: false,
      headerRight: function() { 
        return (
          <Button
            title="< Beranda" 
            onPress={ function() { 
              navigation.navigate("Beranda");
            }} 
          />
        );
      }
    });
  }}
/>;

export default RegisterStackScreen;
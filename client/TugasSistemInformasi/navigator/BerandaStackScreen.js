import * as React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BerandaScreen from "../screen/BerandaScreen";

const Stack = createNativeStackNavigator();

const BerandaStackScreen = <Stack.Screen 
  name="Beranda" 
  component={BerandaScreen} 
  options={ function({ navigation }) { 
    return ({
      title: "Aplikasi Inventori Distro",
      headerBackVisible: false,
      headerRight: function() { 
        return (
          <Button
            title="LOGOUT" 
            onPress={ async function() { 
              await AsyncStorage.removeItem("user");

              navigation.navigate("Login");
            }} 
          />
        );
      }
    });
  }} 
/>;

export default BerandaStackScreen;
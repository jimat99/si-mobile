import * as React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BarangScreen from "../screen/BarangScreen";

const Stack = createNativeStackNavigator();

const BarangStackScreen = <Stack.Screen 
  name="Barang" 
  component={BarangScreen} 
  options={ function({ navigation }) { 
    return ({
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

export default BarangStackScreen;
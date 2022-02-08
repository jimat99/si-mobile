import * as React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BarangMasukScreen from "../screen/BarangMasukScreen";

const Stack = createNativeStackNavigator();

const BarangMasukStackScreen = <Stack.Screen 
  name="BarangMasuk" 
  component={BarangMasukScreen} 
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

export default BarangMasukStackScreen;
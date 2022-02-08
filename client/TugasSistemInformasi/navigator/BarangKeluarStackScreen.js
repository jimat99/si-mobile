import * as React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BarangKeluarScreen from "../screen/BarangKeluarScreen";

const Stack = createNativeStackNavigator();

const BarangKeluarStackScreen = <Stack.Screen 
  name="BarangKeluar" 
  component={BarangKeluarScreen} 
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

export default BarangKeluarStackScreen;
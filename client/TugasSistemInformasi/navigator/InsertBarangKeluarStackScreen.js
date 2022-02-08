import * as React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InsertBarangKeluarScreen from "../screen/InsertBarangKeluarScreen";

const Stack = createNativeStackNavigator();

const InsertBarangKeluarStackScreen = <Stack.Screen 
  name="InsertBarangKeluar" 
  component={InsertBarangKeluarScreen} 
  options={ function({ navigation }) { 
    return ({
      headerBackVisible: false,
      headerRight: function() { 
        return (
          <Button
            title="< Barang Keluar" 
            onPress={ function() { 
              navigation.navigate("BarangKeluar");
            }} 
          />
        );
      }
    });
  }} 
/>;

export default InsertBarangKeluarStackScreen;
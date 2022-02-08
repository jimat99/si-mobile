import * as React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InsertPelangganScreen from "../screen/InsertPelangganScreen";

const Stack = createNativeStackNavigator();

const InsertPelangganStackScreen = <Stack.Screen 
  name="InsertPelanggan" 
  component={InsertPelangganScreen} 
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

export default InsertPelangganStackScreen;
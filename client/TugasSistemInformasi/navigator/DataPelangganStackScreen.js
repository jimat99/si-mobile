import * as React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DataPelangganScreen from "../screen/DataPelangganScreen";

const Stack = createNativeStackNavigator();

const DataPelangganStackScreen = <Stack.Screen 
  name="DataPelanggan" 
  component={DataPelangganScreen} 
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

export default DataPelangganStackScreen;
import * as React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DataBarangKeluarScreen from "../screen/DataBarangKeluarScreen";

const Stack = createNativeStackNavigator();

const DataBarangKeluarStackScreen = <Stack.Screen 
  name="DataBarangKeluar" 
  component={DataBarangKeluarScreen} 
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

export default DataBarangKeluarStackScreen;
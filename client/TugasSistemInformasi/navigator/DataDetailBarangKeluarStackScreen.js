import * as React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DataDetailBarangKeluarScreen from "../screen/DataDetailBarangKeluarScreen";

const Stack = createNativeStackNavigator();

const DataDetailBarangKeluarStackScreen = <Stack.Screen 
  name="DataDetailBarangKeluar" 
  component={DataDetailBarangKeluarScreen} 
  options={ function({ navigation }) { 
    return ({
      headerBackVisible: false,
      headerRight: function() { 
        return (
          <Button
            title="< Data Barang Keluar" 
            onPress={ function() { 
              navigation.navigate("DataBarangKeluar");
            }} 
          />
        );
      }
    });
  }} 
/>;

export default DataDetailBarangKeluarStackScreen;
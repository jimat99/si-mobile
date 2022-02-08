import * as React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DataBarangMasukScreen from "../screen/DataBarangMasukScreen";

const Stack = createNativeStackNavigator();

const DataBarangMasukStackScreen = <Stack.Screen 
  name="DataBarangMasuk" 
  component={DataBarangMasukScreen} 
  options={ function({ navigation }) { 
    return ({
      headerBackVisible: false,
      headerRight: function() { 
        return (
          <Button
            title="< Barang Masuk" 
            onPress={ function() { 
              navigation.navigate("BarangMasuk");
            }} 
          />
        );
      }
    });
  }} 
/>;

export default DataBarangMasukStackScreen;
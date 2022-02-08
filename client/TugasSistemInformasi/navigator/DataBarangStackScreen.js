import * as React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DataBarangScreen from "../screen/DataBarangScreen";

const Stack = createNativeStackNavigator();

const DataBarangStackScreen = <Stack.Screen 
  name="DataBarang" 
  component={DataBarangScreen} 
  options={ function({ navigation }) { 
    return ({
      headerBackVisible: false,
      headerRight: function() { 
        return (
          <Button
            title="< Barang" 
            onPress={ function() { 
              navigation.navigate("Barang");
            }} 
          />
        );
      }
    });
  }} 
/>;

export default DataBarangStackScreen;
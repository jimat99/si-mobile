import * as React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DataSupplierScreen from "../screen/DataSupplierScreen";

const Stack = createNativeStackNavigator();

const DataSupplierStackScreen = <Stack.Screen 
  name="DataSupplier" 
  component={DataSupplierScreen} 
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

export default DataSupplierStackScreen;
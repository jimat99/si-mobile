import * as React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InsertSupplierScreen from "../screen/InsertSupplierScreen";

const Stack = createNativeStackNavigator();

const InsertSupplierStackScreen = <Stack.Screen 
  name="InsertSupplier" 
  component={InsertSupplierScreen} 
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

export default InsertSupplierStackScreen;
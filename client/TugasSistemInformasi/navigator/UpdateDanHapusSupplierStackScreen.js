import * as React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UpdateDanHapusSupplierScreen from "../screen/UpdateDanHapusSupplierScreen";

const Stack = createNativeStackNavigator();

const UpdateDanHapusSupplierStackScreen = <Stack.Screen 
  name="UpdateDanHapusSupplier" 
  component={UpdateDanHapusSupplierScreen} 
  options={ function({ navigation }) { 
    return ({
      headerBackVisible: false,
      headerRight: function() { 
        return (
          <Button
            title="< Data Supplier" 
            onPress={ function() { 
              navigation.navigate("DataSupplier");
            }} 
          />
        );
      }
    });
  }} 
/>;

export default UpdateDanHapusSupplierStackScreen;
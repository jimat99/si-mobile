import * as React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UpdateDanHapusBarangScreen from "../screen/UpdateDanHapusBarangScreen";

const Stack = createNativeStackNavigator();

const UpdateDanHapusBarangStackScreen = <Stack.Screen 
  name="UpdateDanHapusBarang" 
  component={UpdateDanHapusBarangScreen} 
  options={ function({ navigation }) { 
    return ({
      headerBackVisible: false,
      headerRight: function() { 
        return (
          <Button
            title="< Data Barang" 
            onPress={ function() { 
              navigation.navigate("DataBarang");
            }} 
          />
        );
      }
    });
  }} 
/>;

export default UpdateDanHapusBarangStackScreen;
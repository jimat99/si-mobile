import * as React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InsertBarangScreen from "../screen/InsertBarangScreen";

const Stack = createNativeStackNavigator();

const InsertBarangStackScreen = <Stack.Screen 
  name="InsertBarang" 
  component={InsertBarangScreen} 
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

export default InsertBarangStackScreen;
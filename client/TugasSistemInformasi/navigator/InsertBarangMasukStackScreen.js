import * as React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InsertBarangMasukScreen from "../screen/InsertBarangMasukScreen";

const Stack = createNativeStackNavigator();

const InsertBarangMasukStackScreen = <Stack.Screen 
  name="InsertBarangMasuk" 
  component={InsertBarangMasukScreen} 
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

export default InsertBarangMasukStackScreen;
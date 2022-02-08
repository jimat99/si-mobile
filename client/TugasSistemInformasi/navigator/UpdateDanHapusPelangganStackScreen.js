import * as React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UpdateDanHapusPelangganScreen from "../screen/UpdateDanHapusPelangganScreen";

const Stack = createNativeStackNavigator();

const UpdateDanHapusPelangganStackScreen = <Stack.Screen 
  name="UpdateDanHapusPelanggan" 
  component={UpdateDanHapusPelangganScreen} 
  options={ function({ navigation }) { 
    return ({
      headerBackVisible: false,
      headerRight: function() { 
        return (
          <Button
            title="< Data Pelanggan" 
            onPress={ function() { 
              navigation.navigate("DataPelanggan");
            }} 
          />
        );
      }
    });
  }} 
/>;

export default UpdateDanHapusPelangganStackScreen;
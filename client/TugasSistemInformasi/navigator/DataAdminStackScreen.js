import * as React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DataAdminScreen from "../screen/DataAdminScreen";

const Stack = createNativeStackNavigator();

const DataAdminStackScreen = <Stack.Screen 
  name="DataAdmin" 
  component={DataAdminScreen} 
  options={ function({ navigation }) { 
    return ({
      headerBackVisible: false,
      headerRight: function() { 
        return (
          <Button
            title="< Beranda" 
            onPress={ function() { 
              navigation.navigate("Beranda");
            }} 
          />
        );
      }
    });
  }} 
/>;

export default DataAdminStackScreen;
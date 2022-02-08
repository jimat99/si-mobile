import * as React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfilScreen from "../screen/ProfilScreen";

const Stack = createNativeStackNavigator();

const ProfilStackScreen = <Stack.Screen 
  name="Profil" 
  component={ProfilScreen} 
  options={ function({ navigation }) { 
    return ({
      title: "Profil Anda",
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

export default ProfilStackScreen;
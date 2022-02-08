import * as React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DataDetailBarangMasukScreen from "../screen/DataDetailBarangMasukScreen";

const Stack = createNativeStackNavigator();

const DataDetailBarangMasukStackScreen = <Stack.Screen 
  name="DataDetailBarangMasuk" 
  component={DataDetailBarangMasukScreen} 
  options={ function({ navigation }) { 
    return ({
      headerBackVisible: false,
      headerRight: function() { 
        return (
          <Button
            title="< Data Barang Masuk" 
            onPress={ function() { 
              navigation.navigate("DataBarangMasuk");
            }} 
          />
        );
      }
    });
  }} 
/>;

export default DataDetailBarangMasukStackScreen;
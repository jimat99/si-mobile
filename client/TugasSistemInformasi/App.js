import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginStackScreen from "./navigator/LoginStackScreen";
import BerandaStackScreen from "./navigator/BerandaStackScreen";

import RegisterStackScreen from "./navigator/RegisterStackScreen";
import ProfilStackScreen from "./navigator/ProfilStackScreen";

import BarangStackScreen from "./navigator/BarangStackScreen";
import DataBarangStackScreen from "./navigator/DataBarangStackScreen";
import InsertBarangStackScreen from "./navigator/InsertBarangStackScreen";
import UpdateDanHapusBarangStackScreen from "./navigator/UpdateDanHapusBarangStackScreen";

import BarangMasukStackScreen from "./navigator/BarangMasukStackScreen";
import DataBarangMasukStackScreen from "./navigator/DataBarangMasukStackScreen";
import DataDetailBarangMasukStackScreen from "./navigator/DataDetailBarangMasukStackScreen";
import InsertBarangMasukStackScreen from "./navigator/InsertBarangMasukStackScreen";
import DataSupplierStackScreen from "./navigator/DataSupplierStackScreen";
import InsertSupplierStackScreen from "./navigator/InsertSupplierStackScreen";
import UpdateDanHapusSupplierStackScreen from "./navigator/UpdateDanHapusSupplierStackScreen";

import BarangKeluarStackScreen from "./navigator/BarangKeluarStackScreen";
import DataBarangKeluarStackScreen from "./navigator/DataBarangKeluarStackScreen";
import DataDetailBarangKeluarStackScreen from "./navigator/DataDetailBarangKeluarStackScreen";
import InsertBarangKeluarStackScreen from "./navigator/InsertBarangKeluarStackScreen";
import DataPelangganStackScreen from "./navigator/DataPelangganStackScreen";
import InsertPelangganStackScreen from "./navigator/InsertPelangganStackScreen";
import UpdateDanHapusPelangganStackScreen from "./navigator/UpdateDanHapusPelangganStackScreen";

import DataAdminStackScreen from "./navigator/DataAdminStackScreen";

const Stack = createNativeStackNavigator();

const App = function() { 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {LoginStackScreen}
        {BerandaStackScreen}

        {RegisterStackScreen}
        {ProfilStackScreen}

        {BarangStackScreen}
        {DataBarangStackScreen}
        {InsertBarangStackScreen}
        {UpdateDanHapusBarangStackScreen}

        {BarangMasukStackScreen}
        {DataBarangMasukStackScreen}
        {DataDetailBarangMasukStackScreen}
        {InsertBarangMasukStackScreen}
        {DataSupplierStackScreen}
        {InsertSupplierStackScreen}
        {UpdateDanHapusSupplierStackScreen}
        
        {BarangKeluarStackScreen}
        {DataBarangKeluarStackScreen}
        {DataDetailBarangKeluarStackScreen}
        {InsertBarangKeluarStackScreen}
        {DataPelangganStackScreen}
        {InsertPelangganStackScreen}
        {UpdateDanHapusPelangganStackScreen}

        {DataAdminStackScreen}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
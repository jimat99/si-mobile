import * as React from "react";
import { Button, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = function({ navigation }) {  
  const [user, setUser] = React.useState({});

  React.useEffect(function() {
    (async function() {
      const userJson = await AsyncStorage.getItem("user");
      const user = JSON.parse(userJson);

      setUser(user);
    })();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ backgroundColor: "white", borderRadius: 20, borderWidth: 3, borderColor: "green", padding: 15 }}>
        <Text style={{ fontSize: 26, textAlign: "center" }}>Profil Anda</Text>
        <View style={{ borderBottomWidth: 3, borderBottomColor: "gray" }} />
        <Text style={{ fontSize: 22, marginTop: 10 }}>Nama: {user.nama}</Text>
        <Text style={{ fontSize: 22 }}>Username: {user.username}</Text>
        <Text style={{ fontSize: 22 }}>Alamat: {user.alamat}</Text>
        <Text style={{ fontSize: 22 }}>Email: {user.email}</Text>
        <Text style={{ fontSize: 22 }}>Nomor Telepon: {user.nomor_telepon}</Text>
        <Text style={{ fontSize: 22, textTransform: "capitalize" }}>Role: {user.role}</Text>
      </View>
    </View>
  );
}

export default LoginScreen;
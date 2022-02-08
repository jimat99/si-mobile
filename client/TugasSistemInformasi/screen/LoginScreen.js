import * as React from "react";
import { Button, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = function({ navigation }) {  
  const [textUsername, setTextUsername] = React.useState("");
  const [textPassword, setTextPassword] = React.useState("");
  const [isPasswordHidden, setIsPasswordHidden] = React.useState(true);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>Silahkan Login</Text>
      <View style={{ flexDirection: "row", backgroundColor: "white", marginBottom: 10, marginTop: 20, height: 30, width: 300 }}>
        <Icon name="person" size={30} color="black" />
        <TextInput
          style={{ width: 270 }}
          onChangeText={ function(textInput) {
            setTextUsername(textInput); 
          }}
          placeholder="Masukkan username"
          value={textUsername}
        />
      </View>
      <View style={{ flexDirection: "row", backgroundColor: "white", marginBottom: 20, height: 30, width: 300 }}>
        <Icon name="lock" size={30} color="black" />
        <TextInput
          style={{ width: 230 }}
          onChangeText={ function(textInput) {
            setTextPassword(textInput); 
          }}
          secureTextEntry={isPasswordHidden ? true : false}
          placeholder="Masukkan password"
          value={textPassword}
        />
        <TouchableOpacity
          onPress={ function() {
            setIsPasswordHidden(!isPasswordHidden);
          }}
        >
          <Icon name={isPasswordHidden ? "visibility-off" : "visibility"} size={30} color="black"
          />
        </TouchableOpacity>
      </View>
      <Button
        title="LOGIN"
        onPress={ async function() {
          const request = {
            method: "POST",
            body: JSON.stringify({ 
              username: textUsername,
              password: textPassword
            })
          };
          const response = await fetch(
            "http://192.168.43.107/tugas-sistem-informasi/login.php", 
            request
          );
          const data = await response.json();
        
          if (textUsername !== "" && textPassword !== "") {
            if (data.isLoginSukses) {
              setTextUsername("");
              setTextPassword("");
              setIsPasswordHidden(true);

              // Simpan data user di AsyncStorage (Shared Preference).
              const user = JSON.stringify(data.user);
              await AsyncStorage.setItem("user", user);
            
              navigation.navigate("Beranda");
            } else {
              Alert.alert("Peringatan", "Username atau password salah!");
            }
          }
        }}
      />
    </View>
  );
}

export default LoginScreen;
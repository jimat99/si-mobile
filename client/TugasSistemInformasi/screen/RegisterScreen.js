import * as React from "react";
import { Button, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = function({ route, navigation }) {  
  const [textNama, setTextNama] = React.useState("");
  const [textUsername, setTextUsername] = React.useState("");
  const [textPassword, setTextPassword] = React.useState("");
  const [textAlamat, setTextAlamat] = React.useState("");
  const [textEmail, setTextEmail] = React.useState("");
  const [textNomorTelepon, setTextNomorTelepon] = React.useState("");
  const [isPasswordHidden, setIsPasswordHidden] = React.useState(true);
  
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>Register Akun Admin</Text>
      <View style={{ flexDirection: "row", backgroundColor: "white", marginBottom: 10, marginTop: 20, height: 30, width: 300 }}>
        <Icon name="badge" size={30} color="black" />
        <TextInput
          style={{ width: 270 }}
          onChangeText={ function(textInput) {
            setTextNama(textInput); 
          }}
          placeholder="Masukkan nama"
          value={textNama}
        />
      </View>
      <View style={{ flexDirection: "row", backgroundColor: "white", marginBottom: 10, height: 30, width: 300 }}>
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
      <View style={{ flexDirection: "row", backgroundColor: "white", marginBottom: 10, height: 30, width: 300 }}>
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
      <View style={{ flexDirection: "row", backgroundColor: "white", marginBottom: 10, height: 30, width: 300 }}>
        <Icon name="home" size={30} color="black" />
        <TextInput
          style={{ width: 270 }}
          onChangeText={ function(textInput) {
            setTextAlamat(textInput); 
          }}
          placeholder="Masukkan alamat"
          value={textAlamat}
        />
      </View>
      <View style={{ flexDirection: "row", backgroundColor: "white", marginBottom: 10, height: 30, width: 300 }}>
        <Icon name="contact-mail" size={30} color="black" />
        <TextInput
          style={{ width: 270, marginLeft: 5 }}
          onChangeText={ function(textInput) {
            setTextEmail(textInput); 
          }}
          placeholder="Masukkan email"
          value={textEmail}
        />
      </View>
      <View style={{ flexDirection: "row", backgroundColor: "white", marginBottom: 20, height: 30, width: 300 }}>
        <Icon name="contact-phone" size={30} color="black" />
        <TextInput
          style={{ width: 270, marginLeft: 5 }}
          onChangeText={ function(textInput) {
            setTextNomorTelepon(textInput); 
          }}
          placeholder="Masukkan nomor telepon"
          value={textNomorTelepon}
        />
      </View>
      <Button
        title="REGISTER"
        onPress={ async function() {
          // Jika semua text field sudah terisi
          if (
            textNama !== "" && textUsername !== "" && textPassword !== "" &&
            textAlamat !== "" && textEmail !== "" && textNomorTelepon !== ""
          ) {
            const request = {
              method: "POST",
              body: JSON.stringify({ 
                nama    : textNama,
                username: textUsername,
                password: textPassword,
                alamat: textAlamat,
                email: textEmail,
                nomorTelepon: textNomorTelepon
              })
            };
            const response = await fetch(
              "http://192.168.43.107/tugas-sistem-informasi/register.php", 
              request
            );
            const data = await response.json();
          
            if (data.isRegisterSukses) {
              setTextNama("");
              setTextUsername("");
              setTextPassword("");
              setTextAlamat("");
              setTextEmail("");
              setTextNomorTelepon("");
              Alert.alert("Peringatan", "Register akun sukses!");
            } else {
              Alert.alert("Peringatan", "Register akun gagal!");
            }
          }
        }}
      />
    </View>
  );
}

export default RegisterScreen;
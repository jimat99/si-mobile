import * as React from "react";
import { View, Button, Text, TextInput,  Alert } from "react-native";

const InsertPelangganScreen = function({ navigation }) {
  const [textNama, setTextNama] = React.useState("");
  const [textAlamat, setTextAlamat] = React.useState("");
  const [textNomorTelepon, setTextNomorTelepon] = React.useState("");

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginBottom: 30 }}>
      <View>
        <Text style={{ marginVertical: 10, fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Insert Pelanggan</Text>
        <View style={{ borderBottomWidth: 3, borderBottomColor: "black", marginBottom: 10 }} />
        <Text>Nama Pelanggan</Text>
        <TextInput
          style={{ width: 270, backgroundColor: "white", height: 30, marginBottom: 10 }}
          onChangeText={ function(textInput) {
            setTextNama(textInput); 
          }}
          placeholder="Masukkan nama pelanggan"
          value={textNama}
        />
        <Text>Alamat</Text>
        <TextInput
          style={{ width: 270, backgroundColor: "white", height: 30, marginBottom: 10 }}
          onChangeText={ function(textInput) {
            setTextAlamat(textInput); 
          }}
          placeholder="Masukkan alamat"
          value={textAlamat}
        />
        <Text>Nomor Telepon</Text>
        <TextInput
          style={{ width: 270, backgroundColor: "white", height: 30, marginBottom: 20 }}
          onChangeText={ function(textInput) {
            setTextNomorTelepon(textInput); 
          }}
          placeholder="Masukkan nomor telepon"
          value={textNomorTelepon}
        />
        <Button
          title="Insert Data"
          onPress={ async function() {
            // Jika semua text field sudah terisi
            if (textNama !== "" && textAlamat !== "" && textNomorTelepon !== "") {
              const request = {
                method: "POST",
                body: JSON.stringify({ 
                  nama: textNama,
                  alamat: textAlamat,
                  nomorTelepon: textNomorTelepon
                })
              };

              await fetch(
                "http://192.168.43.107/tugas-sistem-informasi/pelanggan.php", 
                request
              );

              Alert.alert("Data sukses di-insert!");
              
              navigation.navigate("DataPelanggan");
            }
          }}
        />
      </View>
    </View>
  );
}

export default InsertPelangganScreen;
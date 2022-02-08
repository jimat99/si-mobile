import * as React from "react";
import { View, ScrollView, Button, Text, TextInput, Alert } from "react-native";

const UpdateDanHapusPelangganScreen = function({ route, navigation }) {
  const [pelanggan, setPelanggan] = React.useState([]);
  const [textNama, setTextNama] = React.useState("");
  const [textAlamat, setTextAlamat] = React.useState("");
  const [textNomorTelepon, setTextNomorTelepon] = React.useState("");

  React.useEffect(function() {
    (async function() {
      const { idPelanggan } = route.params;
      const response = await fetch(
        `http://192.168.43.107/tugas-sistem-informasi/pelanggan.php?id=${idPelanggan}`
      );
      const data = await response.json();
      setPelanggan(data.pelanggan);
      setTextNama(data.pelanggan.nama);
      setTextAlamat(data.pelanggan.alamat);
      setTextNomorTelepon(data.pelanggan.nomor_telepon);
    })();
  }, []);

  return (
      <View style={{ alignItems: "center", justifyContent: "center", marginBottom: 30 }}>
        <View>
          <Text style={{ marginVertical: 10, fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Update dan Hapus Pelanggan</Text>
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
            placeholder="Masukkkan alamat"
            value={textAlamat}
          />
          <Text>Nomor Telepon</Text>
          <TextInput
            style={{ width: 270, backgroundColor: "white", height: 30, marginBottom: 10 }}
            onChangeText={ function(textInput) {
              setTextNomorTelepon(textInput); 
            }}
            placeholder="Masukkan nomor telepon"
            value={textNomorTelepon}
          />
          <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
            <Button
              title="Update Data"
              onPress={ async function() {
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
                    `http://192.168.43.107/tugas-sistem-informasi/pelanggan.php?id=${pelanggan.id_pelanggan}`, 
                    request
                  );

                  Alert.alert("Data sukses di-update!");
                  navigation.navigate("DataPelanggan");
                }
              }}
            />
            <Button
              title="Hapus Data"
              onPress={ function() {
                Alert.alert(
                  "Konfirmasi",
                  "Apakah Anda yakin hapus data?",
                  [
                    {
                      text: "Ya",
                      style: "cancel", 
                      onPress: async function() {
                        const request = { method: "DELETE" };
                        await fetch(
                          `http://192.168.43.107/tugas-sistem-informasi/pelanggan.php?id=${pelanggan.id_pelanggan}`, 
                          request
                        );
                        Alert.alert("Data sukses dihapus!");
                        navigation.navigate("DataPelanggan");
                      }
                    },
                    { text: "Tidak" }
                  ]
                );
              }}
            />
          </View>
        </View>
      </View>
  );
}

export default UpdateDanHapusPelangganScreen;
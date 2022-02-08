import * as React from "react";
import { View, ScrollView, Button, Text, TextInput, Alert } from "react-native";

const UpdateDanHapusSupplierScreen = function({ route, navigation }) {
  const [supplier, setSupplier] = React.useState([]);
  const [textNama, setTextNama] = React.useState("");
  const [textAlamat, setTextAlamat] = React.useState("");
  const [textEmail, setTextEmail] = React.useState("");
  const [textNomorTelepon, setTextNomorTelepon] = React.useState("");

  React.useEffect(function() {
    (async function() {
      const { idSupplier } = route.params;
      const response = await fetch(
        `http://192.168.43.107/tugas-sistem-informasi/supplier.php?id=${idSupplier}`
      );
      const data = await response.json();
      setSupplier(data.supplier);
      setTextNama(data.supplier.nama);
      setTextAlamat(data.supplier.alamat);
      setTextEmail(data.supplier.email);
      setTextNomorTelepon(data.supplier.nomor_telepon);
    })();
  }, []);

  return (
      <View style={{ alignItems: "center", justifyContent: "center", marginBottom: 30 }}>
        <View>
          <Text style={{ marginVertical: 10, fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Update dan Hapus Supplier</Text>
          <View style={{ borderBottomWidth: 3, borderBottomColor: "black", marginBottom: 10 }} />
          <Text>Nama Supplier</Text>
          <TextInput
            style={{ width: 270, backgroundColor: "white", height: 30, marginBottom: 10 }}
            onChangeText={ function(textInput) {
              setTextNama(textInput); 
            }}
            placeholder="Masukkan nama supplier"
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
          <Text>Email</Text>
          <TextInput
            style={{ width: 270, backgroundColor: "white", height: 30, marginBottom: 10 }}
            onChangeText={ function(textInput) {
              setTextEmail(textInput); 
            }}
            placeholder="Masukkan email"
            value={textEmail}
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
                if (
                  textNama !== "" && textAlamat !== "" && 
                  textEmail !== "" && textNomorTelepon !== ""
                ) {
                  const request = {
                    method: "POST",
                    body: JSON.stringify({ 
                      nama: textNama,
                      alamat: textAlamat,
                      email: textEmail,
                      nomorTelepon: textNomorTelepon
                    })
                  };

                  await fetch(
                    `http://192.168.43.107/tugas-sistem-informasi/supplier.php?id=${supplier.id_supplier}`, 
                    request
                  );

                  Alert.alert("Data sukses di-update!");
                  navigation.navigate("DataSupplier");
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
                          `http://192.168.43.107/tugas-sistem-informasi/supplier.php?id=${supplier.id_supplier}`, 
                          request
                        );
                        Alert.alert("Data sukses dihapus!");
                        navigation.navigate("DataSupplier");
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

export default UpdateDanHapusSupplierScreen;
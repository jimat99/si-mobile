import * as React from "react";
import { View, ScrollView, Button, Text, TextInput, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

const InsertBarangScreen = function({ navigation }) {
  const [textNama, setTextNama] = React.useState("");
  const [textUkuran, setTextUkuran] = React.useState("");
  const [textHargaBeli, setTextHargaBeli] = React.useState("");
  const [textHargaJual, setTextHargaJual] = React.useState("");
  const [textStok, setTextStok] = React.useState("");
  const [inputFoto, setInputFoto] = React.useState(null);

  return (
    <ScrollView>
      <View style={{ alignItems: "center", justifyContent: "center", marginBottom: 30 }}>
        <View>
          <Text style={{ marginVertical: 10, fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Insert Barang</Text>
          <View style={{ borderBottomWidth: 3, borderBottomColor: "black", marginBottom: 10 }} />
          <Text>Nama Barang</Text>
          <TextInput
            style={{ width: 270, backgroundColor: "white", height: 30, marginBottom: 10 }}
            onChangeText={ function(textInput) {
              setTextNama(textInput); 
            }}
            placeholder="Masukkan nama barang"
            value={textNama}
          />
          <Text>Ukuran</Text>
          <TextInput
            style={{ width: 270, backgroundColor: "white", height: 30, marginBottom: 10 }}
            onChangeText={ function(textInput) {
              setTextUkuran(textInput); 
            }}
            placeholder="Masukkan ukuran. Contoh: 30 atau M"
            value={textUkuran}
          />
          <Text>Harga Beli</Text>
          <TextInput
            style={{ width: 270, backgroundColor: "white", height: 30, marginBottom: 10 }}
            keyboardType="numeric"
            onChangeText={ function(textInput) {
              setTextHargaBeli(textInput); 
            }}
            placeholder="Masukkan harga beli"
            value={textHargaBeli}
          />
          <Text>Harga Jual</Text>
          <TextInput
            style={{ width: 270, backgroundColor: "white", height: 30, marginBottom: 10 }}
            keyboardType="numeric"
            onChangeText={ function(textInput) {
              setTextHargaJual(textInput); 
            }}
            placeholder="Masukkan harga jual"
            value={textHargaJual}
          />
          <Text>Stok</Text>
          <TextInput
            style={{ width: 270, backgroundColor: "white", height: 30, marginBottom: 10 }}
            keyboardType="numeric"
            onChangeText={ function(textInput) {
              setTextStok(textInput); 
            }}
            placeholder="Masukkan stok"
            value={textStok}
          />
          <Text>
            Foto Barang: {inputFoto !== null && inputFoto.uri.split("/").pop()}
          </Text>
          {inputFoto !== null &&
            <Image
              style={{ width: 120, height: 120 }}
              source={{ uri: inputFoto.uri }}
            />
          }
            
          <View style={{ marginBottom: 20, marginTop: 10 }}>
            <Button
              title="Cari gambar"
              onPress={ async function() {
                const hasilSearchGambar = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.All,
                  allowsEditing: true,
                  aspect: [4, 3]
                });

                if ( ! hasilSearchGambar.cancelled) {
                  setInputFoto(hasilSearchGambar);
                }
              }}
            />
          </View>
          <Button
            title="Insert Data"
            onPress={ async function() {
              // Jika semua text field sudah terisi dan ada foto
              if (
                textNama !== "" && textUkuran !== "" && textHargaBeli !== "" &&
                textHargaJual !== "" && textStok !== "" && inputFoto !== null
              ) {
                const formData = new FormData();
                formData.append("nama", textNama);
                formData.append("ukuran", textUkuran);
                formData.append("harga_beli", textHargaBeli);
                formData.append("harga_jual", textHargaJual);
                formData.append("stok", textStok);
                const namaFile = inputFoto.uri.split('/').pop();
                const formatFile = "image/" + namaFile.split('.').pop();
                formData.append('foto', { uri: inputFoto.uri, name: namaFile, type: formatFile });

                const request = { method: "POST", body: formData };
                await fetch(
                  "http://192.168.43.107/tugas-sistem-informasi/barang.php", 
                  request
                );
            
                Alert.alert("Data sukses di-insert!");
                navigation.navigate("DataBarang");
              }
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default InsertBarangScreen;
import * as React from "react";
import { View, ScrollView, Button, Text, TextInput, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

const UpdateDanHapusBarangScreen = function({ route, navigation }) {
  const [barang, setBarang] = React.useState([]);
  const [textNama, setTextNama] = React.useState("");
  const [textUkuran, setTextUkuran] = React.useState("");
  const [textHargaBeli, setTextHargaBeli] = React.useState("");
  const [textHargaJual, setTextHargaJual] = React.useState("");
  const [textStok, setTextStok] = React.useState("");
  const [inputFoto, setInputFoto] = React.useState(null);

  React.useEffect(function() {
    (async function() {
      const { idBarang } = route.params;
      const response = await fetch(
        `http://192.168.43.107/tugas-sistem-informasi/barang.php?id=${idBarang}`
      );
      const data = await response.json();
      setBarang(data.barang);
      setTextNama(data.barang.nama);
      setTextUkuran(data.barang.ukuran);
      setTextHargaBeli(data.barang.harga_beli);
      setTextHargaJual(data.barang.harga_jual);
      setTextStok(data.barang.stok);
    })();
  }, []);

  return (
    <ScrollView>
      <View style={{ alignItems: "center", justifyContent: "center", marginBottom: 30 }}>
        <View>
          <Text style={{ marginVertical: 10, fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Update dan Hapus Barang</Text>
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
            placeholder="Masukkkan ukuran. Contoh: 30 atau M"
            value={textUkuran}
          />
          <Text>Harga Beli</Text>
          <TextInput
            style={{ width: 270, backgroundColor: "white", height: 30, marginBottom: 10 }}
            onChangeText={ function(textInput) {
              setTextHargaBeli(textInput); 
            }}
            placeholder="Masukkan harga beli"
            value={textHargaBeli}
          />
          <Text>Harga Jual</Text>
          <TextInput
            style={{ width: 270, backgroundColor: "white", height: 30, marginBottom: 10 }}
            onChangeText={ function(textInput) {
              setTextHargaJual(textInput); 
            }}
            placeholder="Masukkan harga jual"
            value={textHargaJual}
          />
          <Text>Stok</Text>
          <TextInput
            style={{ width: 270, backgroundColor: "white", height: 30, marginBottom: 10 }}
            onChangeText={ function(textInput) {
              setTextStok(textInput); 
            }}
            placeholder="Masukkan stok"
            value={textStok}
          />
          <Text>
            Foto Barang: {inputFoto !== null && inputFoto.uri.split("/").pop()}
          </Text>
        
          {inputFoto === null 
            ? 
            <Image
              style={{ width: 150, height: 150 }}
              source={{ uri: `http://192.168.43.107/tugas-sistem-informasi/${barang.path_foto}` }}
            />
            :
            <Image
              style={{ width: 150, height: 150 }}
              source={{ uri: inputFoto.uri }}
            />
          }
          
          <View style={{ marginBottom: 20, marginTop: 10 }}>
            <Button
              title="Cari Gambar"
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
          <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
            <Button
              title="Update Data"
              onPress={ async function() {
                // Update dengan foto
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
                    `http://192.168.43.107/tugas-sistem-informasi/barang.php?id=${barang.id_barang}`, 
                    request
                  );

                  Alert.alert("Data sukses di-update!");
                  navigation.navigate("DataBarang");
                } 
                // Update tanpa foto
                else if (
                  textNama !== "" && textUkuran !== "" && textHargaBeli !== "" &&
                  textHargaJual !== "" && textStok !== "" && inputFoto === null
                ) {
                  const formData = new FormData();
                  formData.append("nama", textNama);
                  formData.append("ukuran", textUkuran);
                  formData.append("harga_beli", textHargaBeli);
                  formData.append("harga_jual", textHargaJual);
                  formData.append("stok", textStok);

                  const request = { method: "POST", body: formData };

                  await fetch(
                    `http://192.168.43.107/tugas-sistem-informasi/barang.php?id=${barang.id_barang}`, 
                    request
                  );

                  Alert.alert("Data sukses di-update!");
                  navigation.navigate("DataBarang");
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
                          `http://192.168.43.107/tugas-sistem-informasi/barang.php?id=${barang.id_barang}`, 
                          request
                        );
                        Alert.alert("Data sukses dihapus!");
                        navigation.navigate("DataBarang");
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
    </ScrollView>
  );
}

export default UpdateDanHapusBarangScreen;
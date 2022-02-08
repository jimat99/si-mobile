import * as React from "react";
import { View, ScrollView, Button, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InsertBarangKeluarScreen = function({ navigation }) {
  const [user, setUser] = React.useState({});

  const [jumlahInputanBarang, setJumlahInputanBarang] = React.useState(1);

  const [barangPertama, setBarangPertama] = React.useState(null);
  const [pickerBarangItem, setPickerBarangItem] = React.useState([]);
  const [pickerBarangSelected, setPickerBarangSelected] = React.useState(null);
  const refPickerBarang = React.useRef([pickerBarangSelected]);

  const [textHargaPerBarang, setTextHargaPerBarang] = React.useState("");
  const refTextHargaPerBarang = React.useRef([textHargaPerBarang]);

  const [textJumlahBarang, setTextJumlahBarang] = React.useState("");
  const refTextJumlahBarang = React.useRef([textJumlahBarang]);

  const [pickerPelangganItem, setPickerPelangganItem] = React.useState([]);
  const [pickerPelangganSelected, setPickerPelangganSelected] = React.useState(null);

  React.useEffect(function() {
    (async function() {
      const userJson = await AsyncStorage.getItem("user");
      const user = JSON.parse(userJson);
      setUser(user);

      const response = await fetch(
        "http://192.168.43.107/tugas-sistem-informasi/barang.php?get_for_picker=true"
      );
      const data = await response.json();
      setBarangPertama(data.barangPertama);
      setPickerBarangItem(data.listPickerItem);
      setPickerBarangSelected(data.barangPertama);
      refTextHargaPerBarang.current[0] = data.barangPertama.harga_jual;
      setTextHargaPerBarang(data.barangPertama.harga_jual);  

      const response2 = await fetch(
        "http://192.168.43.107/tugas-sistem-informasi/pelanggan.php?get_for_picker=true"
      );
      const data2 = await response2.json();
      setPickerPelangganItem(data2.listPickerItem);
      setPickerPelangganSelected(data2.pelangganPertama);    
    })();
  }, []);

  const inputanBarang = [];
  for (let i = 0; i < jumlahInputanBarang; i++) {
    inputanBarang.push(
      <View style={{ borderWidth: 1 }} key={i}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
          <Text>Barang {i + 1}</Text>
          <TouchableOpacity onPress={function() {
            refPickerBarang.current.splice(i, 1)[0];
            refTextHargaPerBarang.current.splice(i, 1)[0];
            refTextJumlahBarang.current.splice(i, 1)[0];
            setJumlahInputanBarang(jumlahInputanBarang - 1);
          }}>
            {jumlahInputanBarang !== 1 && <Icon name="close" size={22} color="red" />}
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: "white", height: 40,marginBottom: 10 }}>        
          <RNPickerSelect
            onValueChange={ function(value) { 
              const input = refPickerBarang.current;
              input[i] = value;
              setPickerBarangSelected(value);  

              const input2 = refTextHargaPerBarang.current;
              input2[i] = value.harga_jual;
              setTextHargaPerBarang(value.harga_jual);
            }}
            items={pickerBarangItem}
            value={refPickerBarang.current[i]}
            placeholder={{}}
          />
        </View>
        <Text>Harga Per Barang</Text>
        <TextInput
          style={{ width: 270, backgroundColor: "white", height: 30, marginBottom: 10 }}
          value={refTextHargaPerBarang.current[i]}
          editable={false}
        />
        <Text>Jumlah Barang</Text>
        <TextInput
          style={{ width: 270, backgroundColor: "white", height: 30, marginBottom: 10 }}
          keyboardType="numeric"
          onChangeText={ function(textInput) {
            const textJumlahBarang = refTextJumlahBarang.current;
            textJumlahBarang[i] = textInput;
            setTextJumlahBarang(textInput); 
          }}
          value={refTextJumlahBarang.current[i]}
          placeholder="Masukkan jumlah barang"
        />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginBottom: 30 }}>
        <View>
          <Text style={{ marginVertical: 10, fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Insert Barang Keluar</Text>
          <View style={{ borderBottomWidth: 3, borderBottomColor: "black", marginBottom: 10 }} />
          {inputanBarang}
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <TouchableOpacity onPress={function() {
              refPickerBarang.current.push(barangPertama);
              refTextHargaPerBarang.current.push(barangPertama.harga_jual);
              refTextJumlahBarang.current.push("");
              setJumlahInputanBarang(jumlahInputanBarang + 1);
            }}>
              <Text style={{ width: 120, color: "black", borderWidth: 1, backgroundColor: "white", textAlign: "center" }}>
                + Tambah Barang
              </Text>
            </TouchableOpacity>
          </View>
          <Text>Pelanggan</Text>
          <View style={{ backgroundColor: "white", height: 40, marginBottom: 20 }}>        
            <RNPickerSelect
              onValueChange={ function(value) { 
                setPickerPelangganSelected(value);  
              }}
              items={pickerPelangganItem}
              value={pickerPelangganSelected}
              placeholder={{}}
            />
          </View>
          <Button
            title="Insert Data"
            onPress={ async function() {
              // Jika semua text field sudah terisi
              if ( ! refTextJumlahBarang.current.includes("")) {
                const request = {
                  method: "POST",
                  body: JSON.stringify({
                    arrIdBarang: refPickerBarang.current.map((value) => value.id_barang),
                    arrHargaPerBarang: refTextHargaPerBarang.current,
                    arrJumlahBarang: refTextJumlahBarang.current,
                    idPelanggan: pickerPelangganSelected.id_pelanggan,
                    idUser: user.id_user
                  })
                };
                await fetch(
                  "http://192.168.43.107/tugas-sistem-informasi/barang-keluar.php", 
                  request
                );

                Alert.alert("Data sukses di-insert!");
                navigation.navigate("DataBarangKeluar");
              }
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default InsertBarangKeluarScreen;
import * as React from "react";
import { View, Button, Text, Image, FlatList, TouchableOpacity } from "react-native";

const renderItem = function({ item }, navigation) {
  return (
    <TouchableOpacity
      onPress={ function() {
        navigation.navigate("UpdateDanHapusPelanggan", {
          idPelanggan: item.id_pelanggan
        });
      }}
    >
      <View style={{ flexDirection: "row", flexWrap: "wrap"}}>
        <View style={{ marginBottom: 5 }}>
          <Text style={{ fontSize: 16 }}>Nama: {item.nama} | Alamat: {item.alamat} | Nomor Telepon: {item.nomor_telepon}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DataPelangganScreen = function({ navigation }) {
  const [listPelanggan, setListPelanggan] = React.useState([]);

  React.useEffect(function() {
    (async function() {
      const response = await fetch(
        "http://192.168.43.107/tugas-sistem-informasi/pelanggan.php"
      );
      const data = await response.json();
      setListPelanggan(data.listPelanggan);
    })();
  }, [listPelanggan]);

  return (
    <View>
      <Text style={{ marginVertical: 15, fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Pencet data untuk update dan hapus</Text>
      <View style={{ borderBottomWidth: 3, borderBottomColor: "black" }} />
      <FlatList
        style={{ backgroundColor: "white" }}
        data={listPelanggan}
        renderItem={ item => renderItem(item, navigation) }
        keyExtractor={item => item.id_pelanggan}
        ItemSeparatorComponent={function() {
          return <View style={{ borderBottomWidth: 1, borderBottomColor: "gray" }} />;
        }}
      />
    </View>
  );
}

export default DataPelangganScreen;
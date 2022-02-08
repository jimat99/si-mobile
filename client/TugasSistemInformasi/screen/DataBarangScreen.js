import * as React from "react";
import { View, Button, Text, Image, FlatList, TouchableOpacity } from "react-native";

const renderItem = function({ item }, navigation) {
  return (
    <TouchableOpacity
      onPress={ function() {
        navigation.navigate("UpdateDanHapusBarang", {
          idBarang: item.id_barang
        });
      }}
    >
      <View style={{ flexDirection: "row", flexWrap: "wrap"}}>
        <View style={{ marginBottom: 5 }}>
          <Text style={{ fontSize: 16 }}>
            <Image
              style={{ width: 30, height: 30 }}
              source={{ uri: `http://192.168.43.107/tugas-sistem-informasi/${item.path_foto}` }}
            />
            {" "}Nama: {item.nama}
          </Text>
          <Text style={{ fontSize: 16 }}>Harga Beli: {item.harga_beli} | Harga Jual: {item.harga_jual}</Text>
          <Text style={{ fontSize: 16 }}>Ukuran: {item.ukuran} | Stok: {item.stok}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DataBarangScreen = function({ navigation }) {
  const [listBarang, setListBarang] = React.useState([]);

  React.useEffect(function() {
    (async function() {
      const response = await fetch(
        "http://192.168.43.107/tugas-sistem-informasi/barang.php"
      );
      const data = await response.json();
      setListBarang(data.listBarang);
    })();
  }, [listBarang]);

  return (
    <View style={{ marginBottom: 50 }}>
      <Text style={{ marginVertical: 15, fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Pencet data untuk update dan hapus</Text>
      <View style={{ borderBottomWidth: 3, borderBottomColor: "black" }} />
      <FlatList
        style={{ backgroundColor: "white" }}
        data={listBarang}
        renderItem={ item => renderItem(item, navigation) }
        keyExtractor={item => item.id_barang}
        ItemSeparatorComponent={function() {
          return <View style={{ borderBottomWidth: 1, borderBottomColor: "gray" }} />;
        }}
      />
    </View>
  );
}

export default DataBarangScreen;
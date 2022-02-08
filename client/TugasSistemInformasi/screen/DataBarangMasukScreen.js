import * as React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

const renderItem = function({ item }, navigation) {
  const tanggal = item.tanggal_masuk.substring(8) + "-" + item.tanggal_masuk.substring(5, 7) + "-" + item.tanggal_masuk.substring(0, 4); 

  return (
    <TouchableOpacity
      onPress={ function() {
        navigation.navigate("DataDetailBarangMasuk", {
          idBarangMasuk: item.id_barang_masuk
        });
      }}
    >
      <View style={{ flexDirection: "row", flexWrap: "wrap"}}>
        <View style={{ marginBottom: 5 }}>
          <Text style={{ fontSize: 16 }}>
            Supplier: {item.nama_supplier} | Pencatat: {item.nama_user} | Jumlah Barang: {item.jumlah_barang} | Total Harga: {item.total_harga} | Tanggal: {tanggal}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DataBarangMasukScreen = function({ navigation }) {
  const [listBarangMasuk, setListBarangMasuk] = React.useState([]);

  React.useEffect(function() {
    (async function() {
      const response = await fetch(
        "http://192.168.43.107/tugas-sistem-informasi/barang-masuk.php"
      );
      const data = await response.json();
      setListBarangMasuk(data.listBarangMasuk);
    })();
  }, []);

  return (
    <View style={{ marginBottom: 50 }}>
      <Text style={{ marginVertical: 15, fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Data Barang Masuk</Text>
      <View style={{ borderBottomWidth: 3, borderBottomColor: "black" }} />
      <FlatList
        style={{ backgroundColor: "white" }}
        data={listBarangMasuk}
        renderItem={ item => renderItem(item, navigation) }
        keyExtractor={item => item.id_barang_masuk}
        ItemSeparatorComponent={function() {
          return <View style={{ borderBottomWidth: 1, borderBottomColor: "gray" }} />;
        }}
      />
    </View>
  );
}

export default DataBarangMasukScreen;
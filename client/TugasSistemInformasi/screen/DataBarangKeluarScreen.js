import * as React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

const renderItem = function({ item }, navigation) {
  const tanggal = item.tanggal_keluar.substring(8) + "-" + item.tanggal_keluar.substring(5, 7) + "-" + item.tanggal_keluar.substring(0, 4); 

  return (
    <TouchableOpacity
      onPress={ function() {
        navigation.navigate("DataDetailBarangKeluar", {
          idBarangKeluar: item.id_barang_keluar
        });
      }}
    >
      <View style={{ flexDirection: "row", flexWrap: "wrap"}}>
        <View style={{ marginBottom: 5 }}>
          <Text style={{ fontSize: 16 }}>
            Pelanggan: {item.nama_pelanggan} | Pencatat: {item.nama_user} | Jumlah Barang: {item.jumlah_barang} | Total Harga: {item.total_harga} | Tanggal: {tanggal}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DataBarangKeluarScreen = function({ navigation }) {
  const [listBarangKeluar, setListBarangKeluar] = React.useState([]);

  React.useEffect(function() {
    (async function() {
      const response = await fetch(
        "http://192.168.43.107/tugas-sistem-informasi/barang-keluar.php"
      );
      const data = await response.json();
      setListBarangKeluar(data.listBarangKeluar);
    })();
  }, []);

  return (
    <View style={{ marginBottom: 50 }}>
      <Text style={{ marginVertical: 15, fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Data Barang Keluar</Text>
      <View style={{ borderBottomWidth: 3, borderBottomColor: "black" }} />
      <FlatList
        style={{ backgroundColor: "white" }}
        data={listBarangKeluar}
        renderItem={ item => renderItem(item, navigation) }
        keyExtractor={item => item.id_barang_keluar}
        ItemSeparatorComponent={function() {
          return <View style={{ borderBottomWidth: 1, borderBottomColor: "gray" }} />;
        }}
      />
    </View>
  );
}

export default DataBarangKeluarScreen;
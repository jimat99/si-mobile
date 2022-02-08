import * as React from "react";
import { View, Text, FlatList, Image } from "react-native";

const renderItem = function({ item }) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap"}}>
      <View style={{ marginBottom: 5 }}>
        <Text style={{ fontSize: 16 }}>
          ID Barang: {item.id_barang} | Nama: {item.nama} | Harga Per Barang: {item.harga_jual} | Jumlah Barang: {item.jumlah_barang} | Total Harga: {item.total_harga}
        </Text>
        <View style={{ alignItems: "center" }}>
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: `http://192.168.43.107/tugas-sistem-informasi/${item.path_foto}` }}
        />
        </View>
      </View>
    </View>
  );
};

const DataDetailBarangKeluarScreen = function({ route, navigation }) {
  const [listDetailBarangKeluar, setListDetailBarangKeluar] = React.useState([]);

  React.useEffect(function() {
    (async function() {
      const { idBarangKeluar } = route.params;
      console.log(idBarangKeluar);
      const response = await fetch(
        `http://192.168.43.107/tugas-sistem-informasi/detail-barang-keluar.php?id_barang_keluar=${idBarangKeluar}`
      );
      const data = await response.json();
      setListDetailBarangKeluar(data.listDetailBarangKeluar);
    })();
  }, []);

  return (
    <View style={{ marginBottom: 50 }}>
      <Text style={{ marginVertical: 15, fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Data Detail Barang Keluar</Text>
      <View style={{ borderBottomWidth: 3, borderBottomColor: "black" }} />
      <FlatList
        style={{ backgroundColor: "white" }}
        data={listDetailBarangKeluar}
        renderItem={ item => renderItem(item) }
        keyExtractor={item => item.id_detail_barang_keluar}
        ItemSeparatorComponent={function() {
          return <View style={{ borderBottomWidth: 1, borderBottomColor: "gray" }} />;
        }}
      />
    </View>
  );
}

export default DataDetailBarangKeluarScreen;
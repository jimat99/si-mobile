import * as React from "react";
import { View, Text, FlatList } from "react-native";

const renderItem = function({ item }) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap"}}>
      <View style={{ marginBottom: 5 }}>
        <Text style={{ fontSize: 16 }}>
          ID: {item.id_user} | Nama: {item.nama} | Username: {item.username} | Alamat: {item.alamat} | Email: {item.email} | Nomor Telepon: {item.nomor_telepon}
        </Text>
      </View>
    </View>
  );
};

const DataAdminScreen = function({ navigation }) {
  const [listAdmin, setListAdmin] = React.useState([]);

  React.useEffect(function() {
    (async function() {
      const response = await fetch(
        "http://192.168.43.107/tugas-sistem-informasi/admin.php"
      );
      const data = await response.json();
      setListAdmin(data.listAdmin);
    })();
  }, [listAdmin]);

  return (
    <View>
      <View style={{ borderBottomWidth: 3, borderBottomColor: "black" }} />
      <FlatList
        style={{ backgroundColor: "white" }}
        data={listAdmin}
        renderItem={ item => renderItem(item) }
        keyExtractor={item => item.id_user}
        ItemSeparatorComponent={function() {
          return <View style={{ borderBottomWidth: 1, borderBottomColor: "gray" }} />;
        }}
      />
    </View>
  );
}

export default DataAdminScreen;
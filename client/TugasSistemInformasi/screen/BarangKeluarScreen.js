import * as React from "react";
import { View, Text, Image, Alert } from "react-native";
import { Card, Button } from 'react-native-paper';

const BarangKeluarScreen = function({ navigation }) {
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 20, marginBottom: 25 }}>
        <Card style={{ height: 250 }} onPress={() => navigation.navigate("DataBarangKeluar")}>
          <Card.Cover source={ require('../assets/barang-keluar.png') } />
          <Card.Content>
            <Button style={{ marginBottom: -15, marginLeft: -20, marginRight: -20 }}>
              Data Barang
            </Button>
            <Button>Keluar</Button>
          </Card.Content>
        </Card>
        <Card style={{ height: 250 }} onPress={() => navigation.navigate("InsertBarangKeluar")}>
          <Card.Cover source={ require('../assets/insert.png') } />
          <Card.Content>
            <Button style={{ marginBottom: -15, marginLeft: -20, marginRight: -20 }}>
              Insert Barang
            </Button>
            <Button>Keluar</Button>
          </Card.Content>
        </Card>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Card style={{ height: 250 }} onPress={() => navigation.navigate("DataPelanggan")}>
          <Card.Cover source={ require('../assets/pelanggan.png') } />
          <Card.Content>
            <Button style={{ marginBottom: -15, marginLeft: -20, marginRight: -20 }}>
              Data Pelanggan
            </Button>
          </Card.Content>
        </Card>
        <Card style={{ height: 250 }} onPress={() => navigation.navigate("InsertPelanggan")}>
          <Card.Cover source={ require('../assets/insert.png') } />
          <Card.Content>
            <Button style={{ marginBottom: -15, marginLeft: -20, marginRight: -20 }}>
              Insert
            </Button>
            <Button>Pelanggan</Button>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

export default BarangKeluarScreen;
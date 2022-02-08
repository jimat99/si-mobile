import * as React from "react";
import { View, Text, Image, Alert } from "react-native";
import { Card, Button } from 'react-native-paper';

const BarangMasukScreen = function({ navigation }) {
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 20, marginBottom: 25 }}>
        <Card style={{ height: 250 }} onPress={() => navigation.navigate("DataBarangMasuk")}>
          <Card.Cover source={ require('../assets/barang-masuk.png') } />
          <Card.Content>
            <Button style={{ marginBottom: -15, marginLeft: -20, marginRight: -20 }}>
              Data Barang
            </Button>
            <Button> Masuk</Button>
          </Card.Content>
        </Card>
        <Card style={{ height: 250 }} onPress={() => navigation.navigate("InsertBarangMasuk")}>
          <Card.Cover source={ require('../assets/insert.png') } />
          <Card.Content>
            <Button style={{ marginBottom: -15, marginLeft: -20, marginRight: -20 }}>
              Insert Barang
            </Button>
            <Button>Masuk</Button>
          </Card.Content>
        </Card>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Card style={{ height: 250 }} onPress={() => navigation.navigate("DataSupplier")}>
          <Card.Cover source={ require('../assets/supplier.png') } />
          <Card.Content>
            <Button style={{ marginBottom: -15, marginLeft: -20, marginRight: -20 }}>
              Data Supplier
            </Button>
          </Card.Content>
        </Card>
        <Card style={{ height: 250 }} onPress={() => navigation.navigate("InsertSupplier")}>
          <Card.Cover source={ require('../assets/insert.png') } />
          <Card.Content>
            <Button style={{ marginBottom: -15, marginLeft: -20, marginRight: -20 }}>
              Insert Supplier
            </Button>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

export default BarangMasukScreen;
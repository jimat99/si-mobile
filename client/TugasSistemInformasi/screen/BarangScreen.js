import * as React from "react";
import { View, Text, Image, Alert } from "react-native";
import { Card, Button } from "react-native-paper";

const BarangScreen = function({ navigation }) {
  return (
    <>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 20, marginBottom: 25 }}>
        <Card style={{ height: 250 }} onPress={() => navigation.navigate("DataBarang")}>
          <Card.Cover source={ require("../assets/barang.png") } />
          <Card.Content>
            <Button style={{ marginBottom: -15, marginLeft: -20, marginRight: -20 }}>
              Data
            </Button>
            <Button>Barang</Button>
          </Card.Content>
        </Card>
        <Card style={{ height: 250 }} onPress={() => navigation.navigate("InsertBarang")}>
          <Card.Cover source={ require("../assets/insert.png") } />
          <Card.Content>
            <Button style={{ marginBottom: -15, marginLeft: -20, marginRight: -20 }}>
              Insert
            </Button>
            <Button>Barang</Button>
          </Card.Content>
        </Card>
      </View>
    </>
  );
}

export default BarangScreen;
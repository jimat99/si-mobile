import * as React from "react";
import { View, Text, Image, Alert, ScrollView } from "react-native";
import { Card, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BerandaScreen = function({ navigation }) {
  const [user, setUser] = React.useState({});

  React.useEffect(function() {
    (async function() {
      const userJson = await AsyncStorage.getItem("user");
      const user = JSON.parse(userJson);

      setUser(user);
    })();
  }, []);

  return (
    <ScrollView>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 20, marginBottom: 25 }}>
        {user.role === "pemilik" && 
          <Card style={{ height: 250 }} onPress={() => navigation.navigate("Register")}>
            <Card.Cover source={ require("../assets/register.png") } />
            <Card.Content>
              <Button style={{ marginBottom: -15, marginLeft: -20, marginRight: -20 }}>
                Register Akun
              </Button>
              <Button>Admin</Button>
            </Card.Content>
          </Card>
        }
        <Card style={{ height: 250 }} onPress={() => navigation.navigate("Barang")}>
          <Card.Cover source={ require("../assets/barang.png") } />
          <Card.Content>
            <Button>Barang</Button>
          </Card.Content>
        </Card>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginBottom: 25 }}>
        <Card style={{ height: 250 }} onPress={() => navigation.navigate("BarangMasuk")}>
          <Card.Cover source={ require("../assets/barang-masuk.png") } />
          <Card.Content>
            <Button style={{ marginBottom: -15, marginLeft: -20, marginRight: -20 }}>Barang Masuk</Button>
          </Card.Content>
        </Card>
        <Card style={{ height: 250 }} onPress={() => navigation.navigate("BarangKeluar")}>
          <Card.Cover source={ require("../assets/barang-keluar.png") } />
          <Card.Content>
            <Button style={{ marginBottom: -15, marginLeft: -20, marginRight: -20 }}>Barang Keluar</Button>
          </Card.Content>
        </Card>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        {user.role === "pemilik" && 
          <Card style={{ height: 250 }} onPress={() => navigation.navigate("DataAdmin")}>
            <Card.Cover source={ require("../assets/admin.png") } />
            <Card.Content>
              <Button style={{ marginBottom: -15, marginLeft: -20, marginRight: -20 }}>Data Admin</Button>
            </Card.Content>
          </Card>
        }
        <Card style={{ height: 250 }} onPress={() => navigation.navigate("Profil")}>
          <Card.Cover source={ require("../assets/profil.png") } />
          <Card.Content>
            <Button style={{ marginBottom: -15, marginLeft: -20, marginRight: -20 }}>Profil Anda</Button>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

export default BerandaScreen;
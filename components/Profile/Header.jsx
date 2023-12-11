import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "../Themed";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  HStack,
  VStack,
} from "@gluestack-ui/themed";
import { commonStyles } from "../../assets/commonStyles"; // Asegúrate de que la ruta sea correcta
import { useSelector } from "react-redux";

import { Link } from "expo-router";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

const Header = () => {
  const counterValue = useSelector((state) => state.IDlist.counter);
  const miObjeto = useSelector((state) => state.infoProfile.miObjeto);

  return (
    <View style={styles.container}>
      <HStack
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
          gap:30
        }}
      >
        <Text style={styles.title}>Mis motos</Text>
        {miObjeto && (
          <Avatar>
            <AvatarFallbackText>SS</AvatarFallbackText>
            <AvatarImage alt="icono" source={{ uri: miObjeto.ruta }} />
          </Avatar>
        )}
      </HStack>
      
    </View>
  );
};

export default Header;

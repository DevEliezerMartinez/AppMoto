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
    marginTop: 2,
  },
  title: {
    fontSize: 36,
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
        }}
      >
        <Text style={styles.title}>Mis viajes</Text>
        {/* Renderizar la imagen utilizando la información del estado global */}
        {miObjeto && (
          <Avatar>
            <AvatarFallbackText>SS</AvatarFallbackText>
            <AvatarImage alt="icono" source={{ uri: miObjeto.ruta }} />
          </Avatar>
        )}
      </HStack>
      <VStack sx={{ padding: 20 }}>
        <Text style={commonStyles.fontStyle4}>
          Toda la informacion sobre tus viaje
        </Text>
      </VStack>
    </View>
  );
};

export default Header;

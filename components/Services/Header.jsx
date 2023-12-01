import React from "react";
import { View, Text } from "../../components/Themed";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  HStack,
  VStack,
} from "@gluestack-ui/themed";
import { useSelector } from "react-redux";
import { commonStyles } from "../../assets/commonStyles"; // Asegúrate de que la ruta sea correcta

import { StyleSheet } from "react-native";

const Header = () => {
  // Obtener la información de la imagen desde el estado global
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
        <Text style={styles.title}>Servicios</Text>
        {/* Renderizar la imagen utilizando la información del estado global */}
        {miObjeto && (
          <Avatar>
            <AvatarFallbackText>SS</AvatarFallbackText>
            <AvatarImage alt="icono" source={{ uri: miObjeto.ruta }} />
          </Avatar>
        )}
      </HStack>
      <VStack sx={{ padding: 20, paddingTop: 0 }}>
        <Text style={commonStyles.fontStyle4}>
          Lleva el control de los servicios de tu motocicleta!
        </Text>
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
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

export default Header;

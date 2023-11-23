import { Image, Pressable, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Text, View } from "../Themed";
import { useState } from "react";
import { VStack } from "@gluestack-ui/themed";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { update } from "../../src/sliceID";


export default function listProfile({ data }) {
  const counterValue = useSelector((state) => state.IDlist.counter);
  const dispatch = useDispatch();
 console.log(counterValue);


  const seleccinarPerfil = () => {
    dispatch(update(data.id_perfil));
    console.log(data.id_perfil); 
  };

  return (
    <>
      <Pressable
        onPress={seleccinarPerfil}
        space="md"
        style={{
          display: "flex",
          gap: 10,
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          marginVertical: 10,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: "red"
        }}
      >
        <Image
          style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
          source={require(`../../assets/images/150z.png`)} // Intenta importar la imagen usando la ruta específica
        />
        <VStack>
          <Text
            style={{
              fontFamily: "MontserratBold",

              fontSize: 16,
              textTransform: "uppercase",
            }}
          >
            {data.marca} {data.modelo}
          </Text>
          <Text style={{ fontFamily: "MontserratSemibold", fontSize: 14 }}>
            {data.año}
          </Text>
        </VStack>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({});

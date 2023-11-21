import { Image, Pressable, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { Text, View } from "../Themed";
import { useState } from "react";
import {
  ModalBackdrop,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Input,
  InputField,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  Icon,
  ChevronDownIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  Button,
  ButtonText,
  Box,
  ButtonIcon,
  Divider,
  Center,
  Avatar,
  VStack,
  HStack,
  AvatarFallbackText,
  AvatarImage,
} from "@gluestack-ui/themed";

import { AddIcon } from "@gluestack-ui/themed";
import { supabase } from "../../lib/supabase";

export default function listProfile({ data }) {
  const seleccinarPerfil = () => {
    console.log(data.modelo);
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
          marginVertical: 5,
          paddingHorizontal:10
        }}
      >
        <Image
          style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
          source={require(`../../assets/images/150z.png`)}  // Intenta importar la imagen usando la ruta específica
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

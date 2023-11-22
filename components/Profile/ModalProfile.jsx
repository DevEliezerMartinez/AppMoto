import { Image, Pressable, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { Text, View } from "../../components/Themed";
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
import ListProvider from "../../components/Profile/ListProfile";

export default function Garage({ status, onclose }) {
  //state para mostrar perfiles o vacio

  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState(0);

  const [selectedValue, setSelectedValue] = useState();

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const handleSubmit = () => {
    dispatch(update());
  };

  const close = () => {
    onclose();
  };

  // imagen
  const [image, setImage] = useState([]);

  const pickImage = async () => {
    console.log("funcion imagen");

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled) {
      // Use spread operator to preserve previous images
      setImage((prevImages) => [
        ...prevImages,
        ...result.assets.map((asset) => asset.uri),
      ]);
    }
  };

  // envio de datos

  const sendProfile = async () => {
      
    try {
      console.log("Marca:", marca);
      console.log("Modelo:", modelo);
      console.log("Año:", selectedValue);
      console.log(image);

      const { error } = await supabase.from("perfiles").insert([
        {
         
          marca: marca,
          modelo: modelo,
          año: selectedValue,
          imagen: image,
        },
      ]);

      if (error) {
        throw new Error(
          `Error al insertar en la base de datos: ${error.message}`
        );
      }

      // Aquí puedes realizar otras acciones con los valores, como enviarlos a través de una API
    } catch (error) {
      console.error("Ha ocurrido un error:", error);
      // Aquí puedes manejar el error de la manera que prefieras, por ejemplo, mostrando un mensaje al usuario.
    }



    setMarca()
    setModelo()
    setImage()
    close()
  };

  // datos ejemplo:

  return (
    <View style={{ flex: 1, alignItems: "center", paddingTop: 0 }}>
      <Box
        sx={{
          marginTop: 80,
          width: "$full",
          paddingHorizontal: 30,
          
        }}
      ></Box>

      <Modal isOpen={status} onClose={onclose}>
        <ModalBackdrop />
        <ModalContent sx={{backgroundColor: "rgba(25, 25, 25, 1)", paddingVertical: 20}}>
          <ModalHeader sx={{ marginVertical:4}}>
            <Text
              style={{
                fontFamily: "MontserratSemibold",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Agregar motocicleta:
            </Text>
          </ModalHeader>
          <ModalBody>
            <Box sx={{ gap: 20 }}>
              <Input variant="underlined" size="lg">
                <InputField
                  placeholder="Marca"
                  value={marca}
                  onChangeText={(text) => setMarca(text)}
                  sx={{
                    color: "white",
                    fontFamily: "MontserratThin",
                    textAlign: "center",
                  }}
                />
              </Input>
              <Input variant="underlined" size="lg">
                <InputField
                  placeholder="Modelo"
                  value={modelo}
                  onChangeText={(text) => setModelo(text)}
                  sx={{
                    color: "white",
                    fontFamily: "MontserratThin",
                    textAlign: "center",
                  }}
                />
              </Input>
              <Select onValueChange={handleChange}>
                <SelectTrigger variant="underlined" size="md">
                  <SelectInput
                    style={commonStyles.input}
                    placeholder="Selecciona"
                  />
                  <SelectIcon mr="$3">
                    <Icon as={ChevronDownIcon} />
                  </SelectIcon>
                </SelectTrigger>

                <SelectPortal>
                  <SelectBackdrop />

                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    <SelectItem label="2010" value="2010" />
                    <SelectItem label="2011" value="2011" />
                    <SelectItem label="2012" value="2012" />
                    <SelectItem label="2013" value="2013" />
                    <SelectItem label="2014" value="2014" />
                    <SelectItem label="2015" value="2015" />
                    <SelectItem label="2016" value="2016" />
                    <SelectItem label="2017" value="2017" />
                    <SelectItem label="2018" value="2018" />
                    <SelectItem label="2019" value="2019" />
                    <SelectItem label="2020" value="2020" />
                    <SelectItem label="2021" value="2021" />
                    <SelectItem label="2022" value="2022" />
                    <SelectItem label="2023" value="2023" />
                  </SelectContent>
                </SelectPortal>
              </Select>

              <Text
                style={{
                  fontFamily: "MontserratThin",
                  textAlign: "center",
                  fontSize: 20,
                  marginVertical: 10,
                }}
              >
                Añade tus fotos favoritas
              </Text>

              <Button
                sx={{ marginHorizontal: 20 }}
                variant="outline"
                action="secondary"
                onPress={pickImage}
              >
                <ButtonText>Añadir imageeen</ButtonText>
              </Button>

              <Button
                sx={{ marginTop: 50 }}
                size="md"
                variant="outline"
                onPress={sendProfile}
              >
                <ButtonText>Guardar </ButtonText>
                <ButtonIcon as={AddIcon} />
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </View>
  );
}

const commonStyles = StyleSheet.create({
  // Estilos de fuente numerados
  container: {
    flex: 1,
    paddingTop: 25,
    padding: 10,
  },
  input: {
    /*    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10, */
    color: "white",
    fontFamily: "MontserratRegular", // Reemplaza 'YourChosenFont' con el nombre de tu fuente
  },

  miniContainer: {
    /* borderWidth: 1,
    borderColor: "red", */
    paddingHorizontal: 15,
  },
  fontStyle1: {
    fontSize: 20,
    fontFamily: "MontserratRegular",
    textAlign: "center",
  },
  fontStyle2: {
    fontSize: 20,
    fontFamily: "MontserratSemibold",
    textAlign: "center",
  },
  fontStyle3: {
    fontSize: 16,
    fontFamily: "MontserratThin",
    textAlign: "center",
  },
  fontStyle4: {
    fontSize: 14,
    fontFamily: "MontserratSemibold",
    textAlign: "center",
  },
});

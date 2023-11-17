import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text, View } from "../../components/Themed";
import { useContext, useState } from "react";
import {
  AddIcon,
  Avatar,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Center,
  Divider,
  HStack,
  Heading,
  Input,
  InputField,
  VStack,
} from "@gluestack-ui/themed";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/trip/Header";
export default function Garage() {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');

  const sendProfile = () => {
    console.log('Marca:', marca);
    console.log('Modelo:', modelo);
    console.log('Año:', ano);
    // Aquí puedes realizar otras acciones con los valores, como enviarlos a través de una API
  };

  return (
    <View style={{ flex: 1, alignItems: "center", paddingTop: 30 }}>
      <Center sx={{ height: 580, width: 370 }}>
        <Text>Registro de motocicletas</Text>
        <Divider />

        <Text>Agregar motocicleta:</Text>

        <Box>
          <Input variant="underlined" size="lg">
            <InputField
              placeholder="Marca"
              value={marca}
              onChangeText={(text) => setMarca(text)}
              sx={{color: "$white"}}
            />
          </Input>
          <Input variant="underlined" size="lg">
            <InputField
              placeholder="Modelo"
              value={modelo}
              onChangeText={(text) => setModelo(text)}
              sx={{color: "$white"}}

            />
          </Input>
          <Input variant="underlined" size="lg">
            <InputField
              placeholder="Año"
              keyboardType="numeric"
              value={ano}
              onChangeText={(text) => setAno(text)}
              sx={{color: "$white"}}

            />
          </Input>

          <Button
            size="md"
            variant="outline"
            action="secondary"
            onPress={sendProfile}
          >
            <ButtonText>Guardar </ButtonText>
            <ButtonIcon as={AddIcon} />
          </Button>
        </Box>
      </Center>
    </View>
  );
}
import { Image, Pressable, StyleSheet, Switch } from "react-native";
import { Text, View } from "../../../components/Themed";
import {
  Avatar,
  Box,
  Button,
  ButtonText,
  Center,
  Divider,
  HStack,
  ScrollView,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  VStack,
} from "@gluestack-ui/themed";
import Header from "../../../components/Services/Header";
import BoxService from "../../../components/Services/BoxService";
import { useEffect, useState } from "react";
import Modal from "../../../components/Services/FormularioModal";
import "../../../components/Services/SheduleService";
import { useSelector } from "react-redux";

import { supabase } from "../../../lib/supabase";

export default function TabTwoScreen() {
  const [openModal, setOpenModal] = useState(false);
  const [dbDatos, setdbDatos] = useState([]);
  const [selectedOption, setSelectedOption] = useState("2"); // Nuevo estado para la opción seleccionada

  const miObjeto = useSelector((state) => state.infoProfile.miObjeto);

  const mostrar = async () => {
    let filterStatus = null;

    if (selectedOption === "1") {
      filterStatus = "agendar";
    }
    if (selectedOption === "2") {
      filterStatus = "Registrar";
    }


    let { data: servicios, error } = await supabase
      .from("servicios")
      .select("costo,fecha,notas,piezas,status,id_servicio")
      .eq("id_perfil", miObjeto.ID)
      .eq("status", filterStatus);
    ;

    setdbDatos(servicios);
  };

  useEffect(() => {
    mostrar();
  }, [miObjeto.ID, openModal, selectedOption]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    mostrar();
  };

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  return (
    <View style={commonStyles.container}>
      <Header />

      <View style={commonStyles.miniContainer}>
        <Center>
          <Image
            alt="imagen-destino"
            source={{ uri: miObjeto.ruta }}
            style={{
              height: 200,
              width: 300,
              resizeMode: "cover",
              borderRadius: 3,
            }}
          />
        </Center>

        <Center sx={{ marginVertical: 10 }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "MontserratSemibold",
              textAlign: "center",
            }}
          >
            {miObjeto.marca} {miObjeto.modelo} {miObjeto.año}
          </Text>
        </Center>

        <Divider
          sx={{
            bg: "#6E6E6E",
            marginVertical: 4,
          }}
        />

        <Text
          style={{
            fontSize: 16,
            fontFamily: "MontserratRegular",
            textAlign: "center",
          }}
        >
          Historial de servicios
        </Text>

        <Select onValueChange={handleSelectChange}>
          <SelectTrigger variant="underlined" size="md">
            <SelectInput
              sx={{
                color: "white",
                fontFamily: "MontserratRegular", // Reemplaza 'YourChosenFont' con el nombre de tu fuente
              }}
              placeholder="Selecciona una opcion"
            />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectItem label="Servicios agendados" value="1" />
              <SelectItem label="Servicios Registrados" value="2" />
            </SelectContent>
          </SelectPortal>
        </Select>

        <ContainerScroll info={dbDatos} />

        <Modal status={openModal} onClose={handleCloseModal} />

        <Pressable
          onPress={handleOpenModal}
          style={{
            padding: 8,
            backgroundColor: "#066AFF",
            borderRadius: 32,
            marginTop: 1,
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: "MontserratSemibold",
              textAlign: "center",
            }}
            data
          >
            Agendar Servicio
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const ContainerScroll = ({ info }) => (
  <ScrollView sx={{ marginTop: 10, height: 230 }}>
    {info.map((item, index) => (
      <BoxService key={item.id_servicio} data={item} index={index} />
    ))}
  </ScrollView>
);

const commonStyles = StyleSheet.create({
  // Estilos de fuente numerados
  container: {
    flex: 1,
    paddingTop: 10,
    padding: 10,
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

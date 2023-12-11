import { Text, View } from "../Themed";
import { supabase } from "../../lib/supabase";
import React, { useState, useEffect } from "react";
import {
  Box,
  ScrollView,
  Spinner,
  Fab,
  FabIcon,
  Modal,
  ModalBackdrop,
  ModalBody,
  Button,
  Input,
  InputField,
  Textarea,
  TextareaInput,
  Center,
  Icon,
} from "@gluestack-ui/themed";
import { StyleSheet, Image } from "react-native";
import { FabLabel } from "@gluestack-ui/themed";
import { AddIcon } from "@gluestack-ui/themed";
import { ModalContent } from "@gluestack-ui/themed";
import * as ImagePicker from "expo-image-picker";
import { ModalHeader } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { useSelector } from "react-redux";
import { TrashIcon } from "@gluestack-ui/themed";
import DateTimePickerModal from "react-native-modal-datetime-picker";


const WatchTrips = () => {
  const miObjeto = useSelector((state) => state.infoProfile.miObjeto);

  const [resultados, setResultados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState();
  const [totalKilometros, setTotalKilometros] = useState(0); // Nuevo estado para el total de kilómetros
  const [refreshData, setRefreshData] = useState(false);

  //modal

  const [destine, setDestine] = useState("");
  const [km, setKm] = useState("");
  const [dateTrip, setDateTrip] = useState("");
  const [notes, setNotes] = useState("");

  // boton de imagen
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [image, setImage] = useState("");

  const handleDeleteImage = () => {
    setImage(null);
    setIsButtonDisabled(false);
  };

  // states de fecha

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    setSelectedDate(date);
    hideDatePicker();
  };

  //end modal

  const onSubmit = async () => {
    setShowModal(false);
    
    console.log("fecha enviada: ", selectedDate)
    const { error } = await supabase.from("viajes").insert({
      fotografia: image,
      destino: destine,
      km_viaje: km,
      fecha: selectedDate,
      notas: notes,
      id_perfil: miObjeto.ID,
    });

    if (error) {
      console.log("upsss!",error);
    }
    setRefreshData(true);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setIsButtonDisabled(true);
    }
  };

  useEffect(() => {
    const getTrips = async () => {
      try {
        const { data, error, status } = await supabase
          .from("viajes")
          .select(`id_viaje, fotografia, destino, km_viaje, fecha, notas`)
          .eq("id_perfil", miObjeto.ID)
          .order("fecha", { ascending: false }); // Ordenar por fecha de forma descendente


        if (error) {
          console.log("Error al obtener datos:", error);
        } else {
          setResultados(data);

          // Calcular la sumatoria de km_viaje
          const total = data.reduce(
            (accumulatedTotal, currentItem) =>
              accumulatedTotal + parseFloat(currentItem.km_viaje),
            0
          );
          setTotalKilometros(total);

          setIsLoading(false);
          setRefreshData(false);
        }
      } catch (error) {
        console.log("Error al obtener datos:", error);
      }
    };

    getTrips();
  }, [refreshData, miObjeto.ID]);

  const openModalForm = () => {
    // Restablecer estados relacionados con la imagen y la fecha al abrir el modal

    showModal == true ? setShowModal(false) : setShowModal(true);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          <Text style={commonStyles.fontStyle2}>Cargando...</Text>
          <Spinner size="large" />
        </>
      );
    }

    return (
      <View>
        <ScrollView>
          {resultados.map((item) => (
            <Box
              key={item.id_viaje}
              sx={{
                marginTop: 30,
                borderColor: "#696767",
                borderWidth: 0.5,
                padding: 3,
                borderRadius: 5,
                width: "$80",
              }}
            >
              <Image
                source={{ uri: item.fotografia }}
                alt="imagen-destino"
                role="img"
                style={{ width: "auto", height: 150, resizeMode: "cover" }}
              />

              <Box sx={{ padding: 10, gap: 10 }}>
                <Text style={commonStyles.fontStyle1}>{item.fecha}</Text>
                <Text style={commonStyles.fontStyle2}>{item.destino}</Text>
              </Box>

              <Text style={{ padding: 10, fontFamily: "MontserratRegular" }}>
                {item.notas}{" "}
              </Text>

              <Box
                sx={{
                  display: "flex",
                  width: "$full",
                  alignItems: "flex-end",
                  padding: 5,
                }}
              >
                <Text style={commonStyles.fontStyle1}>{item.km_viaje}km</Text>
              </Box>
            </Box>
          ))}

          <Box
            id="textos"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <Text style={commonStyles.fontStyle1}>
              En total has recorrido un total de:
            </Text>
            <Text style={commonStyles.fontStyle3} id="total">
              {totalKilometros} km
            </Text>
          </Box>
        </ScrollView>

        <Fab size="lg" onPress={openModalForm} sx={{ right: -25 }}>
          <FabIcon as={AddIcon} padding={1} />
        </Fab>

        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
          }}
        >
          <ModalBackdrop />
          <ModalContent sx={{ backgroundColor: "#3B3B3B", height: "$3/4" }}>
            <ModalHeader>
              <Text style={commonStyles.fontStyle2}>Registro de viaje:</Text>
            </ModalHeader>
            <ModalBody>
              <Box
                sx={{
                  marginVertical: 10,
                  display: "flex",
                  gap: 20,
                  alignItems: "center",
                }}
              >
                <Button
                  sx={{ margin: 1 }}
                  variant="outline"
                  action={isButtonDisabled ? "secondary" : "primary"}
                  onPress={pickImage}
                  disabled={isButtonDisabled}
                >
                  <ButtonText>Añadir imagen</ButtonText>
                </Button>

                {image && (
                  <Box
                    sx={{
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: -30,
                    }}
                  >
                    <Image
                      source={{ uri: image }}
                      style={{ width: 70, height: 70 }}
                    />

                    <Icon
                      sx={{ posicion: "relative", top: -90, left: 30 }}
                      onPress={handleDeleteImage}
                      as={TrashIcon}
                      w="$6"
                      h="$6"
                      color="$red500"
                    />
                  </Box>
                )}

                <Input variant="underlined" size="md">
                  <InputField
                    onChangeText={(text) => setDestine(text)}
                    placeholder="Destino"
                    sx={{ color: "$white" }}
                  />
                </Input>

                <Input variant="underlined" size="md">
                  <InputField
                    onChangeText={(text) => {
                      // Validar que solo se ingresen números
                      const numericValue = text.replace(/[^0-9]/g, "");
                      setKm(numericValue);
                    }}
                    placeholder="Km del viaje"
                    keyboardType="numeric"
                    sx={{ color: "$white" }}
                  />
                </Input>

                <Text style={commonStyles.fontStyle2}>Fecha</Text>

                <Button variant="outline" action="positive" onPress={showDatePicker} >
                  <ButtonText>Seleccionar una fecha</ButtonText>
                </Button>
                {selectedDate && (
                  <Text>{`Fecha seleccionada: ${selectedDate.toLocaleDateString()}`}</Text>
                )}
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />

                <Text style={commonStyles.fontStyle2}>Notas del viaje</Text>

                <Textarea
                  size="md"
                  isReadOnly={false}
                  isInvalid={false}
                  isDisabled={false}
                  w="$64"
                >
                  <TextareaInput
                    onChangeText={(text) => setNotes(text)}
                    sx={{ color: "$white" }}
                    placeholder="Agrega una breve descripción o algo que quieras recordar"
                    role="document"
                  />
                </Textarea>
              </Box>
              <Center>
                <Button
                  id="envioData"
                  size="sm"
                  action="positive"
                  borderWidth="$0"
                  /* onPress={() => {
                      setShowModal(false);
                    }} */
                  onPress={onSubmit}
                >
                  <ButtonText>Guardar</ButtonText>
                </Button>
              </Center>
            </ModalBody>
          </ModalContent>
        </Modal>
      </View>
    );
  };

  return renderContent();
};

export default WatchTrips;

export const commonStyles = StyleSheet.create({
  fontStyle1: {
    fontSize: 17,
    fontFamily: "MontserratThin",
  },
  fontStyle2: {
    fontSize: 20,
    fontFamily: "MontserratSemibold",
  },
  fontStyle3: {
    fontSize: 16,
    fontFamily: "MontserratSemibold",
  },
});

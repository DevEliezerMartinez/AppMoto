import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonText,
  Center,
  Textarea,
  TextareaInput,
} from "@gluestack-ui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";
import { supabase } from "../../lib/supabase";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function SheduleService({ onSubmit, onClose, IdInfo }) {
  // states for datepicker

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  //end dates

  //state inputs
  const [detalles, setDetalles] = useState("");

  const handleSubmit = async () => {
    let agendar = "agendar";
    try {
      onSubmit();
      onClose();

      const { error } = await supabase
        .from("servicios")
        .insert([
          { fecha: selectedDate, status: agendar, notas: detalles, id_perfil: IdInfo },
        ]);

      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.error("Error general:", error.message);
    }
  };

  return (
    <Center>
      <Box
        id="fecha"
        sx={{
          marginVertical: 30,
          display: "flex",
          gap: 20,
          alignItems: "center",
        }}
      >
        <Button variant="outline" action="positive" onPress={showDatePicker}>
          <ButtonText>Seleccionar una fecha</ButtonText>
        </Button>
        {selectedDate && (
          <Text style={{color: "white"}}>{`Fecha seleccionada: ${selectedDate.toLocaleDateString()}`}</Text>
        )}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </Box>

      <Textarea size="md" w="$64">
        <TextareaInput
          sx={{ color: "white" }}
          onChangeText={(text) => setDetalles(text)}
          role="document"
          placeholder="Añade mas detalles para recordar..."
        />
      </Textarea>

      <Button
        onPress={handleSubmit}
        action="secondary"
        sx={{
          marginTop: 10,
          marginHorizontal: 40,
          backgroundColor: "#06FF10",
        }}
      >
        <ButtonText> Guardar</ButtonText>
      </Button>
    </Center>
  );
}

const styles = StyleSheet.create({});

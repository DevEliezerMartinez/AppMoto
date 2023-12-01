import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonText,
  Center,
  CheckIcon,
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  Input,
  InputField,
  Textarea,
  TextareaInput,
  VStack,
} from "@gluestack-ui/themed";
import { supabase } from "../../lib/supabase";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function RegisterService({ onSubmit, onClose, IdInfo }) {
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
    console.log("A date has been picked: ", date);
    setSelectedDate(date);
    hideDatePicker();
  };

  //end dates

  //state inputs
  const [detalles, setDetalles] = useState("");
  const [Costo, setCosto] = useState("");

  const [values, setValues] = useState([]);

  const handleSubmit = async () => {
    let Registrar = "Registrar";
    try {
      onSubmit();
      onClose();

      const { error } = await supabase.from("servicios").insert([
        {
          fecha: selectedDate,
          status: Registrar,
          notas: detalles,
          piezas: values,
          costo: Costo,
          id_perfil: IdInfo,
        },
      ]);

      if (error) {
        console.log("true");
        console.log(error);
      }
    } catch (error) {
      console.error("Error general:", error.message);
    }

    onSubmit();
    onClose();
  };

  return (
    <View>
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

      <Box id="checkboxes">
        <Text
          style={{
            fontFamily: "MontserratRegular",
            color: "white",
            fontSize: 18,
            padding: 10,
          }}
        >
          Basicos
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false} // Opcional: Para ocultar la barra de desplazamiento horizontal
        >
          <CheckboxGroup
            value={values}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
            }}
            onChange={(keys) => {
              setValues(keys);
            }}
          >
            <Checkbox value="Aceite" aria-label="Seleccionar aceite">
              <CheckboxIndicator
                aria-label="aria"
                sx={{
                  width: 100,
                  height: 37,
                  backgroundColor: "transparent",
                  borderRadius: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CheckboxLabel aria-label="aria">
                  <Text
                    style={{
                      fontFamily: "MontserratSemibold",
                      color: "white",
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    Aceite
                  </Text>
                </CheckboxLabel>
              </CheckboxIndicator>
            </Checkbox>

            <Checkbox value="Bujias" aria-label="Seleccionar Bujias">
              <CheckboxIndicator
                aria-label="aria"
                sx={{
                  width: 100,
                  height: 37,
                  backgroundColor: "transparent",
                  borderRadius: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CheckboxLabel aria-label="aria">
                  <Text
                    style={{
                      fontFamily: "MontserratSemibold",
                      color: "white",
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    Bujias
                  </Text>
                </CheckboxLabel>
              </CheckboxIndicator>
            </Checkbox>

            <Checkbox
              value="Revisión de cadena"
              aria-label="Seleccionar cadena"
            >
              <CheckboxIndicator
                aria-label="aria"
                sx={{
                  width: 100,
                  height: 37,
                  backgroundColor: "transparent",
                  borderRadius: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CheckboxLabel aria-label="aria">
                  <Text
                    style={{
                      fontFamily: "MontserratSemibold",
                      color: "white",
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    Rev. cadena
                  </Text>
                </CheckboxLabel>
              </CheckboxIndicator>
            </Checkbox>

            <Checkbox
              value="Anticogelante"
              aria-label="Seleccionar Anticogelante"
            >
              <CheckboxIndicator
                aria-label="aria"
                sx={{
                  width: 100,
                  height: 37,
                  backgroundColor: "transparent",
                  borderRadius: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CheckboxLabel aria-label="aria">
                  <Text
                    style={{
                      fontFamily: "MontserratSemibold",
                      color: "white",
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    Anticogelante
                  </Text>
                </CheckboxLabel>
              </CheckboxIndicator>
            </Checkbox>

            <Checkbox value="Filtro de Aire" aria-label="Seleccionar Aire">
              <CheckboxIndicator
                aria-label="aria"
                sx={{
                  width: 100,
                  height: 37,
                  backgroundColor: "transparent",
                  borderRadius: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CheckboxLabel aria-label="aria">
                  <Text
                    style={{
                      fontFamily: "MontserratSemibold",
                      color: "white",
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    Filtro Aire
                  </Text>
                </CheckboxLabel>
              </CheckboxIndicator>
            </Checkbox>
          </CheckboxGroup>
        </ScrollView>
      </Box>
      <Box id="checkboxes2">
        <Text
          style={{
            fontFamily: "MontserratRegular",
            color: "white",
            fontSize: 18,
            padding: 10,
          }}
        >
          Extras
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false} // Opcional: Para ocultar la barra de desplazamiento horizontal
        >
          <CheckboxGroup
            value={values}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
            }}
            onChange={(keys) => {
              setValues(keys);
            }}
          >
            <Checkbox value="Luces" aria-label="Seleccionar luces">
              <CheckboxIndicator
                aria-label="aria"
                sx={{
                  width: 100,
                  height: 37,
                  backgroundColor: "transparent",
                  borderRadius: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CheckboxLabel aria-label="aria">
                  <Text
                    style={{
                      fontFamily: "MontserratSemibold",
                      color: "white",
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    Luces
                  </Text>
                </CheckboxLabel>
              </CheckboxIndicator>
            </Checkbox>

            <Checkbox value="Frenos" aria-label="Seleccionar frenos">
              <CheckboxIndicator
                aria-label="aria"
                sx={{
                  width: 100,
                  height: 37,
                  backgroundColor: "transparent",
                  borderRadius: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CheckboxLabel aria-label="aria">
                  <Text
                    style={{
                      fontFamily: "MontserratSemibold",
                      color: "white",
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    Frenos
                  </Text>
                </CheckboxLabel>
              </CheckboxIndicator>
            </Checkbox>

            <Checkbox
              value="Revisión de bateria"
              aria-label="Seleccionar bateria"
            >
              <CheckboxIndicator
                aria-label="aria"
                sx={{
                  width: 100,
                  height: 37,
                  backgroundColor: "transparent",
                  borderRadius: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CheckboxLabel aria-label="aria">
                  <Text
                    style={{
                      fontFamily: "MontserratSemibold",
                      color: "white",
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    Rev. bateria
                  </Text>
                </CheckboxLabel>
              </CheckboxIndicator>
            </Checkbox>

            <Checkbox value="Llantas" aria-label="Seleccionar llantas">
              <CheckboxIndicator
                aria-label="aria"
                sx={{
                  width: 100,
                  height: 37,
                  backgroundColor: "transparent",
                  borderRadius: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CheckboxLabel aria-label="aria">
                  <Text
                    style={{
                      fontFamily: "MontserratSemibold",
                      color: "white",
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    Llantas
                  </Text>
                </CheckboxLabel>
              </CheckboxIndicator>
            </Checkbox>

            <Checkbox value="Claxon" aria-label="Seleccionar claxon">
              <CheckboxIndicator
                aria-label="aria"
                sx={{
                  width: 100,
                  height: 37,
                  backgroundColor: "transparent",
                  borderRadius: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CheckboxLabel aria-label="aria">
                  <Text
                    style={{
                      fontFamily: "MontserratSemibold",
                      color: "white",
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    Claxon
                  </Text>
                </CheckboxLabel>
              </CheckboxIndicator>
            </Checkbox>
          </CheckboxGroup>
        </ScrollView>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 30,
          paddingHorizontal: 10,
          marginVertical: 20,
        }}
      >
        <Input variant="underlined" size="md">
          <InputField
            sx={{ color: "white" }}
            onChangeText={(text) => setCosto(text)}
            placeholder="Costo total"
            keyboardType="numeric"
          />
        </Input>

        <Textarea size="md">
          <TextareaInput
            onChangeText={(text) => setDetalles(text)}
            sx={{ color: "white" }}
            size="sm"
            role="document"
            placeholder="Añade mas detalles..."
          />
        </Textarea>

        <Button
          action="secondary"
          onPress={handleSubmit}
          sx={{
            marginTop: 10,
            marginHorizontal: 40,
            backgroundColor: "#06FF10",
          }}
        >
          <ButtonText> Guardar</ButtonText>
        </Button>
      </Box>
    </View>
  );
}

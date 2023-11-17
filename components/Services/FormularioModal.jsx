import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
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
} from "@gluestack-ui/themed";
import SheduleService from "./SheduleService";
import RegisterService from "./RegisterService";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { update } from "../../src/sliceServices"; // Ajusta la ruta a tu archivo miSlice

export default function ModalForm({ status, onClose }) {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState();

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const handleSubmit = () => {
    dispatch(update());
  };

  const close = () => {
    onClose();
  };

  return (
    <View>
      <Modal sx={{ marginVertical: 10 }} isOpen={status}>
        <ModalBackdrop onPress={close} sx={{ backgroundColor: "#000000" }} />
        <ModalContent
          sx={{ backgroundColor: "rgba(25, 25, 25, 1),", paddingVertical: 11 }}
        >

          <ModalHeader>
            <Text
              style={{
                fontFamily: "MontserratSemibold",
                color: "white",
                fontSize: 16,
              }}
            >
              Registro de servicios 
            </Text>
          </ModalHeader>

          <ModalBody>
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
                  <SelectItem label="Agendar un servicio" value="Agendar" />
                  <SelectItem label="Registrar un servicio" value="Registrar" />
                </SelectContent>
              </SelectPortal>
            </Select>

            {selectedValue=="Agendar"?<SheduleService  onSubmit={handleSubmit} onClose={onClose}  />:  <></>}
            {selectedValue=="Registrar"? <RegisterService onSubmit={handleSubmit} onClose={onClose} />: <></>}

          
          </ModalBody>
        </ModalContent>
      </Modal>
    </View>
  );
}

export const commonStyles = StyleSheet.create({
  fontStyle1: {
    fontSize: 17,
    fontFamily: "MontserratThin",
  },
  fontStyle2: {
    fontSize: 20,
    fontFamily: "MontserratRegular",
  },
  fontStyle3: {
    fontSize: 16,
    fontFamily: "MontserratSemibold",
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
});

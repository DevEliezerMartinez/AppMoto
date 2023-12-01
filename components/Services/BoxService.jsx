import { View, Text } from "../../components/Themed";
import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import {
  Box,
  Divider,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@gluestack-ui/themed";
import { Pressable } from "react-native";

const ComponentCard = ({ data, index }) => {
  const [showModal, setShowModal] = useState(false);

  let liston = data.piezas || [];
  liston = data.piezas ? data.piezas.split(",") : [];


  const PressIn = () => {
    setShowModal(true);
  };

  return (
    <>
      <Pressable
        style={{
          backgroundColor: "#1E1E1E",
          marginVertical: 10,
          padding: 15,
          borderRadius: 8,
        }}
        onLongPress={PressIn}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: "MontserratSemibold",
          }}
        >
          Servicio #{index + 1}
        </Text>

        <Box
          sx={{
            backgroundColor:
              data.status === "Registrar" ? "#0ADD12" : "#007BFF",
            width: 125,
            padding: 3,
            right: -200,
            top: -40,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "MontserratSemibold",
              textAlign: "center",
            }}
          >
            {data.status === "Registrar" ? "Hecho" : "Próximo"}
          </Text>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "MontserratSemibold",
              textAlign: "center",
              color: "#979292",
            }}
          >
            {data.notas && data.notas.length > 18
              ? `${data.notas.slice(0, 18)}...`
              : data.notas}
          </Text>

          <Text
            style={{
              fontSize: 14,
              fontFamily: "MontserratSemibold",
              textAlign: "center",
              color: "#979292",
            }}
          >
            {data.fecha}
          </Text>
        </Box>
      </Pressable>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <ModalBackdrop sx={{ backgroundColor: "#000000" }} />
        <ModalContent
          sx={{ backgroundColor: "rgba(25, 25, 25, 1),", paddingVertical: 11 }}
        >
          <ModalHeader>
            <Text
              style={{
                fontFamily: "MontserratSemibold",
                color: "white",
                fontSize: 20,
              }}
            >
              Servicio #{index + 1}
            </Text>
          </ModalHeader>
          <ModalBody>
            <Text
              style={{
                fontFamily: "MontserratSemibold",
                color: "#979292",
                fontSize: 16,
              }}
            >
              {data.fecha}
            </Text>

            <Divider sx={{ marginVertical: 10 }} />

            <Box id="lista">
              {liston.map((item, index) => (
                <Text
                  key={index}
                  style={{
                    fontSize: 14,
                    fontFamily: "MontserratSemibold",
                    color: "#979292",
                  }}
                >
                  {`\u2022 ${item.replace(/[^a-zA-Z0-9]/g, "")}`}{" "}
                </Text>
              ))}
            </Box>

            <Text
              style={{
                marginVertical: 10,
                fontSize: 18,
                fontFamily: "MontserratSemibold",
              }}
            >
              Total:{data.costo !== null ? `$${data.costo}` : " "}
            </Text>
            <Text
              style={{
                marginVertical: 10,
                fontSize: 14,
                fontFamily: "MontserratRegular",
              }}
            >
              {data.notas}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ComponentCard;

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

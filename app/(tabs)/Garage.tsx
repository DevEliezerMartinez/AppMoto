import { Image, Pressable, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { useEffect, useState } from "react";
import { Box, Divider, Icon, MailIcon, ScrollView } from "@gluestack-ui/themed";
import Modal from "../../components/Profile/ModalProfile";

import { supabase } from "../../lib/supabase";
import ListProvider from "../../components/Profile/ListProfile";
import { InfoIcon } from "@gluestack-ui/themed";

export default function Garage() {
  const [DataProfile, setDataProfile] = useState([]);
  //state para mostrar perfiles o vacio

  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
    fetchProfiles(); // Call fetchProfiles when the modal is closed
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const fetchProfiles = async () => {
    try {
      let { data: perfiles, error } = await supabase
        .from("perfiles")
        .select("*");

      // Verifica si perfiles no es null antes de actualizar el estado
      if (perfiles !== null) {
        setDataProfile(perfiles);
        perfiles.map((item) => {});
      } else {
        console.error("La respuesta de Supabase fue nula.");
      }
    } catch (error) {
      console.error("Error al obtener perfiles:", error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center", paddingTop: 0 }}>
        
        <Box sx={{ marginTop: 80, width: "$full", paddingHorizontal: 30 }}>
        <Icon sx={{color:"white", marginLeft:10}} as={InfoIcon} w="$5" h="$5" />
          <Text
            style={{
              fontFamily: "MontserratSemibold",
              fontSize: 24,
              textAlign: "center",
            }}
          >
            Garage de motocicletas

          
          </Text>
          

          <Box
            sx={{
              gap: 40,
              marginHorizontal: 0,
              marginTop: 80,
              backgroundColor: "rgba(25, 25, 25, 1),",
              paddingVertical: 30,
              paddingHorizontal: 10,

              borderRadius: 8,
              width: "$full",
            }}
          >
            <Text
              style={{
                fontFamily: "MontserratRegular",
                textAlign: "center",
                fontSize: 18,
              }}
            >
              Motocicletas registradas
            </Text>

            <Divider sx={{ marginVertical: 0 }} />

            <ScrollView sx={{ height: 320 }}>
              {DataProfile.map((item: any) => (
                <ListProvider key={item.modelo} data={item} />
              ))}
            </ScrollView>
          </Box>

          <Pressable
            onPress={handleOpenModal}
            style={{
              padding: 8,
              backgroundColor: "#066AFF",
              borderRadius: 32,
              marginTop: 30,
              marginHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "MontserratSemibold",
                textAlign: "center",
              }}
            >
              Agregar una nueva moto
            </Text>
          </Pressable>

          <Modal status={openModal} onclose={handleCloseModal} />
        </Box>
      </View>
    </ScrollView>
  );
}

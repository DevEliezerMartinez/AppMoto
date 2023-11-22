import { Image, Pressable, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { useEffect, useState } from "react";
import { Box, Divider, ScrollView } from "@gluestack-ui/themed";
import Modal from "../../components/Profile/ModalProfile";

import { supabase } from "../../lib/supabase";
import ListProvider from "../../components/Profile/ListProfile";
let datosPerfiles = [
  {
    marca: "Italika",
    modelo: "125z",
    image: "../../assets/images/150z.png",
    año: "2020",
  },
  {
    marca: "Italika",
    modelo: "150z",
    image: "../../assets/images/150z.png",
    año: "2020",
  },
  {
    marca: "Italika",
    modelo: "200z",
    image: "../../assets/images/150z.png",
    año: "2020",
  },
];

export default function Garage() {
  const [DataProfile, setDataProfile] = useState([]);
  //state para mostrar perfiles o vacio
  const [mostrar, setmostrar] = useState(false);
  console.log(mostrar);

  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
    fetchProfiles(); // Call fetchProfiles when the modal is closed

    /*   mostrar(); */
  };
  const handleOpenModal = () => {
    setOpenModal(true);
    /*   mostrar(); */
  };

  const fetchProfiles = async () => {
    try {
      let { data: perfiles, error } = await supabase
        .from("perfiles")
        .select("*");

      // Verifica si perfiles no es null antes de actualizar el estado
      if (perfiles !== null) {
        setDataProfile(perfiles);
        console.log("datos importados corrrectamente");
        perfiles.map((item) => {
          console.log(item);
        });
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
    <View style={{ flex: 1, alignItems: "center", paddingTop: 0 }}>
      <Box sx={{ marginTop: 80, width: "$full", paddingHorizontal: 30 }}>
        <Text
          style={{
            fontFamily: "MontserratSemibold",
            fontSize: 24,
            textAlign: "center",
          }}
        >
          Garage de motocicletaas
        </Text>

        {mostrar ? (
          <ContainerVacio />
        ) : (
          <ShowProfiles DataProfile={DataProfile} />
        )}

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

const ContainerVacio = () => (
  <Box
    sx={{
      marginVertical: 0,
      gap: 10,
      alignItems: "center",
    }}
  >
    <Image
      style={{ width: 350, height: 200, marginTop: 100 }}
      source={require(`../../assets/images/nuevoPer.jpg`)} // Intenta importar la imagen usando la ruta específica
    />
    <Text
      style={{
        fontFamily: "MontserratSemibold",
        textAlign: "center",
        marginTop: 20,
      }}
    >
      Aqui podras ver tus motos, empieza por agregar una!
    </Text>
  </Box>
);

const ShowProfiles = ({ DataProfile }: { DataProfile: any }) => (
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

    <ScrollView sx={{ height: 320,}}>
      {DataProfile.map((item: any) => (
        <ListProvider key={item.modelo} data={item} />
      ))}
    </ScrollView>
  </Box>
);

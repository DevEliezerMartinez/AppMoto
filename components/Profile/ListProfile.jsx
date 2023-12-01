import { Alert, Image, Pressable, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Text, View } from "../Themed";
import { AlertIcon, AlertText, InfoIcon, ToastDescription, ToastTitle, VStack } from "@gluestack-ui/themed";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { update } from "../../src/sliceID";
import { updateroute } from "../../src/sliceRoutes";
import { updateroute2 } from "../../src/sliceTrips";
import { useToast, Toast } from "@gluestack-ui/themed"
import {
  actualizarMarca,
  actualizarModelo,
  actualizarAño,
  actualizarRuta,
  actualizarID
} from "../../src/sliceInfoProfile";

export default function listProfile({ data }) {
  const counterValue = useSelector((state) => state.IDlist.counter);
  const routeMatch = useSelector((state) => state.routeMatch);
  const dispatch = useDispatch();


  const toast = useToast();

  const seleccinarPerfil = () => {
    dispatch(update());
    dispatch(updateroute("/(tabs)/Services/"));

    dispatch(updateroute2("/(tabs)/trips/"));

    dispatch(actualizarMarca(data.marca));
    dispatch(actualizarModelo(data.modelo));
    dispatch(actualizarAño(data.año));
    dispatch(actualizarRuta(data.imagen));
    dispatch(actualizarID(data.id_perfil));

    toast.show({
      placement: "top",
      render: ({ id }) => {
        return (
          <Toast nativeID={"toast-" + id} action="success" variant="accent" sx={{position: "absolute" , top: 45, right: 0}}>
            <VStack space="xs">
              <ToastTitle>Perfil cambiado</ToastTitle>
             
            </VStack>
          </Toast>
        );
      },
    });
  };

  return (
    <>
      <Pressable
        onPress={seleccinarPerfil}
        space="md"
        style={{
          display: "flex",
          gap: 10,
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          marginVertical: 10,
          paddingHorizontal: 10,
        }}
      >
        <Image
          source={{ uri: data.imagen }}
          style={{ width: 50, height: 50, borderRadius: 25, marginRight: 20 }}
        />
        <VStack>
          <Text
            style={{
              fontFamily: "MontserratBold",

              fontSize: 16,
              textTransform: "uppercase",
            }}
          >
            {data.marca} {data.modelo}
          </Text>
          <Text style={{ fontFamily: "MontserratSemibold", fontSize: 14 }}>
            {data.año}
          </Text>
        </VStack>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({});

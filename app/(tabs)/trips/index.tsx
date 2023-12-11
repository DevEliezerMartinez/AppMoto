import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "../../../components/Themed";
import { useContext, useState } from "react";
import {
  Avatar,
  Box,
  Center,
  HStack,
  Heading,
  ScrollView,
  VStack,
} from "@gluestack-ui/themed";
import FirstTrip from "../../../components/trip/firstTrip";
import WatchTrips from "../../../components/trip/WatchTrips";
import Header from "../../../components/trip/Header";
export default function TabOneScreen() {
  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center", paddingTop: 30, marginBottom:-0 }}>
        <Header />

        <Center sx={{ height: 580, width: 370 }}>
          <WatchTrips />
        </Center>
      </View>
    </ScrollView>
  );
}

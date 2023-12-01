import { Tabs } from "expo-router";
import { Image } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function TabLayout() {
  const routeMatch = useSelector(
    (state: { routeMatch: any }) => state.routeMatch
  );

  const routeTrip = useSelector((state: { routeTrip: any }) => state.routeTrip);

  const [servicesHref, setServicesHref] = useState(null);
  const [tripsHref, setripsHref] = useState(null);

  useEffect(() => {
    setServicesHref(routeMatch.counter);
    setripsHref(routeTrip.counter);
  }, [routeMatch]);

  const ColorsSet = {
    light: {
      text: "#000",
      tint: "blue",
      tabIconDefault: "#ccc",
      tabIconSelected: "blue",
      orange: "#ffb900", // Agregar "orange" aquí con el valor que desees
    },
    dark: {
      text: "#fff",
      background: "#000",
      tint: "blue",
      tabIconDefault: "#ccc",
      tabIconSelected: "blue",
      orange: "#ffb900", // Agregar "orange" aquí con el valor que desees
      brown: "#78290f",
      blue: "#15616d",
      black: "#404040",
    },
  };
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2DC653",
        tabBarStyle: {
          backgroundColor: ColorsSet.dark.black,
        },
      }}
    >
      <Tabs.Screen
        name="Garage"
        options={{
          title: "Garage",
          headerShown: false,
          tabBarLabelStyle: {
            fontFamily: "MontserratSemibold", // Usa el nombre definido en Font.loadAsync
            fontSize: 13,
          },
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/Motorcycle.png")}
              style={{ width: 30, height: 30, tintColor: "#FFFFFF" }}
            />
          ),
        }}
      />
     
      <Tabs.Screen
        name="Services"
        options={{
          title: "Servicios",
          headerShown: false,
          href: tripsHref,

          tabBarLabelStyle: {
            fontFamily: "MontserratSemibold", // Usa el nombre definido en Font.loadAsync
            fontSize: 13,
          },
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/tool-02.png")}
              style={{ width: 30, height: 30, tintColor: "#FFFFFF" }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="trips"
        options={{
          title: "Mis viajes",
          headerShown: false,
          href: servicesHref,
          tabBarLabelStyle: {
            fontFamily: "MontserratSemibold",
            fontSize: 13,
          },
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/road-64.png")}
              style={{ width: 25, height: 25, tintColor: "#FFFFFF" }}
            />
          ),
        }}
      />

    
    </Tabs>
  );
}

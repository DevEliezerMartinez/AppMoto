import { Stack } from "expo-router";

 const stackLayoutInside = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}}/>
      <Stack.Screen name="settings" options={{headerShown: false}}/>
    </Stack>
  );
};

export default stackLayoutInside
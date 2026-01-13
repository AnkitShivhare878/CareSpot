import { Stack } from "expo-router";

export default function AmbulanceLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="pickup" />
      <Stack.Screen name="destination" />
      <Stack.Screen name="ambulance-type" />
      <Stack.Screen name="payment" />
      <Stack.Screen name="confirmation" />
    </Stack>
  );
}

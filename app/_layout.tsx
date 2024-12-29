import { Stack } from "expo-router";
import { UserProvider } from "../context/userContext";

import "../global.css";

export default function Layout() {
  return (
    <UserProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  );
}

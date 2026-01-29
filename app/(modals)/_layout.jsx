import { Stack } from "expo-router";

export default function ModalsLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: "modal",
        animation: "fade",
        headerShown: false,
      }}
    />
  );
}

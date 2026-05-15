import { Stack } from "expo-router";
import { NotasProvider } from "./NotasContext";

export default function Layout() {
  return (
    <NotasProvider>
      <Stack screenOptions={{ headerStyle: { backgroundColor: "#4F8EF7" }, headerTintColor: "#fff" }} />
    </NotasProvider>
  );
}
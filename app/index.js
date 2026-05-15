import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Agenda Digital</Text>
      <TouchableOpacity style={styles.botao} onPress={() => router.push("/agenda")}>
        <Text style={styles.texto}>Abrir Agenda</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botao} onPress={() => router.push("/lista")}>
        <Text style={styles.texto}>Lista de Compromissos</Text>
      </TouchableOpacity>
   <TouchableOpacity
  style={styles.botao}
  onPress={() => router.push("/calendario")}
>
  <Text style={styles.texto}>📅 Calendário</Text>
</TouchableOpacity> </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#f5f7fb" },
  titulo: { fontSize: 32, fontWeight: "bold", marginBottom: 40, textAlign: "center" },
  botao: { backgroundColor: "#4F8EF7", padding: 18, borderRadius: 14, marginBottom: 16 },
  texto: { color: "white", fontSize: 18, textAlign: "center", fontWeight: "bold" },
});
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useContext } from "react";
import { NotasContext } from "./NotasContext";

export default function AddNota() {
  const { data } = useLocalSearchParams();
  const router = useRouter();
  const { salvarNota } = useContext(NotasContext);

  const [texto, setTexto] = useState("");

  function salvar() {
    salvarNota(data, texto);
    router.back();
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        📅 {data}
      </Text>

      <TextInput
        placeholder="Digite seu lembrete..."
        value={texto}
        onChangeText={setTexto}
        style={{
          backgroundColor: "#fff",
          padding: 10,
          borderRadius: 8,
          marginBottom: 20,
          height: 50
        }}
      />

      <TouchableOpacity
        onPress={salvar}
        style={{
          backgroundColor: "#4CAF50",
          padding: 12,
          borderRadius: 8
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Salvar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
import { useContext } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NotasContext } from './NotasContext';

export default function ListaCompromissos() {
  const { notas } = useContext(NotasContext);

  // Só mostra as tarefas concluídas (histórico)
  const historico = notas.filter(n => n.concluido);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>📋 Histórico de Concluídos</Text>

      {historico.length === 0 ? (
        <View style={styles.vazioBox}>
          <Text style={styles.vazioEmoji}>📭</Text>
          <Text style={styles.vazioTexto}>Nenhuma tarefa concluída ainda.</Text>
          <Text style={styles.vazioSub}>Conclua tarefas na Agenda para ver o histórico aqui.</Text>
        </View>
      ) : (
        <FlatList
          data={historico}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.check}>✔</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitulo}>{item.titulo}</Text>
                <Text style={styles.cardData}>📅 {item.data}</Text>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fb' },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#4F8EF7', textAlign: 'center', padding: 20 },
  vazioBox: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  vazioEmoji: { fontSize: 50, marginBottom: 16 },
  vazioTexto: { fontSize: 16, color: '#999', fontWeight: 'bold', textAlign: 'center' },
  vazioSub: { fontSize: 13, color: '#bbb', textAlign: 'center', marginTop: 8 },
  card: { backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 12, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  check: { fontSize: 22, color: '#4FBF8E', marginRight: 12 },
  cardTitulo: { fontSize: 15, fontWeight: 'bold', color: '#333', textDecorationLine: 'line-through' },
  cardData: { fontSize: 12, color: '#999', marginTop: 4 },
});
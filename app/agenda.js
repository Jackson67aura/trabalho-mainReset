import { useContext, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { NotasContext } from './NotasContext';

LocaleConfig.locales['br'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'br';

export default function Agenda() {
  const { notas, salvarNota, removerNota, toggleConcluido } = useContext(NotasContext);
  const hoje = new Date().toISOString().split('T')[0];
  const [diaSelecionado, setDiaSelecionado] = useState(hoje);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [novoTexto, setNovoTexto] = useState('');
  const [editTexto, setEditTexto] = useState('');
  const [editId, setEditId] = useState(null);

  const tarefasDoDia = notas.filter(n => n.data === diaSelecionado);

  function adicionarTarefa() {
    if (!novoTexto.trim()) {
      Alert.alert('Digite uma tarefa!');
      return;
    }
    salvarNota(diaSelecionado, novoTexto.trim());
    setNovoTexto('');
    setModalVisible(false);
  }

  function abrirEdicao(item) {
    setEditId(item.id);
    setEditTexto(item.titulo);
    setEditModalVisible(true);
  }

  function salvarEdicao() {
    if (!editTexto.trim()) {
      Alert.alert('Digite um nome!');
      return;
    }
    removerNota(editId);
    salvarNota(diaSelecionado, editTexto.trim());
    setEditModalVisible(false);
  }

  function confirmarRemocao(id) {
    Alert.alert(
      'Remover tarefa',
      'Tem certeza que quer remover essa tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', style: 'destructive', onPress: () => removerNota(id) },
      ]
    );
  }

  const diasMarcados = {};
  notas.forEach(n => {
    diasMarcados[n.data] = { marked: true, dotColor: '#4F8EF7' };
  });
  if (diaSelecionado) {
    diasMarcados[diaSelecionado] = {
      ...diasMarcados[diaSelecionado],
      selected: true,
      selectedColor: '#4F8EF7',
    };
  }

  return (
    <SafeAreaView style={styles.container}>

      <Calendar
        onDayPress={(day) => setDiaSelecionado(day.dateString)}
        markedDates={diasMarcados}
        theme={{
          selectedDayBackgroundColor: '#4F8EF7',
          selectedDayTextColor: '#fff',
          todayTextColor: '#4F8EF7',
          arrowColor: '#4F8EF7',
          monthTextColor: '#4F8EF7',
          textMonthFontWeight: 'bold',
          dotColor: '#4F8EF7',
        }}
      />

      <View style={styles.header}>
        <Text style={styles.headerText}>
          {diaSelecionado ? '📅 ' + diaSelecionado : 'Selecione um dia'}
        </Text>
        <TouchableOpacity style={styles.btnAdicionar} onPress={() => setModalVisible(true)}>
          <Text style={styles.btnAdicionarTexto}>+ Adicionar</Text>
        </TouchableOpacity>
      </View>

      {tarefasDoDia.length === 0 ? (
        <Text style={styles.vazio}>Nenhuma tarefa nesse dia.</Text>
      ) : (
        <FlatList
          data={tarefasDoDia}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity onPress={() => toggleConcluido(item.id)} style={styles.check}>
                <Text style={{ fontSize: 22, color: '#4F8EF7' }}>
                  {item.concluido ? '✔' : '○'}
                </Text>
              </TouchableOpacity>
              <Text style={[styles.cardTitulo, item.concluido && styles.concluido]}>
                {item.titulo}
              </Text>
              <TouchableOpacity onPress={() => abrirEdicao(item)} style={styles.btnEdit}>
                <Text style={{ fontSize: 18 }}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => confirmarRemocao(item.id)} style={styles.btnRemover}>
                <Text style={{ fontSize: 18 }}>🗑</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalFundo}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitulo}>Nova Tarefa</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a tarefa..."
              value={novoTexto}
              onChangeText={setNovoTexto}
            />
            <TouchableOpacity style={styles.botao} onPress={adicionarTarefa}>
              <Text style={styles.botaoTexto}>SALVAR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelar}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={editModalVisible} transparent animationType="slide">
        <View style={styles.modalFundo}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitulo}>Editar Tarefa</Text>
            <TextInput
              style={styles.input}
              value={editTexto}
              onChangeText={setEditTexto}
            />
            <TouchableOpacity style={styles.botao} onPress={salvarEdicao}>
              <Text style={styles.botaoTexto}>SALVAR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
              <Text style={styles.cancelar}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fb' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerText: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  btnAdicionar: { backgroundColor: '#4F8EF7', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  btnAdicionarTexto: { color: 'white', fontWeight: 'bold' },
  vazio: { textAlign: 'center', marginTop: 40, color: '#999', fontSize: 15 },
  card: { backgroundColor: 'white', padding: 14, borderRadius: 12, marginBottom: 12, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  check: { marginRight: 10 },
  cardTitulo: { flex: 1, fontSize: 15, color: '#333' },
  concluido: { textDecorationLine: 'line-through', color: '#aaa' },
  btnEdit: { padding: 6, marginRight: 4 },
  btnRemover: { padding: 6 },
  modalFundo: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalBox: { backgroundColor: 'white', borderRadius: 20, padding: 24 },
  modalTitulo: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 12, fontSize: 15, marginBottom: 12 },
  botao: { backgroundColor: '#4F8EF7', padding: 14, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  botaoTexto: { color: 'white', fontWeight: 'bold', fontSize: 15 },
  cancelar: { textAlign: 'center', color: '#999', fontSize: 14 },
});
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['br'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'br';

export default function Calendario() {
  const [diaSelecionado, setDiaSelecionado] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📅 Calendário</Text>
      <View style={styles.card}>
        <Calendar
          onDayPress={(day) => setDiaSelecionado(day.dateString)}
          markedDates={{
            [diaSelecionado]: { selected: true, selectedColor: '#4F8EF7' },
            '2026-05-01': { marked: true, dotColor: 'red' },
            '2026-05-14': { marked: true, dotColor: 'green' },
            '2026-05-20': { marked: true, dotColor: 'orange' },
          }}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#4F8EF7',
            selectedDayBackgroundColor: '#4F8EF7',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#4F8EF7',
            todayBackgroundColor: '#EBF2FF',
            dayTextColor: '#2d4150',
            monthTextColor: '#4F8EF7',
            arrowColor: '#4F8EF7',
            textDayFontWeight: '500',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: 'bold',
            textDayFontSize: 16,
            textMonthFontSize: 22,
            textDayHeaderFontSize: 14,
          }}
        />
      </View>
      {diaSelecionado ? (
        <View style={styles.diaBox}>
          <Text style={styles.diaTexto}>📌 Dia selecionado: {diaSelecionado}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fb', padding: 16, paddingTop: 30 },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#4F8EF7', textAlign: 'center', marginBottom: 20 },
  card: { backgroundColor: 'white', borderRadius: 20, padding: 10, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8 },
  diaBox: { marginTop: 20, backgroundColor: 'white', borderRadius: 14, padding: 16, elevation: 2 },
  diaTexto: { fontSize: 16, color: '#333', fontWeight: 'bold' },
});
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CURRENT_YEAR = new Date().getFullYear();
const START_YEAR = 2020; 

type YearMonthFilterProps = {
  onFilterChange?: (filter: { year: string; month: string }) => void; 
};

const years: string[] = [];
for (let y = START_YEAR; y <= CURRENT_YEAR; y++) {
  years.push(y.toString());
}

export default function YearMonthFilter({ onFilterChange }: YearMonthFilterProps) {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const months = [
    { label: 'Svi mjeseci', value: '' },
    { label: 'Siječanj', value: '01' },
    { label: 'Veljača', value: '02' },
    { label: 'Ožujak', value: '03' },
    { label: 'Travanj', value: '04' },
    { label: 'Svibanj', value: '05' },
    { label: 'Lipanj', value: '06' },
    { label: 'Srpanj', value: '07' },
    { label: 'Kolovoz', value: '08' },
    { label: 'Rujan', value: '09' },
    { label: 'Listopad', value: '10' },
    { label: 'Studeni', value: '11' },
    { label: 'Prosinac', value: '12' },
    ];


  
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setSelectedMonth(''); 
    if (onFilterChange) onFilterChange({ year, month: '' });
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    if (onFilterChange) onFilterChange({ year: selectedYear, month });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Godina:</Text>
      <Picker
        selectedValue={selectedYear}
        style={styles.picker}
        onValueChange={handleYearChange}
      >
        <Picker.Item label="Odaberi godinu" value="" />
        {years.map(year => (
          <Picker.Item key={year} label={year} value={year} />
        ))}
      </Picker>
      {selectedYear ? (
        <>
          <Text style={styles.label}>Mjesec:</Text>
          <Picker
            selectedValue={selectedMonth}
            style={styles.picker}
            onValueChange={handleMonthChange}
          >
            {months.map(month => (
              <Picker.Item key={month.value} label={month.label} value={month.value} />
            ))}
          </Picker>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { margin: 16 },
  label: { fontWeight: 'bold', marginBottom: 8 },
  picker: { height: 44, marginBottom: 24 },
});
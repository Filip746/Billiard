import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

type YearMonthFilterProps = {
  onFilterChange?: (filter: { year: string; month: string }) => void;
};

export default function YearMonthFilter({
  onFilterChange,
}: YearMonthFilterProps) {
  const [selectedYear, setSelectedYear] = React.useState("");
  const [selectedMonth, setSelectedMonth] = React.useState("");

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const years = [];
  const CURRENT_YEAR = new Date().getFullYear();
  const START_YEAR = 2020;
  for (let y = START_YEAR; y <= CURRENT_YEAR; y++) years.push(y.toString());
  const months = [
    { label: "Svi mjeseci", value: "" },
    { label: "Siječanj", value: "01" },
    { label: "Veljača", value: "02" },
    { label: "Ožujak", value: "03" },
    { label: "Travanj", value: "04" },
    { label: "Svibanj", value: "05" },
    { label: "Lipanj", value: "06" },
    { label: "Srpanj", value: "07" },
    { label: "Kolovoz", value: "08" },
    { label: "Rujan", value: "09" },
    { label: "Listopad", value: "10" },
    { label: "Studeni", value: "11" },
    { label: "Prosinac", value: "12" },
  ];

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setSelectedMonth("");
    if (onFilterChange) onFilterChange({ year, month: "" });
  };
  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    if (onFilterChange) onFilterChange({ year: selectedYear, month });
  };

  return (
    <Animated.View
      style={[
        styles.animatedBox,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <Text style={styles.label}>Godina:</Text>
      <View style={styles.pickerBox}>
        <Picker
          selectedValue={selectedYear}
          style={styles.picker}
          onValueChange={handleYearChange}
          dropdownIconColor="#009cf0"
        >
          <Picker.Item label="Odaberi godinu" value="" />
          {years.map((year) => (
            <Picker.Item key={year} label={year} value={year} />
          ))}
        </Picker>
      </View>
      {selectedYear ? (
        <>
          <Text style={styles.label}>Mjesec:</Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={selectedMonth}
              style={styles.picker}
              onValueChange={handleMonthChange}
              dropdownIconColor="#009cf0"
            >
              {months.map((month) => (
                <Picker.Item
                  key={month.value}
                  label={month.label}
                  value={month.value}
                />
              ))}
            </Picker>
          </View>
        </>
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animatedBox: {
    marginTop: 12,
    marginHorizontal: 8,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
    shadowColor: "#009cf0",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.11,
    shadowRadius: 20,
    elevation: 7,
    borderWidth: 1.2,
    borderColor: "#e3f2fb",
  },
  label: {
    fontWeight: "600",
    color: "#12a8ff",
    fontSize: 16,
    marginBottom: 7,
    marginLeft: 1,
    letterSpacing: 0.3,
  },
  pickerBox: {
    backgroundColor: "#f6fbff",
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#d5eeff",
    marginBottom: 18,
    overflow: "hidden",
    height: 54,
    justifyContent: "center",
  },
  picker: {
    height: 54,
    color: "#187bc3",
    fontSize: 15,
    paddingLeft: 8,
    backgroundColor: "transparent",
    textAlignVertical: "center",
  },
});

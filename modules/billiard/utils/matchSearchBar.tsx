import { historyStyles } from '@/features/history/styles/historyStyles';
import React from 'react';
import { TextInput, View } from 'react-native';

type MatchSearchBarProps = {
  searchText: string;
  setSearchText: (text: string) => void;
  dateText?: string;
  setDateText?: (text: string) => void;
  showDateInput?: boolean;
};

export function MatchSearchBar({
  searchText,
  setSearchText,
  dateText = '',
  setDateText = () => {},
  showDateInput = true,
}: MatchSearchBarProps) {
  return (
    <View style={historyStyles.searchBarSection}>
      <TextInput
        style={historyStyles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Pretraži po imenu"
        placeholderTextColor="#b3b3b3"
      />
      {showDateInput && (
        <TextInput
          style={historyStyles.dateInput}
          value={dateText}
          onChangeText={setDateText}
          placeholder="Datum (npr. 15.7.2025)"
          placeholderTextColor="#b3b3b3"
        />
      )}
    </View>
  );
}

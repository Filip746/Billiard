import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

type MatchSearchBarProps = {
  searchText: string;
  setSearchText: (text: string) => void;
  onFilterPress?: () => void;
  dateText?: string;
  setDateText?: (text: string) => void;
  showDateInput?: boolean;
  showFilterIcon?: boolean; // NOVO!
};

export function MatchSearchBar({
  searchText,
  setSearchText,
  onFilterPress,
  dateText = '',
  setDateText = () => {},
  showDateInput = false,
  showFilterIcon = true, // defaultno prikazuj ako nije specificirano
}: MatchSearchBarProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#12a8ff', padding: 10 }}>
      <View style={{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.07)',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 44,
      }}>
        <Ionicons name="search" size={18} color="#fff" style={{ marginRight: 7 }} />
        <TextInput
          style={{ flex: 1, color: '#fff', fontSize: 18 }}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search"
          placeholderTextColor="#fff"
        />
        {showDateInput && (
          <TextInput
            style={{
              marginLeft: 12,
              color: '#fff',
              fontSize: 16,
              minWidth: 110,
              borderLeftWidth: 1,
              borderLeftColor: '#fff7',
              paddingLeft: 10,
            }}
            value={dateText}
            onChangeText={setDateText}
            placeholder="Datum (npr. 15.7.2025)"
            placeholderTextColor="#fff"
          />
        )}
      </View>
      {showFilterIcon && (
        <TouchableOpacity
          onPress={onFilterPress}
          style={{
            marginLeft: 12,
            padding: 8,
            borderRadius: 10,
            backgroundColor: 'rgba(255,255,255,0.09)',
          }}>
          <Ionicons name="options-outline" size={26} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}


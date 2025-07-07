import { players } from '@/const/players';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Button, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { usePlayerSelection } from './usePlayerSelection';

export function PlayerSelection() {
  const initialEndTime = new Date().getTime();
  const {
    selectedPlayer1, setSelectedPlayer1,
    selectedPlayer2, setSelectedPlayer2,
    selectedMinutes, handleTimeChange,
    scoreLimit, setScoreLimit,
    startMatch,
  } = usePlayerSelection(initialEndTime);

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Select Your Players</Text>
      {/* Player 1 */}
      <View style={styles.section}>
        <Text style={styles.title}>Player 1</Text>
        <ScrollView horizontal contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
          {players.map((player1) => (
            <TouchableOpacity
              key={player1.id}
              style={[
                styles.playerCard,
                { backgroundColor: player1.color },
                selectedPlayer1 === player1.id && styles.selectedPlayer,
              ]}
              onPress={() => setSelectedPlayer1(player1.id)}
            >
              <Image source={player1.avatar} style={styles.avatar} />
              <Text style={styles.playerName}>{player1.name}</Text>
              <Image source={player1.image} style={styles.nationality} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {/* Player 2 */}
      <View style={styles.section}>
        <Text style={styles.title}>Player 2</Text>
        <ScrollView horizontal contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
          {players.map((player2) => (
            <TouchableOpacity
              key={player2.id}
              style={[
                styles.playerCard,
                { backgroundColor: player2.color },
                selectedPlayer2 === player2.id && styles.selectedPlayer,
              ]}
              onPress={() => setSelectedPlayer2(player2.id)}
            >
              <Image source={player2.avatar} style={styles.avatar} />
              <Text style={styles.playerName}>{player2.name}</Text>
              <Image source={player2.image} style={styles.nationality} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {/* Time Limit */}
      <View style={styles.pickerContainer}>
        <Text style={styles.title}>Time Limit</Text>
        <Picker
          selectedValue={selectedMinutes}
          onValueChange={handleTimeChange}
          style={styles.picker}
        >
          <Picker.Item label="Select time limit" value={null} />
          <Picker.Item label="5 minutes" value={5} />
          <Picker.Item label="10 minutes" value={10} />
          <Picker.Item label="15 minutes" value={15} />
          <Picker.Item label="20 minutes" value={20} />
        </Picker>
      </View>
      {/* Score Limit */}
      <View style={styles.pickerContainer}>
        <Text style={styles.title}>Score Limit</Text>
        <Picker
          selectedValue={scoreLimit}
          onValueChange={setScoreLimit}
          style={styles.picker}
        >
          <Picker.Item label="Select score limit" value={null} />
          <Picker.Item label="3 points" value={3} />
          <Picker.Item label="5 points" value={5} />
          <Picker.Item label="7 points" value={7} />
          <Picker.Item label="10 points" value={10} />
        </Picker>
      </View>
      {/* Confirm */}
      {selectedPlayer1 && selectedPlayer2 && selectedPlayer1 !== selectedPlayer2 && selectedMinutes && scoreLimit && (
        <View style={styles.confirmContainer}>
          <Text style={styles.confirmText}>
            Play {players.find(p => p.id === selectedPlayer1)?.name} vs {players.find(p => p.id === selectedPlayer2)?.name}?
          </Text>
          <Button
            title="Start Match"
            onPress={startMatch}
          />
        </View>
      )}
    </ScrollView>
  );
}

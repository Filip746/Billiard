import { usePlayers } from '@/lib/usePlayers';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import React from 'react';
import { Button, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { playerStyles } from './playerStyles';
import { usePlayerSelection } from './usePlayerSelection';

export function PlayerSelection() {
  const {
    selectedPlayer1, setSelectedPlayer1,
    selectedPlayer2, setSelectedPlayer2,
    selectedMinutes, handleTimeChange,
    scoreLimit, setScoreLimit,
    startMatch,
  } = usePlayerSelection();
  const players = usePlayers();

  return (
    <ScrollView contentContainerStyle={playerStyles.container} showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#1976d2',
            paddingVertical: 6,
            paddingHorizontal: 16,
            borderRadius: 8,
            marginRight: 12,
          }}
          onPress={() => router.push('/history')}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>History</Text>
        </TouchableOpacity>
        <Text style={playerStyles.header}>Select Your Players</Text>
      </View>

      <View style={playerStyles.section}>
        <Text style={playerStyles.title}>Player 1</Text>
        <ScrollView horizontal contentContainerStyle={playerStyles.scrollContainer} showsHorizontalScrollIndicator={false}>
          {players.map((player1) => (
            <TouchableOpacity
              key={player1.id}
              style={[
                playerStyles.playerCard,
                { backgroundColor: player1.color },
                selectedPlayer1 === player1.id && playerStyles.selectedPlayer,
              ]}
              onPress={() => setSelectedPlayer1(player1.id)}
            >
              <Image source={player1.avatar} style={playerStyles.avatar} />
              <Text style={playerStyles.playerName}>{player1.name}</Text>
              <Image source={player1.image} style={playerStyles.nationality} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={playerStyles.section}>
        <Text style={playerStyles.title}>Player 2</Text>
        <ScrollView horizontal contentContainerStyle={playerStyles.scrollContainer} showsHorizontalScrollIndicator={false}>
          {players.map((player2) => (
            <TouchableOpacity
              key={player2.id}
              style={[
                playerStyles.playerCard,
                { backgroundColor: player2.color },
                selectedPlayer2 === player2.id && playerStyles.selectedPlayer,
              ]}
              onPress={() => setSelectedPlayer2(player2.id)}
            >
              <Image source={player2.avatar} style={playerStyles.avatar} />
              <Text style={playerStyles.playerName}>{player2.name}</Text>
              <Image source={player2.image} style={playerStyles.nationality} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={playerStyles.pickerContainer}>
        <Text style={playerStyles.title}>Time Limit</Text>
        <Picker
          selectedValue={selectedMinutes}
          onValueChange={handleTimeChange}
          style={playerStyles.picker}
        >
          <Picker.Item label="Select time limit" value={null} />
          <Picker.Item label="5 minutes" value={5} />
          <Picker.Item label="10 minutes" value={10} />
          <Picker.Item label="15 minutes" value={15} />
          <Picker.Item label="20 minutes" value={20} />
        </Picker>
      </View>

      <View style={playerStyles.pickerContainer}>
        <Text style={playerStyles.title}>Score Limit</Text>
        <Picker
          selectedValue={scoreLimit}
          onValueChange={setScoreLimit}
          style={playerStyles.picker}
        >
          <Picker.Item label="Select score limit" value={null} />
          <Picker.Item label="3 points" value={3} />
          <Picker.Item label="5 points" value={5} />
          <Picker.Item label="7 points" value={7} />
          <Picker.Item label="10 points" value={10} />
        </Picker>
      </View>

      {selectedPlayer1 && selectedPlayer2 && selectedPlayer1 !== selectedPlayer2 && selectedMinutes && scoreLimit && (
        <View style={playerStyles.confirmContainer}>
          <Text style={playerStyles.confirmText}>
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

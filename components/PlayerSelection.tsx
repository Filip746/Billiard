import { players } from '@/const/players';
import { useCountdown } from '@/hooks/useCountdown';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export function PlayerSelection() {
  const [selectedPlayer1, setSelectedPlayer1] = useState<number | null>(null);
  const [selectedPlayer2, setSelectedPlayer2] = useState<number | null>(null);
  const [selectedMinutes, setSelectedMinutes] = useState<number | null>(null);
  const [scoreLimit, setScoreLimit] = useState<number | null>(null);

  const router = useRouter();
  const initialEndTime = new Date().getTime();
  const [_, setEndTime] = useCountdown(initialEndTime);

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Select Your Players</Text>

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

      <View style={styles.pickerContainer}>
        <Text style={styles.title}>Time Limit</Text>
        <Picker
          selectedValue={selectedMinutes}
          onValueChange={(value) => {
            setSelectedMinutes(value);
            if (value) {
              const newEndTime = Date.now() + value * 60 * 1000;
              setEndTime(newEndTime);
            }
          }}
          style={styles.picker}
        >
          <Picker.Item label="Select time limit" value={null} />
          <Picker.Item label="5 minutes" value={5} />
          <Picker.Item label="10 minutes" value={10} />
          <Picker.Item label="15 minutes" value={15} />
          <Picker.Item label="20 minutes" value={20} />
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.title}>Score Limit</Text>
        <Picker
          selectedValue={scoreLimit}
          onValueChange={(value) => setScoreLimit(value)}
          style={styles.picker}
        >
          <Picker.Item label="Select score limit" value={null} />
          <Picker.Item label="3 points" value={3} />
          <Picker.Item label="5 points" value={5} />
          <Picker.Item label="7 points" value={7} />
          <Picker.Item label="10 points" value={10} />
        </Picker>
      </View>

      {selectedPlayer1 && selectedPlayer2 && selectedPlayer1 !== selectedPlayer2 && selectedMinutes && scoreLimit && (
        <View style={styles.confirmContainer}>
          <Text style={styles.confirmText}>
            Play {players.find(p => p.id === selectedPlayer1)?.name} vs {players.find(p => p.id === selectedPlayer2)?.name}?
          </Text>
          <Button
            title="Start Match"
            onPress={() =>
              router.push({
                pathname: '/game',
                params: {
                  player1Id: selectedPlayer1,
                  player2Id: selectedPlayer2,
                  timeLimitMinutes: selectedMinutes,
                  scoreLimit: scoreLimit,
                },
              })
            }
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#222',
  },
  section: {
    marginBottom: 30,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
    color: '#007AFF',
  },
  scrollContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 10,
  },
  playerCard: {
    width: 120,
    height: 160,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedPlayer: {
    borderWidth: 3,
    borderColor: '#007AFF',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  nationality: {
    width: 30,
    height: 30,
    borderRadius: 15,
    position: 'absolute',
    bottom: 8,
    right: 8,
    borderWidth: 1,
    borderColor: '#fff',
  },
  pickerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  picker: {
    width: 180,
    height: 50,
    backgroundColor: '#E6F0FF',
    borderRadius: 12,
    borderColor: '#007AFF',
    borderWidth: 1,
  },
  confirmContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  confirmText: {
    fontSize: 16,
    marginBottom: 10,
    fontStyle: 'italic',
    color: '#333',
    textAlign: 'center',
  },
});
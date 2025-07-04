import { players } from '@/const/players';
import { useCountdown } from '@/hooks/useCountdown';
import { Picker } from '@react-native-picker/picker';
import { Button } from '@react-navigation/elements';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



export  function PlayerSelection() {
  const [selectedPlayer1, setSelectedPlayer1] = useState<number | null>(null);
  const [selectedPlayer2, setSelectedPlayer2] = useState<number | null>(null);
  const router = useRouter();

  const initialEndTime = new Date().getTime();
  const [_, setEndTime] = useCountdown(initialEndTime);
  const [selectedMinutes, setSelectedMinutes] = useState<number | null>(null);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Player 1:</Text>
        {<ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
          {players.map((player1) => (
            <View key={player1.id}>
              <Text style={[styles.playerCard]}>{player1.name}</Text>
              <TouchableOpacity
                key={player1.id}
                style={[
                  styles.playerCard,
                  { backgroundColor: player1.color },
                  selectedPlayer1 === player1.id && styles.selectedPlayer,
                ]}
                onPress={() => setSelectedPlayer1(player1.id)}
              >
                <Image source={player1.image} style={styles.nationality} />
                <Image source={player1.avatar} style={styles.avatar} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>}
      </View>

      <View>
        <Text style={styles.title}>Player 2:</Text>
        {<ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
          {players.map((player2) => (
            <View key={player2.id}>
              <Text style={[styles.playerCard]}>{player2.name}</Text>
              <TouchableOpacity
                key={player2.id}
                style={[
                  styles.playerCard,
                  { backgroundColor: player2.color },
                  selectedPlayer2 === player2.id && styles.selectedPlayer,
                ]}
                onPress={() => setSelectedPlayer2(player2.id)}
              >
                <Image source={player2.image} style={styles.nationality} />
                <Image source={player2.avatar} style={styles.avatar} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>}
      </View>

      <View>
        { <Picker
          selectedValue={selectedMinutes}
          onValueChange={(value) => {
            setSelectedMinutes(value);
            if (value) {
              const newEndTime = Date.now() + value * 60 * 1000;
              setEndTime(newEndTime);
            }
          }}
          style={{ height: 50, width: 150 }}
        >
          <Picker.Item label="Select time limit" value={null} />
          <Picker.Item label="5 minutes" value={5} />
          <Picker.Item label="10 minutes" value={10} />
          <Picker.Item label="15 minutes" value={15} />
          <Picker.Item label="20 minutes" value={20} />
        </Picker>} 

      </View>

      <View>
        {selectedPlayer1 && selectedPlayer2 && selectedPlayer1 !== selectedPlayer2 && (
          <View>
            <Text style={styles.selectedText}>
              Do you want to play {players.find(p1 => p1.id === selectedPlayer1)?.name} against {players.find(p2 => p2.id === selectedPlayer2)?.name}?
            </Text>
            <Button onPress={() => router.push({
              pathname: '/game',
              params: {
                player1Id: selectedPlayer1,
                player2Id: selectedPlayer2,
                timeLimitMinutes: selectedMinutes
              }
              })}>yes
            </Button>
          </View>
        )}
      </View>

    </>
  );
}

const styles = StyleSheet.create({
  nationality: {
  width: 30,
  height: 30,
  borderRadius: 15,
  position: 'absolute',
  bottom: 5,
  right: 5,
  overflow: 'hidden',
},

avatar: {
  width: 80,
  height: 80,
  borderRadius: 10,
},

  container: {
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  playerCard: {
  padding: 30,
  borderRadius: 10,
  marginRight: 10,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
},
  selectedPlayer: {
    borderWidth: 3,
    borderColor: '#333',
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
  },
  selectedText: {
    marginTop: 20,
    fontSize: 18,
    fontStyle: 'italic',
  },
});

import { Button } from '@react-navigation/elements';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


interface Player {
  id: number;
  name: string;
  color: string;
  image: ImageSourcePropType;
  avatar: ImageSourcePropType;
}



const players: Player[] = [
  { id: 1, name: 'Marko', color: '#FFB6C1', image: require("../assets/images/croatia.png"), avatar: require("../assets/images/avatar.jpg")},
  { id: 2, name: 'Ivana', color: '#ADD8E6', image: require("../assets/images/germany.png"), avatar: require("../assets/images/girl.jpg")},
  { id: 3, name: 'Petar', color: '#90EE90', image: require("../assets/images/spain.png"), avatar: require("../assets/images/boy.png") },
  { id: 4, name: 'Ana', color: '#FFD700', image: require("../assets/images/germany.png"), avatar: require("../assets/images/girl.jpg")},
  { id: 5, name: 'Luka', color: '#FFA07A', image: require("../assets/images/croatia.png"), avatar: require("../assets/images/avatar.jpg")},
  { id: 6, name: 'Sara', color: '#DDA0DD', image: require("../assets/images/spain.png"), avatar: require("../assets/images/girl.jpg")},
];



export default function PlayerSelection() {
  const [selectedPlayer1, setSelectedPlayer1] = useState<number | null>(null);
  const [selectedPlayer2, setSelectedPlayer2] = useState<number | null>(null);
  const router = useRouter();

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Player 1:</Text>
        <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
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
        </ScrollView>
      </View>

      <View>
        <Text style={styles.title}>Player 2:</Text>
        <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
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
        </ScrollView>

        {selectedPlayer1 && selectedPlayer1 !== selectedPlayer2 && (
          <View>
            <Text style={styles.selectedText}>
              Do you want to play {players.find(p1 => p1.id === selectedPlayer1)?.name} against {players.find(p2 => p2.id === selectedPlayer2)?.name}?
            </Text>
            <Button onPress={() => router.push({
              pathname: '/game',
              params: {
                player1name: players.find(p1 => p1.id === selectedPlayer1)?.name,
                player2name: players.find(p2 => p2.id === selectedPlayer2)?.name,
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

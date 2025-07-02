import { Button } from '@react-navigation/elements';
import React, { useState } from 'react';
import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Player {
  id: number;
  name: string;
  color: string;
  image: ImageSourcePropType
  avatar?: ImageSourcePropType
}

const players: Player[] = [
  { id: 1, name: 'Marko', color: '#FFB6C1', image: require("../assets/images/croatia.png") },
  { id: 2, name: 'Ivana', color: '#ADD8E6', image: require("../assets/images/germany.png")},
  { id: 3, name: 'Petar', color: '#90EE90', image: require("../assets/images/spain.png") },
  { id: 4, name: 'Ana', color: '#FFD700', image: require("../assets/images/germany.png")},
  { id: 5, name: 'Luka', color: '#FFA07A', image: require("../assets/images/croatia.png")},
  { id: 6, name: 'Sara', color: '#DDA0DD', image: require("../assets/images/spain.png")},
];


export default function PlayerSelection() {
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [timerDuration, setTimerDuration] = useState(90000); 


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Players:</Text>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        {players.map((player) => (
          <View key={player.id}>
            <Text style={[styles.playerCard]}>{player.name}</Text>
          <TouchableOpacity
            key={player.id}
            style={[
              styles.playerCard,
              {backgroundColor: player.color},
              selectedPlayerId === player.id && styles.selectedPlayer,
            ]}
            
            onPress={() => setSelectedPlayerId(player.id)}
          >          
            <Image source={player.image}  style={styles.nationality}></Image>
          </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {selectedPlayerId && (
        <View><Text style={styles.selectedText}>
          Do you want to play against: {players.find(p => p.id === selectedPlayerId)?.name} ?
        </Text>
        <Button>Yes</Button> 
        <Button>No</Button></View>
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  nationality: {
    padding: 30,
    borderRadius: 10,
    width: 50,
    height: 50,
    bottom: 0,
    right: 0,

  },
  tinyLogo: {
    width: 50,
    height: 50,
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
    padding: 20,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
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

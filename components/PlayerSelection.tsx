import { Button } from '@react-navigation/elements';
import React, { useState } from 'react';
import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useCountdown from '../components/timer';


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
  const initialEndTime = new Date().getTime() + 5 * 60 * 1000; 
  const [timeLeft, setEndTime] = useCountdown(initialEndTime);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

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
                  <Image source={player1.image} style={styles.nationality}></Image>
                  <Image source={player1.avatar} style={styles.avatar}></Image>
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
                  {backgroundColor: player2.color},
                  selectedPlayer2 === player2.id && styles.selectedPlayer,
                ]}
                
                onPress={() => setSelectedPlayer2(player2.id)}
              >          
                <Image source={player2.image} style={styles.nationality}></Image>
                <Image source={player2.avatar} style={styles.avatar}></Image>
              </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          {selectedPlayer1 && (selectedPlayer1 !== selectedPlayer2) && (
            <View>
              <Text style={styles.selectedText}>
                Do you want to play {players.find(p1 => p1.id === selectedPlayer1)?.name} against {players.find(p2 => p2.id === selectedPlayer2)?.name}?
              </Text>
              <Button onPress={() => setEndTime(new Date().getTime() + 5 * 60 * 1000)}>
                yes
              </Button>
              <Text style={styles.timer}>
                {`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
              </Text>
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

timer: {
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center',
  marginVertical: 10,
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

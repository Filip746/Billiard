import { players } from '@/const/players';
import { useCountdown } from '@/hooks/useCountdown';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';



export default function game() {
    const {player1Id, player2Id, timeLimitMinutes} = useLocalSearchParams<{player1Id: string, player2Id:string, timeLimitMinutes:string}>();
  const initialEndTime = new Date().getTime() + Number(timeLimitMinutes) * 60 * 1000;
  const [timeLeft] = useCountdown(initialEndTime);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  const player1 = players.find(p => p.id === Number(player1Id));
  const player2 = players.find(p => p.id === Number(player2Id));

  return (
    <View style={styles.container}>
        <View style={styles.playersContainer}>
            <View style={styles.player}>
                <Text style={styles.title}>{player1?.name}</Text>
                <Image source={player1?.avatar} style={styles.avatar} />
            </View>

            <Text style={styles.vs}>vs</Text>

            <View style={styles.player}>
                <Text style={styles.title}>{player2?.name}</Text>
                <Image source={player2?.avatar} style={styles.avatar} />
            </View>
        </View>

        <View style={styles.playersContainer}>
            <View style={styles.score}>
                <Text style={{color:"blue"}}>1</Text>
            </View>

            <Text style={styles.vs}>:</Text>

            <View style={styles.score}>
                <Text style={{color:"blue"}}>2</Text>
            </View>
        </View>
        <Text style={styles.timer}>
            {`${minutes}:${(seconds) < 10 ? '0' : ''}${seconds}`}
        </Text>

        <View>
            <Button
          title="Finish match"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
        </View>
    </View>

);
}

const styles = StyleSheet.create({
   score: {
     position: "fixed",
     bottom: 0,
     right: 0,
     backgroundColor:"white",width:50,height:50,borderRadius:25,borderWidth:1,borderColor:"red",alignItems:"center",justifyContent:"center",
     flexDirection: 'row',
},
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  playersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  player: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  vs: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  timer: { 
    fontSize: 48, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
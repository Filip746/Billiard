import { StyleSheet } from 'react-native';

export const finishStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  playersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  playerCard: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#2a2a2a',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  vs: {
    marginHorizontal: 15,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#444',
  },
  timeUsed: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  winnerSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  winnerText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#444',
  },
  winnerName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#28a745',
  },
  winnerAvatar: {
    borderWidth: 4,
    borderColor: '#28a745',
  },
  leaderboardButton: {
  marginTop: 30,
  backgroundColor: '#007bff',
  paddingVertical: 12,
  paddingHorizontal: 30,
  borderRadius: 10,
  alignSelf: 'center',
},

leaderboardButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},

});

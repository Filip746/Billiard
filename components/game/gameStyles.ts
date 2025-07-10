import { StyleSheet } from 'react-native';

export const gameStyles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    padding: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
  },
  player: {
    alignItems: 'center',
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginTop: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreBox: {
    width: 80,
    height: 100,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  scoreText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  vs: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  timer: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  finishButton: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 20,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
  width: '80%',
  backgroundColor: '#fff',
  borderRadius: 16,
  padding: 20,
  alignItems: 'center',
},
modalHeader: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 16,
},
modalText: {
  fontSize: 18,
  marginVertical: 4,
},
confirmButton: {
  marginTop: 20,
  backgroundColor: '#2196F3',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 8,
},
confirmButtonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},
cancelText: {
  marginTop: 10,
  color: '#888',
  fontSize: 16,
},
landscapeRow: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 30,
},
sidePlayer: {
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
},
avatarLarge: {
  width: 90,
  height: 90,
  borderRadius: 45,
  borderWidth: 3,
  borderColor: '#fff',
  marginBottom: 12,
},
centerBlock: {
  flex: 2,
  alignItems: 'center',
  justifyContent: 'center',
},
scoreContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 18,
},
});

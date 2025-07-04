import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
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

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  nationality: {
    width: 30,
    height: 30,
    borderRadius: 15,
    position: 'absolute',
    bottom: 5,
    right: 5,
    overflow: 'hidden',
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

  vs: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },

  score: {
    width: 60,
    height: 120,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  selectedText: {
    marginTop: 20,
    fontSize: 18,
    fontStyle: 'italic',
  },
});

export default styles;

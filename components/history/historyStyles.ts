import { StyleSheet } from 'react-native';

export const historyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 24,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 18,
    color: '#222',
  },
  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 8,
  },
  matchPlayers: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  matchResult: {
    width: 60,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1976d2',
  },
  matchDate: {
    width: 100,
    textAlign: 'right',
    color: '#888',
    fontSize: 14,
  },
});

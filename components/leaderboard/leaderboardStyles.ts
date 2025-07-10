import { StyleSheet } from 'react-native';

export const leaderboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  rank: {
    width: 30,
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    marginRight: 12,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  points: {
    fontSize: 16,
    fontWeight: '700',
    color: '#444',
  },
  firstPlace: {
    backgroundColor: '#FFD70033',
  },
  secondPlace: {
    backgroundColor: '#C0C0C033',
  },
  thirdPlace: {
    backgroundColor: '#CD7F3233',
  },
});

export const leaderboardModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 6,
  },
  closeBtn: {
    position: 'absolute',
    right: 16,
    top: 12,
    zIndex: 2,
  },
  closeText: {
    fontSize: 28,
    color: '#888',
  },
  profileCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eee',
    marginBottom: 12,
    marginTop: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    marginTop: 10,
    backgroundColor: '#eee',
  },
  playerName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  tabRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  tabActive: {
    fontWeight: '700',
    color: '#1976d2',
    marginRight: 32,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderColor: '#1976d2',
  },
  tabInactive: {
    color: '#888',
    paddingBottom: 6,
    marginLeft: 32,
  },
  matchesList: {
    width: '100%',
    marginTop: 10,
  },
  noMatchesText: {
    color: '#888',
    textAlign: 'center',
  },
  matchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
  },
  matchOpponent: {
    flex: 1,
    color: '#333',
  },
  matchResult: {
    width: 60,
    textAlign: 'center',
    fontWeight: '600',
  },
  matchDate: {
    width: 80,
    textAlign: 'center',
    color: '#555',
  },
  winLoseBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    alignSelf: 'center',
  },
  winLoseText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
  win: {
    backgroundColor: '#28a745',
    color: '#28a745',
  },
  lose: {
    backgroundColor: '#d32f2f',
    color: '#d32f2f',
  },
});

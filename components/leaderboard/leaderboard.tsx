import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Leaderboard } from 'react-native-ranking-leaderboard';

const data = [
  { name: 'Ivan Horvat', points: 52 },
  { name: 'Marko Kovač', points: 48 },
  { name: 'Ana Marić', points: 42 },
  { name: 'Petar Babić', points: 37 },
  { name: 'Lucija Perić', points: 30 },
];


const RankDifferenceIcon = (difference: number) => {
  if (difference < 0) return <ArrowDownRight color="red" size={18} />;
  if (difference > 0) return <ArrowUpRight color="green" size={18} />;
  return <Minus color="gray" size={18} />;
};

export default function CustomLeaderboard() {
  return (
    <View style={styles.container}>
      <Leaderboard
        entries={data}
        showPodium={true}
        showSearchBar={true}
        showRankDifference={true}
        showSortingTypes={false} 
        style={{
          containerStyle: {
            backgroundColor: '#ffffff',
            borderRadius: 12,
            paddingVertical: 10,
            paddingHorizontal: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
          },
          podiumStyle: {
            first: { backgroundColor: '#FFD700' }, 
            second: { backgroundColor: '#C0C0C0' }, 
            third: { backgroundColor: '#CD7F32' }, 
          },
          itemStyle: {
            backgroundColor: '#f9f9f9',
            borderBottomColor: '#ddd',
            borderBottomWidth: 1,
          },
          rankStyle: {
            color: '#333',
            fontWeight: '700',
            fontSize: 18,
          },
          usernameStyle: {
            fontSize: 16,
            color: '#222',
            fontWeight: '600',
          },
          pointStyle: {
            fontSize: 16,
            color: '#444',
            fontWeight: '700',
          },
          avatarStyle: {
            borderRadius: 25,
          },
          searchBarStyle: {
            backgroundColor: '#e6e6e6',
            borderRadius: 10,
            paddingHorizontal: 10,
            marginBottom: 10,
          },
          rankDifferenceIcon: RankDifferenceIcon,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
});

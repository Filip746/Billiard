import { PlayerSelection } from '@/components/playerSelection/playerSelection';
import React from 'react';
import { SafeAreaView } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <PlayerSelection />
    </SafeAreaView>
  );
}

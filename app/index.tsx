import { PlayerSelection } from '@/components/playerSelection/playerSelection';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';

export default function HomeScreen() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, []);

  return (
    <SafeAreaView>
      <PlayerSelection />
    </SafeAreaView>
  );
}

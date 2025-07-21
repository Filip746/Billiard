import { useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import React from 'react';
import { gameScreen } from "../components/game/gameScreen";

export default function Game() {
  useFocusEffect(
    React.useCallback(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

      return () => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      };
    }, [])
  );

  const GameComponent = gameScreen;
  return <GameComponent />;
}

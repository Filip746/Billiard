import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect } from 'react';
import { gameScreen } from "../components/game/gameScreen";

export default function Game() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

  const GameComponent = gameScreen;
  return <GameComponent />;
}

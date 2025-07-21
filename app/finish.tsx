import { finishScreen } from "@/features/finishScreen/components/finishScreen";
import { useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import React from 'react';

export default function Finish() {
  useFocusEffect(
    React.useCallback(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }, [])
  );

  const FinishComponent = finishScreen;
  return <FinishComponent />;
}

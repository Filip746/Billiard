import { finishScreen } from "@/components/finishScreen/finishScreen";
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect } from 'react';

export default function Finish() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, []);

  const FinishComponent = finishScreen;
  return <FinishComponent />;
}

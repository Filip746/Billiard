import { useFocusEffect } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import React from "react";


export function useScreenOrientationLock(orientation: ScreenOrientation.OrientationLock) {
  useFocusEffect(
    React.useCallback(() => {
      ScreenOrientation.lockAsync(orientation);
    }, [orientation])
  );
}
import React from 'react';
import { Animated } from 'react-native';
import { historyStyles } from '../styles';

export function LoadableListWrapper({ opacityAnimation, children }: { opacityAnimation: any; children: React.ReactNode }) {
  return (
    <Animated.View
      style={[
        historyStyles.listContainer,
        { opacity: opacityAnimation },
      ]}
    >
      {children}
    </Animated.View>
  );
}

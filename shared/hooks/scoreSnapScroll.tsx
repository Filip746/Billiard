import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, FlatList, TouchableOpacity } from 'react-native';

type ScoreSnapScrollProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  itemHeight?: number;
};

export function ScoreSnapScroll({
  value,
  onChange,
  min = 0,
  max = 10,
  itemHeight = 80,
}: ScoreSnapScrollProps) {
  const flatListRef = useRef<FlatList>(null);
  const scoreRange = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  const screenHeight = Dimensions.get('window').height;
  const paddingVertical = (screenHeight - itemHeight) / 2;
  
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(pulseAnim, {
        toValue: 1.2,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(pulseAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  }, [value]);

  return (
    <FlatList
      ref={flatListRef}
      data={scoreRange}
      showsVerticalScrollIndicator={false}
      snapToInterval={itemHeight}
      snapToAlignment="center"
      decelerationRate="fast"
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical,
      }}
      getItemLayout={(_, index) => ({
        length: itemHeight,
        offset: itemHeight * index,
        index,
      })}
      keyExtractor={item => item.toString()}
      initialScrollIndex={value}
      onMomentumScrollEnd={e => {
        let index = Math.round(e.nativeEvent.contentOffset.y / itemHeight);
        if (index < 0) index = 0;
        if (index > scoreRange.length - 1) index = scoreRange.length - 1;
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({ index, animated: true });
        }
        onChange(scoreRange[index]);
      }}
      renderItem={({ item, index }) => {
        const isSelected = value === item;
        return (
          <TouchableOpacity
            style={{ 
              width: 80, 
              height: itemHeight,
              justifyContent: 'center', 
              alignItems: 'center' 
            }}
            activeOpacity={isSelected ? 1 : 0.7}
            onPress={() => {
              if (!isSelected) {
                flatListRef.current?.scrollToIndex({ index, animated: true });
                onChange(item);
              }
            }}
          >
            <Animated.View
              style={{
                width: isSelected ? 66 : 52,
                height: isSelected ? 66 : 52,
                borderRadius: 18,
                backgroundColor: isSelected ? '#4fd1c580' : '#f2f7fb',
                borderWidth: isSelected ? 3.5 : 1.5,
                borderColor: isSelected ? '#007AFF' : '#dae6fa',
                shadowColor: isSelected ? '#007AFF' : '#b6c3e3',
                shadowOpacity: isSelected ? 0.2 : 0.08,
                shadowOffset: { width: 0, height: isSelected ? 7 : 2 },
                shadowRadius: isSelected ? 12 : 3,
                elevation: isSelected ? 8 : 2,
                transform: [{ scale: isSelected ? pulseAnim : 1 }],
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 2,
              }}
            >
              <Animated.Text
                style={{
                  fontSize: isSelected ? 32 : 22,
                  fontWeight: isSelected ? 'bold' : '700',
                  color: isSelected ? '#0c50b6' : '#b5bfd8',
                  letterSpacing: isSelected ? 1.5 : 0.5,
                  textShadowColor: isSelected ? '#7fc5ff33' : 'transparent',
                  textShadowRadius: isSelected ? 7 : 0,
                  opacity: isSelected ? 1 : 0.6,
                }}
              >
                {item}
              </Animated.Text>
            </Animated.View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

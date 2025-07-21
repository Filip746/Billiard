import React, { useRef } from 'react';
import { Dimensions, FlatList, Text, View } from 'react-native';

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

  return (
    <FlatList
      ref={flatListRef}
      data={scoreRange}
      showsVerticalScrollIndicator={false}
      snapToInterval={itemHeight}
      snapToAlignment="center"
      decelerationRate="fast"
      contentContainerStyle={{ alignItems: 'center', paddingVertical }}
      getItemLayout={(_, index) => ({
        length: itemHeight,
        offset: itemHeight * index,
        index,
      })}
      renderItem={({ item }) => (
        <View
          style={{
            width: 70,
            height: itemHeight,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: value === item ? '#e3f0ff' : '#f2f2f2',
              borderWidth: value === item ? 3 : 1,
              borderColor: value === item ? '#007AFF' : '#ddd',
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: value === item ? '#007AFF' : '#000',
              shadowOffset: { width: 0, height: value === item ? 4 : 1 },
              shadowOpacity: value === item ? 0.18 : 0.07,
              shadowRadius: value === item ? 8 : 2,
              elevation: value === item ? 6 : 1,
              marginVertical: 2,
            }}
          >
            <Text
              style={{
                fontSize: 28,
                fontWeight: value === item ? 'bold' : '600',
                color: value === item ? '#007AFF' : '#888',
              }}
            >
              {item}
            </Text>
          </View>
        </View>
      )}
      onMomentumScrollEnd={e => {
        const index = Math.round(e.nativeEvent.contentOffset.y / itemHeight);
        onChange(scoreRange[index]);
      }}
      initialScrollIndex={value}
      keyExtractor={item => item.toString()}
    />
  );
}

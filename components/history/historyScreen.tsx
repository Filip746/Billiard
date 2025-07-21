import { usePlayers } from '@/lib/usePlayers';
import { MatchSearchBar } from '@/modules/billiard/utils/matchSearchBar';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  FlatList,
  InteractionManager,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { historyStyles } from './historyStyles';
import { useHistory } from './useHistory';

const MatchItem = React.memo(({ item, index, players, router }: { 
  item: any; 
  index: number; 
  players: any[]; 
  router: any;
}) => {
  const [animationsEnabled, setAnimationsEnabled] = useState(false);
  const itemAnim = useRef(new Animated.Value(0)).current;
  const scaleItemAnim = useRef(new Animated.Value(0.95)).current;

  
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setAnimationsEnabled(true);
      
      Animated.parallel([
        Animated.timing(itemAnim, {
          toValue: 1,
          delay: Math.min(index * 50, 500), 
          duration: 300, 
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleItemAnim, {
          toValue: 1,
          delay: Math.min(index * 50, 500),
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [index]);

  const player1 = players.find(p => p.id === Number(item.player1Id));
  const player2 = players.find(p => p.id === Number(item.player2Id));
  let dateStr = '';
  if (typeof item.createdAt === 'object' && item.createdAt.seconds) {
    dateStr = new Date(item.createdAt.seconds * 1000).toLocaleDateString();
  } else {
    dateStr = item.createdAt || item.date;
  }

  const winner = item.scorePlayer1 > item.scorePlayer2 ? player1?.name : player2?.name;
  const isPlayer1Winner = item.scorePlayer1 > item.scorePlayer2;

  const handlePress = useCallback(() => {
    router.push({
      pathname: '/finish',
      params: {
        player1Id: item.player1Id,
        player2Id: item.player2Id,
        scorePlayer1: item.scorePlayer1,
        scorePlayer2: item.scorePlayer2,
        elapsedTime: item.elapsedTime ?? item.timeUsedMs ?? '',
      },
    });
  }, [item, router]);

  if (!animationsEnabled && index > 10) {
    return (
      <View style={historyStyles.matchRow}>
        <TouchableOpacity
          onPress={handlePress}
          activeOpacity={0.8}
          style={historyStyles.matchContent}
        >
          <View style={historyStyles.playersSection}>
            <Text style={historyStyles.matchPlayers}>
              {player1?.name || 'Player 1'} 
              <Text style={historyStyles.vsText}> vs </Text>
              {player2?.name || 'Player 2'}
            </Text>
            <Text style={historyStyles.winnerText}>
              🏆 {winner} wins!
            </Text>
          </View>

          <View style={historyStyles.scoreSection}>
            <View style={[
              historyStyles.scoreContainer,
              isPlayer1Winner && historyStyles.winnerScore
            ]}>
              <Text style={[
                historyStyles.matchResult,
                isPlayer1Winner && historyStyles.winnerScoreText
              ]}>
                {item.scorePlayer1} : {item.scorePlayer2}
              </Text>
            </View>
          </View>

          <View style={historyStyles.dateSection}>
            <Text style={historyStyles.matchDate}>📅 {dateStr}</Text>
          </View>
          
          <View style={historyStyles.matchIndicator} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Animated.View
      style={animationsEnabled ? [
        {
          opacity: itemAnim,
          transform: [
            { scale: scaleItemAnim },
            { 
              translateY: itemAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              })
            }
          ]
        }
      ] : {}}
    >
      <TouchableOpacity
        style={historyStyles.matchRow}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View style={historyStyles.matchContent}>
          <View style={historyStyles.playersSection}>
            <Text style={historyStyles.matchPlayers}>
              {player1?.name || 'Player 1'} 
              <Text style={historyStyles.vsText}> vs </Text>
              {player2?.name || 'Player 2'}
            </Text>
            <Text style={historyStyles.winnerText}>
              🏆 {winner} wins!
            </Text>
          </View>

          <View style={historyStyles.scoreSection}>
            <View style={[
              historyStyles.scoreContainer,
              isPlayer1Winner && historyStyles.winnerScore
            ]}>
              <Text style={[
                historyStyles.matchResult,
                isPlayer1Winner && historyStyles.winnerScoreText
              ]}>
                {item.scorePlayer1} : {item.scorePlayer2}
              </Text>
            </View>
          </View>

          <View style={historyStyles.dateSection}>
            <Text style={historyStyles.matchDate}>📅 {dateStr}</Text>
          </View>
        </View>
        
        <View style={historyStyles.matchIndicator} />
      </TouchableOpacity>
    </Animated.View>
  );
});

export function historyScreen() {
  const [searchText, setSearchText] = useState('');
  const [dateText, setDateText] = useState('');
  const { matches, loading, fetchingMore, hasMore, loadMore, loadAllMatches } = useHistory();
  const players = usePlayers();
  const router = useRouter();

  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const headerAnim = useRef(new Animated.Value(-50)).current;
  const listAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500, 
        useNativeDriver: true,
      }),
      Animated.timing(headerAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic), 
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(listAnim, {
        toValue: 1,
        duration: 300,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if ((searchText.trim().length > 0 || dateText.trim().length > 0) && hasMore) {
      loadAllMatches();
    }
  }, [searchText, dateText]);

  const filteredMatches = matches.filter(item => {
    const player1 = players.find(p => p.id === Number(item.player1Id));
    const player2 = players.find(p => p.id === Number(item.player2Id));
    const playerNames = [player1?.name || '', player2?.name || ''].join(' ').toLowerCase();
    const dateStr =
      typeof item.createdAt === 'object' && item.createdAt.seconds
        ? new Date(item.createdAt.seconds * 1000).toLocaleDateString()
        : item.createdAt || item.date || '';
    const nameMatch =
      searchText.trim().length === 0 ||
      playerNames.includes(searchText.trim().toLowerCase());
    const dateMatch =
      dateText.trim().length === 0 ||
      dateStr.includes(dateText.trim());
    return nameMatch && dateMatch;
  });

  const renderItem = useCallback(({ item, index }: { item: any; index: number }) => (
    <MatchItem item={item} index={index} players={players} router={router} />
  ), [players, router]);

  const keyExtractor = useCallback((item: any) => item.id, []);

  const handleLoadMore = useCallback(() => {
    if (hasMore && !fetchingMore && !loading) {
      loadMore();
    }
  }, [hasMore, fetchingMore, loading, loadMore]);

  
  const ListFooterComponent = useCallback(() => {
    if (!fetchingMore) return null;
    
    return (
      <View style={historyStyles.footerLoader}>
        <ActivityIndicator size="small" color="#667eea" />
        <Text style={historyStyles.footerLoaderText}>Loading more matches...</Text>
      </View>
    );
  }, [fetchingMore]);

  return (
    <View style={historyStyles.container}>
      {/* Header */}
      <Animated.View 
        style={[
          historyStyles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: headerAnim }]
          }
        ]}
      >
        <Text style={historyStyles.title}>📊 Match History</Text>
        <Text style={historyStyles.subtitle}>
          {loading ? 'Loading...' : `${filteredMatches.length} matches found`}
        </Text>
      </Animated.View>

      {/* Search Bar */}
      <Animated.View 
        style={[
          historyStyles.searchContainer,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ]
          }
        ]}
      >
        <MatchSearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          dateText={dateText}
          setDateText={setDateText}
        />
      </Animated.View>

      {/* Content */}
      {loading && matches.length === 0 ? (
        <Animated.View 
          style={[
            historyStyles.loadingContainer,
            { opacity: fadeAnim }
          ]}
        >
          <ActivityIndicator size="large" color="#667eea" />
          <Text style={historyStyles.loadingText}>Loading match history...</Text>
        </Animated.View>
      ) : (
        <Animated.View 
          style={[
            historyStyles.listContainer,
            { opacity: listAnim }
          ]}
        >
          {filteredMatches.length === 0 ? (
            <View style={historyStyles.emptyState}>
              <Text style={historyStyles.emptyStateIcon}>🎱</Text>
              <Text style={historyStyles.emptyStateTitle}>No matches found</Text>
              <Text style={historyStyles.emptyStateText}>
                Try adjusting your search filters or play some matches!
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredMatches}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={historyStyles.listContent}
              ListFooterComponent={ListFooterComponent}
              removeClippedSubviews={true} 
              maxToRenderPerBatch={10} 
              windowSize={21} 
              initialNumToRender={10} 
              getItemLayout={undefined} 
              maintainVisibleContentPosition={{
                minIndexForVisible: 0,
                autoscrollToTopThreshold: 10,
              }}
            />
          )}
        </Animated.View>
      )}
    </View>
  );
}

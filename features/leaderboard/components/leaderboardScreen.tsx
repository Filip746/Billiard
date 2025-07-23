import { LeaderboardPlayerModal } from '@/shared/components/common/leaderboardPlayerModal';
import { MatchSearchBar } from '@/shared/components/common/matchSearchBar';
import { usePlayerModal, usePlayers } from '@/shared/hooks';
import YearMonthFilter from '@/shared/utils/filter';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useLeaderboard } from '../hooks';
import { leaderboardStyles } from '../styles';

export function leaderboardScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const players = usePlayers();
  const [searchText, setSearchText] = useState('');
  const [dateFilter, setDateFilter] = useState({ year: '', month: '' });
  const { leaderboard, loading } = useLeaderboard(dateFilter);
  const [showFilterBox, setShowFilterBox] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const listAnim = useRef(new Animated.Value(0)).current;

  const {
    selectedPlayer,
    recentMatches,
    allMatches,
    activeTab,
    setActiveTab,
    showAllMatchesModal,
    setShowAllMatchesModal,
    handlePlayerPress,
    handleShowAllMatches,
  } = usePlayerModal(players);
  
  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(listAnim, {
        toValue: 1,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleNamePress = async (entry: LeaderboardEntry) => {
    const player = players.find(
      p => p.id === Number(entry.id) || p.name === entry.name
    );
    if (player) await handlePlayerPress(player);
    setModalVisible(true);
  };

  const rankEmoji: Record<number, string> = {
    1: '🥇',
    2: '🥈',
    3: '🥉',
  };
  

  const rankIcon: Record<number, string> = {
    1: '👑',
    2: '👑',
    3: '👑',
    4: '⭐',
    5: '⭐',
  };
  

  const searchedLeaderboard = leaderboard.filter(player =>
    player.name.toLowerCase().includes(searchText.trim().toLowerCase())
  );
  

  const renderItem = ({ item, index }: { item: LeaderboardEntry; index: number }) => {
    const rank = index + 1;
    const isTopThree = rank <= 3;

    const emoji = rankEmoji[rank] || '🏅';
    const icon = rankIcon[rank] || '💪';

    const podiumStyles: { [key: number]: any } = {
      1: leaderboardStyles.firstPlace,
      2: leaderboardStyles.secondPlace,
      3: leaderboardStyles.thirdPlace,
    };
    const podiumStyle = podiumStyles[rank] ?? {};

    return (
      <Animated.View 
        style={[
          leaderboardStyles.itemContainer, 
          podiumStyle,
          { 
            opacity: listAnim
          }
        ]}
      >
        <View style={leaderboardStyles.rankSection}>
          <Text style={[
            leaderboardStyles.rankNumber,
            isTopThree && leaderboardStyles.topThreeRank
          ]}>
            {rank}
          </Text>
          <Text style={leaderboardStyles.rankEmoji}>
            {emoji}
          </Text>
        </View>
        
        <View style={leaderboardStyles.avatarSection}>
          {item.avatar ? (
            <Image source={item.avatar} style={[
              leaderboardStyles.avatar,
              isTopThree && leaderboardStyles.topThreeAvatar
            ]} />
          ) : (
            <View style={[
              leaderboardStyles.avatarPlaceholder,
              isTopThree && leaderboardStyles.topThreeAvatar
            ]}>
              <Text style={leaderboardStyles.avatarIcon}>👤</Text>
            </View>
          )}
          {isTopThree && (
            <Text style={leaderboardStyles.crownIcon}>{icon}</Text>
          )}
        </View>
        
        <TouchableOpacity 
          style={leaderboardStyles.playerInfo}
          onPress={() => handleNamePress(item)}
          activeOpacity={0.7}
        >
          <Text style={[
            leaderboardStyles.name,
            isTopThree && leaderboardStyles.topThreeName
          ]}>
            {item.name}
          </Text>
          <Text style={leaderboardStyles.tapHint}>Tap for details</Text>
        </TouchableOpacity>
        
        <View style={leaderboardStyles.scoreSection}>
          <Text style={[
            leaderboardStyles.points,
            isTopThree && leaderboardStyles.topThreePoints
          ]}>
            {(item.points).toFixed(2)}%
          </Text>
          <View style={[
            leaderboardStyles.progressBar,
            isTopThree && leaderboardStyles.topThreeProgress
          ]}>
            <Animated.View 
              style={[
                leaderboardStyles.progressFill,
                {
                  width: `${item.points * 100}%`,
                  backgroundColor: isTopThree ? '#FFD700' : '#4CAF50'
                }
              ]}
            />
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={leaderboardStyles.container}>
      <Animated.View 
        style={[
          leaderboardStyles.header,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ]
          }
        ]}
      >
        <Text style={leaderboardStyles.title}>🏆 Leaderboard</Text>
        <Text style={leaderboardStyles.subtitle}>Top Players Rankings</Text>
      </Animated.View>

      <Animated.View 
        style={[
          leaderboardStyles.searchContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <MatchSearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          onFilterPress={() => setShowFilterBox(prev => !prev)}
        />
        {showFilterBox && (
          <YearMonthFilter onFilterChange={setDateFilter} />
        )}
      </Animated.View>

      {loading ? (
        <Animated.View 
          style={[
            leaderboardStyles.center,
            { opacity: fadeAnim }
          ]}
        >
          <ActivityIndicator size="large" color="#667eea" />
          <Text style={leaderboardStyles.loadingText}>Loading rankings...</Text>
        </Animated.View>
      ) : (
        <Animated.View style={{ opacity: listAnim, flex: 1 }}>
          <FlatList
            data={searchedLeaderboard}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={leaderboardStyles.listContainer}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={leaderboardStyles.separator} />}
          />
        </Animated.View>
      )}

      <LeaderboardPlayerModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        selectedPlayer={selectedPlayer}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        recentMatches={recentMatches}
        allMatches={allMatches}
        showAllMatchesModal={showAllMatchesModal}
        setShowAllMatchesModal={setShowAllMatchesModal}
        onShowAllMatches={handleShowAllMatches}
      />
    </View>
  );
}

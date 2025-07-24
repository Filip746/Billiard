import { useState } from 'react';
import { getMatchesForUser } from '../../../shared/services/matchService';
import { Match } from '../../../shared/types/match';
import { Player } from '../../../shared/types/players';

export function usePlayerModal(players: Player[]) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [recentMatches, setRecentMatches] = useState<Match[]>([]);
  const [allMatches, setAllMatches] = useState<Match[]>([]);
  const [activeTab, setActiveTab] = useState<'stats' | 'about'>('stats');
  const [showAllMatchesModal, setShowAllMatchesModal] = useState(false);

  const handlePlayerPress = async (player: Player) => {
    setSelectedPlayer(player);
    setActiveTab('stats');
    const matches = await getMatchesForUser(player.id, 5);
    setRecentMatches(matches);
  };

  const handleShowAllMatches = async () => {
    if (selectedPlayer) {
      const matches = await getMatchesForUser(selectedPlayer.id);
      setAllMatches(matches);
      setShowAllMatchesModal(true);
    }
  };

  return {
    selectedPlayer,
    setSelectedPlayer,
    recentMatches,
    setRecentMatches,
    allMatches,
    setAllMatches,
    activeTab,
    setActiveTab,
    showAllMatchesModal,
    setShowAllMatchesModal,
    handlePlayerPress,
    handleShowAllMatches,
  };
}

import { getMatchesForUser } from '@/lib/services/getMatchesForUser';
import { useState } from 'react';

export function usePlayerModal(players: Player[]) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [recentMatches, setRecentMatches] = useState<any[]>([]);
  const [allMatches, setAllMatches] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'stats' | 'about'>('stats');
  const [showAllMatchesModal, setShowAllMatchesModal] = useState(false);

  const handlePlayerPress = async (player: Player) => {
    setSelectedPlayer(player);
    setActiveTab('stats');
    const matches = await getMatchesForUser(String(player.id), 5);
    setRecentMatches(matches);
  };

  const handleShowAllMatches = async () => {
    if (selectedPlayer) {
      const matches = await getMatchesForUser(String(selectedPlayer.id));
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

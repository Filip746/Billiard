import { usePlayers } from "@/shared/hooks";
import { Match } from "@/shared/types/match";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { MatchItem } from "../components";
import { useHistory } from "./useHistory";
import { useHistoryAnimations } from "./useHistoryAnimations";

export type FirestoreMatch = Match & { id: string };

export function useHistoryScreen() {
  const [searchText, setSearchText] = useState("");
  const [dateText, setDateText] = useState("");
  const [searching] = useState(false);
  const {
    loadFirstPage,
    matches,
    loading,
    fetchingMore,
    hasMore,
    loadMore,
    loadAllMatches,
  } = useHistory();
  const players = usePlayers();
  const router = useRouter();
  const anim = useHistoryAnimations();

  useEffect(() => {
    if (searchText.trim().length > 0 || dateText.trim().length > 0) {
      loadAllMatches();
    }
  }, [searchText, dateText]);

  useEffect(() => {
    if (searchText.trim().length === 0 && dateText.trim().length === 0) {
      loadFirstPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, dateText]);

  const filteredMatches = matches.filter((item) => {
    const player1 = players.find((p) => p.id === item.player1Id);
    const player2 = players.find((p) => p.id === item.player2Id);
    const playerNames = [player1?.name || "", player2?.name || ""]
      .join(" ")
      .toLowerCase();
    const dateStr =
      typeof item.createdAt === "object" && item.createdAt?.seconds
        ? new Date(item.createdAt.seconds * 1000).toLocaleDateString()
        : typeof item.createdAt === "string"
        ? item.createdAt
        : typeof item.date === "string"
        ? item.date
        : "";
    const nameMatch =
      !searchText.trim().length ||
      playerNames.includes(searchText.trim().toLowerCase());
    const dateMatch =
      !dateText.trim().length || dateStr.includes(dateText.trim());
    return nameMatch && dateMatch;
  });

  function renderItem({
    item,
    index,
  }: {
    item: FirestoreMatch;
    index: number;
  }) {
    return (
      <MatchItem item={item} index={index} players={players} router={router} />
    );
  }

  function keyExtractor(item: FirestoreMatch, index: number): string {
    return item.id;
  }

  function handleLoadMore() {
    if (hasMore && !fetchingMore && !loading) {
      loadMore();
    }
  }

  return {
    searchText,
    setSearchText,
    dateText,
    setDateText,
    filteredMatches,
    loading,
    fetchingMore,
    renderItem,
    keyExtractor,
    handleLoadMore,
    searching,
    ...anim,
  };
}

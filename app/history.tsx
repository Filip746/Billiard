import { useScreenOrientationLock } from "@/features/finishScreen/hooks/useScreenOrientationLock";
import {
  HistoryHeader,
  HistoryList,
  HistoryLoading,
  HistorySearch,
} from "@/features/history/components";
import { useHistoryScreen } from "@/features/history/hooks/useHistoryScreen";
import * as ScreenOrientation from "expo-screen-orientation";
import React from "react";
import { SafeAreaView } from "react-native";

export default function HistoryScreen() {
  useScreenOrientationLock(ScreenOrientation.OrientationLock.PORTRAIT);

  const {
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
    fadeAnim,
    slideAnim,
    scaleAnim,
    headerAnim,
    listAnim,
    searching,
  } = useHistoryScreen();

  if (loading && !filteredMatches.length) {
    return <HistoryLoading fadeAnim={fadeAnim} />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0B4D2C" }}>
      <HistoryHeader
        fadeAnim={fadeAnim}
        headerAnim={headerAnim}
        loading={loading}
        matchCount={filteredMatches.length}
      />
      <HistorySearch
        fadeAnim={fadeAnim}
        slideAnim={slideAnim}
        scaleAnim={scaleAnim}
        searchText={searchText}
        setSearchText={setSearchText}
        dateText={dateText}
        setDateText={setDateText}
      />
      <HistoryList
        filteredMatches={filteredMatches}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        handleLoadMore={handleLoadMore}
        listAnim={listAnim}
        fetchingMore={fetchingMore}
        searching={searching}
      />
    </SafeAreaView>
  );
}

import { fetchMatchesPage } from '@/shared/services/matchService';
import { Match } from '@/shared/types/match';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { fetchingMoreAtom, hasMoreAtom, lastDocAtom, matchesAtom } from '../state';


export function useHistory(pageSize: number = 10) {
  const [matches, setMatches] = useAtom(matchesAtom);
  const [loading, setLoading] = React.useState(true);
  const [fetchingMore, setFetchingMore] = useAtom(fetchingMoreAtom);
  const [lastDoc, setLastDoc] = useAtom(lastDocAtom);
  const [hasMore, setHasMore] = useAtom(hasMoreAtom);

  useEffect(() => {
    loadFirstPage();
  }, []);

  const loadFirstPage = async () => {
    setLoading(true);
    const res = await fetchMatchesPage(pageSize);
    setMatches(res.matches as (Match & { id: string })[]);
    setLastDoc(res.lastDoc);
    setHasMore(res.hasMore);
    setLoading(false);
  };

  const loadMore = async () => {
    if (!hasMore || fetchingMore) return;
    setFetchingMore(true);
    const res = await fetchMatchesPage(pageSize, lastDoc);
    setMatches(prev => [
      ...prev, 
      ...res.matches as (Match & { id: string })[]
    ]);
    setLastDoc(res.lastDoc);
    setHasMore(res.hasMore);
    setFetchingMore(false);
  };

  const loadAllMatches = async () => {
    setLoading(true);
    const res = await fetchMatchesPage(5000, null, true);
    setMatches(res.matches as (Match & { id: string })[]);
    setLastDoc(res.lastDoc);
    setHasMore(false);
    setLoading(false);
  };

  return {
    matches,
    loading,
    fetchingMore,
    hasMore,
    loadMore,
    loadAllMatches,
    loadFirstPage
  };
}

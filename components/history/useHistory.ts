import { fetchMatchesPage } from '@/lib/services/fetchMatchesPage';
import {
  fetchingMoreAtom,
  hasMoreAtom,
  lastDocAtom,
  loadingAtom,
  matchesAtom,
} from '@/state/historyAtoms';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export function useHistory(pageSize: number = 10) {
  const [matches, setMatches] = useAtom(matchesAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [fetchingMore, setFetchingMore] = useAtom(fetchingMoreAtom);
  const [lastDoc, setLastDoc] = useAtom(lastDocAtom);
  const [hasMore, setHasMore] = useAtom(hasMoreAtom);

  useEffect(() => {
    loadFirstPage();
  }, []);

  const loadFirstPage = async () => {
    setLoading(true);
    const res = await fetchMatchesPage(pageSize);
    setMatches(res.matches);
    setLastDoc(res.lastDoc);
    setHasMore(res.hasMore);
    setLoading(false);
  };

  const loadMore = async () => {
    if (!hasMore || fetchingMore) return;
    setFetchingMore(true);
    const res = await fetchMatchesPage(pageSize, lastDoc);
    setMatches(prev => [...prev, ...res.matches]);
    setLastDoc(res.lastDoc);
    setHasMore(res.hasMore);
    setFetchingMore(false);
  };

  return {
    matches,
    loading,
    fetchingMore,
    hasMore,
    loadMore,
  };
}

import { fetchMatchesPage } from '@/lib/services/fetchMatchesPage';
import { useEffect, useState } from 'react';

export function useHistory(pageSize: number = 10) {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);

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

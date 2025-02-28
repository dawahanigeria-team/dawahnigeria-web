import { useQuery } from "@tanstack/react-query";
import { albumsApi } from "../../services/albums.service";
import { useState, useEffect } from "react";

export const useKeywordAlbums = ({ keyword, page = 1, search = "" }) => {
  const [cumulativeData, setCumulativeData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const { isLoading, data, error } = useQuery(
    ["albums-by-keyword", keyword, page, search],
    () => albumsApi.getAlbumsByKeyword(keyword, page, search),
    {
      enabled: !!keyword,
      keepPreviousData: true,
      onSuccess: (newData) => {
        if (newData?.data) {
          if (page === 1) {
            setCumulativeData(newData.data);
          } else {
            setCumulativeData((prev) => [...prev, ...newData.data]);
          }
          // Update total from API response
          setTotal(newData.total || 0);
          // If we've loaded all items based on total, or got less than 20 items, we've reached the end
          setHasMore(cumulativeData.length < (newData.total || 0));
        } else {
          setHasMore(false);
        }
      },
    }
  );

  // Reset cumulative data when keyword or search changes
  useEffect(() => {
    setCumulativeData([]);
    setHasMore(true);
    setTotal(0);
  }, [keyword, search]);

  return {
    isLoading,
    error,
    data: cumulativeData,
    hasMore,
    total,
  };
};

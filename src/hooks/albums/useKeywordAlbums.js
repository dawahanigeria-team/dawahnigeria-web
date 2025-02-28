import { useQuery } from "@tanstack/react-query";
import { albumsApi } from "../../services/albums.service";
import { useState, useEffect } from "react";

export const useKeywordAlbums = ({ keyword, page = 1 }) => {
  const [cumulativeData, setCumulativeData] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { isLoading, data, error } = useQuery(
    ["albums-by-keyword", keyword, page],
    () => albumsApi.getAlbumsByKeyword(keyword, page),
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
          // If we get less than the expected number of items per page (20), we've reached the end
          setHasMore(newData.data.length === 20);
        } else {
          setHasMore(false);
        }
      },
    }
  );

  // Reset cumulative data when keyword changes
  useEffect(() => {
    setCumulativeData([]);
    setHasMore(true);
  }, [keyword]);

  return {
    isLoading,
    error,
    data: cumulativeData,
    hasMore,
  };
};

import { useQuery } from "@tanstack/react-query";
import { favoriteApi } from "../../services";
import { useState } from "react";
export const useFetchFavoritesHook = (keyParam) => {
  const [getFavsCount, setgetfavsCount] = useState([]);

  const { data, refetch } = useQuery(
    ["fetch-favorites", keyParam],
    () => favoriteApi.getFavorites(keyParam),
    {
      enabled: !!keyParam.id,
      onSuccess: (data) => {
        
        setgetfavsCount(data)

      },
    onError: (error) => {
        console.log(error)
    }
    }
  );

  return {
    favoriteCount: getFavsCount,
    refetchData: refetch()
  };
};

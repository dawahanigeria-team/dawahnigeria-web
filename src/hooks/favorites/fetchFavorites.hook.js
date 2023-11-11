import { useQuery } from "@tanstack/react-query";
import { lectureApi } from "../../services";
import { useState } from "react";
export const useFetchFavoritesHook = (keyParam) => {
  const [getFavsCount, setgetfavsCount] = useState([]);

  const { data, refetch } = useQuery(
    ["fetch-favorites", keyParam],
    () => lectureApi.getFavorites(keyParam),
    {
      enabled: !!keyParam.id,
      onSuccess: (data) => {
        
        setgetfavsCount(data)

      },
    onError: (error) => {
        
    }
    }
  );

  return {
    favoriteCount: getFavsCount,
    refetch
   
  };
};

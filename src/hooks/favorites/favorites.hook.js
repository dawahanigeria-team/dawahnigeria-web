import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { lectureApi } from "../../services";

export function useFavoriteSongHook(id) {
  const [queryData,setQueryData] = useState(null);

  const { data, isLoading } = useQuery(
    ["get-favorites-lectures", id],
    () => lectureApi.getFavoriteSongs(id),
    {
      enabled: !!id,
      onSuccess: (data) => {
       setQueryData(data);
      },
      onError: (error) => {},
    }
  );

  return {
    isLoading,
    data: queryData,
  };
}

export function useFavoriteAlbumsHook(id) {
  const [queryData,setQueryData] = useState(null);

  const { data, isLoading } = useQuery(
    ["get-favorites-albums", id],
    () => lectureApi.getFavoriteAlbums(id),
    {
      enabled: !!id,
      onSuccess: (data) => {
       setQueryData(data);
      },
      onError: (error) => {},
    }
  );

  return {
    isLoading,
    data: queryData,
  };
}

export function useFavoritePlaylistHook(id) {
  const [queryData,setQueryData] = useState(null);

  const { data, isLoading } = useQuery(
    ["get-favorites-playlist", id],
    () => lectureApi.getFavoritePlaylists(id),
    {
      enabled: !!id,
      onSuccess: (data) => {
       setQueryData(data);
      },
      onError: (error) => {},
    }
  );

  return {
    isLoading,
    data: queryData,
  };
}

export function useFavoriteRpstHook(id) {
    const [queryData,setQueryData] = useState(null);
  
    const { data, isLoading } = useQuery(
      ["get-favorites-rp", id],
      () => lectureApi.getFavoriteLecturer(id),
      {
        enabled: !!id,
        onSuccess: (data) => {
         setQueryData(data);
        },
        onError: (error) => {},
      }
    );
  
    return {
      isLoading,
      data: queryData,
    };
  }
  

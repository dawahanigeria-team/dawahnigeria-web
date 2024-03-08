import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { lectureApi } from "../../services";

export const useAllPlaylistHook = () => {
  const [playlistdata, setPlaylistData] = useState({});

  const { data, isLoading } = useQuery(
    ["all-playlists"],
    () => lectureApi.getAllPlaylists(),
    {
      onSuccess: (data) => {
        setPlaylistData(data);
      },
      onError: (error) => {
        
      
      },
    }
  );

  return {
    data: playlistdata,
    isLoading

  };
};

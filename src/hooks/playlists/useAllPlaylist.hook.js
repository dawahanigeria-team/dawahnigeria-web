import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "../../utils/conditionalToast"; // SSR-safe toast utility
import { playlistdetailApi } from "../../services";

export const useAllPlaylistHook = () => {
  const [playlistdata, setPlaylistData] = useState({});

  const { data, isLoading } = useQuery(
    ["all-playlists"],
    () => playlistdetailApi.getAllPlaylists(),
    {
      onSuccess: (data) => {
        setPlaylistData(data);
      },
      onError: (error) => {
        
        toast.error("Unable to load data");
      },
    }
  );

  return {
    data: playlistdata,
    isLoading

  };
};

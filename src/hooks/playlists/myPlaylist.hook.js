import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { lectureApi } from "../../services";
import _ from "lodash";
export function usePlaylistFoldersHook(id) {
  const [queryData,setQueryData] = useState([]);

  const { data, isLoading } = useQuery(
    ["get-playlist-folders", id],
    () => lectureApi.getPlaylistFolders(id),
    {
      enabled: !!id,
      onSuccess: (data) => {
       setQueryData(_.uniqBy(data, "name"));
      },
      onError: (error) => {},
    }
  );

  return {
    isLoading,
    data: queryData,
  };
}

export function usePlaylistAudioHook() {
  return useMutation(lectureApi. getPlaylistAudios);
}

export function useAddLectureToPlaylist() {
  return useMutation(lectureApi.addLectureToPlaylist);

}
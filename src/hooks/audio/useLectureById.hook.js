import { useQuery } from "@tanstack/react-query";
import { audioDetailApi } from "../../services";
import { isValidLectureId } from "./useAudio.hook";

export const useLectureById = (id, options = {}) => {
  const { data, isLoading, isFetching } = useQuery(
    ["audio", id],
    () => audioDetailApi.getAudio(id),
    {
      enabled: isValidLectureId(id),
      // Same key + staleTime as useAudioHook so the detail page and the download
      // modal share one cached result instead of triggering duplicate fetches.
      staleTime: 5 * 60 * 1000,
      ...options,
    }
  );

  const lecture = Array.isArray(data) ? data[0] : null;

  return {
    lecture,
    data,
    isLoading: isLoading || isFetching,
  };
};

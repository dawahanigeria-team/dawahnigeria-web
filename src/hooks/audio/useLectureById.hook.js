import { useQuery } from "@tanstack/react-query";
import { audioDetailApi } from "../../services";

export const useLectureById = (id, options = {}) => {
  const { data, isLoading, isFetching } = useQuery(
    ["audio", id],
    () => audioDetailApi.getAudio(id),
    {
      enabled: Boolean(id),
      staleTime: 0,
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

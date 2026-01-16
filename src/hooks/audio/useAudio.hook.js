import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { audioDetailApi } from "../../services";
import { useEffect } from "react";
import {
  getaudioId,
  getcurrentAudioInfo,
} from "../../Redux/Actions/ActionCreators";

export const useAudioHook = (id) => {
  const dispatch = useDispatch();

  const { data, refetch, isLoading, isFetching } = useQuery(
    ["audio", id],
    () => audioDetailApi.getAudio(id),
    {
      enabled: true,
      staleTime: 0, // Always fetch fresh data for this lecture
      onSuccess: (data) => {
        dispatch(getcurrentAudioInfo(data[0]));
      },
    }
  );

  useEffect(() => {
    if (window.innerWidth <= 615) {
      dispatch(getaudioId(id));
    }
  }, [id, dispatch]);

  return {
    refetch,
    data,
    isLoading: isLoading || isFetching,
  }
};

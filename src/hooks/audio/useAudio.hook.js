import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { audioDetailApi } from "../../services";
import { useEffect, useRef } from "react";
import {
  getaudioId,
  getcurrentAudioInfo,
} from "../../Redux/Actions/ActionCreators";

export const useAudioHook = (id) => {
  const dispatch = useDispatch();
  const { currentAudioInfo } = useSelector((state) => state.user);
  const previousIdRef = useRef(null);

  // Clear stale data immediately when lecture ID changes
  // This prevents showing old lecture content while new data loads
  useEffect(() => {
    if (previousIdRef.current !== null && previousIdRef.current !== id) {
      // ID has changed - clear the old lecture data immediately
      dispatch(getcurrentAudioInfo(null));
    }
    previousIdRef.current = id;
  }, [id, dispatch]);

  const { data, refetch, isLoading, isFetching } = useQuery(
    ["audio", id],
    () => audioDetailApi.getAudio(id),
    {
      enabled: true,
      staleTime: 0, // Always consider data stale to ensure fresh fetches
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

  // Determine if we're loading fresh data for a new lecture
  const isLoadingNewLecture = isLoading || isFetching ||
    (currentAudioInfo?.nid && String(currentAudioInfo.nid) !== String(id));

  return {
    refetch,
    data,
    isLoading: isLoadingNewLecture,
  }
};

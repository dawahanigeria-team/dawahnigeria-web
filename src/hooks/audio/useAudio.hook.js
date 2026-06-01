import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { audioDetailApi } from "../../services";
import { useEffect } from "react";
import { getaudioId } from "../../Redux/Actions/ActionCreators";

// A lecture id is only usable if it is a real value (not missing and not the
// stringified "undefined"/"null" that leaks in from links built with a bad id).
export const isValidLectureId = (id) =>
  id != null && id !== "" && id !== "undefined" && id !== "null";

export const useAudioHook = (id) => {
  const dispatch = useDispatch();
  const { data, refetch, isLoading, isFetching } = useQuery(
    ["audio", id],
    () => audioDetailApi.getAudio(id),
    {
      // Don't fire a request for a bad id (avoids the /l/undefined dead page).
      enabled: isValidLectureId(id),
      // Cache for 5 min so revisiting a lecture is instant instead of refetching.
      staleTime: 5 * 60 * 1000,
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

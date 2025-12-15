import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "../../utils/conditionalToast"; // SSR-safe toast utility
export const usePlaylistLectures = (
  keyName,
  keyParam = {},
  queryFunction
) => {
  const [querieddata, setQueriedData] = useState([]);

  const { isLoading, data, error } = useQuery(
    [keyName, keyParam],
    () => queryFunction(keyParam),
    {
      enabled: !!keyParam.multiId,
      onSuccess: (data) => {
        setQueriedData(data);
      },
      onError: (error) => {
        
        toast.error("Unable to load data");
      },
    }
  );

  return {
    isLoading,
    isLectureId: keyParam.multiId,
    error,
    data,
    querieddata,
  };
};

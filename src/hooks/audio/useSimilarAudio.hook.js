import { useQuery } from "@tanstack/react-query";

import { audioDetailApi } from "../../services";
import { useState } from "react";

export const useSimilarAudioHook = (keyParam) => {
  const [querieddata, setQueriedData] = useState([]);

  const { data } = useQuery(
    ["similarAudios", keyParam],
    () => audioDetailApi.getSimilarAudio(keyParam),
    {
      enabled: !!keyParam?.id,
      onSuccess: (data) => {
        setQueriedData(data);

      },
      onError: (error) => {
      
        toast.error("Unable to load data");
      },
    }
  );

  return {
    querieddata,
  };
};

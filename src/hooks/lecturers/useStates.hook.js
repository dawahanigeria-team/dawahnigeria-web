import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { lecturersApi } from "../../services";
// Use client-only toast to avoid SSR errors
import { toast } from "../../utils/conditionalToast";
import { states } from "../../pages/lecturers/data";

export const useStatesHook = () => {
  const [statesData, setStatesData] = useState([]);

  useQuery(["states"], () => lecturersApi.getStates(), {
    onSuccess: (data) => {
      const responseStates = data?.states || [];
      setStatesData([...states, ...responseStates.map((name) => ({ name }))]);
    },
    onError: () => {
      toast.error("Unable to load data");
    },
  });

  return {
    data: statesData,
  };
};

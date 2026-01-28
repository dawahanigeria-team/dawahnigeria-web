import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { lecturersApi } from "../../services";
// Use client-only toast to avoid SSR errors
import { toast } from "../../utils/conditionalToast";
import { states } from "../../pages/lecturers/data";

export const useStatesHook = () => {
  const [statesData, setStatesData] = useState(states);

  useQuery(["states"], () => lecturersApi.getStates(), {
    onSuccess: (data) => {
      const responseStates = Array.isArray(data?.states) ? data.states : [];
      const normalized = responseStates
        .filter(
          (name) =>
            typeof name === "string" &&
            name.trim().length > 0 &&
            name.toLowerCase() !== "all" &&
            name.toLowerCase() !== "all states"
        )
        .map((name) => name.trim());

      const unique = Array.from(new Set(normalized));
      unique.sort((a, b) => a.localeCompare(b));

      setStatesData([...states, ...unique.map((name) => ({ name }))]);
    },
    onError: () => {
      toast.error("Unable to load data");
    },
  });

  return {
    data: statesData,
  };
};

import { useQuery } from "@tanstack/react-query";
import { quranApi } from "../../services";
import toast from "react-hot-toast";
import { useState } from "react";
import _ from "lodash";

export const useQurans = (page = 1) => {
  const [cummulatedData, setCummulatedData] = useState([]);

  const { isLoading, data, error, isRefetching } = useQuery(
    ["qurans", page],
    () => quranApi.allQurans(page),
    {
      enabled: !!page,
      onSuccess: (data) => {
        setCummulatedData((prev) => _.uniqBy([...prev, ...data], "nid"));
      },
      onError: () => {
        console.error("error", error);
        toast.error("Unable to load qurans");
      },
    }
  );

  return { isLoading, isRefetching, error, data, cummulatedData };
};

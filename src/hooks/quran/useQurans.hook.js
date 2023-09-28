import { useQuery } from "@tanstack/react-query";
import { quranApi } from "../../services";
import toast from "react-hot-toast";

export const useQurans = (page = 1) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["qurans", page],

    queryFn: quranApi.allQurans(page),
    enabled: !!page,

    onError: (error) => {
      console.error("error", error);
      toast.error("Unable to load qurans");
    },
  });

  return { isLoading, data, error };
};

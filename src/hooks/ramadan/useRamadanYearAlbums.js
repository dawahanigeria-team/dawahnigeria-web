import { useQuery } from "@tanstack/react-query";
import { ramadanApi } from "../../services";

export const useRamadanYearAlbums = (id) => {
  const { isLoading, data, isError, error } = useQuery(["ramadan", id], () =>
    ramadanApi.getRamadanYearAlbums(id)
  );

  return {
    isLoading,
    error,
    isError,
    data: data?.data || [],
    yearName: data?.name || "Ramadan lectures",
  };
};

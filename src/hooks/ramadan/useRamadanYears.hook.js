import { useQuery } from "@tanstack/react-query";
import { ramadanApi } from "../../services";

export const useRamadanYears = () => {
  const { isLoading, data, isError, error } = useQuery(["ramadan"], () =>
    ramadanApi.getAllRamadanYears()
  );

  return {
    isLoading,
    error,
    isError,
    data: data?.data || [],
  };
};

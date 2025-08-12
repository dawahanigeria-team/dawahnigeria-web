import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { lecturersApi } from "../../services";
import { toast } from "../../utils/conditionalToast"; // SSR-safe toast utility
import { category } from "../../pages/playlists/data";

export const useCategoriesHook = () => {
  const [categoriesdata, setCategoriesData] = useState([]);

  const { data } = useQuery(
    ["categories"],
    () => lecturersApi.getCategories(),
    {
      onSuccess: (data) => {
        setCategoriesData([...category, ...data.slice(0, 15)]);
      },
      onError: (error) => {
        
        toast.error("Unable to load data");
      },
    }
  );

  return {
    data: categoriesdata,
  };
};

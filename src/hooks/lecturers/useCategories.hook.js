import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { lectureApi } from "../../services";

import { category } from "../../pages/playlists/data";

export const useCategoriesHook = () => {
  const [categoriesdata, setCategoriesData] = useState([]);

  const { data } = useQuery(
    ["categories"],
    () => lectureApi.getCategories(),
    {
      onSuccess: (data) => {
        setCategoriesData([...category, ...data.slice(0, 15)]);
      },
      onError: (error) => {
        
        
      },
    }
  );

  return {
    data: categoriesdata,
  };
};

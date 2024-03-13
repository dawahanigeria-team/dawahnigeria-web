import { useParams } from "react-router-dom";
import { useRamadanYearAlbums } from "./useRamadanYearAlbums";
import { useMemo } from "react";

export const useFilteredRamadanYearAlbums = (languageId) => {
  const { id: yearId } = useParams();

  const { data: ramadanYearAlbums, isLoading } = useRamadanYearAlbums(yearId);

  // Filter data based on selected language tab and return the documents that match
  const albums = useMemo(() => {
    const matchingAlbums = ramadanYearAlbums
      ?.filter((album) => album?.lang_id === languageId)
      .map((album) => album?.documents)?.[0];

    if (matchingAlbums?.length > 0) {
      return matchingAlbums;
    } else {
      // pick the first language if nothing is selected else e.g on page load
      return ramadanYearAlbums?.[0]?.documents;
    }
  }, [ramadanYearAlbums, languageId]);

  return { data: albums, isLoading };
};

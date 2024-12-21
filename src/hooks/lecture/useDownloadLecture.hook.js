import { useQuery } from "@tanstack/react-query";
import { lectureApi } from "../../services";
import toast from "react-hot-toast";
import { useCallback } from "react";

export const useDownloadLecture = (lecid) => {
  const { isLoading, data, error } = useQuery(
    ["lecture", "download", lecid],
    () => {
      const payload = { lecid: Number(lecid) };
      return lectureApi.downloadFile(payload);
    },
    {
      enabled: !!lecid,
      onError: (error) => {
        
        toast.error("Unable to load lecture file");
      },
    }
  );

  const download = useCallback((fileUrl) => {
    window.open(fileUrl, "_blank");
  }, []);

  return { isLoading, error, data, download };
};

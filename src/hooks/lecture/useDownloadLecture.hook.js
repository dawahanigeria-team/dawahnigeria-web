import { useQuery } from "@tanstack/react-query";
import { lectureApi } from "../../services";
import toast from "../../utils/conditionalToast"; // SSR-safe toast utility
import { triggerFileDownload } from "../../utils/fileDownload";
import { useCallback } from "react";

export const useDownloadLecture = (lecid, enabled = true) => {
  const { isLoading, data, error } = useQuery(
    ["lecture", "download", lecid],
    () => {
      const payload = { lecid: Number(lecid) };
      return lectureApi.downloadFile(payload);
    },
    {
      enabled: Boolean(enabled) && !!lecid,
      onError: (error) => {
        
        toast.error("Unable to load lecture file");
      },
    }
  );

  const download = useCallback((fileUrl, suggestedName) => {
    const started = triggerFileDownload(fileUrl, suggestedName);
    if (!started) {
      toast.error("Download link is not available for this file.");
    }
    return started;
  }, []);

  return { isLoading, error, data, download };
};

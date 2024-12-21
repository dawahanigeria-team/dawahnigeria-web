import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { lectureApi } from "../../services/lecture.service";
import { isNetworkError } from "../../utils/network";

export const useDownloadLecture = (lecid) => {
  const { isLoading, data, error, refetch } = useQuery(
    ["lecture", "download", lecid],
    () => {
      const payload = { lecid: Number(lecid) };
      return lectureApi.downloadFile(payload);
    },
    {
      enabled: !!lecid,
      retry: 2,
      onError: (error) => {
        if (isNetworkError(error)) {
          toast.error(
            "Unable to download lecture file. Please check your internet connection.",
            {
              duration: 4000,
              icon: '🌐',
            }
          );
        } else {
          toast.error("Unable to download lecture file. Please try again later.", {
            duration: 4000,
          });
        }
      },
    }
  );

  const download = useCallback((fileUrl) => {
    window.open(fileUrl, "_blank");
  }, []);

  const retryDownload = () => {
    toast.loading("Retrying download...");
    refetch();
  };

  return { isLoading, error, data, download, retryDownload };
};

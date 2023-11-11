import { useQuery } from "@tanstack/react-query";
import { lectureApi } from "../../services";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
export const useMoreViewHook = (keyParam, currentdata) => {
  const [querydata, setquerydata] = useState([]);
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);
  const [hasReachedLastPage, setHasReachedLastPage] = useState(false);

  const { data, isLoading, error } = useQuery(
    ["more-view", keyParam],
    () => lectureApi.moreDatas(keyParam),
    {
      enabled: !!keyParam.endpoint_url && !hasReachedLastPage,
      onSuccess: (data) => {
        setIsLoadingNextPage(false);

        // ensure subsequent requests are not sent when the last one doesn't have data
        if (data?.length === 0) {
          setHasReachedLastPage(true);
          return;
        }

        setquerydata((prev) => [...prev, ...data]);
      },
      onError: (error) => {
        setIsLoadingNextPage(false);
        
        toast.error("Unable to load data");
      },
    }
  );
  // handles when page changes
  useEffect(() => {
    if (!keyParam.page) return; // return if the query param is not page
    if (keyParam.page !== 1 && !hasReachedLastPage) {
      setIsLoadingNextPage(true);
    }
  }, [keyParam.page]);

  useEffect(() => {
    if (keyParam.endpoint_url) return;
    
    setquerydata(currentdata);
    setHasReachedLastPage(true);
  }, [keyParam.endpoint_url]);

  return {
    data: querydata,
    isLoading,
    error,
    isLoadingNextPage,
    isLastPage: hasReachedLastPage,
  };
};

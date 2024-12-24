import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import _ from "lodash";
export const useLecturersHook = (
  keyName,
  queryParam = {},
  queryFunction,
  setPage
) => {
  const [querieddata, setQueriedData] = useState([]);
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);
  const [hasReachedLastPage, setHasReachedLastPage] = useState(false);
  const [intialLangId, setinitialLangId] = useState("");

  const { isLoading, data, error } = useQuery(
    [keyName, queryParam],
    () => queryFunction(queryParam),
    {
      enabled: !hasReachedLastPage,
      onSuccess: (data) => {
        setIsLoadingNextPage(false);

        //check if the query is with lecturer id, return if it's true
        if (queryParam.typeName === "name" && queryParam.active !== "All") {
          setQueriedData(data);

          setIsLoadingNextPage(false);

          setHasReachedLastPage(true); // stop making request
          return;
        }

        // ensure subsequent requests are not sent when the last one doesn't have data
        if (data?.length === 0) {
          setHasReachedLastPage(true);
          return;
        }

        setinitialLangId(queryParam.langid);

        setQueriedData((prev) => _.uniqBy([...prev, ...data], "id"));
      },
      onError: (error) => {
        setIsLoadingNextPage(false);

        toast.error("Unable to load data");
      },
    }
  );

  // handles when page, languageId, and alpahabet  change
  useEffect(() => {
    //don't paginate if the queryParam is the lecturer Id
    if (queryParam.typeName === "name" && queryParam.active !== "All") {
      queryParam.lectId ? setHasReachedLastPage(false) : null;
      return;
    }

    if (queryParam.page !== 1 && !hasReachedLastPage) {
      setIsLoadingNextPage(true);
    }
  }, [queryParam.page, queryParam.lectId]);

  useEffect(() => {
    if (!queryParam.lectId) {
      setHasReachedLastPage(false);
    }
  }, [queryParam.lectId]);

  useEffect(() => {
    if (queryParam.langid) {
      setHasReachedLastPage(false);
    }
    // start again from the first page whenever there is a change in the language or alphabet selection
    if (intialLangId !== queryParam.langid) {
      setQueriedData([]);
      setPage(1);
    }
  }, [queryParam.langid]);
  return {
    isLoading,
    isLoadingNextPage,
    isLastPage: hasReachedLastPage,
    error,
    data,
    querieddata,
  };
};
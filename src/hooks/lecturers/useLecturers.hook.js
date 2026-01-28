import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "../../utils/conditionalToast"; // SSR-safe toast utility
import uniqBy from "lodash/uniqBy";
export const useLecturersHook = (
  keyName,
  queryParam = {},
  queryFunction,
  setPage
) => {
  const [querieddata, setQueriedData] = useState([]);
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);
  const [hasReachedLastPage, setHasReachedLastPage] = useState(false);
  const [initialFilter, setInitialFilter] = useState({ langid: "", state: "" });

  const { isLoading, data, error, isFetching } = useQuery(
    [keyName, queryParam],
    () => queryFunction(queryParam),
    {
      enabled: !hasReachedLastPage,
      keepPreviousData: true,
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

        setInitialFilter({
          langid: queryParam.langid || "",
          state: queryParam.state || "",
        });

        setQueriedData((prev) => uniqBy([...prev, ...data], "id"));
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
    if (queryParam.langid || queryParam.state) {
      setHasReachedLastPage(false);
    }
    // start again from the first page whenever there is a change in the filter selection
    if (
      initialFilter.langid !== (queryParam.langid || "") ||
      initialFilter.state !== (queryParam.state || "")
    ) {
      setQueriedData([]);
      setPage(1);
    }
  }, [queryParam.langid, queryParam.state]);
  return {
    isLoading,
    isLoadingNextPage: isFetching && queryParam.page > 1,
    isLastPage: hasReachedLastPage,
    error,
    data,
    querieddata,
    isFetching,
  };
};

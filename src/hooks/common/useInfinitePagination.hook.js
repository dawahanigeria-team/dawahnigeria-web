import { useRef, useCallback } from "react";
import infiniteScroll from "../../components/UI/infiniteScroll";

export const useInfiniteScrollPagination = (dataLength = 0, page, setPage, isFetching = false) => {
  const observer = useRef();

  const ref = useCallback(
    (node) => {
      if (dataLength === 0 || isFetching) return;
      infiniteScroll(node, observer, page, setPage);
    },
    [page, dataLength, isFetching]
  );

  return { ref };
};

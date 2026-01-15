function infiniteScroll(node, observer, page, setPage) {

  if (observer.current) observer.current.disconnect();
  observer.current = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        setPage(page + 1);
      }
    },
    {
      threshold: 1,
    }
  );

  if (node) observer.current.observe(node);

  // Cleanup when the component unmounts
  return () => {
    if (observer.current) {
      observer.current.disconnect();
    }
  };
}

export default infiniteScroll;

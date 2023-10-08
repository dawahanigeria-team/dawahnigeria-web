function infiniteScroll(node, observer, page, setPage, isEmpty) {
  if (isEmpty) return;

  // console.log(node);
  if (observer.current) observer.current.disconnect();
  observer.current = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          setPage(page + 1);
        }, 2000);
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

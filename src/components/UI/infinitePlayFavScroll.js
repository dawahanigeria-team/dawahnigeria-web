//import { useLocation } from "react-router-dom";
//add page + 10
function infinitePlayFavScroll (node, observer, page, setPage, isEmpty) {
  if(isEmpty) return;
  console.log(node);
  if (observer.current) observer.current.disconnect();
  observer.current = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        console.log("visible");
        setTimeout(() => {
          setPage(page + 10);
        }, 2000);
      }
    },
    {
      threshold: 1,
    }
  );

  if (node) observer.current.observe(node);
}

export default infinitePlayFavScroll ;
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CarouselSeleton = () => {
  return (
    <SkeletonTheme baseColor="#7B91A7" highlightColor="#d8e695">
      <Skeleton className="carousel  h-[250px] min-[950px]:h-[250px] min-[1050px]:h-[250px] min-[1283px]:h-[300px]" />
    </SkeletonTheme>
  );
};

export default React.memo(CarouselSeleton);

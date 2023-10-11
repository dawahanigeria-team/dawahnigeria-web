import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#7B91A7" highlightColor="#d8e695">
      <div className="w-[165]">
        <Skeleton width={165} height={174} className="mb-1" />
        <Skeleton width={165} height={23} />
      </div>
    </SkeletonTheme>
  );
};



export default React.memo(CardSkeleton);

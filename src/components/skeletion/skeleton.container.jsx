import React from "react";
import CardSkeleton from ".";

const RowSkeletonContainer = () => {
  return (
    <div className="groupWidget_wrapper">
      <div className="groupWidget_top">
        <p className="groupWidget_top_heading">Loading...</p>
      </div>
      <div className="overflow_hidden_wrapper">
        <div className="overflow_auto_wrapper">
          <div
            className={`overflow_auto_after
            `}
          >
            {Array(10)
              .fill(undefined)
              .map((_, i) => {
                return <CardSkeleton key={i} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RowSkeletonContainer;

// export default React.memo(RowSkeletonContainer);

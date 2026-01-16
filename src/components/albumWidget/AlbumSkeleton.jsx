import React, { memo } from "react";
import "./albumSkeleton.scss";

const AlbumSkeleton = memo(({ index = 0 }) => {
  return (
    <div
      className="album_skeleton"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="album_skeleton_image">
        <div className="album_skeleton_shimmer" />
      </div>
      <div className="album_skeleton_content">
        <div className="album_skeleton_title">
          <div className="album_skeleton_shimmer" />
        </div>
        <div className="album_skeleton_meta">
          <div className="album_skeleton_shimmer" />
        </div>
      </div>
    </div>
  );
});

AlbumSkeleton.displayName = "AlbumSkeleton";

export const AlbumSkeletonGrid = memo(({ count = 8 }) => {
  return (
    <div className="album_skeleton_grid">
      {Array.from({ length: count }).map((_, idx) => (
        <AlbumSkeleton key={idx} index={idx} />
      ))}
    </div>
  );
});

AlbumSkeletonGrid.displayName = "AlbumSkeletonGrid";

export default AlbumSkeleton;

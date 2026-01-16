import React, { memo } from "react";
import "./audioListSkeleton.scss";

/**
 * Single audio list item skeleton for loading state
 * Matches the MusicList component structure
 */
const AudioListSkeletonItem = memo(({ index = 0 }) => {
  return (
    <div
      className="audio_skeleton_item"
      style={{ animationDelay: `${index * 0.08}s` }}
      aria-hidden="true"
    >
      {/* Desktop Row */}
      <div className="audio_skeleton_desktop">
        <div className="audio_skeleton_row">
          <div className="audio_skeleton_num">
            <div className="audio_skeleton_shimmer" />
          </div>
          <div className="audio_skeleton_image">
            <div className="audio_skeleton_shimmer" />
          </div>
          <div className="audio_skeleton_title">
            <div className="audio_skeleton_shimmer" />
          </div>
        </div>
        <div className="audio_skeleton_lecturer">
          <div className="audio_skeleton_shimmer" />
        </div>
        <div className="audio_skeleton_actions">
          <div className="audio_skeleton_action_dot">
            <div className="audio_skeleton_shimmer" />
          </div>
          <div className="audio_skeleton_action_dot">
            <div className="audio_skeleton_shimmer" />
          </div>
          <div className="audio_skeleton_action_dot">
            <div className="audio_skeleton_shimmer" />
          </div>
        </div>
        <div className="audio_skeleton_duration">
          <div className="audio_skeleton_shimmer" />
        </div>
      </div>

      {/* Mobile Card */}
      <div className="audio_skeleton_mobile">
        <div className="audio_skeleton_mobile_image">
          <div className="audio_skeleton_shimmer" />
        </div>
        <div className="audio_skeleton_mobile_content">
          <div className="audio_skeleton_mobile_title">
            <div className="audio_skeleton_shimmer" />
          </div>
          <div className="audio_skeleton_mobile_lecturer">
            <div className="audio_skeleton_shimmer" />
          </div>
        </div>
        <div className="audio_skeleton_mobile_actions">
          <div className="audio_skeleton_action_dot">
            <div className="audio_skeleton_shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
});

AudioListSkeletonItem.displayName = "AudioListSkeletonItem";

/**
 * Audio list skeleton grid for loading state
 * Shows multiple skeleton items with staggered animation
 */
export const AudioListSkeleton = memo(({ count = 8 }) => {
  return (
    <div className="audio_skeleton_list" role="status" aria-label="Loading audio content">
      {/* Desktop Header Skeleton */}
      <div className="audio_skeleton_header">
        <div className="audio_skeleton_header_left">
          <span className="audio_skeleton_header_hash">#</span>
          <span className="audio_skeleton_header_title">Title</span>
        </div>
        <span className="audio_skeleton_header_lecturer">Lecturer</span>
        <span className="audio_skeleton_header_time">Time</span>
      </div>

      {Array.from({ length: count }).map((_, idx) => (
        <AudioListSkeletonItem key={idx} index={idx} />
      ))}
    </div>
  );
});

AudioListSkeleton.displayName = "AudioListSkeleton";

export default AudioListSkeleton;

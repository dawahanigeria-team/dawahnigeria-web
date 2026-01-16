import React, { memo } from "react";
import { IoHeadsetOutline } from "react-icons/io5";
import "./audioEmptyState.scss";

/**
 * Empty state component for Audio tab
 * Displays when no audio content is available
 */
const AudioEmptyState = memo(({ rpname }) => (
  <div className="audio_empty_state" role="status" aria-live="polite">
    <div className="audio_empty_icon_wrapper">
      <IoHeadsetOutline className="audio_empty_icon" aria-hidden="true" />
      <div className="audio_empty_icon_glow" aria-hidden="true" />
      <div className="audio_empty_icon_ring" aria-hidden="true" />
    </div>
    <h3 className="audio_empty_title">No Audio Yet</h3>
    <p className="audio_empty_text">
      {rpname
        ? `${rpname} hasn't uploaded any audio content yet.`
        : "No audio content available at the moment."}
    </p>
    <p className="audio_empty_subtext">
      Check back later for new lectures
    </p>
  </div>
));

AudioEmptyState.displayName = "AudioEmptyState";

export default AudioEmptyState;

import React, { memo, useMemo, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { HiPlay, HiMusicalNote } from "react-icons/hi2";
import { IoMusicalNotes } from "react-icons/io5";
import "./albumWidget.scss";
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders";

const AlbumWidget = memo(({
  img,
  categories,
  lec_no,
  rpname,
  views,
  duration,
  date,
  index = 0,
  isPlaying = false,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formattedViews = useMemo(() => {
    if (!views) return null;
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + "M";
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + "K";
    }
    return views;
  }, [views]);

  const handleTouchStart = useCallback(() => setIsPressed(true), []);
  const handleTouchEnd = useCallback(() => setIsPressed(false), []);
  const handleImageLoad = useCallback(() => setImageLoaded(true), []);
  const handleImageError = useCallback((e) => {
    setImageError(true);
    e.currentTarget.src = IMAGE_PLACEHOLDERS.albumWidget;
  }, []);

  // Stagger animation delay based on index
  const animationStyle = {
    animationDelay: `${index * 0.08}s`,
  };

  return (
    <article
      className={`album_card ${isPressed ? "album_card--pressed" : ""} ${isPlaying ? "album_card--playing" : ""}`}
      style={animationStyle}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
      role="article"
      aria-label={`Album: ${categories}`}
    >
      {/* Image Container */}
      <div className="album_card__image_container">
        {/* Placeholder while loading */}
        {!imageLoaded && !imageError && (
          <div className="album_card__placeholder">
            <IoMusicalNotes className="album_card__placeholder_icon" aria-hidden="true" />
          </div>
        )}

        <img
          src={img || IMAGE_PLACEHOLDERS.albumWidget}
          alt={categories || "Album cover"}
          className={`album_card__image ${imageLoaded ? "album_card__image--loaded" : ""}`}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
          width={300}
          height={300}
        />

        {/* Gradient Overlay */}
        <div className="album_card__gradient" aria-hidden="true" />

        {/* Now Playing Indicator */}
        {isPlaying && (
          <div className="album_card__now_playing" aria-label="Now playing">
            <div className="album_card__equalizer">
              <span className="album_card__eq_bar" />
              <span className="album_card__eq_bar" />
              <span className="album_card__eq_bar" />
              <span className="album_card__eq_bar" />
            </div>
          </div>
        )}

        {/* Track Count Badge */}
        {lec_no && (
          <div className="album_card__badge" aria-label={`${lec_no} tracks`}>
            <HiMusicalNote className="album_card__badge_icon" aria-hidden="true" />
            <span>{lec_no}</span>
          </div>
        )}

        {/* Play Button Overlay */}
        <div className="album_card__play_overlay">
          <button
            className="album_card__play_btn"
            aria-label={`Play ${categories}`}
            type="button"
          >
            <HiPlay className="album_card__play_icon" aria-hidden="true" />
          </button>
        </div>

        {/* Touch Ripple Effect */}
        <div className="album_card__ripple" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="album_card__content">
        <h3 className="album_card__title">
          {categories || "Untitled Album"}
        </h3>

        {rpname && (
          <p className="album_card__artist">{rpname}</p>
        )}

        {formattedViews && (
          <p className="album_card__meta">
            {formattedViews} plays
          </p>
        )}
      </div>
    </article>
  );
});

AlbumWidget.displayName = "AlbumWidget";

export default AlbumWidget;

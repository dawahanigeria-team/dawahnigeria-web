import React, { useState, useCallback, useEffect } from "react";
import "./safeImage.scss";

/**
 * Renders an <img> with a guaranteed fallback and a skeleton while loading.
 * Why: prior code used dynamic imports that left src=null on first render
 * (broken-image icon) and inconsistent onError handling across widgets.
 */
const SafeImage = ({
  src,
  fallback,
  alt = "",
  className = "",
  imgClassName = "",
  skeleton = true,
  loading = "lazy",
  width,
  height,
  onClick,
  ...rest
}) => {
  const resolvedFallback = fallback || "";
  const initialSrc = src || resolvedFallback;
  const [currentSrc, setCurrentSrc] = useState(initialSrc);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setCurrentSrc(src || resolvedFallback);
    setLoaded(false);
    setErrored(false);
  }, [src, resolvedFallback]);

  const handleLoad = useCallback(() => setLoaded(true), []);

  const handleError = useCallback(() => {
    if (!errored && resolvedFallback && currentSrc !== resolvedFallback) {
      setErrored(true);
      setCurrentSrc(resolvedFallback);
    } else {
      setLoaded(true);
    }
  }, [errored, resolvedFallback, currentSrc]);

  return (
    <span className={`safe_image_wrap ${className}`} onClick={onClick}>
      {skeleton && !loaded && <span className="safe_image_skeleton" aria-hidden="true" />}
      <img
        src={currentSrc}
        alt={alt}
        loading={loading}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        className={`safe_image_img ${loaded ? "is-loaded" : ""} ${imgClassName}`}
        {...rest}
      />
    </span>
  );
};

export default SafeImage;

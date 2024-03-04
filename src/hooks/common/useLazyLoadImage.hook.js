import { useEffect, useRef } from "react";

export const useLazyLoadImage = (imgSrc) => {
  const imageRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const handleImageError = () => {
      if (imageRef.current) {
        imageRef.current.src = "https://res.cloudinary.com/dkdrbjfdt/image/upload/v1709550293/album_d1wslv.jpg";
      }
    };

    const lazyImage = () => {
      if (imageRef.current) {
        if (observerRef.current) {
          observerRef.current?.disconnect();
        }

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const newUrl = imageRef.current.getAttribute("data-src");
              imageRef.current.src = newUrl;
              imageRef.current.removeEventListener("error", handleImageError);
              observerRef.current = null;
            }
          });
        });

        observerRef.current = observer;

        observer.observe(imageRef.current);

        imageRef.current?.addEventListener("error", handleImageError);
      }
    };

    lazyImage();

    return () => {
      if (imageRef.current) {
        imageRef.current?.removeEventListener("error", handleImageError);
      }

      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [imgSrc]);

  return { imageRef };
};

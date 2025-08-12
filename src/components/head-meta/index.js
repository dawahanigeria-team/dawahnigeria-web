import React from "react";

const HeadMeta = ({
  title,
  description,
  ogImage = "https://pub-09f814adc0704e7db8ea3d3ad843eb7e.r2.dev/dn-banner.jpeg",
  keywords,
  ogType = "website",
  canonicalUrl
}) => {
  return (
    <>
      <meta charSet="utf-8" />
      <meta
        name="description"
        content={
          description ||
          "Explore Islamic educational resources like articles, lectures, videos, and e-books on Dawah Nigeria. Promoting knowledge and guidance for all."
        }
      />
      <meta
        name="keywords"
        content={keywords || "Islamic education, Dawah Nigeria, articles, lectures, videos, e-books, Islam, guidance, knowledge, online platform, religious resources, Quran, Islamic teachings"}
      />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta name="author" content="Edawah" />
      <title>{title || "Dawah Nigeria"}</title>
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </>
  );
};

export default HeadMeta;

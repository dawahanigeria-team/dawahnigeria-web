import React from "react";
import { Helmet } from "react-helmet-async";

const DEFAULT_DESCRIPTION =
  "Explore Islamic educational resources like articles, lectures, videos, and e-books on Dawah Nigeria. Promoting knowledge and guidance for all.";
const DEFAULT_KEYWORDS =
  "Islamic education, Dawah Nigeria, articles, lectures, videos, e-books, Islam, guidance, knowledge, online platform, religious resources, Quran, Islamic teachings";

const HeadMeta = ({
  title,
  description,
  ogImage = "https://pub-09f814adc0704e7db8ea3d3ad843eb7e.r2.dev/dn-banner.jpeg",
  keywords,
  ogType = "website",
  canonicalUrl,
}) => {
  const resolvedTitle = title || "Dawah Nigeria";
  const resolvedDescription = description || DEFAULT_DESCRIPTION;

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <meta name="keywords" content={keywords || DEFAULT_KEYWORDS} />
      <meta name="author" content="Edawah" />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={ogImage} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Helmet>
  );
};

export default HeadMeta;

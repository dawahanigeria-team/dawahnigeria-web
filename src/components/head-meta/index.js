import { Helmet } from "react-helmet";
import React from "react";

const HeadMeta = ({ title, description }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta
        name="description"
        content={
          description ??
          "Explore Islamic educational resources like articles, lectures, videos, and e-books on Dawah Nigeria. Promoting knowledge and guidance for all."
        }
      />
      <meta name="keywords" content="" />
      <meta name="author" content="Edawah" />
      <title>{title ?? "Dawah Nigeria"}</title>
    </Helmet>
  );
};

export default HeadMeta;

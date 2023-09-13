import { Helmet } from "react-helmet";
import React from "react";

const HeadMeta = ({ title}) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="description" content="" />
      <meta
        name="keywords"
        content=""
      />
      <meta name="author" content="Edawah" />
      <title>{title}</title>
    </Helmet>
  );
};

export default HeadMeta;

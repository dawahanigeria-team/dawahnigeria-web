import { Helmet } from "react-helmet";
import React from "react";

const HeadMeta = ({ title}) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="description" content="CRA Typescript Starter by C-Hive" />
      <meta
        name="keywords"
        content=""
      />
      <meta name="author" content="C-Hive" />
      <title>{title}</title>
    </Helmet>
  );
};

export default HeadMeta;

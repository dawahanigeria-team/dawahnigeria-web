import { Helmet } from "react-helmet";
import React from "react";

const Head = ({ title, Keywords, description }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="description" content="CRA Typescript Starter by C-Hive" />
      <meta
        name="keywords"
        content="CRA, Typescript, Starter, C-Hive, create react app, create-react-app"
      />
      <meta name="author" content="C-Hive" />
      <title>{title}</title>
    </Helmet>
  );
};

export default Head;

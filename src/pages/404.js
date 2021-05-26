import { Layout } from "components/common";
import SEO from "components/SEO/SEO";
import { Link } from "gatsby";
import React from "react";

const NotFound = () => {
  return (
    <Layout>
      <SEO />
      <h1>
        Sorry, the page you requested could not be found.{" "}
        <Link to="/">Go to homepage</Link>
      </h1>
    </Layout>
  );
};

export default NotFound;

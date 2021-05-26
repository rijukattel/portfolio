import React, { useContext } from "react";
import { ThemeContext } from "../../../providers/ThemeProvider";
import { Header } from "components/Header";
import { Footer } from "components/Footer";
import { Container } from "../Container";
import PropTypes from "prop-types";
import { Global } from "./styles";
import "./fonts.css";
import SEO from "components/SEO/SEO";
import { Helmet } from "react-helmet";
import site from "../../../../data/site.json";

export const Layout = ({ title, children, ...props }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Global theme={theme} />
      <Helmet
        title={title ? `${title} | ${site.siteTitle} ` : site.siteTitle}
      />
      <SEO {...props} />
      <Header />
      <Container>{children}</Container>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  title: PropTypes.string,
  // description: PropTypes.string.isRequired,
};

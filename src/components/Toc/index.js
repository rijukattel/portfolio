import { ThemeContext } from "providers/ThemeProvider";
import React, { useContext } from "react";
import { TocStyle } from "./style";

const Toc = ({ post }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <TocStyle theme={theme}>
      <nav>
        <h4>Table of Contents</h4>
        <div dangerouslySetInnerHTML={{ __html: post }} />
      </nav>
    </TocStyle>
  );
};

export default Toc;

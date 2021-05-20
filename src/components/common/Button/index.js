import { ThemeContext } from "providers/ThemeProvider";
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { ButtonStyle } from "./style";

export const Button = ({ ...props }) => {
  const { theme } = useContext(ThemeContext);

  return <ButtonStyle theme={theme} {...props} />;
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
};

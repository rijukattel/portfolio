import Col from "components/Col";
import { Link } from "gatsby";
import moment from "moment";
import { ThemeContext } from "providers/ThemeProvider";
import React, { useContext } from "react";
import site from "../../../../data/site.json";
import { CardStyle } from "./style";

export const Card = ({
  hoverable = false,
  path = "",
  tags = [],
  cover,
  title = <></>,
  footer,
  date,
  timeToRead,
  post,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <CardStyle
      whileHover={
        hoverable
          ? {
              scale: 1.05,
              transition: { duration: 0.25 },
            }
          : null
      }
      theme={theme}
      {...props}
    >
      {cover && (
        <div className="img-container">
          <img src={cover} alt={title} />
        </div>
      )}
      <div className="detail-container">
        <div className="title">{title}</div>
        <div className="footer">{footer}</div>
      </div>
    </CardStyle>
  );
};

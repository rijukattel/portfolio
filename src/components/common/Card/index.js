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
  title = "",
  date,
  excerpt = "",
  timeToRead = "",
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
      {cover && <img src={cover} alt={title} />}
      <div className="detail-container">
        <h3 className="title">
          <Link to={path}>{title}</Link>
        </h3>
        <h3 className="date">{moment(date).format(site.dateFormat)}</h3>
      </div>
    </CardStyle>
  );
};

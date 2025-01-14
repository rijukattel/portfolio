import React from "react";
import { ResponsiveCol } from "./styles";

const Col = ({ sm = 1, md = 2, lg = 4, columns = 4, children, ...props }) => {
  return (
    <ResponsiveCol sm={sm} md={md} lg={lg} columns={columns} {...props}>
      {children}
    </ResponsiveCol>
  );
};

export default Col;

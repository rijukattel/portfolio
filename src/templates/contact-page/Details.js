import React from "react";
import styled from "styled-components";

const Details = ({ title, value }) => {
  return (
    <DetailStyle>
      <h3>{value}</h3>
      <p>{title}</p>
    </DetailStyle>
  );
};

const DetailStyle = styled.div`
  text-align: center;
  border: 1px solid grey;
  padding: 10px;
  border-radius: 8px;
  h3 {
    margin-top: 10px;
  }
  p {
    font-size: 20px;
  }
`;

export default Details;

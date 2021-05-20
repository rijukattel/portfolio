import styled from "styled-components";
import theme from "theme";

export const SiteDetail = styled.div`
  min-height: 200px;
  h1 {
    font-weight: bold;
    font-size: 50px;
    margin-top: 7vh;
    font-family: "Anton", sans-serif;
  }
  p {
    font-size: 18px;
    line-height: 1.7;
  }
`;

export const LatestBlogsContainer = styled.div`
  .title-container {
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
  }
  .all-link {
  }
`;

export const CallToAction = styled.div`
  margin-top: 2rem;
`;

import styled from "styled-components";
import theme from "theme";

export const SiteDetail = styled.div`
  min-height: 200px;
  margin: 25% 0;

  .site-title {
    font-weight: bold;
    font-size: 60px;
    font-family: "Anton", sans-serif;
  }

  .tagline {
    font-family: Limelight;
  }
  .hello {
    color: ${theme["dark"].primaryColor};
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

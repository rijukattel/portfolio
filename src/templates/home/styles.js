import styled from "styled-components";
import themeVar from "theme";

export const SiteDetail = styled.div`
  min-height: 200px;
  margin: 25% 0;

  .site-title {
    font-weight: bold;
    font-size: 60px;
    font-family: "Anton", sans-serif;
  }

  .description {
    line-height: 1.7;
  }

  .tagline {
    font-family: Limelight;
    font-size: 18px;
  }
  .hello {
    color: ${themeVar["dark"].primaryColor};
  }
`;

export const LatestBlogsContainer = styled.div`
  .title {
    font-size: 40px;
    text-align: initial;
    font-weight: 700;
    margin-bottom: 35px;
    line-height: 1.5;
  }
  .title-container {
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
  }
  .all-link {
    font-size: 24px;
    text-align: initial;
    font-weight: 700;
    margin-bottom: 35px;
    line-height: 1.5;
  }
`;

export const ShortDescription = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Rufina", serif;
  }
  line-height: 1.8;

  margin: 0 1rem;
  .container {
    margin: 25% 0;
    padding: 10px;
  }

  .leftSide {
    width: 80%;
    h2 {
      font-weight: 700;
      margin-bottom: 35px;
      line-height: 1.5;
    }
    .desc {
      font-size: 18px;
    }
  }
  .rightSide {
    text-align: center;
    h1 {
      font-size: 40px;
      text-align: initial;
      font-weight: 700;
      margin-bottom: 35px;
      line-height: 1.5;
    }
    button {
      transform: scale(1.5);
    }
  }
`;

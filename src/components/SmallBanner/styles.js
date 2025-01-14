import styled from "styled-components";

export const SmallBannerStyles = styled.div`
  .container {
    margin: 25% 0;
    line-height: 1.8;

    h1 {
      font-size: 40px;
      text-align: initial;
      font-weight: 700;
      margin-bottom: 35px;
      line-height: 1.5;
    }
  }
  .leftContainer {
    .desc {
      font-size: 18px;
    }
  }
  .rightContainer {
    text-align: right;
    button {
      transform: scale(2);
    }
  }
`;

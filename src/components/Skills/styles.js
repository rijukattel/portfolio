import styled from "styled-components";
import themeVar from "theme";

export const SkillsStyles = styled.div`
  margin: 25% 0;
  text-align: center;
  line-height: 1.8;
  .skill-item-container {
    border: 5px solid ${({ theme }) => themeVar[theme].primaryColor};
    border-radius: 12px;
    background-color: ${({ theme }) => themeVar[theme].secondaryColor};
    .desc {
      text-align: center;
      text-justify: auto;
    }
  }
  .img-container {
    margin: 5rem;
    height: 100px;
  }
  .text-container {
    margin-bottom: 5rem;
    padding: 10px;
  }
  h1 {
    font-size: 40px;
    text-align: initial;
    font-weight: 700;
    margin-bottom: 35px;
    line-height: 1.5;
  }
`;

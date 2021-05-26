/* eslint-disable import/prefer-default-export */
import styled, { css } from "styled-components";
import themeVar from "theme";

export const ButtonStyle = styled.button`
  padding: 10px;
  margin: 1px;
  border-radius: 2px;
  cursor: pointer;
  border: none;
  ${({ type, theme }) =>
    type === "primary"
      ? css`
          background-color: ${themeVar[theme].primaryColor};
          color: white;
          &:hover {
            filter: brightness(120%);
            transform: scale(1.06);
            transition: 0.1s ease-in-out;
          }
        `
      : css`
          background-color: none;
          border: 2px solid ${themeVar[theme].primaryColor};
          background: none;
          color: ${themeVar[theme].textColor};
          &:hover {
            filter: brightness(120%);
            transform: scale(1.06);
            transition: 0.1s ease-in-out;
          }
        `}
`;

/* eslint-disable import/prefer-default-export */
import styled, { css } from "styled-components";
import colors from "theme/colors.json";

export const ButtonStyle = styled.button`
  padding: 10px;
  margin: 1px;
  border-radius: 2px;
  cursor: pointer;
  border: none;
  ${({ type, theme }) =>
    type === "primary"
      ? css`
          background-color: ${colors[theme].primaryColor};
          /* color: ${colors[theme].textColorInv}; */
          color: white;
          &:hover {
            filter: brightness(120%);
            transform: scale(1.06);
            transition: 0.1s ease-in-out;
          }
        `
      : css`
          background-color: none;
          border: 2px solid ${colors[theme].primaryColor};
          background: none;
          color: ${colors[theme].textColor};
          &:hover {
            filter: brightness(120%);
            transform: scale(1.06);
            transition: 0.1s ease-in-out;
          }
        `}
`;

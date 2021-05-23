import styled from "styled-components";
import themeVar from "theme";

export const Wrapper = styled.div`
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  background-color: ${({ theme }) =>
    theme === "light" ? "#d7e1ec" : themeVar["dark"].secondaryColor};
  margin-bottom: 10px;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const Overlay = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  display: none;
  transition: 0.4s;
  ${({ sidebar }) =>
    sidebar &&
    `
			display: block;
			z-index: 4;	
	`};
`;

import styled from "styled-components";
import theme from "theme";

export const ResponsiveCol = styled.div`
  margin: 3px;
  padding: 8px;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  grid-template-rows: 8fr;
  gap: 1rem 1rem;

  @media (max-width: ${theme["breakpoint-lg"]}) {
    grid-template-columns: repeat(${({ lg }) => lg}, 1fr);
  }
  @media (max-width: ${theme["breakpoint-md"]}) {
    grid-template-columns: repeat(${({ md }) => md}, 1fr);
  }

  @media (max-width: ${theme["breakpoint-sm"]}) {
    grid-template-columns: repeat(${({ sm }) => sm}, 1fr);
  }
`;

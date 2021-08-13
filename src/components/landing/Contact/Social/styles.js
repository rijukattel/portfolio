import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 8rem 0;
  h1 {
    text-transform: capitalize;
  }

  .social {
    p {
      font-weight: 600;

      text-transform: uppercase;
    }
    a {
      text-transform: lowercase;
      color: black;
    }
  }

  @media (max-width: 726px) {
    padding: 0 !important;
  }
`;

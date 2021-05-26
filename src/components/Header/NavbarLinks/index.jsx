import { Link } from "gatsby";
import React, { useContext } from "react";
// import AnchorLink from "react-anchor-link-smooth-scroll";
import { ThemeContext } from "../../../providers/ThemeProvider";
import ToggleTheme from "../../Header/ToggleTheme";
import { Wrapper } from "./styles";
import links from "../../../../data/navigationLinks.json";

const NavbarLinks = ({ desktop }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper desktop={desktop} theme={theme}>
      {/* <AnchorLink href="#about">About</AnchorLink>
      <AnchorLink href="#projects">Projects</AnchorLink>
      <AnchorLink href="#contact">Contact</AnchorLink> */}
      {links.headers.map(({ title, link }) => (
        <Link key={`nav-${title}`} to={link}>
          {title}
        </Link>
      ))}
      <ToggleTheme />
    </Wrapper>
  );
};

export default NavbarLinks;

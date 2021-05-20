import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import Hamburger from "./Hamburger";
import Sidebar from "./Sidebar";
import { Wrapper, Overlay } from "./styles";
import { ThemeContext } from "providers/ThemeProvider";

export const Header = () => {
  const { theme } = useContext(ThemeContext);

  const [sidebar, toggle] = useState(false);

  return (
    <Wrapper theme={theme}>
      <Overlay sidebar={sidebar} onClick={() => toggle(!sidebar)} />
      <Navbar />
      <Hamburger sidebar={sidebar} toggle={toggle} />
      <Sidebar sidebar={sidebar} toggle={toggle} />
    </Wrapper>
  );
};

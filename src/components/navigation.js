/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState } from "react"
import { Link } from "gatsby"
import { RiMenu3Line, RiCloseLine } from "react-icons/ri"
import Theme from "../components/theme"

const MenuItems = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/about",
    title: "About",
  },
  {
    path: "/blog",
    title: "Blog",
  },
  {
    path: "/contact",
    title: "Contact",
  },
]

const ListLink = props => (
  <li>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false)

  const handleToggleClick = () => {
    setShowMenu(!showMenu)
  }

  const listMenuItems = MenuItems.map((menuItem, index) => (
    <ListLink key={index} to={menuItem.path}>
      {menuItem.title}
    </ListLink>
  ))

  return (
    <nav className="site-navigation" sx={navStyle.menu}>
      <button
        onClick={handleToggleClick}
        className={"menu-trigger" + (showMenu ? " is-active" : "")}
      >
        <div className="icon-menu-line">
          <RiMenu3Line />
        </div>
        <div className="icon-menu-close">
          <RiCloseLine />
        </div>
      </button>
      <ul>
        {listMenuItems}
        <div sx={navStyle.border}></div>
        <div sx={navStyle.theme}>
          <Theme />
        </div>
      </ul>
    </nav>
  )
}

export default Navigation

const navStyle = {
  menu: {
    ul: {
      bg: "siteColor",
    },
  },
  theme: {
    display: ["block", "block", "block", "none"],
    p: " 25px 20px 20px",
  },
  border: {
    bg: "borderColor",
    borderTop: "1px solid transparent",
    display: ["block", "block", "block", "none"],
  },
}

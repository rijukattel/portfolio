import React from "react";
import config from "../../../data/SiteConfig";

const Logo = () => {
  if (config.siteLogo) {
    return (
      <div>
        <img src={config.siteLogo} alt={config.siteTitle} />
      </div>
    );
  }
  return <h6>{config.siteTitle}</h6>;
};

export default Logo;

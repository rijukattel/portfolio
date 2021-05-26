import React from "react";
import { Container } from "components/common";
import { Wrapper, Flex, Links, Details } from "./styles";
import {
  siteTitle,
  socialLinks,
  copyright,
  siteLogo,
} from "../../../data/SiteConfig";

export const Footer = () => (
  <Wrapper>
    <Flex as={Container}>
      <Details>
        <img src={siteLogo} alt={siteTitle} />
        {/* <h2>{siteTitle}</h2> */}
        <p>{copyright}</p>
      </Details>
      <Links>
        {socialLinks.map(({ id, name, link, icon }) => (
          <a
            key={id}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`follow me on ${name}`}
          >
            <img width="24" src={icon} alt={name} />
          </a>
        ))}
      </Links>
    </Flex>
  </Wrapper>
);

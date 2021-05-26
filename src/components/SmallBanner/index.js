import Col from "components/Col";
import { Button } from "components/common";
import { Link } from "gatsby";
import React from "react";
import { SmallBannerStyles } from "./styles";

const SmallBanner = ({ items }) => {
  return (
    <SmallBannerStyles>
      <Col lg={2} md={2} className="container" columns={2}>
        <div className="leftContainer">
          <h1>{items.bannerOneTitle}</h1>
          {items.bannerOneDesc && (
            <div
              className="desc"
              dangerouslySetInnerHTML={{ __html: items.bannerOneDesc }}
            />
          )}
        </div>
        <div className="rightContainer">
          <Link to={items.bannerOneCta.bannerOneCtaLink}>
            <Button type="primary">
              {items.bannerOneCta.bannerOneCtaTitle}
            </Button>
          </Link>
        </div>
      </Col>
    </SmallBannerStyles>
  );
};

export default SmallBanner;

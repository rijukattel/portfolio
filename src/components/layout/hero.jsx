import React from 'react';
import styled from 'styled-components';
import { HeroSubtitle, HeroTitle, HeroAlt } from './headingStyles';
import { Divider } from './sectionStyles';

const HeroWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${({ fullView }) => fullView && '100vh'};
  padding: var(--globalPaddingTb) var(--globalPaddingLr);
  flex-direction: column;
  position: relative;
`;

const HeroContainer = styled.div`
  width: var(--globalContainer);
  display: grid;
  row-gap: var(--gapXL);
  justify-content: ${({ centered }) => centered && 'center'};

  @media screen and (max-width: 1170px) {
    width: 100%;
  }
`;

const HeroTextBox = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: var(--gapRegular);
  justify-items: ${({ centered }) => centered && 'center'};
  margin-top: 7rem;
  margin-bottom: 7rem;
  grid-area: textbox;
  width: 40%;
  float: left;
  @media screen and (max-width: 767px) {
    width: 100%;
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
`;

const ImageWrapper = styled.div`
  /* padding: 10px; */
  width: 50%;
  float: right;
  img {
    width: 100%;
    height: auto;
  }
  @media screen and (max-width: 767px) {
    width: 100%;

    /* img {
      width: 90%;
      height: auto;
      text-align: center;
    } */
  }
`;

const Hero = ({
  fullView,
  centered,
  alt,
  title,
  subtitle,
  button,
  sectionChildren,
  hasDivider,
  siderImage,
}) => (
  <HeroWrapper fullView={fullView}>
    <HeroContainer centered={centered}>
      <div>
        <HeroTextBox className="textbox" centered={centered}>
          {alt && <HeroAlt>{alt}</HeroAlt>}
          <HeroTitle centered={centered}>{title}</HeroTitle>
          <HeroSubtitle centered={centered}>
            <div dangerouslySetInnerHTML={{ __html: subtitle }} />
          </HeroSubtitle>
          {button}
        </HeroTextBox>
        <ImageWrapper>
          <div className="img-wrapper">
            <img src={siderImage.url} alt={siderImage.alt} />
          </div>
        </ImageWrapper>
      </div>
      {sectionChildren}
    </HeroContainer>
    {hasDivider && <Divider bottom />}
  </HeroWrapper>
);

export default Hero;

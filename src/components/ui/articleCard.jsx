import React from 'react';
import styled from 'styled-components';
import { GatsbyImage, getImage, withArtDirection } from 'gatsby-plugin-image';
import Navigator from '../langHelpers/navigator';
import { HeadingSmall } from '../layout/headingStyles';

// Scoped styles

const CardLink = styled(Navigator)`
  width: 280px;
  row-gap: var(--gapSmall);
  display: grid;
  height: min-content;
  justify-content: start;

  @media screen and (max-width: 950px) {
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: var(--gapRegular);
    align-items: initial;
  }
`;

const CardImg = styled(GatsbyImage)`
  border-radius: var(--defaultRadius);
  z-index: 2;

  @media screen and (max-width: 950px) {
    min-width: 50px;
    min-height: 50px;
  }

  & picture {
    & img {
      border-radius: var(--defaultRadius);
      // Gatsby Image override
      @media screen and (max-width: 950px) {
        height: unset !important;
      }
    }
  }
`;

export const CardImgArtDir = (cardImg, cardImgMobile, altImg) => {
  const cardImgs = withArtDirection(getImage(cardImg), [
    {
      media: '(max-width: 950px)',
      image: getImage(cardImgMobile),
    },
  ]);
  return <CardImg objectFit="contain" image={cardImgs} alt={altImg || ''} />;
};

const ContentWrapper = styled.div`
  row-gap: var(--gapSmall);
  display: grid;

  @media screen and (max-width: 950px) {
    row-gap: calc(var(--gapSmall) / 2);
    grid-column: 2 / span 2;
  }
`;

export const DateTimeContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  width: max-content;
  column-gap: var(--gapSmall);

  @media screen and (max-width: 950px) {
    grid-row: 3;
  }
`;

const PostTitle = styled(HeadingSmall)`
  &&& {
    line-height: 1.1;
  }
  margin: calc(var(--gapSmall) - 0.66em) 0;

  @media screen and (max-width: 950px) {
    margin: unset;
  }

  @media screen and (max-width: 768px) {
    font-size: var(--baseMMobile);
  }
`;

const Date = styled.time`
  color: var(--baseTextColor);
  font-size: var(--baseS);

  font-weight: ${({ normalColor }) => (normalColor ? 400 : 600)};
  text-transform: capitalize;
  @media screen and (max-width: 768px) {
    font-size: var(--baseSMobile);
  }
`;

export const Dot = styled.span`
  --widthHeight: 0.33em;
  width: var(--widthHeight);
  height: var(--widthHeight);
  background: var(--baseTextColor);
  border-radius: 0.33em;

  @media screen and (min-width: 621px) and (max-width: 680px) {
    display: none;
  }
`;

const Time = styled(Date)`
  /* color: var(--baseTextColorDark); */
  &&& {
    ${({ containerProps }) =>
      containerProps.projectDone
        ? {
            textTransform: 'capitalize',
            // fontWeight: 600,
          }
        : { textTransform: 'lowerCase', fontWeight: 200 }}
  }

  @media screen and (min-width: 621px) and (max-width: 680px) {
    display: none;
  }
`;

const Excerpt = styled.p`
  color: var(--baseTextColor);
  font-size: var(--baseM);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  /* text-overflow: ellipsis; */
  position: relative;
  height: 2.6em; /* exactly three lines */
  &&:after {
    content: '';
    text-align: right;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 25%;
    height: 1.2em;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1) 50%
    );
  }
`;

const ArticleCard = ({
  slug,
  cardImg,
  category,
  time,
  title,
  excerpt,
  authorImg,
  authorAltImg,
  authorName,
  ...props
}) => {
  return (
    <article>
      <CardLink {...props} to={slug}>
        {cardImg}
        <ContentWrapper>
          <DateTimeContainer>
            <Date>{category}</Date>
            <Dot />
            <Time containerProps={props} as="span">
              {time}
            </Time>
          </DateTimeContainer>
          <PostTitle>{title}</PostTitle>
          <Excerpt>{excerpt}</Excerpt>
        </ContentWrapper>
      </CardLink>
    </article>
  );
};
export default ArticleCard;

import React from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import { useLocation } from '@reach/router';
import useSiteUrl from '../../hooks/useSiteUrl';
import { Dot } from './articleCard';
import { ArticleTitle, ArticleSubtitle } from '../layout/headingStyles';
import BackButtonIcon from '../vectors/backButton';
import Navigator from '../langHelpers/navigator';
import * as Social from '../vectors/socialIcons';
import OuterLinkButton from '../outerLinkButton';

// Scoped styles

const BackButtonWrapper = styled(Navigator)`
  margin-bottom: var(--gapSmall);

  &:hover svg g path {
    fill: var(--primaryColor);
  }

  & svg g path {
    transition: 0.2s fill linear;
  }
`;

const Header = styled.header`
  display: grid;
  width: 800px;
  grid-auto-flow: row;
  row-gap: var(--gapSmall);
  justify-items: center;

  @media screen and (max-width: 860px) {
    justify-items: left;
    width: 100%;
  }
`;

const AuthorDateContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  column-gap: var(--gapSmall);
  align-items: center;
  width: max-content;
`;

const Author = styled.address`
  font-size: var(--baseM);

  @media screen and (max-width: 768px) {
    font-size: var(--baseMMobile);
  }
`;

const ImgFullWrapper = styled.div`
  --authorImgSize: 60px;
  --sharingIconSize: 35px;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: var(--gapRegular);
  margin: var(--gapRegular) 0 calc(var(--gapRegular) * 2)
    calc(var(--sharingIconSize) + var(--gapRegular));
  align-items: center;

  @media screen and (max-width: 860px) {
    width: 100%;
    align-items: left;
    margin: var(--gapRegular) 0 calc(var(--gapRegular) * 2) 0;
    grid-template-columns: 1fr;
  }
`;

const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;

  @media screen and (max-width: 860px) {
    align-items: flex-start;
  }
`;

const AuthorImg = styled(GatsbyImage)`
  height: var(--authorImgSize);
  width: var(--authorImgSize);
  border-radius: var(--authorImgSize);
  border: 4px solid white;
  z-index: 1;
  position: relative;
`;

const ArticleCover = styled(GatsbyImage)`
  height: 350px;
  border-radius: calc(var(--defaultRadius) * 2);
  width: 700px;
  margin: calc(var(--authorImgSize) / 2 * -1) 0 0 0;

  & img {
    border-radius: calc(var(--defaultRadius) * 2);
  }

  @media screen and (max-width: 860px) {
    width: calc(100% + calc(var(--globalPaddingLr) * 2));
    height: 300px;
    margin: calc(var(--authorImgSize) / 2 * -1) 0 0
      calc(var(--globalPaddingLr) * -1);
    border-radius: 0;
    & img {
      border-radius: 0;
    }
  }

  @media screen and (max-width: 768px) {
    height: 250px;
  }
`;

export const BodyImg = styled(ArticleCover)`
  &&& {
    margin: 0 0 var(--paragraphBottomMargin) 0;

    @media screen and (max-width: 860px) {
      margin: 0 0 var(--paragraphBottomMargin) calc(var(--globalPaddingLr) * -1);
    }
  }
`;

const SharingIcons = styled.aside`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  row-gap: var(--gapRegular);
  height: min-content;
  margin-top: calc(var(--authorImgSize) / 2);

  @media screen and (max-width: 860px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    width: min-content;
    column-gap: var(--gapRegular);
  }
`;

const Icon = styled.a`
  height: var(--sharingIconSize);
  width: var(--sharingIconSize);
  border-radius: var(--sharingIconSize);
  background: var(--baseTextColor);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s background linear;

  &:hover {
    background: var(--primaryColor);
  }
`;

const ProjectOnlyWrapper = styled.div`
  /* width: 50%; */
  text-align: center;
`;

const BlogWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const Tags = styled.div`
  box-sizing: border-box;
  margin: 0 8px 0 0;
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  display: inline-block;
  height: auto;
  padding: 0 7px;
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
  background: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  opacity: 1;
  transition: all 0.3s;
  color: var(--primaryColor);
  background: #f0f5ff;
  border-color: #adc6ff;
  text-transform: capitalize;
`;

const BlogCategoryWrapper = styled.div`
  color: var(--primaryColor);
  text-transform: capitalize;
  h3,
  p,
  h1,
  h2,
  h4 {
    font-weight: 400;
    font-family: 'Source Code Pro';
  }
`;

// Main Component

const ArticleHeader = ({
  authorName,
  date,
  title,
  subtitle,
  authorImg,
  coverImg,
  authorImgAlt,
  coverImgAlt,
  codeUrl,
  codeUrlButtonText,
  previewUrlButtonText,
  previewUrl,
  platform,
  programmingLanguage,
  librariesUsed,
  tags,
  category,
  ...props
}) => {
  const { siteUrl } = useSiteUrl();

  const { pathname } = useLocation();

  const projectOnlyContent = props.projects && (
    <ProjectOnlyWrapper>
      <div>
        {JSON.parse(librariesUsed)?.map((lib) => (
          <Tags key={lib}>{lib} </Tags>
        ))}
      </div>
    </ProjectOnlyWrapper>
  );

  const blogOnlyContent = props.archive && (
    <BlogWrapper>
      <div>
        {JSON?.parse(tags)?.map((tag) => (
          <Tags key={tag}>{tag} </Tags>
        ))}
      </div>
    </BlogWrapper>
  );

  return (
    <>
      <Header>
        <BackButtonWrapper {...props}>
          <BackButtonIcon />
        </BackButtonWrapper>
        <AuthorDateContainer>
          <Author>{authorName}</Author>
          <Dot />
          <Author as="time">{date}</Author>
        </AuthorDateContainer>
        <BlogCategoryWrapper>
          <h2>{category}</h2>
          {programmingLanguage && (
            <AuthorDateContainer>
              <div>
                <p>
                  {'<'}
                  {programmingLanguage}
                  {'/>'}
                </p>
              </div>
              <Dot />
              <div>
                <p>{platform}</p>
              </div>
            </AuthorDateContainer>
          )}
        </BlogCategoryWrapper>
        <ArticleTitle>{title}</ArticleTitle>
        <ArticleSubtitle>{subtitle}</ArticleSubtitle>
        <div style={{ display: 'flex' }}>
          <OuterLinkButton to={codeUrl}>{codeUrlButtonText}</OuterLinkButton>
          <OuterLinkButton primary to={previewUrl}>
            {previewUrlButtonText}
          </OuterLinkButton>
        </div>
        {projectOnlyContent}
        {blogOnlyContent}
      </Header>
      <ImgFullWrapper>
        <ImgWrapper>
          <AuthorImg image={authorImg} alt={authorImgAlt} />
          <ArticleCover image={coverImg} alt={coverImgAlt} />
        </ImgWrapper>
        <SharingIcons>
          <Icon
            rel="noreferrer"
            target="_blank"
            href={`https://www.facebook.com/sharer/sharer.php?u=${siteUrl}${pathname}`}
          >
            <Social.FacebookIcon />
          </Icon>
          <Icon
            rel="noreferrer"
            target="_blank"
            href={`https://twitter.com/share?url=${siteUrl}${pathname}`}
          >
            <Social.TwitterIcon />
          </Icon>
          <Icon
            rel="noreferrer"
            target="_blank"
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${siteUrl}${pathname}`}
          >
            <Social.LinkedinIcon />
          </Icon>
        </SharingIcons>
      </ImgFullWrapper>
    </>
  );
};

export default ArticleHeader;

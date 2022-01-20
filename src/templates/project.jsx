import React from 'react';
import { graphql } from 'gatsby';
import { StructuredText } from 'react-datocms';
import { isCode } from 'datocms-structured-text-utils';
import { renderRule } from 'datocms-structured-text-to-plain-text';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import PageWrapper from '../components/layout/pageWrapper';
import ArticleHeader, { BodyImg } from '../components/ui/articleHeader';
import {
  ArticleBody,
  LanguageContainer,
} from '../components/layout/paragraphStyles';
import PrevNextNav from '../components/ui/articlePrevNext';
import { SectionWrapper } from '../components/layout/sectionStyles';
import Navigator from '../components/langHelpers/navigator';

const SingleProjectTemplate = ({
  data: {
    datoCmsProjectsDone: {
      id,
      structuredBody,
      linkToTheCode,
      previewUrl,
      linkToTheCodeText,
      livePreviewText,
      seo: {
        seoTitle,
        seoDescription,
        seoImage: { seoImageUrl },
      },
      title,
      subtitle,
      author: {
        authorName,
        picture: { authorPictureData, authorPictureAlt },
      },
      coverImage: { coverImageData, coverImageAlt },
      meta: { firstPublishedAt },
    },
    previous: {
      nodes: [{ prevPostSlug, prevPostTitle }],
    },
    next: {
      nodes: [{ nextPostSlug, nextPostTitle }],
    },
    datoCmsWebsiteSetting: { prevHeading, nextHeading },
  },
  pageContext,
}) => {
  const { skipNext } = pageContext;

  return (
    <PageWrapper
      pageData={pageContext}
      seoTitle={seoTitle}
      seoDescription={seoDescription}
      seoImage={seoImageUrl}
    >
      <SectionWrapper as="project" isProject>
        <ArticleHeader
          title={title}
          subtitle={subtitle}
          authorName={authorName}
          coverImg={coverImageData}
          coverImgAlt={coverImageAlt}
          authorImg={authorPictureData}
          authorImgAlt={authorPictureAlt}
          date={firstPublishedAt}
          codeUrl={linkToTheCode}
          previewUrl={previewUrl}
          codeUrlButtonText={linkToTheCodeText}
          previewUrlButtonText={livePreviewText}
          projects
        />
        <ArticleBody>
          {structuredBody?.value && (
            <StructuredText
              key={id}
              data={structuredBody}
              customRules={[
                renderRule(isCode, ({ node: { language, code }, key }) => (
                  <div style={{ position: 'relative' }} key={key}>
                    <LanguageContainer>{language}</LanguageContainer>
                    <SyntaxHighlighter language={language} style={atomDark}>
                      {code}
                    </SyntaxHighlighter>
                  </div>
                )),
              ]}
              renderLinkToRecord={({
                record: { typeName, slug: recordSlug },
                children,
                transformedMeta,
              }) => {
                switch (typeName) {
                  case 'page':
                    return (
                      <Navigator {...transformedMeta} page to={recordSlug}>
                        {children}
                      </Navigator>
                    );
                  case 'article':
                    return (
                      <Navigator {...transformedMeta} article to={recordSlug}>
                        {children}
                      </Navigator>
                    );
                  case 'archive':
                    return (
                      <Navigator {...transformedMeta} archive>
                        {children}
                      </Navigator>
                    );
                  case 'home':
                    return (
                      <Navigator {...transformedMeta} home>
                        {children}
                      </Navigator>
                    );
                  case 'project_done':
                    return (
                      <Navigator
                        to={recordSlug}
                        {...transformedMeta}
                        projectDone
                      >
                        {children}
                      </Navigator>
                    );
                  case 'projects':
                    return (
                      <Navigator archive {...transformedMeta} projects>
                        {children}
                      </Navigator>
                    );

                  default:
                    return null;
                }
              }}
              renderBlock={({
                record: {
                  typeName,
                  image: {
                    gatsbyImageData: recordImageData,
                    alt: recordImageAlt,
                  },
                },
              }) => {
                switch (typeName) {
                  case 'image':
                    return (
                      <BodyImg image={recordImageData} alt={recordImageAlt} />
                    );
                  default:
                    return null;
                }
              }}
            />
          )}
        </ArticleBody>
        <PrevNextNav
          projectDone
          skipNextValue={skipNext}
          prevHeading={prevHeading}
          prevSlug={prevPostSlug}
          prevPostTitle={prevPostTitle}
          nextHeading={nextHeading}
          nextSlug={nextPostSlug}
          nextPostTitle={nextPostTitle}
        />
      </SectionWrapper>
    </PageWrapper>
  );
};

export default SingleProjectTemplate;

// Main query

export const projectQuery = graphql`
  query SingleProjectTemplateQuery(
    $id: String!
    $locale: String!
    $skipNext: Int!
    $skipPrevious: Int!
  ) {
    next: allDatoCmsProjectsDone(
      filter: { locale: { eq: $locale } }
      sort: { fields: meta___firstPublishedAt }
      limit: 1
      skip: $skipNext
    ) {
      nodes {
        nextPostSlug: slug
        nextPostTitle: title
      }
    }
    previous: allDatoCmsProjectsDone(
      filter: { locale: { eq: $locale } }
      sort: { fields: meta___firstPublishedAt }
      skip: $skipPrevious
      limit: 1
    ) {
      nodes {
        prevPostSlug: slug
        prevPostTitle: title
      }
    }
    datoCmsWebsiteSetting(locale: { eq: $locale }) {
      prevHeading: previous
      nextHeading: next
    }
    datoCmsProjectsDone(originalId: { eq: $id }, locale: { eq: $locale }) {
      originalId
      locale
      title
      linkToTheCode
      linkToTheCodeText
      livePreviewText
      previewUrl
      seo {
        seoTitle: title
        seoDescription: description
        seoImage: image {
          seoImageUrl: url
        }
      }
      subtitle
      coverImage {
        coverImageData: gatsbyImageData
        coverImageAlt: alt
      }
      author {
        authorName: name
        picture {
          authorPictureData: gatsbyImageData(height: 60, width: 60)
          authorPictureAlt: alt
        }
      }
      meta {
        firstPublishedAt(locale: $locale, formatString: "DD MMM YYYY")
      }

      structuredBody {
        blocks {
          typeName
          id: originalId
          image {
            gatsbyImageData
            alt
          }
        }
        links {
          ... on DatoCmsProjectsDone {
            typeName
            slug
            id: originalId
          }
          ... on DatoCmsOtherPage {
            typeName
            slug
            id: originalId
          }
          ... on DatoCmsHomepage {
            typeName
            id: originalId
          }
          ... on DatoCmsArchivePage {
            typeName
            id: originalId
          }
        }
        value
      }
    }
  }
`;

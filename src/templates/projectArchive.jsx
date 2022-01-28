import React from 'react';
import { graphql } from 'gatsby';
import PageWrapper from '../components/layout/pageWrapper';
import Hero from '../components/layout/hero';
import useLanguages from '../hooks/useLanguages';
import {
  SectionContainerGridThreeCols,
  SectionWrapper,
} from '../components/layout/sectionStyles';
import ArticleCard, { CardImgArtDir } from '../components/ui/articleCard';
import {
  ArchiveNav,
  ArchiveList,
  ArchiveListLink,
} from '../components/ui/archivePagination';

const ProjectArchiveTemplate = ({
  data: {
    datoCmsProjectArchive: {
      hero: [{ heroTitle, heroSubtitle, heroAlt }],
      seo: { seoTitle, seoDescription },
      siderImage,
    },
    allDatoCmsProjectsDone: { projectsDoneNodes },
    datoCmsWebsiteSetting: { minsReadSuffix },
  },
  pageContext,
}) => {
  const { defaultLanguage, projectPath } = useLanguages();
  const { projectPagesNumber, projectArchivePageNumber, locale } = pageContext;

  return (
    <PageWrapper
      pageData={pageContext}
      seoTitle={seoTitle}
      seoDescription={seoDescription}
    >
      <Hero
        alt={heroAlt}
        title={heroTitle}
        subtitle={heroSubtitle}
        siderImage={siderImage[0]}
      />
      <SectionWrapper isProjectDone>
        <SectionContainerGridThreeCols>
          {projectsDoneNodes.map(
            ({
              id,
              cardImage,
              title,
              subtitle,
              author,
              slug,
              platform,
              programmingLanguage,
            }) => (
              <ArticleCard
                projectDone
                key={id}
                category={programmingLanguage}
                time={platform}
                cardImg={
                  cardImage &&
                  CardImgArtDir(
                    cardImage.gatsbyImageData,
                    cardImage.squaredImage,
                    cardImage.alt
                  )
                }
                title={title}
                excerpt={subtitle}
                authorImg={author?.picture.gatsbyImageData}
                authorAltImg={author?.picture.alt}
                authorName={author?.name}
                slug={slug}
              />
            )
          )}
        </SectionContainerGridThreeCols>
        <ArchiveNav>
          <ArchiveList>
            {Array.from({ length: projectPagesNumber }, (_, index) => (
              <li key={`page_number${index + 1}`}>
                <ArchiveListLink
                  as={index === projectArchivePageNumber - 1 ? 'span' : ''}
                  to={
                    locale === defaultLanguage &&
                    index !== projectArchivePageNumber - 1
                      ? `/${projectPath}/${index === 0 ? '' : index + 1}`
                      : locale !== defaultLanguage &&
                        index !== projectArchivePageNumber - 1
                      ? `/${locale}/${projectPath}/${
                          index === 0 ? '' : index + 1
                        }`
                      : '/'
                  }
                >
                  {index + 1}
                </ArchiveListLink>
              </li>
            ))}
          </ArchiveList>
        </ArchiveNav>
      </SectionWrapper>
    </PageWrapper>
  );
};

export default ProjectArchiveTemplate;

// Main query

export const projectArchiveQuery = graphql`
  query ProjectArchiveQuery($locale: String!, $skip: Int!, $limit: Int!) {
    datoCmsProjectArchive(locale: { eq: $locale }) {
      locale
      seo {
        seoTitle: title
        seoDescription: description
      }

      hero {
        heroTitle
        heroSubtitle
        heroAlt
      }
      siderImage {
        alt
        url
      }
    }
    allDatoCmsProjectsDone(
      sort: { order: DESC, fields: meta___firstPublishedAt }
      filter: { locale: { eq: $locale } }
      limit: $limit
      skip: $skip
    ) {
      projectsDoneNodes: nodes {
        id: originalId
        meta {
          firstPublishedAt(locale: $locale, formatString: "DD MMM YYYY")
        }
        minutesOfReading
        platform
        programmingLanguage
        cardImage {
          gatsbyImageData(
            width: 280
            height: 100
            placeholder: NONE
            forceBlurhash: false
          )
          squaredImage: gatsbyImageData(
            width: 100
            height: 100
            imgixParams: { ar: "1", fit: "crop" }
          )
          alt
        }
        author {
          name
          picture {
            gatsbyImageData(height: 30, width: 30)
            alt
          }
        }

        subtitle
        title
        slug
        reference
      }
    }

    datoCmsWebsiteSetting(locale: { eq: $locale }) {
      minsReadSuffix
    }
  }
`;

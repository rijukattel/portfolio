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
import ProjectFilters from '../components/ui/ProjectFilters';
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

  // --- Filtering, Sorting, and Badges Logic ---
  const [filters, setFilters] = React.useState({
    language: '',
    platform: '',
    year: '',
  });
  const [sortValue, setSortValue] = React.useState('newest');

  // Compute unique filter options
  const languages = Array.from(
    new Set(projectsDoneNodes.map((p) => p.programmingLanguage).filter(Boolean))
  );
  const platforms = Array.from(
    new Set(projectsDoneNodes.map((p) => p.platform).filter(Boolean))
  );
  const years = Array.from(
    new Set(
      projectsDoneNodes
        .map((p) =>
          p.meta?.firstPublishedAt
            ? new Date(p.meta.firstPublishedAt).getFullYear()
            : null
        )
        .filter(Boolean)
    )
  ).sort((a, b) => b - a);

  // Filtering
  let filtered = projectsDoneNodes.filter((p) => {
    const matchLang =
      !filters.language || p.programmingLanguage === filters.language;
    const matchPlat = !filters.platform || p.platform === filters.platform;
    const matchYear =
      !filters.year ||
      (p.meta?.firstPublishedAt &&
        new Date(p.meta.firstPublishedAt).getFullYear().toString() ===
          filters.year);
    return matchLang && matchPlat && matchYear;
  });
  // Sorting
  filtered = filtered.sort((a, b) => {
    if (sortValue === 'newest') {
      return (
        new Date(b.meta?.firstPublishedAt) - new Date(a.meta?.firstPublishedAt)
      );
    } else if (sortValue === 'oldest') {
      return (
        new Date(a.meta?.firstPublishedAt) - new Date(b.meta?.firstPublishedAt)
      );
    } else if (sortValue === 'az') {
      return a.title.localeCompare(b.title);
    } else if (sortValue === 'za') {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });
  // Handlers
  const handleFilterChange = (key, value) =>
    setFilters((f) => ({ ...f, [key]: value }));
  const handleSortChange = (value) => setSortValue(value);

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
        <ProjectFilters
          languages={languages}
          platforms={platforms}
          years={years.map(String)}
          filters={filters}
          sortValue={sortValue}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
        <SectionContainerGridThreeCols>
          {filtered.map(
            ({
              id,
              cardImage,
              title,
              subtitle,
              author,
              slug,
              platform,
              programmingLanguage,
              meta,
              librariesUsed,
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
                // --- BADGES ---
                badges={[
                  ...(programmingLanguage ? [programmingLanguage] : []),
                  ...(platform ? [platform] : []),
                  ...(meta?.firstPublishedAt
                    ? [new Date(meta.firstPublishedAt).getFullYear()]
                    : []),
                  ...(librariesUsed
                    ? librariesUsed.split(',').map((lib) => lib.trim())
                    : []),
                ]}
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

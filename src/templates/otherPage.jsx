import React, { createRef, useRef, useState } from 'react';
import { graphql } from 'gatsby';
import { StructuredText } from 'react-datocms';
import Navigator from '../components/langHelpers/navigator';
import PageWrapper from '../components/layout/pageWrapper';
import Hero from '../components/layout/hero';
import {
  SectionContainerGridThreeCols,
  SectionContainerFlexTwoCols,
  SectionWrapper,
  SectionContainerFlexTwoColsReverse,
  ColumnFlexTwoCols,
  TextBox,
} from '../components/layout/sectionStyles';
import {
  HeadingMedium,
  HeadingSmall,
} from '../components/layout/headingStyles';
import { Paragraph } from '../components/layout/paragraphStyles';
import axios from 'axios';

const OtherPageTemplate = ({
  data: {
    datoCmsOtherPage: {
      seo: {
        seoTitle,
        seoDescription,
        image: { seoImageUrl },
      },
      structuredBody,
      siderImage,
      codeSnippet,
    },
  },
  pageContext,
  ...props
}) => {
  const [formData, setFormData] = useState({});
  console.log('codeSnippet', { codeSnippet, pageContext, props });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log('formData', formData);

  const contactPageForm = () => {
    function encode(data) {
      return Object.keys(data)
        .map(
          (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&');
    }
    const axiosOptions = {
      url: props.location.pathname,
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: encode(formData),
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      axios(axiosOptions)
        .then((res) => console.log('first', res))
        .catch((error) => alert(error));
    };

    if (pageContext.slug === 'contact') {
      return (
        <SectionWrapper>
          <form
            name="contact"
            method="POST"
            netlify-honeypot="bot-field"
            netlify
            data-netlify="true"
          >
            <p class="hidden">
              <label>
                Don’t fill this out if you’re human: <input name="bot-field" />
              </label>
            </p>
            <p>
              <label>
                Email: <input type="text" name="email" />
              </label>
            </p>
            <p>
              <label>
                Message: <textarea name="message"></textarea>
              </label>
            </p>
            <p>
              <button className="classicButton classicPrimary" type="submit">
                Send
              </button>
            </p>
          </form>
        </SectionWrapper>
      );
    }
    return '';
  };

  return (
    <PageWrapper
      pageData={pageContext}
      seoTitle={seoTitle}
      seoDescription={seoDescription}
      seoImage={seoImageUrl}
    >
      {structuredBody?.value && (
        <StructuredText
          data={structuredBody}
          renderBlock={({
            record: {
              typeName,
              heroAlt,
              heroTitle,
              heroSubtitle,
              image,
              title,
              text,
              slug,
              firstFeatureTitle,
              firstFeatureDescription,
              secondFeatureTitle,
              secondFeatureDescription,
              thirdFeatureTitle,
              thirdFeatureDescription,
              ...props
            },
          }) => {
            switch (typeName) {
              case 'hero':
                return (
                  <Hero
                    alt={heroAlt}
                    title={heroTitle}
                    subtitle={heroSubtitle}
                    siderImage={siderImage[0]}
                  />
                );
              case 'section image left':
                return (
                  <SectionWrapper>
                    <SectionContainerFlexTwoCols>
                      <ColumnFlexTwoCols hasImg>
                        <img src={image.url} alt={image.alt} />
                      </ColumnFlexTwoCols>
                      <ColumnFlexTwoCols>
                        <TextBox as="div">
                          <HeadingMedium>{title}</HeadingMedium>
                          <Paragraph as="div">
                            <StructuredText
                              data={text}
                              renderLinkToRecord={({
                                children,
                                transformedMeta,
                              }) => {
                                switch (typeName) {
                                  case 'page':
                                    return (
                                      <Navigator
                                        {...transformedMeta}
                                        page
                                        to={slug}
                                      >
                                        {children}
                                      </Navigator>
                                    );
                                  case 'home':
                                    return (
                                      <Navigator {...transformedMeta} home>
                                        {children}
                                      </Navigator>
                                    );

                                  default:
                                    return null;
                                }
                              }}
                            />
                          </Paragraph>
                        </TextBox>
                      </ColumnFlexTwoCols>
                    </SectionContainerFlexTwoCols>
                  </SectionWrapper>
                );
              case 'section image right':
                return (
                  <SectionWrapper>
                    <SectionContainerFlexTwoColsReverse>
                      <ColumnFlexTwoCols>
                        <TextBox as="div">
                          <HeadingMedium>{title}</HeadingMedium>
                          <Paragraph as="div">
                            <StructuredText
                              data={text}
                              renderLinkToRecord={({
                                children,
                                transformedMeta,
                              }) => {
                                switch (typeName) {
                                  case 'page':
                                    return (
                                      <Navigator
                                        {...transformedMeta}
                                        page
                                        to={slug}
                                      >
                                        {children}
                                      </Navigator>
                                    );
                                  case 'home':
                                    return (
                                      <Navigator {...transformedMeta} home>
                                        {children}
                                      </Navigator>
                                    );

                                  default:
                                    return null;
                                }
                              }}
                            />
                          </Paragraph>
                        </TextBox>
                      </ColumnFlexTwoCols>
                      <ColumnFlexTwoCols hasImg>
                        <img src={image.url} alt={image.alt} />
                      </ColumnFlexTwoCols>
                    </SectionContainerFlexTwoColsReverse>
                  </SectionWrapper>
                );
              case 'three features set':
                return (
                  <SectionWrapper>
                    <SectionContainerGridThreeCols>
                      <TextBox small>
                        <HeadingSmall hasTip>{firstFeatureTitle}</HeadingSmall>
                        <Paragraph>{firstFeatureDescription}</Paragraph>
                      </TextBox>
                      <TextBox small>
                        <HeadingSmall hasTip>{secondFeatureTitle}</HeadingSmall>
                        <Paragraph>{secondFeatureDescription}</Paragraph>
                      </TextBox>
                      <TextBox small>
                        <HeadingSmall hasTip>{thirdFeatureTitle}</HeadingSmall>
                        <Paragraph>{thirdFeatureDescription}</Paragraph>
                      </TextBox>
                    </SectionContainerGridThreeCols>
                  </SectionWrapper>
                );
              default:
                return null;
            }
          }}
        />
      )}
      {contactPageForm()}

      <SectionWrapper>
        <SectionContainerFlexTwoCols>
          <ColumnFlexTwoCols hasImg>
            <div dangerouslySetInnerHTML={{ __html: codeSnippet }} />
          </ColumnFlexTwoCols>
        </SectionContainerFlexTwoCols>
      </SectionWrapper>
    </PageWrapper>
  );
};
export default OtherPageTemplate;

export const query = graphql`
  query OtherPageQuery($locale: String!, $id: String!) {
    datoCmsOtherPage(locale: { eq: $locale }, originalId: { eq: $id }) {
      seo {
        seoTitle: title
        seoDescription: description
        image {
          seoImageUrl: url
        }
      }
      siderImage {
        alt
        title
        url
      }
      codeSnippet
      structuredBody {
        value
        blocks {
          ... on DatoCmsHero {
            id: originalId
            typeName
            heroTitle
            heroSubtitle
            heroAlt
          }
          ... on DatoCmsSectionImageLeft {
            id: originalId
            title
            typeName
            image {
              url
              gatsbyImageData
              alt
            }
            text {
              value
              links {
                ... on DatoCmsOtherPage {
                  id: originalId
                  typeName
                  slug
                }
                ... on DatoCmsHomepage {
                  id: originalId
                  typeName
                }
              }
            }
          }
          ... on DatoCmsSectionImageRight {
            id: originalId
            title
            typeName
            image {
              url
              gatsbyImageData
              alt
            }
            text {
              value
              links {
                ... on DatoCmsOtherPage {
                  id: originalId
                  typeName
                  slug
                }
                ... on DatoCmsHomepage {
                  id: originalId
                  typeName
                }
              }
            }
          }
          ... on DatoCmsThreeFeaturesSet {
            id: originalId
            typeName
            firstFeatureTitle
            firstFeatureDescription
            secondFeatureTitle
            secondFeatureDescription
            thirdFeatureTitle
            thirdFeatureDescription
          }
        }
      }
    }
  }
`;

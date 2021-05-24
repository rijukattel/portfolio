import { Button, Layout } from "components/common";
import React, { useContext } from "react";
import LatestBlogs from "./components/latest-blogs";
import { graphql, Link } from "gatsby";
import Col from "components/Col";
import { ShortDescription, SiteDetail } from "./styles";
import Skills from "components/Skills";
import SmallBanner from "components/SmallBanner";

const Home = ({ data }) => {
  const { posts, markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const { skills, shortDescription1, bannerOne } = frontmatter;

  const postEdges = posts.edges;

  const Image = frontmatter.featuredImage;
  console.log(`data`, data);

  return (
    <Layout title={frontmatter.title}>
      <SiteDetail image={Image}>
        <Col columns={2} sm={1} lg={2} md={2}>
          <div className="description">
            <div>
              <p className="tagline">
                I'm a <span className="hello">{frontmatter.tagline}</span>
              </p>
              <h1 className="site-title">
                <span className="hello">Hello, </span>I'm {frontmatter.title}
              </h1>
            </div>
            <div
              className="description"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <Link to={frontmatter.cta.ctaLink}>
              <Button type="primary">{frontmatter.cta.ctaText}</Button>
            </Link>
          </div>
          {/* {Image && (
            <div className="featured-image">
              <img src={Image} alt={frontmatter.title} />
            </div>
          )} */}
        </Col>
      </SiteDetail>
      <ShortDescription>
        <Col lg={2} md={2} className="container" columns={2}>
          <div className="leftSide">
            <h2>{shortDescription1.leftSide.leftSideTitle}</h2>
            <div
              className="desc"
              dangerouslySetInnerHTML={{
                __html: shortDescription1.leftSide.leftSideDescription1,
              }}
            />
          </div>
          <div className="rightSide">
            <h1>{shortDescription1.rightSide.rightSideTitle}</h1>
            <Link to={shortDescription1.rightSide.ctaShortDesc1Link}>
              <Button type="secondary">
                {shortDescription1.rightSide.ctaShortDesc1Title}
              </Button>
            </Link>
          </div>
        </Col>
      </ShortDescription>
      <Skills skills={skills} />
      <SmallBanner items={bannerOne} />

      <LatestBlogs postEdges={postEdges} />
    </Layout>
  );
};

export default Home;

export const listingQuery = graphql`
  query HomePageQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        tagline
        featuredImage
        cta {
          ctaText
          ctaLink
        }
        shortDescription1 {
          leftSide {
            leftSideDescription1
            leftSideTitle
          }
          rightSide {
            ctaShortDesc1Title
            ctaShortDesc1Link
            rightSideTitle
          }
        }
        skills {
          skillHeader
          skillsList {
            skillTitle
            skillDescription
            image
          }
        }
        bannerOne {
          bannerOneTitle
          bannerOneDesc
          bannerOneCta {
            bannerOneCtaTitle
            bannerOneCtaLink
          }
        }
      }
    }
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "blog-post" } } }
      limit: 4
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 140)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            cover
          }
          fields {
            slug
            date
            readingTime {
              text
            }
          }
        }
      }
    }
  }
`;

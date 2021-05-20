import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import { Layout } from "components/common";
import PostListing from "../components/PostListing/PostListing";
import config from "../../data/SiteConfig";

export default function TagTemplate({ pageContext, data }) {
  const { tag } = pageContext;
  const postEdges = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <div className="tag-container">
        <Helmet title={`Posts tagged as "${tag}" | ${config.siteTitle}`} />
        <h1>
          {postEdges.length} post(s) under the tag: "{tag}"
        </h1>
        <PostListing postEdges={postEdges} />
      </div>
    </Layout>
  );
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
  }
`;

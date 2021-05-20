import { Layout } from "components/common";
import { graphql } from "gatsby";
import React from "react";

const AboutPage = ({ data }) => {
  const { frontmatter, html, id } = data.markdownRemark;
  return (
    <Layout title={frontmatter.title}>
      <div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  );
};

export default AboutPage;

export const pageQuery = graphql`
  query AboutQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 140)
      frontmatter {
        title
      }
    }
  }
`;

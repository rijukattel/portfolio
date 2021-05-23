import { Layout } from "components/common";
import { graphql } from "gatsby";
import React from "react";

const ProjectsPage = ({ data }) => {
  const { frontmatter, html, id } = data.markdownRemark;
  return (
    <Layout title={frontmatter.title}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};

export default ProjectsPage;

export const projectsQuery = graphql`
  query Projects($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`;

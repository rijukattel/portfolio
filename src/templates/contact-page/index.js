import Col from "components/Col";
import { Layout } from "components/common";
import { graphql } from "gatsby";
import React from "react";
import site from "../../../data/site.json";
import Details from "./Details";

const contactDetails = [
  {
    title: "Email",
    value: site.userEmail,
  },
  {
    title: "Phone",
    value: `${site.userPhoneCode}-${site.userPhone}`,
  },
  {
    title: "Location",
    value: site.userLocation,
  },
];

const ContactPage = ({ data }) => {
  const { frontmatter, html, id } = data.markdownRemark;

  return (
    <Layout title={frontmatter.title}>
      <div>
        <h1>{frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <div>
        <Col columns={3}>
          {contactDetails.map(({ title, value }) => (
            <Details key={`${value}-contact`} title={title} value={value} />
          ))}
        </Col>
      </div>
    </Layout>
  );
};

export default ContactPage;

export const contactQuery = graphql`
  query ContactQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`;

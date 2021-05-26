import React from "react";
import { graphql, Link } from "gatsby";
import { Button, Layout } from "../../components/common";
import PostListing from "../../components/PostListing/PostListing";

function Listing({ pageContext, data }) {
  function renderPaging() {
    const { currentPageNum, pageCount } = pageContext;
    const prevPage =
      currentPageNum - 1 === 1 ? "/blogs" : `/blogs/${currentPageNum - 1}/`;
    const nextPage = `/blogs/${currentPageNum + 1}/`;
    const isFirstPage = currentPageNum === 1;
    const isLastPage = currentPageNum === pageCount;

    return (
      <div style={{ textAlign: "center", padding: 10 }}>
        {!isFirstPage && (
          <Link to={prevPage}>
            {" "}
            <Button type="primary">Previous</Button>
          </Link>
        )}
        {[...Array(pageCount)].map((_val, index) => {
          const pageNum = index + 1;
          return (
            <Link
              key={`listing-page-${pageNum}`}
              to={pageNum === 1 ? "/blogs" : `/blogs/${pageNum}/`}
            >
              <Button
                type={pageNum === currentPageNum ? "primary" : "secondary"}
              >
                {pageNum}
              </Button>
            </Link>
          );
        })}
        {!isLastPage && (
          <Link to={nextPage}>
            <Button type="primary">Next</Button>
          </Link>
        )}
      </div>
    );
  }

  const postEdges = data.allMarkdownRemark.edges;

  return (
    <Layout title="Blogs">
      {renderPaging()}
      <PostListing postEdges={postEdges} />
      {renderPaging()}
    </Layout>
  );
}

export default Listing;

export const blogQuery = graphql`
  query BlogsQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "blog-post" } } }
      limit: $limit
      skip: $skip
    ) {
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

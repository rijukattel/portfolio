import PostListing from "components/PostListing/PostListing";
import { Link } from "gatsby";
import React from "react";
import { LatestBlogsContainer } from "../styles";

const LatestBlogs = ({ postEdges }) => {
  return (
    <LatestBlogsContainer>
      <div className="title-container">
        <h3 className="title">Latest Blogs</h3>
        <Link className="all-link" to="/blogs">
          View All
        </Link>
      </div>
      <PostListing postEdges={postEdges} />
    </LatestBlogsContainer>
  );
};

export default LatestBlogs;

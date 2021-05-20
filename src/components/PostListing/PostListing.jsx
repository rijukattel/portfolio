import React from "react";
import { Card } from "components/common";
import Col from "components/Col";

function PostListing({ postEdges }) {
  const postList = [];
  postEdges.forEach((postEdge) => {
    postList.push({
      path: postEdge.node.fields.slug,
      tags: postEdge.node.frontmatter.tags,
      cover: postEdge.node.frontmatter.cover,
      title: postEdge.node.frontmatter.title,
      date: postEdge.node.fields.date,
      excerpt: postEdge.node.excerpt,
      timeToRead: postEdge.node.timeToRead,
    });
  });

  return (
    <Col columns={4} lg={3} md={2} sm={1}>
      {postList.map(({ path, cover, title, date }) => (
        <Card
          hoverable
          key={`${title}-${path}`}
          title={title}
          date={date}
          path={path}
          cover={cover}
        />
      ))}
    </Col>
  );
}

export default PostListing;

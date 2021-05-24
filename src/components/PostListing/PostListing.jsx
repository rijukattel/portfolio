import React from "react";
import { Card } from "components/common";
import Col from "components/Col";
import moment from "moment";
import SiteDetail from "../../../data/SiteConfig";
import { Link } from "gatsby";

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
      timeToRead: postEdge.node.fields.readingTime.text,
    });
  });

  console.log(postEdges);

  const cardFooter = (date, timeToRead) => (
    <Col className="footer" columns={2} lg={2} md={2} sm={2}>
      <h3 className="date">{moment(date).format(SiteDetail.dateFormat)}</h3>
      <h6 className="timeToRead">{timeToRead}</h6>
    </Col>
  );
  const cardTitle = (link, title) => (
    <h3>
      <Link to={link}>{title}</Link>
    </h3>
  );
  return (
    <Col columns={4} lg={3} md={2} sm={1}>
      {postList.map(({ path, cover, title, date, timeToRead }) => (
        <Card
          hoverable
          key={`${title}-${path}`}
          footer={cardFooter(date, timeToRead)}
          title={cardTitle(path, title)}
          cover={cover}
        />
      ))}
    </Col>
  );
}

export default PostListing;

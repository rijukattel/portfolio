import React from "react";
import _ from "lodash";
import { Link } from "gatsby";
import { Button } from "components/common";
import styled from "styled-components";

const TagContainer = styled.div`
  text-align: center;
`;

function PostTags({ tags }) {
  return (
    <TagContainer>
      {tags && (
        <h4>
          Tags:{" "}
          <span>
            {tags &&
              tags.map((tag) => (
                <Link
                  key={tag}
                  // style={{ textDecoration: "none" }}
                  to={`/tags/${_.kebabCase(tag)}`}
                >
                  <Button type="secondary">{tag}</Button>
                </Link>
              ))}
          </span>
        </h4>
      )}
    </TagContainer>
  );
}

export default PostTags;

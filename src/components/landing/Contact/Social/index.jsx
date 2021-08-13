import React from "react";
import data from "data/config";
import { Wrapper } from "./styles";

const { contact } = data;

const Social = () => {
  return (
    <Wrapper>
      <h1>contact me anytime</h1>
      <div className="social">
        {Object.keys(contact).map((each) => (
          <div>
            <p>
              {each}:{" "}
              <span>
                <a href={`${contact[each].link}:${contact[each].text}`}>
                  {contact[each].text}
                </a>{" "}
              </span>
            </p>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default Social;

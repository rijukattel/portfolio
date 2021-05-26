import Col from "components/Col";
import { ThemeContext } from "providers/ThemeProvider";
import React, { useContext } from "react";
import { SkillsStyles } from "./styles";

const Skills = ({ skills }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <SkillsStyles theme={theme}>
      <h1>{skills.skillHeader}</h1>
      <Col lg={2} md={2} columns={3}>
        {skills.skillsList.map(({ image, skillTitle, skillDescription }) => (
          <div className="skill-item-container">
            <div className="img-container">
              <img src={image} alt={skillTitle} />
            </div>
            <div className="text-container">
              <h3>{skillTitle}</h3>
              <div
                className="desc"
                dangerouslySetInnerHTML={{ __html: skillDescription }}
              />
            </div>
          </div>
        ))}
      </Col>
    </SkillsStyles>
  );
};

export default Skills;

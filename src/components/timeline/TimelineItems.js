import React from 'react';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TimelineItems = ({
  title,
  description,
  experienceType,
  content,
  date,
  icon,
  iconStyle,
  contentStyle,
}) => {
  let parsedStyle = { ...JSON.parse(contentStyle) };
  return (
    <VerticalTimelineElement
      className={`vertical-timeline-element--${experienceType}`}
      contentStyle={{
        ...parsedStyle,
      }}
      contentArrowStyle={{
        borderRight: '7px solid var(--primaryColor)',
      }}
      date={
        <span
          style={{
            color: 'var(--headingsColor)',
            fontWeight: 700,
            fontSize: 'large',
          }}
        >
          {date}
        </span>
      }
      iconStyle={JSON.parse(iconStyle)}
      icon={<FontAwesomeIcon icon={JSON.parse(icon)} />}
    >
      <h3 className="vertical-timeline-element-title">{title}</h3>
      <h4 className="vertical-timeline-element-subtitle">{description}</h4>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </VerticalTimelineElement>
  );
};

export default TimelineItems;

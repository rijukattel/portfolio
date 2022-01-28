import React from 'react';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import styled from 'styled-components';
import TimelineItems from './TimelineItems';
import 'react-vertical-timeline-component/style.min.css';

const Timeline = ({ timeline, timelineTitle }) => {
  const TimelineWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: ${({ fullView }) => fullView && '100vh'};
    padding: var(--globalPaddingTb) var(--globalPaddingLr);
    flex-direction: column;
    position: relative;
  `;

  const TimelineHeading = styled.h1`
    padding: 10px;
    font-family: Righteous;
    text-align: center;
    margin: 10px;
  `;

  return (
    <TimelineWrapper fullView>
      <TimelineHeading>{timelineTitle}</TimelineHeading>
      <VerticalTimeline lineColor={'var(--primaryColor)'}>
        {timeline?.map(
          ({
            title,
            content,
            experienceType,
            description,
            date,
            contentStyle,
            iconStyle,
            icon,
          }) => {
            return (
              <TimelineItems
                key={`timeline-${date}-${title}`}
                title={title}
                date={date}
                content={content}
                experienceType={experienceType}
                description={description}
                contentStyle={contentStyle}
                icon={icon}
                iconStyle={iconStyle}
              />
            );
          }
        )}
      </VerticalTimeline>
    </TimelineWrapper>
  );
};

export default Timeline;

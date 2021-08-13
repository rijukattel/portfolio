import React from 'react';
import { Container } from 'components/common';
import contact from 'assets/illustrations/contact.svg';
import { Wrapper, Details, Thumbnail } from './styles';
import Social from './Social';

export const Contact = () => (
  <Wrapper as={Container} id="contact">
    <Details>
      {/* <ContactForm /> */}
      <Social />
    </Details>
    <Thumbnail>
      <img src={contact} alt="I’m Raghav" />
    </Thumbnail>
  </Wrapper>
);

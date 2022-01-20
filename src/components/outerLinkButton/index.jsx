import React from 'react';

const OuterLinkButton = ({ to = '', primary, children }) => {
  if (to) {
    return (
      <a
        style={{ margin: '10px', fontFamily: 'Raleway' }}
        className={`classicButton  ${
          primary ? 'classicButtonPrimary' : 'classicButtonOutline'
        }`}
        href={to}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }
  return '';
};

export default OuterLinkButton;

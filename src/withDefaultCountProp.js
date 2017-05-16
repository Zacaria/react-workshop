import React from 'react';

const withDefaultCountProp = (Component, count) => props => (
  <Component count={count} {...props}/>
);

export default withDefaultCountProp;

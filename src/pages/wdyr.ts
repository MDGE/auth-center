/// <reference types="@welldone-software/why-did-you-render" />
import React from 'react';
if (NODE_ENV === 'development') {
  console.log('wdyr');
  // eslint-disable-next-line
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

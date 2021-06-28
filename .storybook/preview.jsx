import { DocsContainer } from '@storybook/addon-docs/blocks';
import { addParameters } from '@storybook/client-api';
import { addDecorator } from '@storybook/react';
import React from 'react';

const headers = ['Guide', 'Components'];

const storySort = (a, b) => {
  const aHeader = a[1].kind.substr(0, a[1].kind.indexOf('|'));
  const bHeader = b[1].kind.substr(0, b[1].kind.indexOf('|'));

  const aSubHeader = a[1].kind.substr(a[1].kind.indexOf('|') + 1);
  const bSubHeader = b[1].kind.substr(b[1].kind.indexOf('|') + 1);

  if (aSubHeader == 'Overview') return -1;
  if (bSubHeader == 'Overview') return 1;

  if (aHeader !== bHeader) {
    const aHeaderIndex = headers.findIndex((h) => h === aHeader);
    const bHeaderIndex = headers.findIndex((h) => h === bHeader);
    return aHeaderIndex - bHeaderIndex;
  }

  return 0;
};

addParameters({
  docs: {
    container: ({ children, context }) => (
      <DocsContainer context={context}>
        <>{children}</>
      </DocsContainer>
    ),
  },
  options: {
    storySort,
  },
});

addDecorator((storyFn) => {
  const root = document.getElementById('root');

  return root.hidden ? storyFn() : <>{storyFn()}</>;
});

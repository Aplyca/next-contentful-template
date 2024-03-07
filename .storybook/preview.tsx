import React from 'react';
import type { Preview } from '@storybook/react';

import { Providers } from '../src/app/providers';

import '../src/app/globals.css';
import './style.css';

const BREAKPOINTS_INT = {
  xxs: 375,
  xs: 420,
  sm: 640,
  md: 768,
  '2md': 960,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1640,
  '4xl': 1800,
  '5xl': 2048,
  qhd: 2560,
  '2qhd': 3440,
  '4k': 3840,
};

const customViewports = Object.fromEntries(
  Object.entries(BREAKPOINTS_INT).map(([key, val], idx) => {
    return [
      key,
      {
        name: key,
        styles: {
          width: `${val}px`,
          height: `70vh`,
        },
      },
    ];
  }),
);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      // The `a` and `b` arguments in this function have a type of `import('@storybook/types').IndexEntry`. Remember that the function is executed in a JavaScript environment, so use JSDoc for IntelliSense to introspect it.
      storySort: (a, b) =>
        a.id === b.id
          ? 0
          : a.id.localeCompare(b.id, undefined, { numeric: true }),
    },
    viewport: { viewports: customViewports },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <Providers isEnabledDraft={false}>
        <Story />
      </Providers>
    ),
  ],
};

export default preview;

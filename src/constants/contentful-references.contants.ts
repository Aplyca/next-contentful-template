import { CONTENTFUL_TYPE_NAMES } from './contentful-names.constants';

export const CONTENT_REFERENCES: Record<string, string[]> = {
  [CONTENTFUL_TYPE_NAMES.PAGE]: ['blocksCollection'],
  [CONTENTFUL_TYPE_NAMES.BLOCK_CONTENT_PROMO]: [
    'ctaCollection',
    'manualContentsCollection',
    'automaticContent',
    'customView',
  ],
  [CONTENTFUL_TYPE_NAMES.NAVIGATION]: [
    'mainNavigationCollection',
    'auxiliaryNavigationCollection',
  ],
  [CONTENTFUL_TYPE_NAMES.CUSTOM_CONTENT]: ['internalLink'],
};

export const RICHTEXT_REFERENCES: Record<string, string[]> = {
  [CONTENTFUL_TYPE_NAMES.PAGE]: ['content'],
  [CONTENTFUL_TYPE_NAMES.BLOCK_CONTENT_PROMO]: ['description'],
  [CONTENTFUL_TYPE_NAMES.ARTICLE]: ['body'],
  [CONTENTFUL_TYPE_NAMES.NAVIGATION]: ['mainText', 'secondaryText'],
};

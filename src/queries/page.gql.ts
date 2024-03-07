import { CONTENTFUL_TYPE_NAMES } from '@/constants/contentful-names.constants';

import DefaultQuery, { AssetImageQuery, RichtextQuery } from './misc.gql';

export const PageMinimalQuery = `
  ${DefaultQuery}
  name
  title
  slug
  urlPaths
  description
  media {
    ${AssetImageQuery}
  }
`;

const PageQuery = `
  ${DefaultQuery}
  ${PageMinimalQuery}
  content {
    ${RichtextQuery}
  }
  blocksCollection {
    items {
      ...on ${CONTENTFUL_TYPE_NAMES.BLOCK_CONTENT_PROMO} {
        ${DefaultQuery}
      }
    }
  }
`;

export default PageQuery;

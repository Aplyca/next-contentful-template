import { CONTENTFUL_TYPE_NAMES } from '@/constants/contentful-names.constants';

import ContentFilterQuery from './content-filter.gql';
import { CustomContentMinimalQuery } from './custom-content.gql';
import { ArticleMinimalQuery } from '../article.gql';
import DefaultQuery, { AssetImageQuery, RichtextQuery } from '../misc.gql';
import { PageMinimalQuery } from '../page.gql';
import ViewGridCardsQuery from '../views/grid-cards.gql';

export const BlockContentPromoFragments = `
  fragment PageMinimalFragment on ${CONTENTFUL_TYPE_NAMES.PAGE} {
    ${PageMinimalQuery}
  }
  fragment ArticleMinimalFragment on ${CONTENTFUL_TYPE_NAMES.ARTICLE} {
    ${ArticleMinimalQuery}
  }
  fragment CustomContentMinimalFragment on ${CONTENTFUL_TYPE_NAMES.CUSTOM_CONTENT} {
    ${CustomContentMinimalQuery}
  }
`;

const BlockContentPromoQuery = `
  ${DefaultQuery}
  name
  title
  subtitle
  description {
    ${RichtextQuery}
  }
  media {
    ${AssetImageQuery}
  }
  ctaCollection {
    items {
      ...PageMinimalFragment
      ...ArticleMinimalFragment
      ...CustomContentMinimalFragment
    }
  }
  manualContentsCollection {
    items {
      ...PageMinimalFragment
      ...ArticleMinimalFragment
      ...CustomContentMinimalFragment
    }
  }
  automaticContent {
    ...on ${CONTENTFUL_TYPE_NAMES.BLOCK_CONTENT_FILTER} {
      ${ContentFilterQuery}
    }
  }
  simpleView
  customView {
    ...on ${CONTENTFUL_TYPE_NAMES.VIEW_GRID_CARDS} {
      ${ViewGridCardsQuery}
    }
  }
`;

export default BlockContentPromoQuery;

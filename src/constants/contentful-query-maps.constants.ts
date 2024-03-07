import ArticleQuery, { ArticleMinimalQuery } from '@/queries/article.gql';
import BlockContentPromoQuery, {
  BlockContentPromoFragments,
} from '@/queries/blocks/content-promo.gql';
import CustomContentQuery from '@/queries/blocks/custom-content.gql';
import NavigationQuery, { NavigationFragments } from '@/queries/blocks/navigation.gql';
import PageQuery, { PageMinimalQuery } from '@/queries/page.gql';

import {
  CONTENTFUL_QUERY_NAMES,
  CONTENTFUL_TYPE_NAMES,
} from './contentful-names.constants';

export interface QueryMapsObjectItem {
  queryName: string;
  query: string;
  fragments?: string;
}

export type QueryMapsObject = Record<string, QueryMapsObjectItem>;

const CONTENTFUL_QUERY_MAPS: QueryMapsObject = {
  [CONTENTFUL_TYPE_NAMES.PAGE]: {
    queryName: CONTENTFUL_QUERY_NAMES.PAGE,
    query: PageQuery,
  },
  [CONTENTFUL_TYPE_NAMES.PAGE_MINIMAL]: {
    queryName: CONTENTFUL_QUERY_NAMES.PAGE,
    query: PageMinimalQuery,
  },
  [CONTENTFUL_TYPE_NAMES.ARTICLE]: {
    queryName: CONTENTFUL_QUERY_NAMES.ARTICLE,
    query: ArticleQuery,
  },
  [CONTENTFUL_TYPE_NAMES.ARTICLE_MINIMAL]: {
    queryName: CONTENTFUL_QUERY_NAMES.ARTICLE,
    query: ArticleMinimalQuery,
  },
  [CONTENTFUL_TYPE_NAMES.NAVIGATION]: {
    queryName: CONTENTFUL_QUERY_NAMES.NAVIGATION,
    query: NavigationQuery,
    fragments: NavigationFragments,
  },
  [CONTENTFUL_TYPE_NAMES.CUSTOM_CONTENT]: {
    queryName: CONTENTFUL_QUERY_NAMES.CUSTOM_CONTENT,
    query: CustomContentQuery,
  },
  [CONTENTFUL_TYPE_NAMES.BLOCK_CONTENT_PROMO]: {
    queryName: CONTENTFUL_QUERY_NAMES.BLOCK_CONTENT_PROMO,
    query: BlockContentPromoQuery,
    fragments: BlockContentPromoFragments,
  },
};

export default CONTENTFUL_QUERY_MAPS;

import { type ArticleProps } from './blog.types';
import type {
  AssetProps,
  ContentfulRichtext,
  DefaultBlockInfoProps,
} from './misc.types';
import { type PageProps } from './page.types';
import type { SimpleViewOptions, ViewPromoBlock } from './view.types';

type ContentTypeOptions = null | 'Article' | 'Page';
type FacetOptions = null | 'Category';
type SortByOptions =
  | null
  | 'Alphabetic (asc)'
  | 'Alphabetic (desc)'
  | 'Date (asc)'
  | 'Date (desc)';

export interface BlockContentFilterProps extends DefaultBlockInfoProps {
  name: string;
  searchEngine: 'Algolia' | 'Contentful';
  contentTypes?: ContentTypeOptions[];
  facets?: FacetOptions[];
  sortBy: SortByOptions;
  itemsPerPage: number;
  extraConditions: string[];
}

export interface CustomContentProps extends DefaultBlockInfoProps {
  title: string;
  description?: string;
  mediaLink?: AssetProps;
  externalLink?: string;
  internalLink?: PageProps & ArticleProps;
  linkParameters?: string;
}

export interface BlockContentPromoProps extends DefaultBlockInfoProps {
  name: string;
  title?: string;
  subtitle?: string;
  description?: ContentfulRichtext;
  media?: AssetProps;
  manualContentsCollection?: {
    items: Array<PageProps & ArticleProps & CustomContentProps>;
  };
  automaticContent?: BlockContentFilterProps;
  ctaCollection?: {
    items: Array<PageProps & ArticleProps & CustomContentProps>;
  };
  simpleView?: SimpleViewOptions;
  customView?: ViewPromoBlock;
  isFirst?: boolean;
  isLast?: boolean;
}

import { type ArticleProps } from './blog.types';
import { type DefaultBlockInfoProps } from './misc.types';
import { type PageProps } from './page.types';

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
  initialData?: {
    items: Array<PageProps & ArticleProps>;
    facets: any[];
    totalPages: number;
  };
}

export interface ContentFilterFieldDef {
  fieldName: string;
  operator?: 'IN' | 'EQ' | 'NOT';
  multiple?: boolean;
}

export interface ContentFilter {
  query_name: string;
  operator_join: ' AND ' | ' OR ';
  allowed_filters?: Record<string, ContentFilterFieldDef>;
  allowed_facets?: Record<string, any>;
}

export interface TranformedFacetItem {
  title: string;
  filterName: string;
  items: Array<{ value: string; quantity: number }>;
}

export interface SearchResultItem {
  metadata?: any;
  _highlightResult?: any;
  fields: Record<string, { en: any }>;
  objectID: string;
  __typename?: string;
}

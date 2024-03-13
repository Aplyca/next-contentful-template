import { CONTENTFUL_TYPE_NAMES } from './contentful-names.constants';

export const CONTENT_TYPES_MAP: Record<string, string> = {
  Article: CONTENTFUL_TYPE_NAMES.ARTICLE,
  Page: CONTENTFUL_TYPE_NAMES.PAGE,
};

export const SORT_BY: Record<string, Record<string, string>> = {
  Article: {
    'Date (asc)': 'sys_publishedAt_ASC',
    'Date (desc)': 'sys_publishedAt_DESC',
    'Alphabetic (asc)': 'title_ASC',
    'Alphabetic (desc)': 'title_DESC',
  },
  Page: {
    'Date (asc)': 'sys_publishedAt_ASC',
    'Date (desc)': 'sys_publishedAt_DESC',
    'Alphabetic (asc)': '[title_ASC, name_ASC]',
    'Alphabetic (desc)': '[title_DESC, name_DESC]',
  },
};

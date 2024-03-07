/**
 * Enum to mantain the contentful __typenames defined and reusable in
 * multiple parts of project.
 */
export const MINIMAL_SUFIX = 'Minimal';

export enum CONTENTFUL_TYPE_NAMES {
  PAGE = "Page",
  PAGE_MINIMAL = "Page" + MINIMAL_SUFIX,
  ARTICLE = "BlogArticle",
  ARTICLE_MINIMAL = "BlogArticle" + MINIMAL_SUFIX,
  NAVIGATION = "Navigation",

  BLOCK_CONTENT_PROMO = "BlockContentPromo",
  BLOCK_CONTENT_FILTER = "BlockContentFilter",
  CUSTOM_CONTENT = "CustomContent",

  VIEW_GRID_CARDS = "ViewGridCards",
  VIEW_MAIN_IMAGE = "Main image",
};

export enum CONTENTFUL_QUERY_NAMES {
  PAGE = 'page',
  ARTICLE = 'blogArticle',
  BLOCK_CONTENT_PROMO = 'blockContentPromo',
  NAVIGATION = 'navigation',
  CUSTOM_CONTENT = 'customContent',
};

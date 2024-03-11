import GridCardsBlock from '@/components/blocks/grid-cards/GridCardsBlock';
import MainImageBlock from '@/components/blocks/main-image/MainImageBlock';

import { CONTENTFUL_TYPE_NAMES } from './contentful-names.constants';

/**
 * Supports:
 *
 * ContentType: React.Component,
 * ContentType: {
 *    ViewContentType: React.Component,
 * }
 */
export const BLOCKS_VIEW_MAP: Record<
  string,
  React.FC<any> | Record<string, React.FC<any>>
> = {
  [CONTENTFUL_TYPE_NAMES.BLOCK_CONTENT_PROMO]: {
    [CONTENTFUL_TYPE_NAMES.VIEW_GRID_CARDS]: GridCardsBlock,
    [CONTENTFUL_TYPE_NAMES.VIEW_MAIN_IMAGE]: MainImageBlock,
  },
};

export const CHILDREN_KEYS_MAP: Record<string, string> = {};

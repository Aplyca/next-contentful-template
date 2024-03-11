import { type BlockContentPromoProps } from './block.types';
import { type ArticleProps } from './blog.types';
import { type DefaultBlockInfoProps } from './misc.types';

export interface PageProps extends DefaultBlockInfoProps {
  parent?: PageProps & ArticleProps;
  name: string;
  title?: string;
  slug?: string;
  urlPaths?: string[];
  blocksCollection?: {
    items: BlockContentPromoProps[];
  };
}

import { type BlockContentPromoProps } from './block.types';
import { type ArticleProps } from './blog.types';
import {
  type AssetProps,
  type ContentfulRichtext,
  type DefaultBlockInfoProps,
} from './misc.types';

export interface PageProps extends DefaultBlockInfoProps {
  parent?: PageProps & ArticleProps;
  name: string;
  title?: string;
  subtitle?: string;
  media?: AssetProps;
  description?: string;
  content?: ContentfulRichtext;
  blocksCollection?: {
    items: BlockContentPromoProps[];
  };
  displayOptions?: Array<'Hide heading'>;
  slug?: string;
  urlPaths?: string[];
}

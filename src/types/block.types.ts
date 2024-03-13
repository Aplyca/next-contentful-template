import { type ArticleProps } from './blog.types';
import type {
  AssetProps,
  ContentfulRichtext,
  DefaultBlockInfoProps,
} from './misc.types';
import { type PageProps } from './page.types';
import { type BlockContentFilterProps } from './search.types';
import type { SimpleViewOptions, ViewPromoBlock } from './view.types';

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

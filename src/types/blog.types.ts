import { type AssetProps, type ContentfulRichtext, type DefaultBlockInfoProps } from './misc.types';

export interface ArticleProps extends DefaultBlockInfoProps {
  title: string;
  description?: string;
  media?: AssetProps;
  category?: string[];
  body?: ContentfulRichtext;
  slug?: string;
  urlPaths?: string[];
}

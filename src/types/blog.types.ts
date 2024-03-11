import { type DefaultBlockInfoProps } from './misc.types';

export interface ArticleProps extends DefaultBlockInfoProps {
  title: string;
  slug?: string;
  urlPaths?: string[];
}

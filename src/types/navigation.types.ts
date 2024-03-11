import { type CustomContentProps } from './block.types';
import { type ArticleProps } from './blog.types';
import type {
  AssetProps,
  ContentfulRichtext,
  DefaultBlockInfoProps,
} from './misc.types';
import { type PageProps } from './page.types';

export interface NavigationProps extends DefaultBlockInfoProps {
  title?: string;
  mainNavigationCollection?: {
    items: Array<
      NavigationProps & PageProps & ArticleProps & CustomContentProps
    >;
  };
  auxiliaryNavigationCollection?: {
    items: Array<
      NavigationProps & PageProps & ArticleProps & CustomContentProps
    >;
  };
  image?: AssetProps;
  mainText?: ContentfulRichtext;
  secondaryText?: ContentfulRichtext;
}

export interface CustomLinkProps {
  key?: string;
  content: PageProps & ArticleProps & CustomContentProps & NavigationProps;
  children?: React.ReactNode;
  linkClassName?: string;
  customLinkClasses?: {
    default: string;
    active: string;
  };
  childrenClassName?: string;
  linkTitle?: string;
  asButton?: boolean;
  isDownload?: boolean;
  onClick?: (e: any) => void;
  onFocus?: (e: any) => void;
}

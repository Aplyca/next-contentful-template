import { type CustomContentProps } from '@/types/block.types';
import { type ArticleProps } from '@/types/blog.types';
import { type NavigationProps } from '@/types/navigation.types';
import { type PageProps } from '@/types/page.types';

export type GetUrlPathProps = PageProps &
  ArticleProps &
  CustomContentProps &
  NavigationProps;

const HOME_URL_PATH = '/home';

const generateFullUrl = (link: string): string => {
  if (/^\+?[0-9 -]+/.test(link)) {
    return `tel:${link}`;
  }

  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(link)) {
    return `mailto:${link}`;
  }

  return `https://${link}`;
};

export const getUrlPath = (content: GetUrlPathProps): string => {
  const re = new RegExp(`^${HOME_URL_PATH}`);

  let urlPath: string =
    content?.mediaLink?.url ??
    content?.urlPaths?.[0] ??
    content?.internalLink?.urlPaths?.[0] ??
    content?.internalLink?.slug ??
    content?.slug ??
    content?.externalLink ??
    '';

  if (urlPath && !content?.externalLink && !content?.mediaLink?.url) {
    urlPath = urlPath.replace(re, '');
    urlPath = urlPath.startsWith('/') ? urlPath : `/${urlPath}`;
  }

  if (urlPath && content?.externalLink) {
    urlPath = /^[http|mailto|tel|sms|#]/.test(urlPath)
      ? urlPath
      : generateFullUrl(urlPath);
  }

  if (content?.linkParameters) {
    urlPath += content.linkParameters;
  }

  return urlPath;
};

export const getTextLink = (content: GetUrlPathProps): string => {
  return (
    content?.title ??
    content?.internalLink?.title ??
    content?.internalLink?.name ??
    content?.name ??
    ''
  );
};

export const getLinkProps = (
  content: GetUrlPathProps,
): {
  href: string;
  target?: string;
  isExternalLink?: boolean;
  textLink: string;
} => {
  const href = getUrlPath(content);
  const isExternalLink =
    !content?.internalLink?.urlPaths?.[0] &&
    !content?.urlPaths?.[0] &&
    (!!content?.externalLink || !!content?.mediaLink?.url);

  const textLink = getTextLink(content);

  return {
    href,
    target: isExternalLink ? '_blank' : '_self',
    isExternalLink,
    textLink,
  };
};

'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { type CustomLinkProps } from '@/types/navigation.types';
import { getLinkProps } from '@/utils/navigation.functions';

const CustomLink: React.FC<CustomLinkProps> = ({
  content,
  children = null,
  linkClassName = 'inline-block',
  childrenClassName = 'block',
  customLinkClasses = null,
  isDownload = false,
  asButton = false,
  linkTitle = undefined,
  onClick = () => null,
  onFocus = () => null,
}) => {
  const { href, target, isExternalLink, textLink } = getLinkProps(content);
  const pathname = usePathname();

  let extraClassNames = customLinkClasses?.default ?? '';
  if ((pathname === '/' && href === '/') || (pathname !== '/' && href.startsWith(pathname))) {
    extraClassNames = customLinkClasses?.active ?? '';
  }

  return asButton ? (
    <button
      title={linkTitle}
      onClick={(evt) => {
        onClick(evt);
      }}
      onFocus={(evt) => {
        onFocus(evt);
      }}
      className={linkClassName}
    >
      <span className={childrenClassName}>{children ?? textLink}</span>
    </button>
  ) : (
    <Link
      href={href}
      target={target}
      {...(isExternalLink ? { rel: 'noopener noreferrer' } : null)}
      onClick={(evt) => {
        onClick(evt);
      }}
      onFocus={(evt) => {
        onFocus(evt);
      }}
      className={`${linkClassName} ${extraClassNames}`}
      scroll={true}
      download={isDownload}
      title={linkTitle}
    >
      <span className={childrenClassName}>{children ?? textLink}</span>
    </Link>
  );
};

export default CustomLink;

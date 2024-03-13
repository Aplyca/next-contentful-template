import { cache } from 'react';

import type { NextPage } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import PreviewArticleContainer from '@/components/containers/preview-article/PreviewArticleContainer';
import PreviewPageContainer from '@/components/containers/preview-page/PreviewPageContainer';
import { CONTENTFUL_TYPE_NAMES } from '@/constants/contentful-names.constants';
import getPageContent from '@/services/page-content.service';
import { type ArticleProps } from '@/types/blog.types';
import { type PageProps } from '@/types/page.types';

interface Props {
  params: { slug: string[] };
}

export const revalidate = 3600 * 24;

const getCachedPageContent = cache(
  async (slugStringPath: string, preview = false) => {
    const pageInfo = await getPageContent({
      urlPath: slugStringPath,
      preview,
      recursive: true,
    });

    return pageInfo;
  },
);

const Page: NextPage<Props> = async ({ params: p }) => {
  const { isEnabled: preview } = draftMode();
  const slugStringPath = ['', ...p.slug].join('/');
  const pageInfo: (PageProps & ArticleProps) | null =
    await getCachedPageContent(slugStringPath, preview);

  if (!pageInfo) notFound();

  return (
    <>
      {pageInfo.__typename === CONTENTFUL_TYPE_NAMES.ARTICLE && (
        <PreviewArticleContainer {...pageInfo} />
      )}

      {pageInfo.__typename === CONTENTFUL_TYPE_NAMES.PAGE && (
        <PreviewPageContainer {...pageInfo} />
      )}
    </>
  );
};

export default Page;

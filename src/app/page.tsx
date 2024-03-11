import React, { cache } from 'react';

import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import PreviewPageContainer from '@/components/containers/preview-page/PreviewPageContainer';
import getPageContent from '@/services/page-content.service';
import { type PageProps } from '@/types/page.types';

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

const Home: React.FC = async () => {
  const { isEnabled: preview } = draftMode();
  const pageInfo: PageProps | null = await getCachedPageContent('/', preview);

  if (!pageInfo) notFound();

  return <PreviewPageContainer {...pageInfo} />;
};

export default Home;

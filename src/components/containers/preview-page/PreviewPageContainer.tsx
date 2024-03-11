'use client';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';

import type { PageProps } from '@/types/page.types';
import jsonToReactComponents from '@/utils/block-renderer.functions';

const PreviewPageContainer: React.FC<PageProps> = (
  pageInfo,
): React.ReactNode => {
  const updatedPost = useContentfulLiveUpdates(pageInfo);
  const inspectorProps = useContentfulInspectorMode({
    entryId: pageInfo.sys.id,
  });

  return (
    <div {...inspectorProps({ fieldId: 'blocks' })} className='flex flex-1 flex-col items-center justify-between'>
      {jsonToReactComponents(updatedPost?.blocksCollection?.items ?? [])}
    </div>
  );
};

export default PreviewPageContainer;

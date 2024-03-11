'use client';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';

import CardArrow from '@/components/organisms/card-arrow/CardArrow';
import { type BlockContentPromoProps } from '@/types/block.types';

const GridCardsBlock: React.FC<BlockContentPromoProps> = (blockInfo) => {
  const { manualContentsCollection } = useContentfulLiveUpdates(blockInfo);
  const inspectorProps = useContentfulInspectorMode({
    entryId: blockInfo.sys.id,
  });

  return (
    <div
      {...inspectorProps({ fieldId: 'manualContents' })}
      className="z-50 mt-6 md:mt-0 mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"
    >
      {manualContentsCollection?.items?.map((item, idx) => (
        <CardArrow key={`${item.sys.id}-${idx}`} {...item} />
      ))}
    </div>
  );
};

export default GridCardsBlock;

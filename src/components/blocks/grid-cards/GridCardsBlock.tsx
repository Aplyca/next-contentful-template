'use client';

import React, { useEffect, useState } from 'react';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';

import CardArrow from '@/components/organisms/card-arrow/CardArrow';
import { type BlockContentPromoProps } from '@/types/block.types';

const GridCardsBlock: React.FC<BlockContentPromoProps> = (blockInfo) => {
  const [customStyles, setCustomStyles] = useState<Record<string, string>>({
    gridTemplateColumns: 'repeat(auto-fit,_25%)',
  });

  const { manualContentsCollection, customView } =
    useContentfulLiveUpdates(blockInfo);
  const inspectorProps = useContentfulInspectorMode({
    entryId: blockInfo.sys.id,
  });

  useEffect(() => {
    const calculatedColWidth = 100 / (customView?.itemsPerRow ?? 4);
    setCustomStyles({
      gridTemplateColumns: `repeat(auto-fit, ${calculatedColWidth}%)`,
      justifyContent:
        customView?.alignment === 'Center'
          ? 'center'
          : customView?.alignment === 'Right'
            ? 'flex-end'
            : 'flex-start',
    });
  }, [customView]);

  return (
    <div
      {...inspectorProps({ fieldId: 'manualContents' })}
      className={`z-50 mt-6 md:mt-0 mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left !max-lg:grid-cols-1`}
      style={customStyles}
    >
      {manualContentsCollection?.items?.map((item, idx) => (
        <CardArrow key={`${item.sys.id}-${idx}`} {...item} />
      ))}
    </div>
  );
};

export default GridCardsBlock;

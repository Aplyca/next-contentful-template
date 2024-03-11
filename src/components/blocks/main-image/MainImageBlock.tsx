import React from 'react';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';
import Image from 'next/image';

import { type BlockContentPromoProps } from '@/types/block.types';

const MainImageBlock: React.FC<BlockContentPromoProps> = (
  blockInfo
): React.ReactNode => {
  const { media } = useContentfulLiveUpdates(blockInfo);
  const inspectorProps = useContentfulInspectorMode({
    entryId: blockInfo.sys.id,
  });

  return (
    <div
      {...inspectorProps({ fieldId: 'media' })}
      className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:z-10 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] before:z-20 flex-1"
    >
      {media?.url && (
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert z-50"
          src={media?.url}
          alt={media?.description ?? media.title}
          width={180}
          height={37}
          priority
        />
      )}
    </div>
  );
};

export default MainImageBlock;

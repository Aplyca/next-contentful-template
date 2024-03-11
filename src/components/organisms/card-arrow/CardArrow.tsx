'use client';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';

import CustomLink from '@/components/atoms/custom-link/CustomLink';
import { type CustomContentProps } from '@/types/block.types';
import { type ArticleProps } from '@/types/blog.types';
import { type PageProps } from '@/types/page.types';

type CardArrowProps = PageProps & ArticleProps & CustomContentProps;

const CardArrow: React.FC<CardArrowProps> = (cardInfo) => {
  const updatedCardInfo = useContentfulLiveUpdates(cardInfo);
  const inspectorProps = useContentfulInspectorMode({
    entryId: cardInfo.sys.id,
  });

  return (
    <CustomLink
      content={updatedCardInfo}
      linkClassName="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    >
      <h2 {...inspectorProps({ fieldId: 'title' })} className={`mb-3 text-2xl font-semibold`}>
        {updatedCardInfo?.title ?? updatedCardInfo?.name}{' '}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      {updatedCardInfo?.description && (
        <p {...inspectorProps({ fieldId: 'description' })} className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          {updatedCardInfo.description}
        </p>
      )}
    </CustomLink>
  );
};

export default CardArrow;

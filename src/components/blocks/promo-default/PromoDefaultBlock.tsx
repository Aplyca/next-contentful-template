'use client';

import React from 'react';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import CustomImage from '@/components/atoms/custom-image/CustomImage';
import { type BlockContentPromoProps } from '@/types/block.types';
import { interFont, ralewayFont } from '@/ui/fonts';

const PromoDefaultBlock: React.FC<BlockContentPromoProps> = ({
  key,
  ...blockInfo
}): React.ReactNode => {
  const updatedPost = useContentfulLiveUpdates(blockInfo);
  const inspectorProps = useContentfulInspectorMode({
    entryId: blockInfo.sys.id,
  });

  return (
    <fieldset
      {...(key ? { key } : {})}
      className="w-full flex flex-col justify-between items-center gap-5 p-5 mb-5 border-red-900 border-2 border-solid"
    >
      <legend className={`${interFont.className} text-red-900 bold`}>
        Block «{blockInfo.__typename}
        {blockInfo.customView?.__typename
          ? ' vista(' + blockInfo.customView.__typename + ')'
          : blockInfo.simpleView
            ? 'vista(' + blockInfo.simpleView + ')'
            : ''}
        » undefined
      </legend>
      <p className="text-sm text-gray-700 w-full bg-red-200 border border-red-300 p-3 rounded">
        This block is a default element that is only rendered in development
        mode in case there is no definition for the content/view type. To define
        the block to use, edit the file:{' '}
        <code className="py-[.5px] px-1 border border-orange-300 bg-orange-200 font-mono font-semibold">
          src/constants/blocks-view-map.constants.ts
        </code>
        .
      </p>

      <div className="w-full flex justify-center items-start gap-4">
        {updatedPost.media?.url && (
          <div
            className="w-full md:w-1/3 relative aspect-video overflow-hidden rounded-sm"
            {...inspectorProps({ fieldId: 'media' })}
          >
            <small className="block font-bold">Media:</small>
            {updatedPost?.media?.contentType?.startsWith('video') ? (
              <video
                className="object-cover w-full h-full"
                src={updatedPost.media.url}
                autoPlay
                loop
                muted
                controls
              />
            ) : (
              <CustomImage
                className="object-contain w-full h-full"
                src={updatedPost.media.url}
                alt={updatedPost.media.description ?? updatedPost.media.title}
                width={1920}
                height={1080}
              />
            )}
          </div>
        )}
        <section className="flex flex-1 flex-col">
          {updatedPost.title && (
            <p
              className="mb-2 text-[.8rem]"
              {...inspectorProps({ fieldId: 'title' })}
            >
              <strong>Title:</strong> {updatedPost.title}
            </p>
          )}
          {updatedPost.description && (
            <div
              className={`${ralewayFont.className} text-sm mb-2`}
              {...inspectorProps({ fieldId: 'description' })}
            >
              <small className="block font-bold">Description:</small>
              {documentToReactComponents(updatedPost.description.json)}
            </div>
          )}
          {!!updatedPost?.manualContentsCollection?.items?.[0] && (
            <div className="mb-2">
              <small className="block font-bold mb-2">Manual contents:</small>
              <pre
                className={`${ralewayFont.className} text-sm overflow-y-auto max-h-80 bg-gray-200 border border-gray-300 p-3 rounded w-full whitespace-pre-wrap`}
                {...inspectorProps({ fieldId: 'manualContents' })}
              >
                {JSON.stringify(updatedPost.manualContentsCollection.items)}
              </pre>
            </div>
          )}
          {!!updatedPost?.automaticContent && (
            <div className="mb-2">
              <small className="block font-bold mb-2">Automatic content:</small>
              <pre
                className={`${ralewayFont.className} text-sm overflow-y-auto max-h-80 bg-gray-200 border border-gray-300 p-3 rounded w-full whitespace-pre-wrap`}
                {...inspectorProps({ fieldId: 'manualContents' })}
              >
                {JSON.stringify(updatedPost.automaticContent)}
              </pre>
            </div>
          )}
          {updatedPost.simpleView && (
            <p
              className="mb-2 text-[.8rem]"
              {...inspectorProps({ fieldId: 'simpleView' })}
            >
              <strong>Simple view:</strong> {updatedPost.simpleView}
            </p>
          )}
          {updatedPost.customView?.name && (
            <p
              className="mb-2 text-[.8rem]"
              {...inspectorProps({ fieldId: 'customView' })}
            >
              <strong>Custom view:</strong> {updatedPost.customView.name}
            </p>
          )}
          {updatedPost.ctaCollection?.items?.map((cta) => (
            <div key={cta.sys?.id} {...inspectorProps({ fieldId: 'cta' })}>
              <button className="mt-4 bg-gray-500 border border-solid border-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-3">
                {cta.title}
              </button>
            </div>
          ))}
        </section>
      </div>
    </fieldset>
  );
};

export default PromoDefaultBlock;

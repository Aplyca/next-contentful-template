'use client';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import CustomImage from '@/components/atoms/custom-image/CustomImage';
import { DEFAULT_FORMATTER_OPTIONS } from '@/constants/richtext.constants';
import type { PageProps } from '@/types/page.types';
import { ralewayFont } from '@/ui/fonts';
import jsonToReactComponents from '@/utils/block-renderer.functions';
import { attachLinksToRichtextContent } from '@/utils/richtext.functions';

const PreviewPageContainer: React.FC<PageProps> = (
  pageInfo,
): React.ReactNode => {
  const updatedPost = useContentfulLiveUpdates(pageInfo);
  const inspectorProps = useContentfulInspectorMode({
    entryId: pageInfo.sys.id,
  });

  return (
    <div
      {...inspectorProps({ fieldId: 'blocks' })}
      className="w-full flex flex-1 flex-col items-center justify-start lg:max-w-5xl"
    >
      {updatedPost?.media?.url && (
        <div
          {...inspectorProps({ fieldId: 'media' })}
          className="w-full overflow-hidden relative aspect-[6/1]"
        >
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
              className="object-cover w-full h-full"
              src={updatedPost.media.url}
              alt={updatedPost.media.description ?? updatedPost.media.title}
              width={1920}
              height={320}
            />
          )}
        </div>
      )}

      {(updatedPost?.title || updatedPost?.subtitle) &&
        !updatedPost.displayOptions?.includes('Hide heading') && (
          <h1
            {...inspectorProps({ fieldId: 'title' })}
            className={`${ralewayFont.className} font-bold text-center text-5xl mt-4 mb-9`}
          >
            {updatedPost?.title}
            {updatedPost?.subtitle && (
              <small
                {...inspectorProps({ fieldId: 'subtitle' })}
                className="text-center block text-xs font-medium mt-3"
              >
                {updatedPost.subtitle}
              </small>
            )}
          </h1>
        )}

      {updatedPost?.content?.json && (
        <div {...inspectorProps({ fieldId: 'content' })}>
          {documentToReactComponents(
            attachLinksToRichtextContent(
              updatedPost.content.json,
              updatedPost.content?.links ?? {},
            ),
            DEFAULT_FORMATTER_OPTIONS,
          )}
        </div>
      )}

      {jsonToReactComponents(updatedPost?.blocksCollection?.items ?? [])}
    </div>
  );
};

export default PreviewPageContainer;

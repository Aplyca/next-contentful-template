'use client';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import CustomImage from '@/components/atoms/custom-image/CustomImage';
import { DEFAULT_FORMATTER_OPTIONS } from '@/constants/richtext.constants';
import { type ArticleProps } from '@/types/blog.types';
import { ralewayFont } from '@/ui/fonts';
import { attachLinksToRichtextContent } from '@/utils/richtext.functions';

const PreviewArticleContainer: React.FC<ArticleProps> = (
  pageInfo,
): React.ReactNode => {
  const updatedPost = useContentfulLiveUpdates(pageInfo);
  const inspectorProps = useContentfulInspectorMode({
    entryId: pageInfo.sys.id,
  });

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-start lg:max-w-5xl">
      {updatedPost?.media?.url && (
        <div
          {...inspectorProps({ fieldId: 'media' })}
          className="w-full overflow-hidden relative aspect-[6/1] lg:max-w-5xl"
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

      {updatedPost?.title && (
        <h1
          {...inspectorProps({ fieldId: 'title' })}
          className={`${ralewayFont.className} font-bold text-center text-5xl mt-4 mb-9`}
        >
          {updatedPost.title}
        </h1>
      )}

      {updatedPost?.body?.json && (
        <div {...inspectorProps({ fieldId: 'body' })}>
          {documentToReactComponents(
            attachLinksToRichtextContent(
              updatedPost.body.json,
              updatedPost.body?.links ?? {},
            ),
            DEFAULT_FORMATTER_OPTIONS,
          )}
        </div>
      )}
    </div>
  );
};

export default PreviewArticleContainer;

import _ from 'lodash';

import { MINIMAL_SUFIX } from '@/constants/contentful-names.constants';
import { CONTENT_REFERENCES } from '@/constants/contentful-references.contants';

import getEntryContent, {
  type DefaultBlockInfo,
} from './entry-content.service';
import getRichtextReferences from './richtext-references.service';

const getContentReferences = async ({
  content,
  preview = false,
  actualDepth = 1,
  referenceOverride = null,
  maxDepthRecursion = 6,
}: {
  content: DefaultBlockInfo & Record<string, any>;
  preview: boolean;
  actualDepth?: number;
  referenceOverride?: any;
  maxDepthRecursion?: number;
}): Promise<any> => {
  let referencesContent: any = {};

  if (actualDepth > maxDepthRecursion) return content;

  if (!Array.isArray(content) && !content?.sys?.id) return null;

  if (Array.isArray(content)) {
    referencesContent = [];
    for (const contentItem of content) {
      const itemReferenceContent = await getContentReferences({
        content: contentItem,
        preview,
        actualDepth,
        referenceOverride,
        maxDepthRecursion,
      });
      referencesContent.push(itemReferenceContent);
    }
  } else {
    referencesContent =
      Object.keys(content).length <= 2
        ? await getEntryContent({ blockInfo: content, preview })
        : content;

    const references = referenceOverride
      ? referenceOverride[content.__typename]
      : CONTENT_REFERENCES[content.__typename];

    if (!Array.isArray(references)) {
      return referencesContent;
    }

    for (const ref of references) {
      if (referencesContent?.[ref]?.items?.length) {
        const subRefrencesContent = await getContentReferences({
          content: referencesContent[ref].items,
          preview,
          actualDepth: actualDepth + 1,
          referenceOverride,
          maxDepthRecursion,
        });

        if (subRefrencesContent) {
          _.merge(referencesContent[ref].items, subRefrencesContent);
        }
      } else if (referencesContent?.[ref]?.sys?.id) {
        if (ref === 'parent') {
          referencesContent[ref].__typename += MINIMAL_SUFIX;
        }

        const subRefrencesContent = await getContentReferences({
          content: referencesContent[ref],
          preview,
          actualDepth: actualDepth + 1,
          referenceOverride,
          maxDepthRecursion,
        });

        if (subRefrencesContent) {
          _.merge(referencesContent[ref], subRefrencesContent);
        }
      }
    }
  }

  return referencesContent;
};

export const getBlockInfo = async (
  blockInfo: any,
  preview: boolean,
  levelBlock = 2,
): Promise<any> => {
  try {
    const { responseData: blockEntryContent } = await getEntryContent<any>({
      blockInfo,
      preview,
  });

    if (CONTENT_REFERENCES[blockEntryContent.__typename]) {
      for (const ref of CONTENT_REFERENCES[blockEntryContent.__typename]) {
        if (blockEntryContent?.[ref]?.items?.length) {
          for (const element of blockEntryContent[ref].items) {
            const refItem = element;

            if (refItem?.__typename && refItem?.sys?.id) {
              const subBlock = await getBlockInfo(
                refItem,
                preview,
                levelBlock + 1,
              );
              _.merge(refItem, subBlock);
            }
          }
        }
      }

      const richtextReferences: Record<string, any> =
        await getRichtextReferences({
          content: blockEntryContent,
          preview,
        });
      if (
        richtextReferences &&
        typeof richtextReferences === 'object' &&
        Object.keys(richtextReferences).length > 0
      ) {
        _.merge(blockEntryContent, richtextReferences);
      }
    }

    return blockEntryContent;
  } catch (e: any) {
    console.error('Error on getBlockInfo reason:', e);
    return null;
  }
};

export default getContentReferences;

import { gql } from '@apollo/client';

import { CONTENTFUL_TYPE_NAMES } from '@/constants/contentful-names.constants';
import CONTENTFUL_QUERY_MAPS from '@/constants/contentful-query-maps.constants';
import { RICHTEXT_REFERENCES } from '@/constants/contentful-references.contants';
import { RichTextLinksFragments, RichtextLinksQuery } from '@/queries/misc/richtext.gql';

import { getBlockInfo } from './content-references.service';
import contentfulClient, {
  removeUnresolved,
} from './contentful-client.service';

const getRichtextReferences = async ({
  content,
  preview,
}: {
  content: any;
  preview: boolean;
}): Promise<any> => {
  if (
    !content?.sys?.id &&
    RICHTEXT_REFERENCES[content.__typename] !== undefined
  )
    return null;

  const references = RICHTEXT_REFERENCES[content.__typename];
  if (!Array.isArray(references)) return null;

  const referencesContent: any = {};
  const { queryName: type } = CONTENTFUL_QUERY_MAPS[content.__typename];

  const newReferences = references.filter((ref) => {
    const textoJSON = JSON.stringify(content?.[ref]);
    return (
      content?.[ref] &&
      (textoJSON?.includes('embedded-entry-block') ||
        textoJSON?.includes('embedded-entry-inline') ||
        textoJSON?.includes('embedded-asset-block') ||
        textoJSON?.includes('asset-hyperlink'))
    );
  });

  const contentReferences = newReferences
    .map((ref) => `${ref}{ ${RichtextLinksQuery} }`)
    .join('');

  if (!contentReferences) return null;

  let responseData = null;
  let responseError = null;
  try {
    ({ data: responseData, errors: responseError } = await contentfulClient(
      preview,
    ).query({
      query: gql`
        ${RichTextLinksFragments}
        query getReferencesRichText($id: String!, $preview: Boolean!) {
          ${type}(id: $id, preview: $preview) {
            ${contentReferences}
          }
        }
      `,
      variables: {
        id: content.sys.id,
        preview,
      },
      errorPolicy: 'all',
    }));
    responseData = removeUnresolved(responseData, responseError);
  } catch (e: any) {
    console.error(`Error on getReferencesRichtext reason: `, e);
    return null;
  }

  for (const ref of newReferences) {
    const richTextContent = JSON.parse(
      JSON.stringify(responseData?.[type]?.[ref]),
    );

    if (richTextContent?.links?.entries?.block?.length > 0) {
      let blockIndex = 0;
      for (const linkEntry of richTextContent.links.entries.block) {
        if (
          linkEntry.__typename === CONTENTFUL_TYPE_NAMES.BLOCK_CONTENT_PROMO
        ) {
          richTextContent.links.entries.block[blockIndex] = await getBlockInfo(
            linkEntry,
            preview,
          );
        }
        blockIndex++;
      }
    }

    referencesContent[ref] = richTextContent;
  }

  return referencesContent;
};

export default getRichtextReferences;

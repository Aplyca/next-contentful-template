import { gql } from '@apollo/client';
import _ from 'lodash';

import { MINIMAL_SUFIX } from '@/constants/contentful-names.constants';
import CONTENTFUL_QUERY_MAPS from '@/constants/contentful-query-maps.constants';

import getContentReferences from './content-references.service';
import contentfulClient, {
  removeUnresolved,
} from './contentful-client.service';
import getRichtextReferences from './richtext-references.service';

export interface DefaultBlockInfo {
  __typename: string;
  sys: {
    id: string;
  };
}

const getEntryContent = async (
  blockInfo: DefaultBlockInfo,
  preview = false,
  recursive = false,
  overrideMaxDepth = 0,
  locale = 'en',
): Promise<any> => {
  if (!blockInfo || !CONTENTFUL_QUERY_MAPS[blockInfo.__typename]) {
    console.error(
      `Error on getEntryContent: «blockInfo» are required or it's not defined`,
    );
    return null;
  }

  let responseData = null;
  let responseError = null;

  if (!blockInfo?.sys?.id) {
    console.error(`Error on entry query, sys.id not defined => `, blockInfo);
    return null;
  }

  const {
    queryName: type,
    query,
    fragments = '',
  } = CONTENTFUL_QUERY_MAPS[blockInfo.__typename];

  try {
    ({ data: responseData, errors: responseError } = await contentfulClient(
      preview,
    ).query({
      query: gql`
        ${fragments}
        query getEntry($id: String!, $preview: Boolean!, $locale: String = "en") {
          ${type}(id: $id, preview: $preview, locale: $locale) {
            ${query}
          }
        }
      `,
      variables: {
        id: blockInfo.sys.id,
        preview,
        locale,
      },
      errorPolicy: 'all',
    }));
    responseData = removeUnresolved(responseData, responseError);
  } catch (e: any) {
    console.error(`Error on getEntryContent reason:`, e.message);
    return null;
  }

  if (!responseData?.[type]) return null;

  const entryContent = JSON.parse(JSON.stringify(responseData?.[type]));

  if (blockInfo.__typename.endsWith(MINIMAL_SUFIX)) {
    entryContent.__typename = blockInfo.__typename + MINIMAL_SUFIX;
  }

  const richtextReferences: Record<string, any> = await getRichtextReferences({
    content: entryContent,
    preview,
  });
  if (
    richtextReferences &&
    typeof richtextReferences === 'object' &&
    Object.keys(richtextReferences).length > 0
  ) {
    _.merge(entryContent, richtextReferences);
  }

  if (recursive) {
    if (entryContent?.parent?.__typename) {
      entryContent.parent.__typename += MINIMAL_SUFIX;
    }

    const referencesContent = await getContentReferences({
      content: entryContent,
      maxDepthRecursion: overrideMaxDepth,
      preview,
    });

    _.merge(entryContent, referencesContent);
  }

  return entryContent;
};

export default getEntryContent;

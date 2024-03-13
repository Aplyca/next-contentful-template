
import { gql } from '@apollo/client';

import CONTENTFUL_QUERY_MAPS from '@/constants/contentful-query-maps.constants';
import { CONTENT_TYPES_MAP, SORT_BY } from '@/constants/search.constants';
import { type BlockContentFilterProps } from '@/types/search.types';

import getContentfulClient from './contentful-client.service';

interface ContentfulSearchContentType {
  automaticEntryContent: BlockContentFilterProps;
  excludedIds?: string[];
  preview?: boolean;
}

interface SearchContentResult {
  items: any[];
  totalPages: number;
}

export const getContentfulContent = async ({
  automaticEntryContent,
  excludedIds = [],
  preview = false,
}: ContentfulSearchContentType): Promise<SearchContentResult> => {
  const contentResult: any = {
    items: [],
    totalPages: 0,
  };

  const { contentTypes, sortBy, itemsPerPage } = automaticEntryContent;
  const itemToRetrieve = (itemsPerPage ?? 0) - (excludedIds?.length ?? 0);
  const order = SORT_BY[contentTypes?.[0] ?? '_']?.[sortBy ?? '_'] ?? null;
  const contentDef =
    CONTENTFUL_QUERY_MAPS[CONTENT_TYPES_MAP[contentTypes?.[0] ?? '_']];

  if (
    itemToRetrieve <= 0 ||
    !CONTENT_TYPES_MAP[contentTypes?.[0] ?? '_'] ||
    !contentDef
  ) {
    return contentResult;
  }

  try {
    const { data: responseData } = await getContentfulClient(preview).query({
      query: gql`
        query getAutomaticContent($limit: Int!, $preview: Boolean!, $excludedIds: [String] = []) {
          ${contentDef.queryName}Collection(
            where: { sys: { id_not_in: $excludedIds } }, limit: $limit, preview: $preview${
              order ? ', order: ' + order : ''
            }
          ) {
            items {
              ${contentDef.query}
            }
            total
          }
        }
      `,
      variables: { limit: itemToRetrieve, preview, excludedIds },
      errorPolicy: 'all',
    });

    if (
      responseData?.[contentDef.queryName + 'Collection']?.items &&
      responseData?.[contentDef.queryName + 'Collection']?.total
    ) {
      contentResult.items.push(
        ...responseData[contentDef.queryName + 'Collection'].items,
      );
      contentResult.totalPages = Math.ceil(
        responseData[contentDef.queryName + 'Collection'].total /
          itemToRetrieve,
      );
    }
  } catch (e: any) {
    console.error(
      'Error on populateAutomaticContent (getContentfulContent) reason: ',
      e.message,
    );
  }

  return contentResult;
};

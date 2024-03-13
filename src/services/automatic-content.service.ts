import { getContentfulContent } from './search.service';

const populateAutomaticContent = async (
  blockEntryContent: any,
  preview = false,
): Promise<any> => {
  if (!blockEntryContent?.automaticContent?.contentTypes) {
    return null;
  }

  const { numberItems } = blockEntryContent.automaticContent;
  const itemToRetrieve =
    numberItems -
    (blockEntryContent?.manualContentsCollection?.items?.length ?? 0);

  if (itemToRetrieve <= 0) {
    return null;
  }

  const excludedIds: string[] =
    blockEntryContent?.manualContentsCollection?.items.map(
      (item: any) => item.sys.id,
    ) ?? [];

  let items = [];
  let totalPages = 0;
  const facets = {};

  if (blockEntryContent.automaticContent.searchEngine === 'Algolia') {
    // TODO: Implement Algolia search
  } else {
    ({ items, totalPages } = await getContentfulContent({
      automaticEntryContent: blockEntryContent.automaticContent,
      preview,
      excludedIds,
    }));
  }

  return { items, totalPages, facets };
};

export default populateAutomaticContent;

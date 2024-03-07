import DefaultQuery from "../misc.gql";

const ContentFilterQuery = `
  ${DefaultQuery}
  name
  searchEngine
  contentTypes
  facets
  sortBy
  itemsPerPage
  extraConditions
`;

export default ContentFilterQuery;
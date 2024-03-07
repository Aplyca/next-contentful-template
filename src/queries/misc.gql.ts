import { CONTENTFUL_TYPE_NAMES } from "@/constants/contentful-names.constants";

import CustomContentQuery from "./blocks/custom-content.gql";
import { PageMinimalQuery } from "./page.gql";

const DefaultQuery = `
  __typename
  sys {
    id
  }
`;

export const RichtextQuery = `
  json
`;

export const AssetQuery = `
  sys { id }
  title
  description
  fileName
  contentType
  url
`;

export const AssetImageQuery = `
  ${AssetQuery}
  width
  height
`;

export default DefaultQuery;

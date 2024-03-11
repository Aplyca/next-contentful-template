import { CONTENTFUL_TYPE_NAMES } from "@/constants/contentful-names.constants";

import DefaultQuery, { AssetImageQuery } from "../misc.gql";

export const CustomContentMinimalQuery = `
  ${DefaultQuery}
  title
  description
  image {
    ${AssetImageQuery}
  }
`;

const CustomContentQuery = `
  ${CustomContentMinimalQuery}
  mediaLink {
    title
    url
  }
  internalLink {
    ...on ${CONTENTFUL_TYPE_NAMES.PAGE} {
      urlPaths
    }
    ...on ${CONTENTFUL_TYPE_NAMES.ARTICLE} {
      urlPaths
    }
  }
  externalLink
  linkParameters
`;

export default CustomContentQuery;
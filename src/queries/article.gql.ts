import { AssetImageQuery } from './misc.gql';

export const ArticleMinimalQuery = `
  __typename
  sys {
    id
    publishedAt
  }
  title
  description
  media {
    ${AssetImageQuery}
  }
  category
  urlPaths
`;

const ArticleQuery = `
  ${ArticleMinimalQuery}
  slug
  body {
    json
  }
`;

export default ArticleQuery;

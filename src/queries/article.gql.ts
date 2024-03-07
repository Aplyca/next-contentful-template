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
`;

const ArticleQuery = `
  ${ArticleMinimalQuery}
  slug
  urlPaths
  body {
    json
  }
`;

export default ArticleQuery;

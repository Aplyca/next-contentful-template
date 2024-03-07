import {
  ApolloClient,
  ApolloLink,
  from,
  gql,
  HttpLink,
  InMemoryCache,
  type NormalizedCacheObject,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) console.error(graphQLErrors);
  if (networkError) console.warn(networkError);
});

const generalLink = new ApolloLink((operation, forward) => {
  const minifiedQuery =
    operation?.query?.loc?.source.body.replace(/\s\s+/g, ' ') ?? '';
  operation.query = gql`
    ${minifiedQuery}
  `;

  if (process.env.NODE_ENV !== 'production') {
    console.info(`Actual query: ««« \x1B[35m${minifiedQuery}\x1b[0m »»»`);
  }

  return forward(operation);
});

const combinedLink = errorLink.concat(generalLink);

const httpLink = (preview = false): HttpLink => {
  const CONTENTFUL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`;
  return new HttpLink({
    fetch,
    uri: CONTENTFUL_ENDPOINT,
    headers: {
      authorization: `Bearer ${
        preview
          ? process.env.CONTENTFUL_PREVIEW_API_TOKEN
          : process.env.CONTENTFUL_DELIVERY_API_TOKEN
      }`,
      'Content-Language': 'en',
    },
  });
};

const contentfulClient = (
  preview = false,
): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    link: from([combinedLink, httpLink(preview)]),
    cache: new InMemoryCache({}),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  });
};

// TODO: Change function to avoid use eval
export const removeUnresolved = (response: any, errors: any): any => {
  if (!errors?.length) {
    return response;
  }

  for (const error of errors) {
    let parentStatement = 'response';
    let deleteStatement = '';

    if (
      error?.extensions?.contentful?.code === 'UNRESOLVABLE_LINK' &&
      error?.path
    ) {
      for (let i = 0; i < error.path.length - 1; i++) {
        const currentpath = error.path[i];
        if (typeof currentpath === 'string') {
          parentStatement += `["${currentpath}"]`;
        } else {
          parentStatement += `[${currentpath}]`;
        }
      }

      // eslint-disable-next-line no-eval
      const parentValue = eval(parentStatement);
      const lastErrorPath = error.path[error.path.length - 1];

      if (Array.isArray(parentValue)) {
        deleteStatement = `${parentStatement}?.splice(${lastErrorPath},1)`;
      } else {
        deleteStatement = `delete ${parentStatement}["${lastErrorPath}"]`;
      }

      // eslint-disable-next-line no-eval
      eval(deleteStatement);
    }
  }

  return response;
};

export default contentfulClient;

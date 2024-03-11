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
import _ from 'lodash';

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
    console.info(`Actual query: «««\x1B[35m${minifiedQuery}\x1b[0m»»» Variables: `, JSON.stringify(operation?.variables));
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

const getContentfulClient = (
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

export const removeUnresolved = (response: any, errors: any): any => {
  if (!errors?.length) {
    return response;
  }

  for (const error of errors) {
    if (
      error?.extensions?.contentful?.code === 'UNRESOLVABLE_LINK' &&
      error?.path
    ) {
      const pathToDelete: string = error.path.join('.');
      _.unset(response, pathToDelete);
    }
  }

  return response;
};

export default getContentfulClient;

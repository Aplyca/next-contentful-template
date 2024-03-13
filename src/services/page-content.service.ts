import { gql } from '@apollo/client';
import _ from 'lodash';

import {
  CONTENTFUL_TYPE_NAMES,
  MINIMAL_SUFIX,
} from '@/constants/contentful-names.constants';
import CONTENTFUL_QUERY_MAPS from '@/constants/contentful-query-maps.constants';
import { type ArticleProps } from '@/types/blog.types';
import { type PageProps } from '@/types/page.types';

import getContentReferences from './content-references.service';
import contentfulClient, {
  removeUnresolved,
} from './contentful-client.service';
import getReferencesRichtextContent from './richtext-references.service';

const allowedTypeNamesAsPages: string[] = [
  CONTENTFUL_TYPE_NAMES.PAGE,
  CONTENTFUL_TYPE_NAMES.ARTICLE,
];

const allowedQueryNamesAsPages: string[] = allowedTypeNamesAsPages.map(
  (t) => CONTENTFUL_QUERY_MAPS[t].queryName,
);

const getPageContent = async ({
  urlPath,
  preview = false,
  recursive = true,
  locale = 'en',
}: {
  urlPath: string;
  preview?: boolean;
  recursive?: boolean;
  locale?: string;
}): Promise<(PageProps & ArticleProps) | null> => {
  if (!urlPath || urlPath === '') throw new Error(`«urlPath» is required`);

  let responseData: Record<string, any> | null = null;
  let responseError: any | null = null;

  const graphQlParts: Record<string, string[]> = {
    queries: [],
    fragments: [],
  };

  for (const type of allowedTypeNamesAsPages) {
    if (CONTENTFUL_QUERY_MAPS[type]) {
      const { queryName, query, fragments = '' } = CONTENTFUL_QUERY_MAPS[type];

      graphQlParts.fragments.push(fragments);
      graphQlParts.queries.push(`
        ${queryName}Collection(where: { urlPaths_contains_some: [$urlPath] }, limit: 1, preview: $preview, locale: $locale) {
          items {
            ${query}
          }
        }
      `);
    }
  }

  try {
    ({ data: responseData, errors: responseError } = await contentfulClient(
      preview,
    ).query({
      query: gql`
        ${graphQlParts.fragments.join('\n')}
        query getPage($urlPath: String!, $preview: Boolean!, $locale: String = "en") {
          ${graphQlParts.queries.join('\n')}
        }
      `,
      variables: { urlPath, preview, locale },
      errorPolicy: 'all',
    }));
    responseData = removeUnresolved(responseData, responseError);
  } catch (e: any) {
    console.error('Error on getPageContent reason:', e.message);
    return null;
  }

  const typeFound = Object.keys(responseData ?? {}).find((tf) => {
    return (
      allowedQueryNamesAsPages.includes(tf.replace('Collection', '')) &&
      responseData?.[tf]?.items?.[0]
    );
  });

  if (!typeFound || !responseData?.[typeFound]?.items?.[0]) {
    return null;
  }

  const pageContent: PageProps & ArticleProps = _.cloneDeep(
    responseData[typeFound]?.items?.[0],
  );

  const richtextPageContent: Record<string, any> =
    await getReferencesRichtextContent({
      content: pageContent,
      preview,
    });

  if (
    richtextPageContent &&
    typeof richtextPageContent === 'object' &&
    Object.keys(richtextPageContent).length > 0
  ) {
    _.merge(pageContent, richtextPageContent);
  }

  if (recursive) {
    if (pageContent?.parent?.__typename) {
      pageContent.parent.__typename += MINIMAL_SUFIX;
    }

    const referencesContent = await getContentReferences({
      content: pageContent,
      maxDepthRecursion: 2,
      preview,
    });

    _.merge(pageContent, referencesContent);
  }

  return pageContent;
};

export default getPageContent;

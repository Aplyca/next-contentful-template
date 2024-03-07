import { CONTENTFUL_TYPE_NAMES } from '@/constants/contentful-names.constants';

import DefaultQuery, { AssetImageQuery, RichtextQuery } from '../misc.gql';

export const NavigationFragments = `
  fragment CustomContentDefaultFragment on ${CONTENTFUL_TYPE_NAMES.CUSTOM_CONTENT} {
    ${DefaultQuery}
  }
  fragment PageDefaultFragment on ${CONTENTFUL_TYPE_NAMES.PAGE} {
    ${DefaultQuery}
  }
  fragment ArticleDefaultFragment on ${CONTENTFUL_TYPE_NAMES.ARTICLE} {
    ${DefaultQuery}
  }
`;

const NavigationQuery = `
  ${DefaultQuery}
  name
  title
  image {
    ${AssetImageQuery}
  }
  mainNavigationCollection(limit: 10) {
    items {
      ...on ${CONTENTFUL_TYPE_NAMES.NAVIGATION} {
        ${DefaultQuery}
        mainNavigationCollection(limit: 10) {
          items {
            ...CustomContentDefaultFragment
            ...PageDefaultFragment
            ...ArticleDefaultFragment
          }
        }
      }
      ...CustomContentDefaultFragment
      ...PageDefaultFragment
      ...ArticleDefaultFragment
    }
  }
  auxiliaryNavigationCollection(limit: 10) {
    items {
      ...on ${CONTENTFUL_TYPE_NAMES.NAVIGATION} {
        ${DefaultQuery}
        mainNavigationCollection(limit: 10) {
          items {
            ...CustomContentDefaultFragment
            ...PageDefaultFragment
            ...ArticleDefaultFragment
          }
        }
      }
      ...CustomContentDefaultFragment
      ...PageDefaultFragment
      ...ArticleDefaultFragment
    }
  }
  mainText {
    ${RichtextQuery}
  }
  secondaryText {
    ${RichtextQuery}
  }
`;

export default NavigationQuery;

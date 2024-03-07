import { CONTENTFUL_TYPE_NAMES } from '@/constants/contentful-names.constants';

import CustomContentQuery from '../blocks/custom-content.gql';
import DefaultQuery, { AssetImageQuery, AssetQuery } from '../misc.gql';
import { PageMinimalQuery } from '../page.gql';

export const RichTextLinksFragments = `
  fragment PageMinimalFragment on ${CONTENTFUL_TYPE_NAMES.PAGE} {
    ${PageMinimalQuery}
  }
  fragment CustomContentFragment on ${CONTENTFUL_TYPE_NAMES.CUSTOM_CONTENT} {
    ${CustomContentQuery}
  }
`;

export const RichtextLinksQuery = `
  json
  links {
    entries {
      block {
        ${DefaultQuery}
      }
      inline {
        ...PageMinimalFragment
        ...CustomContentFragment
      }
    }
    assets {
      block {
        ${DefaultQuery}
        ${AssetImageQuery}
      }
      hyperlink {
        ${DefaultQuery}
        ${AssetQuery}
      }
    }
  }
`;

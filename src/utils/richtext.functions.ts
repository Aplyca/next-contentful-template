import type { Document } from '@contentful/rich-text-types';
import _ from 'lodash';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const attachLinksToRichtextContent = (jsonDocument: any, links: any): Document => {
  const resultDocument = _.clone(jsonDocument);
  if (!links) return jsonDocument;

  const { content } = jsonDocument;

  for (const kCont in content) {
    let blockInfo = null;

    switch (content[kCont].nodeType) {
      case 'embedded-asset-block':
        blockInfo = links?.assets?.block?.find((itemLink: any) => itemLink?.sys?.id === content[kCont].data?.target?.sys?.id);
        break;
      case 'embedded-entry-block':
        blockInfo = links?.entries?.block?.find((itemLink: any) => itemLink?.sys?.id === content[kCont].data?.target?.sys?.id);
        break;
      case 'embedded-entry-inline':
        blockInfo = links?.entries?.inline?.find((itemLink: any) => itemLink?.sys?.id === content[kCont].data?.target?.sys?.id);
        break;
      case 'asset-hyperlink':
        blockInfo = links?.assets?.hyperlink?.find((itemLink: any) => itemLink?.sys?.id === content[kCont].data?.target?.sys?.id);
        break;
      case 'paragraph':
        content[kCont] = attachLinksToRichtextContent(content[kCont], links);
        break;
      default:
        continue;
    }

    if (blockInfo && blockInfo != null) {
      _.merge(resultDocument.content[kCont].data.target, blockInfo);
    }
  }

  return resultDocument;
};

/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createElement } from 'react';

import PromoDefaultBlock from '@/components/blocks/promo-default/PromoDefaultBlock';
import {
  BLOCKS_VIEW_MAP,
  CHILDREN_KEYS_MAP,
} from '@/constants/blocks-view-map.constants';
import { type BlockContentPromoProps } from '@/types/block.types';

const viewNoSupported = (
  blockInfo: BlockContentPromoProps | string | null,
): React.ReactNode => {
  if (
    blockInfo &&
    typeof blockInfo !== 'string' &&
    process.env.NODE_ENV === 'development'
  ) {
    return createElement(PromoDefaultBlock, blockInfo);
  } else if (typeof blockInfo === 'string') {
    return createElement(
      'div',
      {
        className:
          'w-full bg-red-300 border border-red-500 text-red-500 rounded px-4 py-2',
        key: `${blockInfo}`,
      },
      `Block of contet is not defined: ${blockInfo}
      }`,
    );
  }

  return null;
};

const jsonToReactComponents = (
  jsonItems: BlockContentPromoProps[],
  attachProps = {},
): React.ReactNode => {
  return jsonItems.map((item: BlockContentPromoProps, key: number) => {
    if (!item?.__typename) {
      return viewNoSupported(`NonMappedBlock_${key}`);
    }

    let view: any = BLOCKS_VIEW_MAP[item.__typename];

    if (view && item?.simpleView) {
      view = view[item.simpleView];
    }

    if (view && item?.customView?.__typename) {
      view = view[item.customView.__typename];
    }

    if (!view || typeof view === 'object') {
      return viewNoSupported(item);
    }

    const cleanItem: any = {
      ...item,
      ...attachProps,
      isFirst: key === 0,
      isLast: key === jsonItems.length - 1,
      key: item.__typename + '-' + key,
      asBlock: true,
    };

    try {
      return createElement(
        view,
        { ...cleanItem },
        cleanItem[CHILDREN_KEYS_MAP[cleanItem.__typename]] &&
          jsonToReactComponents(
            cleanItem[CHILDREN_KEYS_MAP[item.__typename]].items,
          ),
      );
    } catch (e: any) {
      console.error(`Error rendering view «${view}», reason: ${e.message}`);
      return viewNoSupported(item);
    }
  });
};

export default jsonToReactComponents;

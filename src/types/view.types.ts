import { type DefaultBlockInfo } from "@/services/entry-content.service";

export type SimpleViewOptions = null | 'Main image';

export interface ViewGridCardsProps {
  itemsPerRow: number;
  alignment: 'Left' | 'Right' | 'Center';
}

export interface ViewPromoBlock extends DefaultBlockInfo, ViewGridCardsProps {
  name: string;
}

import { type Document as RichTextDocument } from '@contentful/rich-text-types';

export interface DefaultBlockInfoProps {
  __typename: string;
  sys: {
    id: string;
  };
  key?: string;
}

export interface AssetProps extends DefaultBlockInfoProps {
  title: string;
  description?: string;
  fileName: string;
  contentType: string;
  url: string;
  width?: number;
  height?: number;
}

export interface ContentfulRichtext {
  json: RichTextDocument;
  links?: {
    assets?: {
      block?: AssetProps[];
    };
  };
}

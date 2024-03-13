import { type Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import Image from 'next/image';

import CustomLink from '@/components/atoms/custom-link/CustomLink';
import { type AssetProps } from '@/types/misc.types';
import jsonToReactComponents from '@/utils/block-renderer.functions';

export const DEFAULT_FORMATTER_OPTIONS: Options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (_node: any, children: any) => (
      <h1 className="text-4xl font-bold">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (_node: any, children: any) => (
      <h2 className="text-3xl font-semibold">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node: any, children: any) => (
      <h3 className="text-2xl font-semibold">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (_node: any, children: any) => (
      <h4 className="text-xl font-semibold">{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (_node: any, children: any) => (
      <h5 className="text-lg font-semibold">{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (_node: any, children: any) => (
      <h6 className="text-base font-semibold">{children}</h6>
    ),
    [BLOCKS.PARAGRAPH]: (_node: any, children: any) => (
      <p className="mb-2 last:mb-0">{children}</p>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const item: AssetProps = node.data.target;

      return (
        <div className="w-full relative aspect-video overflow-hidden rounded-sm my-4">
          {item.contentType?.includes('image') && (
            <Image
              className="object-contain w-full h-full"
              src={item.url}
              alt={item.description ?? item.title}
              width={item.width}
              height={item.height}
            />
          )}
          {item.contentType?.startsWith('video') && (
            <video
              className="object-cover w-full h-full"
              src={item.url}
              autoPlay
              loop
              muted
              controls
            />
          )}
        </div>
      );
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
      return (
        <div
          className="embedded-entry-block my-4"
          key={node?.data.target.sys.id}
        >
          {jsonToReactComponents([node.data.target])}
        </div>
      );
    },
    [INLINES.EMBEDDED_ENTRY]: (node: any) => {
      const item = node.data.target;

      return (
        <CustomLink
          content={item}
          linkClassName="hover:text-gray-700 inline-block mr-4 my-1.5 underline"
          childrenClassName="block currentColor"
        >
          {item.title ?? item.name}
        </CustomLink>
      );
    },
    [INLINES.HYPERLINK]: (node, children) => {
      return (
        <a
          className="hover:text-gray-700 underline transition-colors duration-500"
          href={node.data.uri}
          target="_blank"
          rel="noreferrer"
        >
          {children}
        </a>
      );
    },
    [INLINES.ASSET_HYPERLINK]: (node, children) => {
      return (
        <a
          className="hover:text-gray-700 underline transition-colors duration-500"
          href={node.data.target.url}
          target="_blank"
          rel="noreferrer"
        >
          {children}
        </a>
      );
    },
    [BLOCKS.TABLE]: (_node: any, children: any) => (
      <div className="overflow-x-auto w-full my-4 block">
        <table className="min-w-full whitespace-nowrap bg-white dark:bg-transparent divide-y divide-gray-300">
          <tbody>{children}</tbody>
        </table>
      </div>
    ),
    [BLOCKS.TABLE_ROW]: (_node: any, children: any) => (
      <tr className="text-black dark:text-white text-left">{children}</tr>
    ),
    [BLOCKS.TABLE_HEADER_CELL]: (_node, children) => (
      <th className="bg-black text-white text-left px-3 py-1 border-b border-r last:border-r-0 border-b-gray-500 border-solid">
        {children}
      </th>
    ),
    [BLOCKS.TABLE_CELL]: (_node: any, children: any) => (
      <td className="text-[15px] xl:text-[16px] leading-tight md:leading-[1.4] px-3 py-1 border-r last:border-r-0 border-b-gray-500 border-solid">
        {children}
      </td>
    ),
  },
  renderMark: {
    [MARKS.BOLD]: (text: any) => <strong className="font-bold">{text}</strong>,
    [MARKS.ITALIC]: (text: any) => <em className="italic">{text}</em>,
    [MARKS.CODE]: (text: any) => (
      <pre className="text-sm overflow-y-auto max-h-80 bg-gray-200 border border-gray-300 p-3 rounded w-full whitespace-pre-wrap">
        {text}
      </pre>
    ),
    [MARKS.UNDERLINE]: (text: any) => <span className="underline">{text}</span>,
  },
};

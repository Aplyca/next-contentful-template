'use client';
import NextImage, { type ImageProps } from 'next/image';

type ContentfulAllowedFormats = 'jpg' | 'png' | 'gif' | 'webp' | 'avif';

const CustomImage: React.FC<
  ImageProps & { format?: ContentfulAllowedFormats }
> = ({ format = 'avif', ...props }) => {
  const { src, width, quality } = props;

  let assetUrlOptimized = src;
  if (typeof src === 'string' && !src.endsWith('.svg')) {
    try {
      const assetsUrl = new URL(src);

      !assetsUrl.searchParams.get('fm') &&
        assetsUrl.searchParams.set('fm', format);

      !assetsUrl.searchParams.get('q') &&
        assetsUrl.searchParams.set('q', quality?.toString() ?? '75');

      !assetsUrl.searchParams.get('w') &&
        assetsUrl.searchParams.set('w', width?.toString() ?? '1920');

      assetUrlOptimized = assetsUrl.href;
    } catch (e: any) {
      console.warn(
        `Can't generate optimized url for «${src}». Reason: ${e.message}`,
      );
    }
  }

  return <NextImage {...{ ...props, href: assetUrlOptimized }} />;
};

export default CustomImage;

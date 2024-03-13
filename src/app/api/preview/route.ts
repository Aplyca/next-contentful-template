import { cookies, draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server';

import { CONTENTFUL_QUERY_NAMES } from '@/constants/contentful-names.constants';
import getPageContent from '@/services/page-content.service';
import { type ArticleProps } from '@/types/blog.types';
import { type PageProps } from '@/types/page.types';

const ENTRY_MAP_TYPES: Record<string, (path: string) => Promise<any>> = {
  [CONTENTFUL_QUERY_NAMES.PAGE]: async (path: string) =>
    await getPageContent({ urlPath: path, preview: true, recursive: false }),
  [CONTENTFUL_QUERY_NAMES.ARTICLE]: async (path: string) =>
    await getPageContent({ urlPath: path, preview: true, recursive: false }),
};

export const GET = async (
  request: NextRequest,
): Promise<NextResponse<any> | void> => {
  const { searchParams } = new URL(request.url);

  const secret = searchParams.get('secret') ?? '';
  const path = searchParams.get('path') ?? '';
  const type = searchParams.get('type') ?? '';

  if (
    process?.env?.DRAFT_SECRET_TOKEN &&
    secret !== process.env.DRAFT_SECRET_TOKEN
  ) {
    return new NextResponse('Invalid token', { status: 401 });
  }

  if (!Object.keys(ENTRY_MAP_TYPES).includes(type)) {
    return new NextResponse('Invalid type', { status: 400 });
  }

  const entry: PageProps & ArticleProps = await ENTRY_MAP_TYPES[type](path);
  if (!entry) {
    return new NextResponse(`Content with path "${path}" was not found`, {
      status: 404,
    });
  }

  draftMode().enable();

  const cookieStore = cookies();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const cookie = cookieStore.get('__prerender_bypass')!;
  cookies().set({
    name: '__prerender_bypass',
    value: cookie?.value,
    httpOnly: true,
    path: '/',
    secure: true,
    sameSite: 'none',
  });

  redirect(entry?.urlPaths?.[0] ?? path);
};

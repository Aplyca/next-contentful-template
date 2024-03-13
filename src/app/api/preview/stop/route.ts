import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { type NextRequest, type NextResponse } from 'next/server';

export const GET = async (req: NextRequest): Promise<NextResponse<any>> => {
  let refererURL = null;
  let refererPath = null;

  try {
    draftMode().disable();

    refererURL = req.headers.get('referer') ?? '/';
    refererPath = refererURL === '/' ? '/' : new URL(refererURL).pathname;
  } catch (e: any) {
    console.error('Error disabling draftMode', e.message);
  }

  redirect(refererPath ?? '/');
};

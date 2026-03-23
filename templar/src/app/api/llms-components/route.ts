import { NextResponse } from 'next/server';
import { getComponents } from '../../llms/components';

export const dynamic = 'force-dynamic';

export async function GET() {
  const components = getComponents();
  return NextResponse.json(components);
}

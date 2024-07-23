import { resources } from '../../../../public/data/resources.json';
import { events } from '../../../../public/data/events.json';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    resources: {
      rows: resources,
    },
    events: {
      rows: events,
    },
  });
}

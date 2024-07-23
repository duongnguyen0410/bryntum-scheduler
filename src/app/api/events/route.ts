import { events } from "../../../../public/data/events.json";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(events);
}

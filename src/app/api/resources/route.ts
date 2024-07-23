import { resources } from "../../../../public/data/resources.json";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(resources);
}

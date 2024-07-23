import { resources } from "../../../../public/data/resources.json";
import { NextRequest, NextResponse } from "next/server";

export async function POST(res: NextRequest, req: NextResponse) {
  console.log(res.body);
  return NextResponse.json({ message: "Resource created" });
}

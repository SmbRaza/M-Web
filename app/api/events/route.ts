import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  console.log("API Route Hit");

  const events = await prisma.events.findMany();

  return NextResponse.json(events);
}

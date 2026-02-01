import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  console.log("API Route Hit");

  const events = await prisma.events.findMany();

  return NextResponse.json(events);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, start_date, end_date } = body;

    if (!name || !start_date || !end_date) {
      return NextResponse.json(
        { error: "Missing required fields: name, start_date, end_date" },
        { status: 400 }
      );
    }

    const event = await prisma.events.create({
      data: {
        name: name,
        description: description,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
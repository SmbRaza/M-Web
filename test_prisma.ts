import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const events = await prisma.events.findMany();
    console.log("Events in database:", events);

    const newEvent = await prisma.events.create({
        data: {
            name: "Community Gathering",
            start_date: new Date("2024-07-15T18:00:00Z"),
            end_date: new Date("2024-07-15T21:00:00Z"),
        },
    });
    console.log("Created new event:", newEvent);
        
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
    
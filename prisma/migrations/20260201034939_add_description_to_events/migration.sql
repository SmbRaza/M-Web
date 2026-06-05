-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "events" (
    "event_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "start_date" TIMESTAMP(0) NOT NULL,
    "end_date" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("event_id")
);

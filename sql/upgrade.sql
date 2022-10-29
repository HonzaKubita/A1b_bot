-- This file runs everytime you start the database
-- Used for up upgrading the production database

CREATE TABLE IF NOT EXISTS "event" (
	"id" SERIAL PRIMARY KEY,
	"name" TEXT,
  "begining" DATE,
	"end" DATE
);
-- This file is run when you deploy the databse first time

CREATE TABLE IF NOT EXISTS "test" (
	"id" SERIAL PRIMARY KEY,
	"title" TEXT,
	"description" TEXT,
	"subject" TEXT,
	"date" DATE
);

CREATE TABLE IF NOT EXISTS "homework" (
	"id" SERIAL PRIMARY KEY,
	"title" TEXT,
	"descriptio" TEXT,
	"subject" TEXT,
	"due" DATE
);

CREATE TABLE IF NOT EXISTS "event" (
	"id" SERIAL PRIMARY KEY,
	"name" TEXT,
  "begining" DATE,
	"end" DATE
);
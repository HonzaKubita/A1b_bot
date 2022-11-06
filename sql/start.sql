-- This file runs everytime you create the database and everytime you run the update script

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

CREATE TABLE IF NOT EXISTS "reactioncallback" (
	"id" SERIAL PRIMARY KEY,
	"guild" TEXT,
	"messageid" TEXT,
  "callback" TEXT
);

CREATE TABLE IF NOT EXISTS "reactionrole" (
	"id" SERIAL PRIMARY KEY,
	"guild" TEXT,
	"messageid" TEXT,
  "emoji" TEXT,
  "roleid" TEXT
);
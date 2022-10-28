CREATE TABLE IF NOT EXISTS test(
	id SERIAL PRIMARY KEY,
	title TEXT,
	description TEXT,
	subject TEXT,
	date DATE
);

CREATE TABLE IF NOT EXISTS homework(
	id SERIAL PRIMARY KEY,
	title TEXT,
	description TEXT,
	subject TEXT,
	due DATE
);

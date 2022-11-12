DROP TABLE if exists Trades;

DROP Table if exists Users;

CREATE TABLE Users (
	ID SERIAL PRIMARY KEY,
	name VARCHAR(255)
);

INSERT INTO
	Users (name)
VALUES
	('Damanpreet Grewal');

INSERT INTO
	Users (name)
VALUES
	('Bruce Wayne');

DROP TYPE if exists execution_type;

CREATE TYPE executionType AS ENUM ('buy', 'sell');

CREATE TABLE Trades(
	id SERIAL NOT NULL PRIMARY KEY,
	ticker VARCHAR(10) NOT NULL,
	amount DECIMAL NOT NULL,
	price DECIMAL NOT NULL,
	execution_type executionType NOT NULL,
	execution_date TIMESTAMP NOT NULL,
	user_id SERIAL NOT NULL,
	CONSTRAINT fk_Trades_users FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO
	Trades(
		ticker,
		amount,
		price,
		execution_type,
		execution_date,
		user_id
	)
VALUES
	(
		'APPL',
		100.10,
		25.75,
		'buy',
		'2022-05-01 00:00:00',
		1
	);

INSERT INTO
	Trades(
		ticker,
		amount,
		price,
		execution_type,
		execution_date,
		user_id
	)
VALUES
	(
		'MSFT',
		200.25,
		10.999,
		'sell',
		'2022-06-14 00:00:00',
		2
	);

INSERT INTO
	Trades(
		ticker,
		amount,
		price,
		execution_type,
		execution_date,
		user_id
	)
VALUES
	(
		'GOGL',
		300.50,
		55.10,
		'buy',
		'2022-07-24 00:00:00',
		1
	);

INSERT INTO
	Trades(
		ticker,
		amount,
		price,
		execution_type,
		execution_date,
		user_id
	)
VALUES
	(
		'UBS',
		400.99,
		26.88,
		'sell',
		'2022-08-10 00:00:00',
		2
	);

INSERT INTO
	Trades(
		ticker,
		amount,
		price,
		execution_type,
		execution_date,
		user_id
	)
VALUES
	(
		'PUREF',
		1000,
		20.99,
		'sell',
		'2022-09-05 00:00:00',
		1
	);

INSERT INTO
	Trades(
		ticker,
		amount,
		price,
		execution_type,
		execution_date,
		user_id
	)
VALUES
	(
		'AMZN',
		100.75,
		100.20,
		'buy',
		'2022-10-30 00:00:00',
		2
	);

INSERT INTO
	Trades(
		ticker,
		amount,
		price,
		execution_type,
		execution_date,
		user_id
	)
VALUES
	(
		'BMW',
		12.99,
		10.87,
		'buy',
		'2022-11-24 00:00:00',
		1
	);

INSERT INTO
	Trades(
		ticker,
		amount,
		price,
		execution_type,
		execution_date,
		user_id
	)
VALUES
	(
		'AAL',
		1200.50,
		557.99,
		'sell',
		'2022-12-21 00:00:00',
		2
	);

INSERT INTO
	Trades(
		ticker,
		amount,
		price,
		execution_type,
		execution_date,
		user_id
	)
VALUES
	(
		'ABB',
		10000.00,
		157.50,
		'sell',
		'2023-01-15 00:00:00',
		1
	);

INSERT INTO
	Trades(
		ticker,
		amount,
		price,
		execution_type,
		execution_date,
		user_id
	)
VALUES
	(
		'SWISS',
		1500.65,
		322.28,
		'buy',
		'2023-02-28 00:00:00',
		2
	);

INSERT INTO
	Trades(
		ticker,
		amount,
		price,
		execution_type,
		execution_date,
		user_id
	)
VALUES
	(
		'CANA',
		1780.80,
		543.29,
		'buy',
		'2023-03-21 00:00:00',
		1
	);

INSERT INTO
	Trades(
		ticker,
		amount,
		price,
		execution_type,
		execution_date,
		user_id
	)
VALUES
	(
		'IBM',
		1950.00,
		45.00,
		'sell',
		'2023-03-31 00:00:00',
		2
	);

SELECT
	*
FROM
	pg_catalog.pg_tables
where
	schemaname = 'public';
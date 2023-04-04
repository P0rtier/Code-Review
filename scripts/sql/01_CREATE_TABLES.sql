
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE accounts (
    id uuid DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
	password_hash VARCHAR NOT NULL,
	salt BIT VARYING(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE vacations (
    email VARCHAR(255) NOT NULL,
    start_date DATE,
    end_date DATE,
    PRIMARY KEY (email)
)
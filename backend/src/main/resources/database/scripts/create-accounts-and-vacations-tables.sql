-- liquibase formatted sql
-- changeset puzarows:createAccountsAndVacationsTables
-- comment SQL script to build inital DB tables

--
-- Create accounts table
--

DROP TABLE IF EXISTS accounts;
CREATE TABLE accounts (
    id uuid DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
	password_hash VARCHAR NOT NULL,
	salt BIT VARYING(50) NOT NULL,
    PRIMARY KEY (id)
);

--
-- Create vacations table
--

DROP TABLE IF EXISTS vacations;
CREATE TABLE vacations (
    email VARCHAR(255) NOT NULL,
    start_date DATE,
    end_date DATE,
    PRIMARY KEY (email)
);

-- rollback DROP TABLE accounts
-- rollback DROP TABLE vacations




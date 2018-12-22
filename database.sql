--CREATE DATABASE "quotesify_database";

--The Authorizations table lists the available types of companies
--that the admin can create
CREATE TABLE "authorizations" (
    "authorization_id" SERIAL PRIMARY KEY,
    "type_of_company" VARCHAR (80) UNIQUE NOT NULL
);

INSERT INTO "authorizations" ("type_of_company")
VALUES 
('Administrator'), ('Employer'), ('Broker'), ('Provider');


--  Companies table lists companies and their associated authorizations
CREATE TABLE "companies" (
    "company_id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) NOT NULL,
    "authorization_id" INTEGER references authorizations
);




--  The users table lists all the users 
--  and references the company that employs them
--  and through that company their authorization
--  OF NOTE:  Companies have authorizations
--  and not users, a user may only have one company
--  and therefore one authorization with this database
--  setup.

CREATE TABLE "users" (
    "user_id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "company_id" INTEGER references companies
);



--  Deal_statuses table lists the possible statuses
--  for a deal which might be waiting for different
--  steps to complete and might be represented
--  as a graphic on the front end.

CREATE TABLE "deal_statuses" (
    "deal_status_id" SERIAL PRIMARY KEY,
    "status" VARCHAR (80) UNIQUE NOT NULL
);

INSERT INTO "deal_statuses" ("status")
VALUES 
('Awaiting data'), ('Ready for quote'), ('Data sent to provider');


--  Deals table lists deals between 
--  employers and brokers
CREATE TABLE "deals" (
    "deal_id" SERIAL PRIMARY KEY,
    "employer_id" INTEGER references companies,
    "broker_id" INTEGER references companies,
    "date_email_sent_to_employer" DATE,
    "deal_status_id" INTEGER references deal_statuses,
    "csv_url" VARCHAR (1000) DEFAULT NULL
);


--  Quotes table lists quotes for a deal (between a 
--  broker and an employer) from a provider
CREATE TABLE "quotes" (
    "quote_id" SERIAL PRIMARY KEY,
    "provider_id" INTEGER references companies,
    "deal_id" INTEGER references deals,
    "date_data_sent_to_provider" DATE,
    "date_of_provider_decision" DATE DEFAULT NULL,
    "sent_to_provider" BOOLEAN DEFAULT FALSE,
    "decision_complete" BOOLEAN DEFAULT FALSE,
    "provider_response_message" VARCHAR (1000) DEFAULT NULL,
    "provider_response_file_location" VARCHAR (1000) DEFAULT NULL
);

--  Employee table contains all uploaded datasets of employees
--  for all deals
CREATE TABLE "employees" (
    "employee_id" SERIAL PRIMARY KEY,
    "deal_id" INTEGER references deals,
    "employer_supplied_unique_id" INTEGER DEFAULT NULL,
    "date_of_birth" DATE,
    "date_of_hire" DATE,
    "union" BOOLEAN,
    "role" VARCHAR (80), 
    "salary_per_year" INTEGER, 
    "gender" VARCHAR (80), 
    "status" VARCHAR (80), 
    "state" VARCHAR (80),
    "employer_supplied_company_code" INTEGER,
    "is_valid" BOOLEAN DEFAULT FALSE
);

